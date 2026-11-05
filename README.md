# AI Resume Analyzer

An AI-powered Resume Analyzer built using the MERN stack. It allows users to upload their resumes and compare them against a job description to receive an AI-generated analysis, resume score, and feedback.

## Features

- **Google Authentication:** Sign in using your Google account.
- **Resume Upload:** Upload your resume in PDF format.
- **AI Resume Analysis:** Analyze your resume against a given job description.
- **Resume Score:** Get an AI-generated score based on the job description.
- **AI Feedback:** Receive suggestions and feedback to improve your resume.
- **Resume History:** View previously analyzed resumes.
- **User Dashboard:** Access resume analysis results through a dashboard.

## Tech Stack

### Frontend

- React.js
- JavaScript
- Material UI (MUI)
- CSS
- Axios
- Firebase Authentication

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Multer
- pdf-parse
- Cohere AI API

## Project Structure

```text
AI-Resume-Analyzer/
│
├── backend/
│   ├── Controllers/
│   ├── Models/
│   ├── Routes/
│   ├── utils/
│   ├── uploads/
│   ├── .env.example
│   ├── conn.js
│   ├── index.js
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── index.html
│   ├── eslint.config.js
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/SujalNamdev/AI-Resume-Analyzer.git
```

Navigate into the project directory:

```bash
cd AI-Resume-Analyzer
```

### 2. Backend Setup

Navigate to the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the backend folder:

```env
MONGO_URI=your_mongodb_connection_string
COHERE_API_KEY=your_cohere_api_key
```

Replace the placeholder values with your actual MongoDB connection string and Cohere API key.

Start the backend:

```bash
node index.js
```

### 3. Frontend Setup

Open another terminal and navigate to the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the frontend development server:

```bash
npm run dev
```

Open the local URL displayed in your terminal to access the application.

## Environment Variables

The backend requires the following environment variables:

| Variable         | Description                            |
| ---------------- | -------------------------------------- |
| `MONGO_URI`      | MongoDB connection string              |
| `COHERE_API_KEY` | API key used for Cohere AI integration |

**Important:** Never commit your actual `.env` file or expose private API keys and database credentials.

Refer to `backend/.env.example` for the required environment variable names.

## Authentication

Firebase Authentication is used to provide Google Sign-In functionality.

To run the application with your own Firebase project, configure the Firebase web application settings in the frontend.

## AI Integration

The application uses the Cohere API to analyze resume content against the provided job description and generate relevant feedback and scoring.

## Future Improvements

- More detailed resume improvement suggestions.
- Support for additional resume file formats.
- Enhanced analytics and resume comparison.
- Improved UI and user experience.

## Author

Developed as a MERN Stack project.
