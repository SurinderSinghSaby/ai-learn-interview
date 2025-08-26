import {db} from "@/firebase/admin";

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

export async function getLatestInterviews(
    params: GetLatestInterviewsParams
): Promise<Interview[] | null> {
    const { userId, limit = 20 } = params;

    const interviews = await db
        .collection("interviews")
        .orderBy("createdAt", "desc")
        .where("finalized", "==", true)
        .where("userId", "!=", userId)
        .limit(limit)
        .get();

    return interviews.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    })) as Interview[];
}

export async function getInterviewByID(id: string): Promise<Interview> {

    const snapshot = await db
        .collection("interviews")
        .doc(id)
        .get();

    return interview.data() as Interview | null;
}