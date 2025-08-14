import { ButtonHTMLAttributes } from "react";

export default function BaseButton({
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`inline-flex cursor-pointer items-center justify-center rounded-xl px-3.5 py-2.5 text-sm font-medium shadow-sm bg-gray-900 text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      {...props}
    />
  );
}
