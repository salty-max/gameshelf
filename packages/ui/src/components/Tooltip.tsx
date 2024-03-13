import React, { useMemo } from "react";
import usePortal from "../hooks/usePortal";
import { cn } from "../utils";

export interface TooltipProps extends React.HTMLAttributes<HTMLElement> {
  content: string;
  isHint?: boolean;
}

export const Tooltip = ({
  content,
  children,
  className,
  isHint,
  ...props
}: TooltipProps) => {
  // Position of the bottom edge of the anchor element.
  // Doubles as isVisible state: null means hidden.
  const [position, setPosition] = React.useState<{
    x: number;
    y: number;
  } | null>(null);

  const Portal = usePortal();

  const isInBottomHalf = useMemo(() => {
    if (!position) return false;
    return position.y > window.innerHeight / 2;
  }, [position]);

  const isInLeftHalf = useMemo(() => {
    if (!position) return false;
    return position.x > window.innerWidth / 2;
  }, [position]);

  const handleMouseOver = (event: React.MouseEvent<HTMLElement>) => {
    // Place the tooltip near the anchor's bottom edge.
    const bounds = event.currentTarget.getBoundingClientRect();
    setPosition({
      x: Math.floor(bounds.x + bounds.width / 2),
      y: Math.floor(bounds.y + bounds.height),
    });
  };

  const handleMouseOut = () => setPosition(null);

  const anchorProps = {
    onMouseEnter: handleMouseOver,
    onMouseLeave: handleMouseOut,
    className: isHint ? "cursor-help" : "",
  };

  // Clones the child element to remove the div wrapper around it.
  // Child node nust accept or forward mouse events.
  const anchor = React.isValidElement(children) ? (
    React.cloneElement(children, anchorProps)
  ) : (
    <span {...anchorProps}>{children}</span>
  );

  const wrapperStyles = useMemo(
    () =>
      position
        ? {
            left: !isInLeftHalf ? position.x : undefined,
            right: isInLeftHalf ? position.x : undefined,
            top: !isInBottomHalf ? position.y : undefined,
            bottom: isInBottomHalf ? position.y : undefined,
            paddingTop: !isInBottomHalf ? ".25rem" : undefined,
            paddingBottom: isInBottomHalf ? ".25rem" : undefined,
          }
        : {},
    [position, isInBottomHalf, isInLeftHalf]
  );

  // Render the tooltip into the body using a Portal.
  // To place it near the trigger, we use the position from the event.
  // The position is "fixed" so it won't be affected by overflox rules.
  return (
    <>
      {anchor}
      <Portal>
        <div style={wrapperStyles} className='fixed'>
          <div
            className={cn(
              "bg-primary text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 overflow-hidden rounded-md px-3 py-1.5 text-xs",
              className
            )}
            {...props}
          >
            {content}
          </div>
        </div>
      </Portal>
    </>
  );
};
