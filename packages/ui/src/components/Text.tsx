import { VariantProps, cva } from "class-variance-authority";
import { cn } from "../utils";

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
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof textVariants> {}

export const Text = ({ variant, children, className, ...props }: TextProps) => {
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
    <Comp className={cn(textVariants({ variant, className }))} {...props}>
      {children}
    </Comp>
  );
};
