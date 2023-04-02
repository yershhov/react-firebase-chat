import React from "react";
import HeaderContainer from "../../../components/layouts/HeaderContainer";
import { IoArrowBackSharp } from "react-icons/io5";
import { UserEntity } from "../../../firebase/entities/user";
import CircleButton from "../../../components/common/CircleButton";
import { useNavigate, useParams } from "react-router-dom";

type CharHeaderProps = { companion: UserEntity };
const ChatHeader = (props: CharHeaderProps) => {
  const params = useParams();
  const navigate = useNavigate();
  return (
    <HeaderContainer>
      <div className="flex items-center gap-4">
        <CircleButton
          icon={<IoArrowBackSharp size={20} />}
          onClick={() => navigate("/")}
        />
        <div className="h-[2.4rem] dark:bg-zinc-700 aspect-square rounded-full"></div>
        <p className="font-semibold">{params.companionEmail}</p>
      </div>
    </HeaderContainer>
  );
};

export default ChatHeader;
