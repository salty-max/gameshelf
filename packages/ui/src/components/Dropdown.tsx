import React, { Dispatch, SetStateAction } from "react";
import { Slot } from "./Slot";
import { Button } from "..";
import { cn } from "../utils";
import { ButtonProps } from "./Button";
import usePortal from "../hooks/usePortal";
import { Icon } from "./Icon";

type Position = { x: number; y: number } | null;

interface DropdownContextType {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  position: Position;
  setPosition: React.Dispatch<React.SetStateAction<Position>>;
}

const DropdownContext = React.createContext<DropdownContextType>({
  isOpen: false,
  setIsOpen: () => {},
  position: null,
  setPosition: () => {},
});

const useDropdown = () => React.useContext(DropdownContext);

export const Dropdown = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [position, setPosition] = React.useState<Position>(null);
  return (
    <DropdownContext.Provider
      value={{ isOpen, setIsOpen, position, setPosition }}
    >
      {children}
    </DropdownContext.Provider>
  );
};

export interface DropdownTriggerProps {
  asChild?: boolean;
  children?: React.ReactNode;
}

export const DropdownTrigger: React.FC<DropdownTriggerProps> = React.forwardRef<
  HTMLButtonElement,
  DropdownTriggerProps
>(({ asChild, children }, ref) => {
  const { isOpen, setIsOpen, setPosition } = useDropdown();

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    if (isOpen) {
      setIsOpen(false);
      setPosition(null);
    } else {
      setIsOpen(true);
      setPosition({ x: bounds.x, y: bounds.y + bounds.height });
    }
  };

  const anchorProps: Partial<ButtonProps> = {
    onClick: handleToggle,
    icon: isOpen ? "ChevronUp" : "ChevronDown",
    iconPosition: "right",
  };

  if (asChild) {
    return (
      <Slot ref={ref} {...anchorProps}>
        {children}
      </Slot>
    );
  }

  return (
    <Button ref={ref} {...anchorProps}>
      {children}
    </Button>
  );
});

export interface DropdownContentProps
  extends React.HTMLAttributes<HTMLUListElement> {
  sideOffset?: number;
}

export const DropdownContent = React.forwardRef<
  HTMLUListElement,
  DropdownContentProps
>(({ children, className, sideOffset = 0, ...props }, ref) => {
  const Portal = usePortal();
  const { isOpen, position } = useDropdown();
  if (!position) return null;

  return (
    <Portal>
      <div
        style={{
          left: position.x + sideOffset,
          top: position.y,
        }}
        className='fixed pt-1'
      >
        <ul
          ref={ref}
          data-state={isOpen ? "open" : "closed"}
          className={cn(
            "bg-popover text-popover-foreground z-50 min-w-32 overflow-hidden rounded-md border p-1 shadow-md",
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 slide-in-from-top-2",
            className
          )}
          {...props}
        >
          {children}
        </ul>
      </div>
    </Portal>
  );
});

export interface DropdownItemProps extends React.HTMLAttributes<HTMLLIElement> {
  icon?: string;
}

export const DropdownItem = React.forwardRef<HTMLLIElement, DropdownItemProps>(
  ({ children, className, icon, onClick, ...props }, ref) => {
    const { setIsOpen, setPosition } = useDropdown();

    const handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
      setIsOpen(false);
      setPosition(null);
      if (onClick) {
        onClick(e);
      }
    };

    return (
      <li
        ref={ref}
        onClick={handleClick}
        className={cn(
          "focus:bg-accent focus:text-accent-foreground hover:bg-accent hover:text-accent-foreground relative flex cursor-pointer select-none items-center gap-1.5 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
          className
        )}
        {...props}
      >
        {icon && <Icon name={icon} size={16} />}
        {children}
      </li>
    );
  }
);

export interface DropdownCheckboxItemProps
  extends React.HTMLAttributes<HTMLLIElement> {
  checked: boolean;
  disabled?: boolean;
  onCheckedChange: Dispatch<SetStateAction<boolean>>;
}

export const DropdownCheckboxItem = React.forwardRef<
  HTMLLIElement,
  DropdownCheckboxItemProps
>(
  (
    { children, className, checked, disabled, onCheckedChange, ...props },
    ref
  ) => {
    const { setIsOpen, setPosition } = useDropdown();

    const handleClick = () => {
      setIsOpen(false);
      setPosition(null);
      onCheckedChange(!checked);
    };

    return (
      <li
        data-disabled={disabled}
        ref={ref}
        className={cn(
          "focus:bg-accent focus:text-accent-foreground hover:bg-accent hover:text-accent-foreground relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
          className
        )}
        onClick={handleClick}
        {...props}
      >
        <div className='absolute left-2 flex size-3.5 items-center justify-center'>
          {checked && <Icon name='Check' size={16} />}
        </div>
        {children}
      </li>
    );
  }
);
