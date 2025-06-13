// Elegant, accessible Switch component (shadcn/ui style)
import * as React from "react"
import { Leaf } from "lucide-react";

export interface SwitchProps extends React.ComponentPropsWithoutRef<"button"> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ checked = false, onCheckedChange, disabled, className, ...props }, ref) => {
    return (
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        ref={ref}
        tabIndex={0}
        className={[
          "relative inline-flex items-center w-10 h-6 p-0.5 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2",
          checked ? "bg-green-500/80" : "bg-pepper-800/60",
          disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
          className || ""
        ].join(" ")}
        onClick={() => !disabled && onCheckedChange && onCheckedChange(!checked)}
        {...props}
      >
        <span
          className={[
            "inline-flex items-center justify-center h-5 w-5 rounded-full transition-transform duration-200",
            checked ? "translate-x-4" : "translate-x-0"
          ].join(" ")}
          style={{ background: "transparent" }}
        >
          <Leaf className={checked ? "text-green-900" : "text-pepper-600"} size={18} strokeWidth={2.2} />
        </span>
      </button>
    );
  }
);
Switch.displayName = "Switch";

export { Switch }
