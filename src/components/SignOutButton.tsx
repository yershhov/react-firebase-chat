import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { useAppDispatch } from "../store";
import { toggleSideBar } from "./AppContainer/appContainer.slice";

export const SignOutButton = () => {
  const dispatch = useAppDispatch();

  return (
    auth.currentUser && (
      <button
        onClick={() => {
          dispatch(toggleSideBar());
          signOut(auth);
        }}
        className=" border focus:ring-gray-20/500 font-medium rounded-lg text-sm px-5 py-2.5  
          bg-primary hover:bg-primary/90 dark:hover:bg-opacity-90  dark:border-neutral-700 
          dark:focus:ring-primary/50/50 focus:ring-4 focus/50:outline-none"
      >
        Sign Out
      </button>
    )
  );
};
