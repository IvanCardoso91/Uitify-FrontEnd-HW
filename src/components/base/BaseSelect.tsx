import { useEffect, useRef, useState } from "react";

type Option = { label: string; value: string };

type Props = {
  value: string;
  options: Option[];
  placeholder?: string;
  onChangeValue: (v: string) => void;
  className?: string;
};

export default function BaseSelect({
  value,
  options,
  onChangeValue,
  placeholder = "Select…",
  className = "",
}: Props) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (
        !btnRef.current?.contains(e.target as Node) &&
        !menuRef.current?.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  const selected = options.find((option) => option.value === value);

  return (
    <div className={`relative ${className}`}>
      {/* Trigger */}
      <button
        ref={btnRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={`w-full rounded-full border border-gray-300 bg-gray-100
                    px-4 py-2.5 text-sm text-gray-900 shadow-sm
                    focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600
                    inline-flex items-center justify-between gap-2 cursor-pointer`}
      >
        <span className={selected ? "" : "text-gray-500"}>
          {selected ? selected.label : placeholder}
        </span>

        {/* caret with rotation */}
        <svg
          className={`h-4 w-4 transition-transform ${
            open ? "rotate-180" : "rotate-0"
          }`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Dropdown */}
      <div
        ref={menuRef}
        role="listbox"
        className={`absolute left-0 right-0 z-50 mt-1 origin-top rounded-xl border border-gray-300 bg-white shadow-xl
              transition transform ${
                open
                  ? "scale-100 opacity-100"
                  : "pointer-events-none scale-95 opacity-0"
              }`}
      >
        <div className="max-h-64 overflow-y-auto overscroll-contain py-1">
          {options.map((option) => {
            const active = option.value === value;
            return (
              <button
                key={option.value}
                role="option"
                aria-selected={active}
                className={`block w-full text-left px-3 py-2 text-sm
                      ${
                        active
                          ? "bg-blue-50 text-blue-700"
                          : "text-gray-900 hover:bg-gray-100"
                      }`}
                onClick={() => {
                  onChangeValue(option.value);
                  setOpen(false);
                }}
              >
                {option.label}
              </button>
            );
          })}
          {options.length === 0 && (
            <div className="px-3 py-2 text-sm text-gray-500">No options</div>
          )}
        </div>
      </div>
    </div>
  );
}
