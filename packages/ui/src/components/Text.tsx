import { VariantProps, cva } from "class-variance-authority";
import { cn } from "../utils";
import React from "react";

const textVariants = cva("", {
  variants: {
    variant: {
      default: "text-base",
      title: "text-3xl font-bold",
      subtitle: "text-2xl font-semibold",
      cardTitle: "text-xl font-semibold",
      destructive: "text-destructive",
      caption: "text-sm",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface TextProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof textVariants> {}

export const Text = React.forwardRef<HTMLHeadingElement, TextProps>(
  ({ variant, children, className, ...props }, ref) => {
    let Comp: keyof JSX.IntrinsicElements = "span";

    switch (variant) {
      case "title":
        Comp = "h1";
        break;
      case "subtitle":
        Comp = "h2";
        break;
      case "cardTitle":
        Comp = "h3";
        break;
      case "caption":
        Comp = "small";
        break;
      default:
        break;
    }

    return (
      <Comp
        ref={ref}
        className={cn(textVariants({ variant, className }))}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);
