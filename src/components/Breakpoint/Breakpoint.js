const CssPrefix = 'ui-breakpoint';
export default function Breakpoint ({
  className,
  ...props
}) {
  return (
    <div className={CssPrefix}>
      <span className="xs">xs</span>
      <span className="sm">sm</span>
      <span className="md">md</span>
      <span className="lg">lg</span>
      <span className="xl">xl</span>
    </div>
  );
}
