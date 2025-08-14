import { ReactNode, HTMLAttributes } from "react";

type SlideOverProps = HTMLAttributes<HTMLElement> & {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
};

export default function BaseSlideOver({
  open,
  onClose,
  title,
  children,
  className = "",
  ...rest
}: SlideOverProps) {
  return (
    <div
      className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity ${
          open ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={title ?? "Details panel"}
        className={`absolute right-0 top-0 h-full w-full max-w-md
          bg-gray-100 text-gray-900 shadow-xl transition-transform
          ${open ? "translate-x-0" : "translate-x-full"} ${className}`}
        {...rest}
      >
        {(title || onClose) && (
          <header
            className="sticky top-0 z-10 flex items-center justify-between
                       border-b border-gray-300 bg-gray-200 p-4 text-gray-900"
          >
            <h2 className="text-sm font-semibold">{title}</h2>
            <button
              onClick={onClose}
              className="rounded-lg p-2 text-gray-700 hover:bg-gray-300 focus:outline-none"
              aria-label="Close panel"
            >
              ✕
            </button>
          </header>
        )}
        <div className="p-5">{children}</div>
      </aside>
    </div>
  );
}
