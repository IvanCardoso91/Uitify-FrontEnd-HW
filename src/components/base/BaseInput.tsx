import { InputHTMLAttributes } from "react";

export default function BaseInput({
  className = "",
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`w-full rounded-full border border-gray-300 bg-gray-100
                  px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-500
                  shadow-sm transition focus:bg-white focus:border-blue-600
                  focus:ring-2 focus:ring-blue-600 ${className}`}
      {...props}
    />
  );
}
