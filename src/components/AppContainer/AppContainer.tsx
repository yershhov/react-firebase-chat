import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import SideBar from "../SideBar";
import { toggleSideBar } from "./appContainer.slice";

type AppContainerProps = {
  children?: ReactNode;
};

const AppContainer = (props: AppContainerProps) => {
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
              <SideBar />
            </>
          )}
        </AnimatePresence>
        {props.children}
      </div>
    </div>
  );
};

export default AppContainer;
