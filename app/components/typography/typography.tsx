interface TypographyProps {
  children: React.ReactNode;
}
function H1({ children }: TypographyProps) {
  return (
    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
      {children}
    </h1>
  );
}

function H2({ children }: TypographyProps) {
  return (
    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
      {children}
    </h2>
  );
}

function H3({ children }: TypographyProps) {
  return (
    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
      {children}
    </h3>
  );
}

function H4({ children }: TypographyProps) {
  return (
    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
      {children}
    </h4>
  );
}

function P({ children }: TypographyProps) {
  return <p className="leading-7 [&:not(:first-child)]:mt-6">{children}</p>;
}

function Large({ children }: TypographyProps) {
  return <div className="text-lg font-semibold">{children}</div>;
}

function Small({ children }: TypographyProps) {
  return <small className="text-sm font-medium leading-none">{children}</small>;
}
export function Muted({ children }: TypographyProps) {
  return <p className="text-sm text-muted-foreground">{children}</p>;
}

export { H1, H2, H3, H4, P, Large, Small };
