import React from "react";
import { Slot } from "./Slot";
import { cn } from "../utils";

interface TooltipContextType {
  position: {
    x: number;
    y: number;
  } | null;
  setPosition: React.Dispatch<
    React.SetStateAction<TooltipContextType["position"]>
  >;
}

const TooltipContext = React.createContext<TooltipContextType>({
  position: null,
  setPosition: () => {},
});

const useTooltip = () => React.useContext(TooltipContext);

export const Tooltip = ({ children }: { children: React.ReactNode }) => {
  const [position, setPosition] =
    React.useState<TooltipContextType["position"]>(null);
  return (
    <TooltipContext.Provider value={{ position, setPosition }}>
      {children}
    </TooltipContext.Provider>
  );
};

export interface TooltipTriggerProps {
  asChild?: boolean;
  children?: React.ReactNode;
}

export const TooltipTrigger = React.forwardRef<
  HTMLElement,
  TooltipTriggerProps
>(({ asChild, children }, ref) => {
  const { setPosition } = useTooltip();

  const handleMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    setPosition({ x: bounds.x, y: bounds.y + bounds.height });
  };

  const handleMouseLeave = () => {
    setPosition(null);
  };

  const anchorProps = {
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    className: "cursor-help",
  };

  if (asChild) {
    return (
      <Slot ref={ref} {...anchorProps}>
        {children}
      </Slot>
    );
  } else {
    return (
      <span ref={ref} {...anchorProps}>
        {children}
      </span>
    );
  }
});

export interface TooltipContentProps {
  children?: React.ReactNode;
  className?: string;
}

export const TooltipContent = React.forwardRef<
  HTMLDivElement,
  TooltipContentProps
>(({ children, className }, ref) => {
  const { position } = useTooltip();
  if (!position) return null;
  return (
    <div
      style={{
        left: position.x,
        top: position.y,
      }}
      className='fixed pt-1'
    >
      <div
        ref={ref}
        className={cn(
          "bg-primary text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 z-50 overflow-hidden rounded-md px-3 py-1.5 text-xs",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
});
