import clsx from "clsx";
import React, { ButtonHTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode,
  isfullround?:boolean
}

function Button({
  children, 
  className,
  isfullround,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={twMerge(
        clsx(
          "bg-blue-600 hover:bg-blue-800 px-2 py-2 text-white rounded-md text-center m-2",
          className,
          { "rounded-full p-4 font-bold ": isfullround }
        )
      )}
    >
      {children}
    </button>
  );
}

export default Button;
