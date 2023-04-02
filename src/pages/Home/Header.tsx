import { signOut } from "firebase/auth";
import { useContext, useState } from "react";
import { auth } from "../../firebase/config";
import { useAppDispatch } from "../../store";
import { toggleSideBar } from "../../components/AppContainer/appContainer.slice";
import HeaderContainer from "../../components/layouts/HeaderContainer";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import CircleButton from "../../components/common/CircleButton";

const Header = () => {
  const dispatch = useAppDispatch();
  return (
    <>
      <HeaderContainer>
        <div className="flex items-center justify-between gap-4">
          <CircleButton
            icon={<HiOutlineMenuAlt2 size={24} />}
            onClick={() => {
              dispatch(toggleSideBar());
            }}
          />

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
      </HeaderContainer>
    </>
  );
};

export default Header;
