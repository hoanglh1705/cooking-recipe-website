type Props = {
  name: string;
  filled?: boolean;
  className?: string;
  "aria-hidden"?: boolean;
};

export function Icon({ name, filled, className, ...rest }: Props) {
  const classes = [
    "material-symbols-outlined",
    filled ? "filled" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={classes} aria-hidden={rest["aria-hidden"] ?? true}>
      {name}
    </span>
  );
}
