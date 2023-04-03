import { signOut } from "firebase/auth";
import { motion } from "framer-motion";
import { auth } from "../../firebase/config";
import { useAppDispatch } from "../../store";
import { toggleSideBar } from "../AppContainer/appContainer.slice";
import { SignOutButton } from "../SignOutButton";

const SideBar = () => {
  const dispatch = useAppDispatch();

  return (
    <>
      <motion.div
        key={1}
        initial={{ x: "-100%" }}
        animate={{ x: "0" }}
        exit={{ x: "-100%" }}
        transition={{ ease: "easeInOut", duration: 0.3 }}
        className="dark:bg-zinc-800 mainDark h-full w-4/6 
    absolute sm:rounded-tl-xl sm:rounded-bl-xl z-40"
      >
        <SignOutButton />
      </motion.div>
      <motion.div
        key={2}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.1 }}
        className="dark:bg-deepDark/75 h-full w-full z-30
  absolute right-0 top-0 sm:rounded-tr-xl sm:rounded-br-xl "
        onClick={() => {
          dispatch(toggleSideBar());
        }}
      />
    </>
  );
};

export default SideBar;
