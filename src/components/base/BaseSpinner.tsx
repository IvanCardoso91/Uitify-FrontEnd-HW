import { HTMLAttributes } from "react";

type SpinnerProps = HTMLAttributes<HTMLDivElement> & {
  size?: number;
  label?: string;
};

export default function BaseSpinner({
  size = 20,
  label = "Loading…",
  className = "",
  ...rest
}: SpinnerProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`inline-flex items-center gap-2 ${className}`}
      {...rest}
    >
      <span
        className="inline-block animate-spin rounded-full border-2 border-gray-300 border-t-gray-900 dark:border-gray-700 dark:border-t-white"
        style={{ width: size, height: size }}
      />
      <span className="sr-only">{label}</span>
    </div>
  );
}
