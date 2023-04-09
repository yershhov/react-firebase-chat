import { ReactNode } from "react";

type HeaderButtonProps = { icon: ReactNode; onClick?: () => void };
const HeaderButton = (props: HeaderButtonProps) => {
  return (
    <button
      type="button"
      className="dark:bg-transparent dark:hover:brightness-90 focus:outline-none focus:ring-1
      font-medium text-sm
    dark:focus:ring-primary/50 dark:border-primary/50 "
      onClick={props.onClick}
    >
      {props.icon}
    </button>
  );
};

export default HeaderButton;
