import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import React, { useEffect, useRef } from "react";
import { auth, firestore } from "../firebase/config";

const SignIn = () => {
  const usersCollectionRef = collection(firestore, "users");
  const authButtonRef = useRef<HTMLButtonElement>(null);

  const signInWIthGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then(async (userCredential) => {
      await setDoc(doc(firestore, "users", userCredential.user.uid), {
        email: userCredential.user.email,
        uid: userCredential.user.uid,
      });
    });
  };
  useEffect(() => {
    authButtonRef.current?.focus();
  }, []);

  return (
    <div className="grid place-items-center h-full">
      <button
        ref={authButtonRef}
        type="button"
        className="text-white bg-primary hover:bg-primary/90 focus:ring-4 focus:outline-none
         focus:ring-primary/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center 
         inline-flex items-center dark:focus:ring-primary/55 "
        onClick={signInWIthGoogle}
      >
        <svg
          className="w-4 h-4 mr-2 -ml-1"
          aria-hidden="true"
          focusable="false"
          data-prefix="fab"
          data-icon="google"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 488 512"
        >
          <path
            fill="currentColor"
            d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
          ></path>
        </svg>
        Sign in with Google
      </button>
    </div>
  );
};

export default SignIn;
