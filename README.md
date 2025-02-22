
# AI Chatbot with AWS Amplify and ReactJS

AI Chatbot can see past conversations and resume conversations. Secure login with Amazon Cognito.

This project showcases the development of an AI chatbot application leveraging AWS Amplify and ReactJS. The chatbot provides secure authentication and persistent chat history storage.

![amplify-ai-diagram1 drawio](https://github.com/user-attachments/assets/345621ca-7fc8-4053-85e3-27bc11585b15)


Key Features:

User Authentication: Implemented using Amazon Cognito, ensuring secure sign-up and sign-in processes.
AI-Powered Conversations: Utilizes Amazon Bedrock to provide intelligent responses to user queries.
Chat History: Stores and retrieves chat histories using Amazon DynamoDB, allowing users to revisit past conversations.
UI: Built with ReactJS (TypeScript)
Serverless Architecture: Leverages AWS Amplify's backend services for scalable, maintenance-free operations.

Technical Stack:

Frontend: ReactJS and Amplify Managed Frontend
Backend: AWS Amplify Managed Backend
Authentication: Amazon Cognito
Database: Amazon DynamoDB
Hosting: AWS Amplify Hosting
CI/CD: Integrated with code repository for automated deployments

Development Workflow: The project follows a CI/CD pipeline. Any updates pushed to the code repository trigger automatic builds and deployments through AWS Amplify.

### Prerequisites

- Node.js 18+ installed
- AWS account that has been set up for AWS Amplify and has access to the Claude models in Amazon Bedrock

### Installation

1. Clone the repository and `cd` into the `claude-ai` directory
2. Install the dependencies with your favorite Javscript package manager. For example, `npm install`
3. Run `npx ampx sandbox` to spin up a sandbox cloud backend
4. Run `npm run dev` to start up NextJS locally

### Deployment
Deploy on AWS Amplify Hosting
