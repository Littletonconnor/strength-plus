import { Link as RemixLink } from "@remix-run/react";

import { Button, ButtonProps } from "~/components/button/button";

type LinkProps = Pick<
  React.ComponentProps<typeof RemixLink>,
  "to" | "children"
> &
  ButtonProps;

export function Link({ to, children, variant = "link", ...props }: LinkProps) {
  return (
    <Button asChild variant={variant} {...props}>
      <RemixLink to={to}>{children}</RemixLink>
    </Button>
  );
}
