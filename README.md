# Practice Interview AI 🎤🤖

An AI-powered voice interview practice platform that helps you prepare for real interviews with human-like AI voice agents in real-time.

## 🌟 Features

- **Real-time AI Voice Interaction**: Practice with human-like AI voice agents
- **Fully Customizable Interviews**: Tailor interview scenarios to your specific needs
- **Voice-Powered Experience**: Natural conversation flow with AI interviewer
- **Instant Feedback**: Get immediate insights on your interview performance
- **Multiple Interview Types**: Support for various interview formats and industries

## 🚀 Tech Stack

- **Frontend**: Next.js, Tailwind CSS
- **Deployment**: Vercel
- **Containerization**: Docker & Docker Compose
- **AI Voice Technology**: [Specify your AI voice service]

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Docker](https://www.docker.com/get-started) and Docker Compose
- [Node.js](https://nodejs.org/) (v18 or higher)
- [Git](https://git-scm.com/)

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/practice-interview-ai.git
   cd practice-interview-ai
   ```

2. **Environment Configuration**
   ```bash
   cp .env.example .env.local
   ```
   Update the `.env.local` file with your API keys and configuration values.

3. **Install dependencies** (if running without Docker)
   ```bash
   npm install
   ```

## 🐳 Docker Development

### Development Mode
```bash
docker compose up dev
```

### Production Mode
```bash
docker compose up prod
```

The application will be available at `http://localhost:3000`

## 💻 Local Development (Without Docker)

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🚀 Deployment

This project uses automatic deployment with Vercel:

1. **Push to main branch**: Any commit to the main branch automatically triggers deployment
2. **Deployment Queue**: Your changes will be added to the deployment queue
3. **Live Updates**: Changes go live automatically after successful build

### Manual Deployment
```bash
# Deploy to Vercel
vercel --prod
```

## 📁 Project Structure

```
practice-interview-ai/
├── components/          # Reusable UI components
├── pages/              # Next.js pages
├── public/             # Static assets
├── styles/             # Tailwind CSS and custom styles
├── utils/              # Utility functions
├── docker-compose.yml  # Docker configuration
├── Dockerfile          # Docker build instructions
└── README.md          # Project documentation
```

## 🎯 Usage

1. **Start an Interview Session**
   - Choose your interview type (technical, behavioral, etc.)
   - Select difficulty level and duration
   - Customize interview focus areas

2. **Practice with AI Voice Agent**
   - Speak naturally with the AI interviewer
   - Receive real-time questions and follow-ups
   - Get instant feedback on your responses

3. **Review Performance**
   - Access detailed interview analytics
   - Review recorded sessions (if enabled)
   - Track improvement over time


## 🐛 Known Issues

- Less Unit and E2E tests coverage for the code
- Configuration setup is still under development
- Some advanced features may be in beta


## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Thanks to all contributors who help improve this project
- Special thanks to the open-source community for the amazing tools and libraries

## 📊 Project Status

<img width="1338" height="704" alt="Screenshot 2025-08-27 at 4 08 53 PM" src="https://github.com/user-attachments/assets/27f533c0-0b26-4955-9054-f004edca2963" />

<img width="877" height="702" alt="Screenshot 2025-08-27 at 4 09 25 PM" src="https://github.com/user-attachments/assets/200d31b6-7699-45cc-8cfc-9cb97c16e995" />
<img width="1002" height="621" alt="Screenshot 2025-08-27 at 4 09 35 PM" src="https://github.com/user-attachments/assets/47a08d97-356b-4c23-a207-7ef3703bc7ee" />


---

**Ready to ace your next interview?** 🚀 Start practicing with AI today!

*Made with ❤️ by the Practice Interview AI team*
