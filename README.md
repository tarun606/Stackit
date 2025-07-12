# 🧠 StackIt – A Q&A Collaboration Platform

Live Demo: [stackit-qa.netlify.app](https://stackit-qa.netlify.app/)
Live Demo Video: https://drive.google.com/drive/folders/1VB3muN1RWc_eDUC9WbkL6bTiirOU0sQ2?usp=sharing

StackIt is a collaborative Q&A web application built using **React**, **Firebase**, and **TailwindCSS**, designed to help developers ask, answer, and organize technical questions in a clean, responsive interface.

---

## 🚀 Features & Functionality

### 🔐 Authentication
- **Login & Register** functionality using Firebase Authentication.
- Secure sign-in with email & password.
- Displays user avatar and logout options when logged in.

### 🏠 Home Page (`/`)
- Displays the **"All Questions"** feed.
- Questions are listed with:
  - Vote count (👍 Thumbs Up / 👎 Thumbs Down)
  - Tags and posted time
  - Author and interaction icons
- Includes a **“Post a Question”** button to navigate to the Ask Question page.

### ➕ Ask Question (`/ask`)
- Authenticated users can post questions.
- Fields:
  - **Title**
  - **Description**
  - **Tags**
- Automatically associates the question with the currently logged-in user.
- Adds the post to Firestore for persistence.

### ❓ View Question Detail (`/question/:id`)
- Full question view with:
  - Title and detailed description
  - Tags
  - Voting buttons (upvote/downvote)
  - Posted date and author info
- **Answers Section**:
  - Users can write answers in a rich text input box
  - All answers are listed with votes and user info

### 🧾 My Questions (`/my-questions`)
- Displays only the questions posted by the currently logged-in user.
- Edit and delete options (if implemented) may be available.

### 🔍 Search Functionality
- A search input lets users find questions by title or tags in real-time.
- Helps quickly filter large sets of questions.

### 💬 Rich Text Editor for Answers
- Includes basic formatting options:
  - Bold, Italic, Strikethrough
  - Lists, alignment, link, image, emoji support
- Enhances the readability of responses

### 🔔 Notification Icons (UI Only)
- Bell, User, and other Lucide icons used for future features like notifications and profile actions.

---

## 🛠️ Tech Stack

- **Frontend**: React + Vite
- **Styling**: TailwindCSS
- **Icons**: Lucide-react
- **Authentication**: Firebase Auth
- **Database**: Firestore
- **Hosting**: Netlify

---
