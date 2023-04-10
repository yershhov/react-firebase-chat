import { getRedirectResult, GoogleAuthProvider, signInWithPopup, signInWithRedirect } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useEffect, useRef } from "react";
import { auth, firestore } from "../firebase/config";

const SignIn = () => {

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

  // const signInWIthGoogle = () => {

  //   authButtonRef.current!.disabled = true
  //   const provider = new GoogleAuthProvider();

  //   signInWithRedirect(auth, provider)

  //   getRedirectResult(auth)
  //     .then(async (result) => {
  //       const credential = GoogleAuthProvider.credentialFromResult(result!);
  //       const token = credential?.accessToken;
  //       const user = result?.user;

  //       await setDoc(doc(firestore, "users", user!.uid), {
  //         email: user?.email,
  //         uid: user?.uid,
  //       });
  //     })
  //     .catch((error) => {
  //       // Handle Errors here.
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       // The email of the user's account used.
  //       const email = error.customData.email;
  //       // The AuthCredential type that was used.
  //       const credential = GoogleAuthProvider.credentialFromError(error);
  //       // ...
  //     });;
  // };

  useEffect(() => {
    authButtonRef.current?.focus();
  }, []);

  return (
    <div className="h-full w-[20rem] mx-auto">
      <div className=" h-full flex flex-col gap-24 sm:gap-6">
        <div className="grid gap-12 sm:gap-8 w-full pt-[7rem] sm:pt-16">
          <h1 className="text-[44px] sm:text-4xl font-black text-raisinBlack text-center">WELCOME!👋</h1>
          <div className="font-semibold text-left text-gray-500 text-[13px] sm:text-[12px] leading-[1.1rem] sm:leading-[0.9rem] w-full px-2 sm:px-11">
            <h3 >😊A couple things to know:</h3>
            <br />
            <p >1. For now the app only supports <br /> authentication with gmail account, <br />other options will be added soon!</p>
            <br />
            <p>2. Smooth animations, beautiful <br /> loading states and performance <br /> enchancements to be done <br /> in the nearest future🙉</p>
            <br />
            <p>3. Feel free to report any bugs, <br /> ask questions, suggest new features,<br />  etc. on <a href="mailto:yershhov@gmail.com" className="inline text-white/50 font-black hover:brightness-90">yershhov@gmail.com</a> <br /> or directly in this app <br /> (find me by the same email)</p>
          </div>
        </div>
        <div className="w-full px-2 sm:px-11 sm:pt-10">
          <button
            ref={authButtonRef}
            type="button"
            className="text-white bg-primary hover:bg-primary/90 focus:ring-4 focus:outline-none
        focus:ring-primary/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center 
        inline-flex items-center justify-center dark:focus:ring-primary/55 w-full"
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
      </div>
    </div>
  );
};

export default SignIn;
