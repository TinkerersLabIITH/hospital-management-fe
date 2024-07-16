import React from 'react';
import { signInWithGoogle } from './firebaseConfig';
import axios from 'axios';

function App() {
  const handleLogin = async () => {
    try{
      const result = await signInWithGoogle();
      const { user } = result;
      const emailID = user["email"];
      const name = user["displayName"];

      const response = await axios.post(import.meta.env.VITE_SERVER_URI+'/api/auth/fetch',{ emailID: emailID });

      if(response.data["authLevel"]){
        alert(`Welcome, ${name} (${response.data["authLevel"]})`);
      }
    }
    catch(error){
      console.error(error);
      alert('Authentication failed');
    }
  };

  return (
    <>
      <div className='w-screen text-center'>
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h1 className="text-center">Hospital Management System</h1>
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700" onClick={handleLogin}>
            Sign in with Google
          </button>
        </div>
      </div>
    </>
  )
}

export default App
