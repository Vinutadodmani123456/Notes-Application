# NoteNest - Full-Stack Notes Application

> A modern, responsive, and intuitive full-stack notes management application built with **React**, **Vite**, **Node.js**, **Express**, and **MongoDB**. Designed for an internship assignment with high-performance persistent storage, real-time search, category filtering, light/dark mode, and rich UI/UX aesthetics.

---

## 📌 Table of Contents
1. [Project Overview](#project-overview)
2. [Problem Statement & Objectives](#problem-statement--objectives)
3. [Key Features](#key-features)
4. [Technology Stack](#technology-stack)
5. [Application Architecture](#application-architecture)
6. [Folder Structure](#folder-structure)
7. [MongoDB Database Schema](#mongodb-database-schema)
8. [RESTful API Documentation](#restful-api-documentation)
9. [Prerequisites](#prerequisites)
10. [Environment Configuration](#environment-configuration)
11. [Step-by-Step Installation & Setup (Windows)](#step-by-step-installation--setup-windows)
12. [Running the Application](#running-the-application)
13. [Manual Testing Checklist](#manual-testing-checklist)
14. [Troubleshooting Common Issues](#troubleshooting-common-issues)
15. [Screenshots](#screenshots)
16. [Future Enhancements](#future-enhancements)
17. [License](#license)

---

## 📖 Project Overview

**NoteNest** is a full-stack web application that allows users to seamlessly create, read, edit, delete, and search personal notes in real time. Unlike purely client-side prototypes, NoteNest integrates an Express REST API backend with a persistent MongoDB database via Mongoose ODM, adhering to industry best practices in error handling, validation, accessibility, and modern responsive design.

---

## 🎯 Problem Statement & Objectives

Modern knowledge workers and students frequently jot down thoughts, action items, meeting minutes, and study guides. Traditional note-taking tools are often bloated, ad-ridden, or fail to offer simple offline-first capabilities.

### Objectives:
- **Persistent Cloud/Local Storage**: Store all notes persistently in MongoDB without relying solely on ephemeral in-memory state or browser `localStorage`.
- **Full CRUD Capabilities**: Create, view, update, and delete notes with server-side validation and immediate UI synchronization.
- **Fast Search & Filtering**: Case-insensitive instant search matching both title and content fields with zero page reloads.
- **Responsive & Accessible Design**: Seamless experience across mobile phones (320px+), tablets, and widescreen desktop monitors.
- **Professional UI/UX**: Clean typography, light/dark mode toggle, view switching (Grid vs. List), and animated feedback via toast notifications.

---

## ✨ Key Features

- **Full CRUD Support**:
  - **Create**: Add notes with title, content, and category tags (`Work`, `Personal`, `Ideas`, `Study`, `Finance`, `General`).
  - **Read/View**: Read complete note text with linebreaks, creation timestamps, and last-updated metrics.
  - **Edit**: Edit notes with pre-populated forms, input validation, and server confirmation.
  - **Delete**: Irreversible deletion with custom confirmation modal and safety dialog.
- **Instant Search**:
  - Live query filtering across both `title` and `content` fields.
  - Case-insensitive search with debouncing to prevent excessive API requests.
  - Friendly "No notes found" empty state with a 1-click filter reset.
- **Theme Switcher**:
  - Light mode & Dark mode with smooth color transitions and persistent `localStorage` preference.
- **Layout Customization**:
  - Toggle between **Grid View** (multi-column cards) and **List View** (compact overview).
- **Pin Notes**:
  - Pin high-priority notes so they remain pinned to the top of your dashboard.
- **Reliable Error Handling**:
  - Graceful toast notifications (`react-hot-toast`) on validation failures, network issues, or 404s.
  - "Try Again" retry mechanism if backend connectivity is lost.

---

## 🛠 Technology Stack

### Frontend
- **Framework**: [React 19](https://react.dev/) with [Vite](https://vitejs.dev/)
- **Language**: JavaScript (ES6+)
- **Styling**: Vanilla CSS3 design system with CSS custom properties (variables), Flexbox, and CSS Grid
- **Icons**: [Lucide React](https://lucide.dev/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Notifications**: [React Hot Toast](https://react-hot-toast.com/)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/) (v18+)
- **Framework**: [Express.js](https://expressjs.com/) (RESTful API architecture)
- **Database ODM**: [Mongoose](https://mongoosejs.com/) (v8+)
- **CORS**: Cross-Origin Resource Sharing middleware
- **Environment**: [dotenv](https://github.com/motdotla/dotenv)

### Database
- **Local**: MongoDB Community Server (`mongodb://127.0.0.1:27017/notenest`)
- **Cloud (Optional)**: MongoDB Atlas connection string compatible

---

## 🏛 Application Architecture

```
┌────────────────────────────────────────────────────────┐
│                   React + Vite Client                  │
│  (Header, SearchBar, NoteCard, Modals, Category Chips) │
└───────────────────────────┬────────────────────────────┘
                            │
               HTTP / JSON (Axios Services)
                            │
┌───────────────────────────▼────────────────────────────┐
│                  Express.js REST API                   │
│         (/api/notes, /api/health, Middleware)          │
└───────────────────────────┬────────────────────────────┘
                            │
                    Mongoose Schema
                            │
┌───────────────────────────▼────────────────────────────┐
│                    MongoDB Database                    │
│            (Local Community Server / Atlas)            │
└────────────────────────────────────────────────────────┘
```

---

## 📂 Folder Structure

```
NoteNest/
├── client/                     # Frontend Vite + React application
│   ├── public/                 # Static assets
│   ├── src/
│   │   ├── assets/             # Brand logos & icons
│   │   ├── components/         # Modular React UI components
│   │   │   ├── ConfirmDialog.jsx
│   │   │   ├── EmptyState.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   ├── NoteCard.jsx
│   │   │   ├── NoteForm.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   └── ViewNoteModal.jsx
│   │   ├── hooks/
│   │   │   └── useDebounce.js  # Debounce hook for instant search
│   │   ├── pages/
│   │   │   └── NotesPage.jsx   # Main application dashboard
│   │   ├── services/
│   │   │   └── notesApi.js     # Axios API service client
│   │   ├── utils/
│   │   │   └── formatDate.js   # Relative & absolute date formatters
│   │   ├── App.jsx             # Root React component + Toaster
│   │   ├── index.css           # Modern design system & CSS tokens
│   │   └── main.jsx            # React 18 DOM mount point
│   ├── .env.example            # Client environment template
│   ├── index.html              # HTML5 entrypoint with SEO meta
│   ├── package.json
│   └── vite.config.js
│
├── server/                     # Backend Node.js + Express API
│   ├── config/
│   │   └── db.js               # MongoDB connection handler
│   ├── controllers/
│   │   └── noteController.js   # CRUD & search business logic
│   ├── middleware/
│   │   ├── errorHandler.js     # Centralized error middleware
│   │   └── notFound.js         # 404 Route interceptor
│   ├── models/
│   │   └── Note.js             # Mongoose Note schema & indexes
│   ├── routes/
│   │   └── noteRoutes.js       # Express route definitions
│   ├── app.js                  # Express app & CORS configuration
│   ├── server.js               # HTTP server entrypoint
│   ├── test-endpoints.js       # Automated API test suite
│   ├── .env.example            # Server environment template
│   └── package.json
│
├── .gitignore                  # Git exclusions (node_modules, .env)
├── package.json                # Monorepo management scripts
└── README.md                   # Comprehensive documentation
```

---

## 🗄 MongoDB Database Schema

The `Note` model is defined in [`server/models/Note.js`](server/models/Note.js):

| Field | Type | Required | Default | Description |
|---|---|---|---|---|
| `_id` | ObjectId | Auto | Auto | MongoDB unique record identifier |
| `title` | String | Yes | - | Note title (trimmed, max 150 chars) |
| `content` | String | Yes | - | Note body content (trimmed, max 10,000 chars) |
| `category` | String | No | `'General'` | Category tag (`Work`, `Personal`, etc.) |
| `pinned` | Boolean | No | `false` | Pin flag to keep note at the top |
| `color` | String | No | `'#ffffff'` | Color accent hex |
| `createdAt` | Date | Auto | Auto | Timestamp of note creation |
| `updatedAt` | Date | Auto | Auto | Timestamp of latest update |

### Indexes:
- Text index on `title` and `content` for efficient full-text search.
- Descending index on `updatedAt` (`{ updatedAt: -1 }`) for fast default sorting.

---

## 🌐 RESTful API Documentation

**Base URL**: `http://localhost:5000/api`

### 1. Health Check
- **Endpoint**: `GET /api/health`
- **Response**: `200 OK`
```json
{
  "status": "ok",
  "app": "NoteNest API",
  "timestamp": "2026-10-13T05:17:46.503Z"
}
```

### 2. Get All Notes (with Search & Sort)
- **Endpoint**: `GET /api/notes`
- **Query Parameters**:
  - `search` *(optional)*: Case-insensitive search query matching title, content, or category.
- **Response**: `200 OK`
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "6acdef529446538bc2d67b7d",
      "title": "Internship Kickoff Notes",
      "content": "Built NoteNest with React, Node.js, and MongoDB.",
      "category": "Work",
      "pinned": false,
      "createdAt": "2026-10-13T08:56:00.000Z",
      "updatedAt": "2026-10-13T09:05:00.000Z"
    }
  ]
}
```

### 3. Get Single Note by ID
- **Endpoint**: `GET /api/notes/:id`
- **Response**: `200 OK` on success, `400 Bad Request` if invalid ID format, `404 Not Found` if record does not exist.

### 4. Create Note
- **Endpoint**: `POST /api/notes`
- **Headers**: `Content-Type: application/json`
- **Body**:
```json
{
  "title": "Meeting Notes",
  "content": "Review sprint goals and backend integration.",
  "category": "Work"
}
```
- **Response**: `201 Created`
- **Validation**: Rejects blank or whitespace-only titles or content with `400 Bad Request`.

### 5. Update Note
- **Endpoint**: `PUT /api/notes/:id`
- **Headers**: `Content-Type: application/json`
- **Body**:
```json
{
  "title": "Updated Meeting Notes",
  "content": "Action items reviewed and finalized."
}
```
- **Response**: `200 OK` (returns updated note and updates `updatedAt`).

### 6. Delete Note
- **Endpoint**: `DELETE /api/notes/:id`
- **Response**: `200 OK`
```json
{
  "success": true,
  "message": "Note deleted successfully",
  "data": { "id": "6acdef529446538bc2d67b7d" }
}
```

---

## 📋 Prerequisites

Before installing, ensure the following are installed on your machine:
1. **Node.js**: v18.x, v20.x, or v22.x ([Download Node.js](https://nodejs.org/))
2. **npm**: v9.x or v10.x (included with Node.js)
3. **MongoDB**:
   - **Option A (Local)**: MongoDB Community Server installed and running locally as a Windows service. ([Download MongoDB Community](https://www.mongodb.com/try/download/community))
   - **Option B (Cloud)**: A free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster connection string.
4. **Git**: Installed for version control.

---

## ⚙️ Environment Configuration

### Backend (`server/.env`)
Create a file named `.env` inside the `server/` directory:
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/notenest
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```
*(If using MongoDB Atlas, replace `MONGODB_URI` with your connection string: `mongodb+srv://<username>:<password>@cluster0.mongodb.net/notenest?retryWrites=true&w=majority`)*

### Frontend (`client/.env`)
Create a file named `.env` inside the `client/` directory:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

> ⚠️ **Security Note**: Never commit actual `.env` files containing production secrets to public repositories.

---

## 💻 Step-by-Step Installation & Setup (Windows)

Open PowerShell or Command Prompt:

### 1. Clone the Repository
```powershell
git clone https://github.com/Vinutadodmani123456/Notes-Application.git
cd Notes-Application
```

### 2. Verify MongoDB Service is Running
```powershell
Get-Service -Name *mongo*
```
If the status is `Stopped`, start the service:
```powershell
Start-Service -Name MongoDB
```

### 3. Install All Dependencies
From the project root:
```powershell
npm run install:all
```
*(Or manually run `npm install` inside both `server` and `client` directories)*.

---

## 🚀 Running the Application

### Option 1: Run Both Simultaneously (Recommended)

In Terminal 1 (Start Backend Server):
```powershell
npm run server
```
*Backend runs on `http://localhost:5000`*

In Terminal 2 (Start Frontend Client):
```powershell
npm run client
```
*Frontend runs on `http://localhost:5173`*

### Option 2: Run Automated API Tests
To verify all 12 backend test cases before launching the frontend:
```powershell
node server/test-endpoints.js
```

---

## 🧪 Manual Testing Checklist

| # | Test Scenario | Expected Outcome | Result |
|---|---|---|---|
| 1 | Create valid note | Note saved in MongoDB, 201 response, success toast appears | ✅ Pass |
| 2 | Create note with empty title | Form shows validation warning, request rejected with 400 | ✅ Pass |
| 3 | Create note with empty content | Form shows validation warning, request rejected with 400 | ✅ Pass |
| 4 | Open full note view modal | Modal opens showing full text, formatted timestamps, copy button | ✅ Pass |
| 5 | Edit existing note | Data pre-populated, title updated, server confirmation toast | ✅ Pass |
| 6 | Delete note with confirmation | Modal prompts confirmation, note removed from UI & database | ✅ Pass |
| 7 | Instant search by title keyword | Only matching title cards displayed | ✅ Pass |
| 8 | Instant search by content keyword | Only matching content cards displayed | ✅ Pass |
| 9 | Search nonexistent keyword | Friendly "No notes found" empty state appears | ✅ Pass |
| 10 | Clear search filter | Full notes list restored immediately | ✅ Pass |
| 11 | Grid vs List view toggle | Dashboard switches smoothly between Grid and List views | ✅ Pass |
| 12 | Light / Dark mode toggle | Theme switches instantly, persists across page reloads | ✅ Pass |
| 13 | Browser refresh persistence | All notes and updates persist from MongoDB | ✅ Pass |
| 14 | Backend stoppage test | Stopping backend displays friendly error banner with Retry button | ✅ Pass |

---

## 🔍 Troubleshooting Common Issues

### 1. `MongooseServerSelectionError: connect ECONNREFUSED 127.0.0.1:27017`
- **Cause**: Local MongoDB service is not started.
- **Fix**: Open PowerShell as Administrator and run:
  ```powershell
  Start-Service -Name MongoDB
  ```
  Or check MongoDB service status in Windows Services (`services.msc`).

### 2. `Network Error` or Toast: `Unable to connect to NoteNest server`
- **Cause**: The Express server is not running on port 5000, or `VITE_API_BASE_URL` is misconfigured.
- **Fix**: Verify backend is running via `http://localhost:5000/api/health` and verify `client/.env` has `VITE_API_BASE_URL=http://localhost:5000/api`.

### 3. Port 5000 or 5173 Already in Use
- **Cause**: An existing process is listening on the port.
- **Fix**: Find and kill the process:
  ```powershell
  Get-NetTCPConnection -LocalPort 5000 | Select-Object OwningProcess
  Stop-Process -Id <PID> -Force
  ```

---

## 📸 Screenshots

*(Capture and insert your application screenshots below)*

### 1. Dashboard View (Grid Mode)
![Dashboard Grid View](https://placehold.co/1200x675/4f46e5/ffffff?text=Dashboard+Grid+View)

### 2. Create Note Modal
![Create Note Modal](https://placehold.co/1200x675/10b981/ffffff?text=Create+Note+Modal)

### 3. View Note Full Modal
![View Note Modal](https://placehold.co/1200x675/6366f1/ffffff?text=View+Note+Modal)

### 4. Dark Mode Theme
![Dark Mode View](https://placehold.co/1200x675/0f172a/ffffff?text=Dark+Mode+Theme)

### 5. Delete Confirmation Dialog
![Delete Confirmation](https://placehold.co/1200x675/ef4444/ffffff?text=Delete+Confirmation+Dialog)

---

## 🚀 Future Enhancements

- **User Authentication**: Add JWT or OAuth 2.0 (Google login) for multi-tenant private note vaults.
- **Markdown Rich-Text Editor**: Support headers, lists, code fences, and checkboxes.
- **Tagging & Color Palettes**: Custom hex color picker for color-coded note cards.
- **Attachments & Media**: File upload support via AWS S3 or Cloudinary.
- **Archiving & Trash Bin**: Soft-delete mechanism with a 30-day restore window.

---

## 📄 License

This project is licensed under the MIT License. Developed for the Full-Stack Internship Assignment.
