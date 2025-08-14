import { HTMLAttributes, ReactNode } from "react";

type EmptyProps = HTMLAttributes<HTMLDivElement> & {
  title: string;
  description?: string;
  children?: ReactNode;
};

export default function BaseEmpty({
  title,
  description,
  children,
  className = "",
  ...rest
}: EmptyProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-gray-300 p-8 text-center dark:border-gray-700 ${className}`}
      {...rest}
    >
      <div className="text-base font-semibold">{title}</div>
      {description && (
        <p className="max-w-md text-sm text-gray-600 dark:text-gray-400">
          {description}
        </p>
      )}
      {children}
    </div>
  );
}
