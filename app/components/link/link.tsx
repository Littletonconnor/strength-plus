import { Link as RemixLink } from "@remix-run/react";

import { Button, ButtonProps } from "~/components/button/button";

type LinkProps = Pick<
  React.ComponentProps<typeof RemixLink>,
  "to" | "children"
> &
  Omit<ButtonProps, "variant" | "asChild">;

export function Link({ to, children, ...props }: LinkProps) {
  return (
    <Button asChild variant="link" {...props}>
      <RemixLink to={to}>{children}</RemixLink>
    </Button>
  );
}
