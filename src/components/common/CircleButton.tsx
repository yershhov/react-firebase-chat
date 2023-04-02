import React, { ReactNode } from "react";
type CircleButtonProps = { icon: ReactNode; onClick?: () => void };
const CircleButton = (props: CircleButtonProps) => {
  return (
    <button
      type="button"
      className="dark:bg-transparent dark:hover:bg-neutral-800 focus:outline-none focus:ring-1
  font-medium rounded-full h-full p-2 text-sm
   dark:focus:ring-primary/50 dark:border-primary/50 text-gray-400"
      onClick={props.onClick}
    >
      {props.icon}
    </button>
  );
};

export default CircleButton;
