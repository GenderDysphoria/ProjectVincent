import clsx from 'clsx';

import Slot from '#src/components/Slot';
import Stack from '#src/components/Stack';
import Text from '#src/components/Text';

const CssPrefix = 'ui-card-header';
export default function CardHeader ({
  component: Component = 'div',
  action,
  avatar,
  title,
  subtitle,
  slots,
  slotProps,
  className,
  children,
  ...props
}) {
  const classes = clsx(
    className,
    CssPrefix
  );

  const titleSlot = slots.title || <Text component="h3" size="md" weight="medium" />;
  const subtitleSlot = slots.subtitle || <Text color="secondary" size="sm" />;
  const contentSlot = slots.content || <Stack direction="column" justify="around" />;

  return (
    <Component
      {...props}
      className={classes}
    >
      {slots.avatar && <Slot className="ui-card-header-avatar" component={slots.avatar} props={slotProps.avatar} />}
      {(title || subtitle || children) && (
        <Slot className="ui-card-header-content" component={contentSlot} props={slotProps.content}>
          {title && <Slot component={titleSlot} className="ui-card-header-title" props={slotProps.title}>{title}</Slot>}
          {subtitle && <Slot component={subtitleSlot} className="ui-card-header-subtitle" props={slotProps.subtitle}>{subtitle}</Slot>}
          {children}
        </Slot>
      )}
      {action && <Slot className="ui-card-header-action" component={slots.action} props={slotProps.action}>{action}</Slot>}
    </Component>
  );
}
