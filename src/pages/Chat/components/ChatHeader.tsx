import React from "react";
import HeaderContainer from "../../../components/layouts/HeaderContainer";
import { IoArrowBackSharp } from "react-icons/io5";
import { UserEntity } from "../../../firebase/entities/user";
import HeaderButton from "../../../components/common/HeaderButton";
import { useNavigate, useParams } from "react-router-dom";
import BackHomeButton from "../../../components/common/BackHomeButton";

const ChatHeader = () => {
  const params = useParams();
  const navigate = useNavigate();
  return (
    <HeaderContainer>
      <div className="flex items-center gap-4">
        <HeaderButton
          icon={<IoArrowBackSharp size={19} />}
          onClick={() => history.back()}
        />
        <div className="h-[2.4rem] dark:bg-zinc-700 aspect-square rounded-full"></div>
        <p className="font-semibold">{params.companionEmail}</p>
      </div>
    </HeaderContainer>
  );
};

export default ChatHeader;
