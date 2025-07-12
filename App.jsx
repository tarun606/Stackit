// import LoginPage from "./components/Login/Login"
// import RegisterPage from "./components/Register/Register"

// function App () {

//   return (
//     <LoginPage/>
    
//   )
// }

// export default App

// client/src/App.js (or App.jsx)
import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import LoginPage from "./components/Login/Login" // Standard import path
import RegisterPage from "./components/Register/Register" // Standard import path

// Main App component
const App = () => {
  // State to manage which page is currently displayed
  const [currentPage, setCurrentPage] = useState('login'); // Default to login page
  const [auth, setAuth] = useState(null); // Firebase Auth instance
  const [isAuthReady, setIsAuthReady] = useState(false); // To track Firebase auth initialization

  useEffect(() => {
    // Initialize Firebase
    const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
    const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};

    try {
      const app = initializeApp(firebaseConfig);
      const firebaseAuth = getAuth(app);
      setAuth(firebaseAuth);

      // Listen for authentication state changes
      const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
        if (user) {
          console.log("User is signed in:", user.uid);
          // If a user is already signed in (e.g., from a previous session), you might redirect them
          // setCurrentPage('home'); // Uncomment if you have a 'home' page
        } else {
          console.log("No user is signed in.");
          // If no user is signed in, try to sign in with custom token or anonymously
          if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
            try {
              await signInWithCustomToken(firebaseAuth, __initial_auth_token);
              console.log("Signed in with custom token.");
            } catch (error) {
              console.error("Error signing in with custom token:", error);
              await signInAnonymously(firebaseAuth);
              console.log("Signed in anonymously due to custom token error.");
            }
          } else {
            await signInAnonymously(firebaseAuth);
            console.log("Signed in anonymously.");
          }
        }
        setIsAuthReady(true); // Mark authentication as ready
      });

      // Cleanup subscription on component unmount
      return () => unsubscribe();
    } catch (error) {
      console.error("Firebase initialization error:", error);
      setIsAuthReady(true); // Still mark as ready even on error to avoid infinite loading
    }
  }, []); // Empty dependency array means this runs once on mount

  // Show a loading state until Firebase Auth is ready
  if (!isAuthReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white text-xl">
        Loading authentication...
      </div>
    );
  }

  // Conditionally render the current page
  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <LoginPage auth={auth} setCurrentPage={setCurrentPage} />;
      case 'register':
        return <RegisterPage setCurrentPage={setCurrentPage} />;
      case 'home':
        // Placeholder for your home page component
        return (
          <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white text-2xl">
            Welcome Home! (This is a placeholder for your home page)
            <button
              onClick={() => setCurrentPage('login')}
              className="ml-4 px-4 py-2 bg-indigo-600 rounded-md hover:bg-indigo-700"
            >
              Go to Login
            </button>
          </div>
        );
      default:
        return <LoginPage auth={auth} setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="App">
      {renderPage()}
    </div>
  );
};

export default App;
