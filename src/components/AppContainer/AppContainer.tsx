import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { toggleSideBar } from "./appContainer.slice";

type AppContainerProps = {
  children?: ReactNode;
};

const AppContainer = (props: AppContainerProps) => {
  const dispatch = useAppDispatch();

  const sideBarIsOpen = useAppSelector(
    (state) => state.appContainer.sideBarIsOpen
  );
  return (
    <div className="flex sm:h-5/6 h-full sm:translate-x-[-6rem]">
      {/* mask for a sidebar */}
      <div className="dark:bg-raisinBlack h-full hidden sm:block w-48 relative z-50"></div>
      <div className="dark:bg-deepDark sm:rounded-xl  sm:w-80 w-full h-full relative">
        <AnimatePresence>
          {sideBarIsOpen && (
            <>
              <motion.div
                initial={{ x: "-12rem" }}
                animate={{ x: "0" }}
                exit={{ x: "-12rem" }}
                transition={{ ease: "easeInOut", duration: 0.3 }}
                className="dark:bg-zinc-800 mainDark h-full w-48
                  absolute sm:rounded-tl-xl sm:rounded-bl-xl z-40"
              />
              <motion.div
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
          )}
        </AnimatePresence>
        {props.children}
      </div>
    </div>
  );
};

export default AppContainer;
