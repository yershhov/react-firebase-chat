import { signOut } from "firebase/auth";
import { useContext, useState } from "react";
import { auth } from "../firebase/config";
import { useAppDispatch } from "../store";
import { toggleSideBar } from "./AppContainer/appContainer.slice";

const Header = () => {
  const dispatch = useAppDispatch();
  return (
    <div className="p-4 flex justify-between gap-4 items-center  dark:text-gray-200">
      <button
        type="button"
        className="dark:text-gray-200 dark:bg-deepDark dark:hover:bg-neutral-800 focus:outline-none focus:ring-1
          font-medium rounded-md h-full p-1 text-sm
           dark:focus:ring-primary/50 dark:border-primary/50"
        onClick={() => {
          dispatch(toggleSideBar());
        }}
      >
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clip-rule="evenodd"
            fill-rule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <input
        type="text"
        id="first_name"
        className="bg-gray-50 border text-sm rounded-lg w-full px-3 py-2 dark:bg-raisinBlack
         dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-200  dark:focus:ring-primary/50
          dark:focus:border-primary/50 focus:outline-none h-full"
        placeholder="John"
        required
      />
    </div>
  );
};
export const SignOutButton = () => {
  return (
    auth.currentUser && (
      <button
        onClick={() => signOut(auth)}
        className=" border focus:ring-gray-20/500 font-medium rounded-lg text-sm px-5 py-2.5  
        bg-primary hover:bg-primary/90 dark:hover:bg-opacity-90  dark:border-neutral-700 
        dark:focus:ring-primary/50/50 focus:ring-4 focus/50:outline-none"
      >
        Sign Out
      </button>
    )
  );
};
export default Header;
