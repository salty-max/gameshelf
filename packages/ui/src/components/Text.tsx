import clsx from "clsx"

const Text = ({ children, className, }: { children: React.ReactNode, className?: string }) => {
  const classes = {
    base: "text-3xl font-bold"
  }

  return (
    <h1 className={clsx(classes.base, className)}>{children}</h1>
  )
}

export default Text