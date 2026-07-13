import clsx from 'clsx';

import Button from '#src/components/Button';
import SvgIcon from '#src/components/SvgIcon';

const CssPrefix = 'ui-pager';
export default function Paper ({
  component: Component = 'div',
  className,
  ...props
}) {
  const classes = clsx(
    className,
    CssPrefix
  );

  const next = this.metadata.next && this.pages[this.metadata.next];
  const prev = this.metadata.previous && this.pages[this.metadata.previous];

  return (
    <Component className={classes}>
      {prev
        ? (
        <Button variant="contained" color="primary" size="sm" href={prev.url} className="prev">
          <SvgIcon icon="angle-left" />
          {prev.linkTitle}
        </Button>
          )
        : (
        <div />
          )}
      {next && (
        <Button variant="contained" color="primary" size="sm" href={next.url} className="next">
          {next.linkTitle}
          <SvgIcon icon="angle-right" />
        </Button>
      )}
    </Component>
  );
}
