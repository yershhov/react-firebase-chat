import { useState } from "react";
import { useAppDispatch } from "../../store";
import { toggleSideBar } from "../../components/AppContainer/appContainer.slice";
import HeaderContainer from "../../components/layouts/HeaderContainer";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import HeaderButton from "../../components/common/HeaderButton";
import { AiOutlineSearch } from "react-icons/ai";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";

const Header = () => {
  const dispatch = useAppDispatch();
  return (
    <HeaderContainer>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <HeaderButton
            icon={<HiOutlineMenuAlt2 size={21} />}
            onClick={() => {
              dispatch(toggleSideBar());
            }}
          />
          <h2 className="font-semibold text-base">"the chat app"</h2>
        </div>
        <div>
          <Link to={"/search"}>
            <HeaderButton
              icon={<AiOutlineSearch size={20} className='mt-1' />}
            />
          </Link>
        </div>
      </div>
    </HeaderContainer>
  );
};

export default Header;
