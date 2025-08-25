'use server'

import {db, auth} from "@/firebase/admin";
import {cookies} from "next/headers";

const ONE_DAY_MS = 24 * 60 * 60 * 1000;
const SESSION_COOKIE_NAME = 'session';

export async function signIn(params: SignInParams) {
    const {email, idToken} = params;

    try {
        const userRecord = await auth.getUserByEmail(email);

        if(!userRecord) {
            return {
                success: false,
                message: 'User does not exist. Create an account session'
            }
        }
        await setSessionCookie(idToken);

    }catch (error) {
        console.error(error);

        return{
            success: false,
            message: 'Faile to log into an account',
        }
    }
}

export async function signUp(params: SignUpParams) {
    const { uid, name, email} = params;


    try{

        const userRecord = await db.collection("users").doc(uid).get();

        if(userRecord.exists){
            return{
                success: false,
                message: 'User already exists. Please sign in instead.'

            }
        }
        await db.collection('users').doc(uid).set({
            name, email
        })
        return{
            success: true,
            message: 'Account created successfully. Please sign in'
        }

    } catch(e: any) {
        console.error("Error creating a user", e);

        if(e.code === 'auth/email-already-exists'){
            return {
                success: false,
                message: 'User already exists'
            }
        }
        return {
            success: false,
            message: 'Failed to create a user'
        }
    }
}


export async function setSessionCookie(idToken: string) {
    // 1) Create a Firebase session cookie (server-side, using Admin SDK)
    const sessionCookie = await auth.createSessionCookie(idToken, {
        expiresIn: ONE_DAY_MS,
    });


    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE_NAME, sessionCookie, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'lax',
        // Next.js cookie `maxAge` is in seconds:
        maxAge: ONE_DAY_MS / 1000,
        // Or use an absolute expiry instead:
        // expires: new Date(Date.now() + ONE_DAY_MS),
    });

    return { success: true };
}

export async function getCurrentUser(): Promise<User | null> {

    const cookieStore = await cookies();

    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)?.value;

    if(!sessionCookie) return null;

    try{
        const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);

        const userRecord = await db.collection('users').doc(decodedClaims.uid).get();

        if(!userRecord.exists) {
            return null;
        }

        return {
            ...userRecord.data(),
            id: decodedClaims.uid,
        } as User;
    } catch(e) {
        console.log(e)

        return null;
    }
}

export async function isAuthenticated(): Promise<boolean> {
    const user = await getCurrentUser();

    return !!user;
}

export async function getInterviewByUserID(userId?: string): Promise<Interview[]> {
    if (!userId) {
        // either return [] or throw, your call:
        // throw new Error("getInterviewByUserID: userId is required");
        return [];
    }

    const snapshot = await db
        .collection("interviews")
        .where("userId", "==", userId)
        .orderBy("createdAt", "desc")
        .get();

    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Interview, "id">),
    }));
}
