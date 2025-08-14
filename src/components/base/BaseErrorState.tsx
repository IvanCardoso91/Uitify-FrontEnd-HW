import { HTMLAttributes } from "react";
import BaseButton from "./BaseButton";

type ErrorStateProps = HTMLAttributes<HTMLDivElement> & {
  message?: string;
  onRetry?: () => void;
};

export default function BaseErrorState({
  message = "Something went wrong.",
  onRetry,
  className = "",
  ...rest
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className={`flex flex-col items-center justify-center gap-3 rounded-2xl border border-red-200 bg-red-50 p-6 text-center dark:border-red-900/40 dark:bg-red-950/40 ${className}`}
      {...rest}
    >
      <div className="text-sm font-semibold text-red-800 dark:text-red-200">
        {message}
      </div>
      {onRetry && (
        <BaseButton onClick={onRetry} className="bg-red-700 hover:bg-red-800">
          Try again
        </BaseButton>
      )}
    </div>
  );
}
