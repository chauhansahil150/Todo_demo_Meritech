import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
}

function Input({type}:InputProps) {
  return <input 
  className="border border-black p-1"
  type={type} name="" id="" />;
}

export default Input;
