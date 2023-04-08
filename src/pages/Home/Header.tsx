import { useState } from "react";
import { useAppDispatch } from "../../store";
import { toggleSideBar } from "../../components/AppContainer/appContainer.slice";
import HeaderContainer from "../../components/layouts/HeaderContainer";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import CircleButton from "../../components/common/CircleButton";
import { AiOutlineSearch } from "react-icons/ai";
import { AnimatePresence, motion } from "framer-motion";

const Header = () => {
  const dispatch = useAppDispatch();
  const [inputOpen, setInputOpen] = useState(false);
  return (
    <HeaderContainer>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 ">
          <CircleButton
            icon={<HiOutlineMenuAlt2 size={22} />}
            onClick={() => {
              dispatch(toggleSideBar());
            }}
          />
          <h2 className="font-semibold text-base">Demoname</h2>
        </div>
        <div>
          <CircleButton
            icon={<AiOutlineSearch size={20} />}
            onClick={() => {
              setInputOpen(!inputOpen);
            }}
          />
        </div>
        <AnimatePresence>
          {inputOpen && (
            <motion.input
              key={15}
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              exit={{ width: 0 }}
              transition={{ ease: "easeInOut", duration: 0.3 }}
              type="text"
              id="search"
              className="border text-sm rounded-lg w-full px-3 py-2 dark:bg-lightDark
         dark:border-zinc-700 dark:placeholder-gray-400 dark:text-gray-200  dark:focus:ring-primary/50
          dark:focus:border-primary/50 focus:outline-none"
              placeholder="Search"
            />
          )}
        </AnimatePresence>
      </div>
    </HeaderContainer>
  );
};

export default Header;
