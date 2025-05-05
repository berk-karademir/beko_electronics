import React from 'react';
import { Link } from 'react-router-dom';

const RegistrationSuccessfull = () => {
  return (
    <main className="container mx-auto py-10 px-4 max-w-lg text-center">
      <h2 className="text-2xl font-bold mb-4 text-green-700">Registration Successful!</h2>
      <p className="mb-6 text-gray-700">Please click on the activation link sent to your email address to activate your account.</p>
      <div className="flex gap-3 mb-8">
        <a
          href="https://mail.google.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-red-100 hover:bg-red-200 text-red-800 font-medium transition w-72"
        >
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/1280px-Gmail_icon_%282020%29.svg.png" alt="Gmail link" />
        </a>
        <a
          href="https://outlook.live.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-blue-100 hover:bg-blue-200 text-blue-800 font-medium transition  w-72"
        >
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Microsoft_Office_Outlook_%282018–present%29.svg/1024px-Microsoft_Office_Outlook_%282018–present%29.svg.png" alt="Outlook link" className=''/>
        </a>
       
      </div>
      <Link
        to="/login"
        className="inline-block bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800 font-semibold transition"
      >
        Go to Login Page
      </Link>
    </main>
  );
};

export default RegistrationSuccessfull;
