// // client/src/LoginPage.js
// import React, { useState } from 'react';
// import { signInWithEmailAndPassword } from 'firebase/auth';

// function LoginPage({ auth, setCurrentPage }) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loginError, setLoginError] = useState('');
//   const [loadingLogin, setLoadingLogin] = useState(false);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoginError('');
//     setLoadingLogin(true);

//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       console.log("User logged in successfully!");
//       setCurrentPage('home'); // Redirect to home on successful login
//     } catch (error) {
//       console.error("Login error:", error);
//       switch (error.code) {
//         case 'auth/user-not-found':
//         case 'auth/wrong-password':
//         case 'auth/invalid-credential':
//           setLoginError('Invalid email or password.');
//           break;
//         case 'auth/invalid-email':
//           setLoginError('Please enter a valid email address.');
//           break;
//         case 'auth/too-many-requests':
//           setLoginError('Too many login attempts. Please try again later.');
//           break;
//         default:
//           setLoginError('Login failed. Please check your credentials.');
//       }
//     } finally {
//       setLoadingLogin(false);
//     }
//   };

//   return (
//     // Ensure the container takes full height and centers content
//     <div className="min-h-[calc(100vh)] flex items-center justify-center bg-gray-900 p-4 sm:p-6 md:p-8">
//       <div className="bg-gray-800 p-6 sm:p-8 md:p-10 rounded-lg shadow-xl w-full max-w-sm sm:max-w-md lg:max-w-lg border border-gray-700">
//         <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-indigo-400 mb-5 sm:mb-6 md:mb-8 text-center">Login to StackIt</h2>
//         <form onSubmit={handleLogin} className="space-y-5 sm:space-y-6 md:space-y-7">
//           <div>
//             <label htmlFor="email" className="block text-gray-300 text-sm sm:text-base md:text-lg font-medium mb-2">Email Address</label>
//             <input
//               type="email"
//               id="email"
//               className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-gray-700 text-gray-100 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 text-sm sm:text-base"
//               placeholder="your.email@example.com"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="password" className="block text-gray-300 text-sm sm:text-base md:text-lg font-medium mb-2">Password</label>
//             <input
//               type="password"
//               id="password"
//               className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-gray-700 text-gray-100 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 text-sm sm:text-base"
//               placeholder="••••••••"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           {loginError && (
//             <p className="text-red-400 text-xs sm:text-sm text-center">{loginError}</p>
//           )}
//           <button
//             type="submit"
//             className="w-full px-5 py-2 sm:px-6 sm:py-3 md:py-4 bg-indigo-600 text-white font-bold rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base md:text-lg"
//             disabled={loadingLogin}
//           >
//             {loadingLogin ? 'Logging In...' : 'Login'}
//           </button>
//         </form>
//         <p className="text-center text-gray-400 text-xs sm:text-sm mt-5 sm:mt-6 md:mt-8">
//           Don't have an account?{' '}
//           <button
//             onClick={() => { /* Implement registration page navigation here */ }}
//             className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors duration-200"
//           >
//             Register
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default LoginPage;




// client/src/LoginPage.js
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth'; // Assuming firebase/auth is available

function LoginPage({ auth, setCurrentPage }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [loadingLogin, setLoadingLogin] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoginError('');
        setLoadingLogin(true);

        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log("User logged in successfully!");
            setCurrentPage('home'); // Redirect to home on successful login
        } catch (error) {
            console.error("Login error:", error);
            switch (error.code) {
                case 'auth/user-not-found':
                case 'auth/wrong-password':
                case 'auth/invalid-credential':
                    setLoginError('Invalid email or password.');
                    break;
                case 'auth/invalid-email':
                    setLoginError('Please enter a valid email address.');
                    break;
                case 'auth/too-many-requests':
                    setLoginError('Too many login attempts. Please try again later.');
                    break;
                default:
                    setLoginError('Login failed. Please check your credentials.');
            }
        } finally {
            setLoadingLogin(false);
        }
    };

    return (
        <div className="min-h-screen bg-blue-950 flex items-center justify-center flex-grow flex items-center justify-center bg-gray-900 p-4 sm:p-6 md:p-8">
            <div className="bg-gray-800 p-6 sm:p-8 md:p-10 rounded-lg shadow-xl w-full max-w-sm sm:max-w-md lg:max-w-lg border border-gray-700">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-indigo-400 mb-5 sm:mb-6 md:mb-8 text-center">Login to StackIt</h2>
                <form onSubmit={handleLogin} className="space-y-5 sm:space-y-6 md:space-y-7">
                    <div>
                        <label htmlFor="email" className="block text-gray-300 text-sm sm:text-base md:text-lg font-medium mb-2">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-gray-700 text-gray-100 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 text-sm sm:text-base"
                            placeholder="your.email@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-gray-300 text-sm sm:text-base md:text-lg font-medium mb-2">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-gray-700 text-gray-100 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 text-sm sm:text-base"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {loginError && (
                        <p className="text-red-400 text-xs sm:text-sm text-center">{loginError}</p>
                    )}
                    <button
                        type="submit"
                        className="w-full px-5 py-2 sm:px-6 sm:py-3 md:py-4 bg-indigo-600 text-white font-bold rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base md:text-lg"
                        disabled={loadingLogin}
                    >
                        {loadingLogin ? 'Logging In...' : 'Login'}
                    </button>
                </form>
                <p className="text-center text-gray-400 text-xs sm:text-sm mt-5 sm:mt-6 md:mt-8">
                    Don't have an account?{' '}
                    <button
                        onClick={() => setCurrentPage('register')} // This line ensures navigation to register page
                        className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors duration-200"
                    >
                        Register
                    </button>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;

