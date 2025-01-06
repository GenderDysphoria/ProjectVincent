import clsx from 'clsx';

const CssPrefix = 'ui-template';
export default function Template ({
  component: Component = 'div',
  className,
  children,
  ...props
}) {
  const classes = clsx(
    className,
    CssPrefix
  );

  const { languages } = this;
  const lang = languages[this.metadata.lang];

  return (
    <Component {...props} className={classes}>
      <div className="ui-template-sidenav">
        <label for="ui-sidenav-language-list">{lang.name}</label>
        <input type="checkbox" id="ui-sidenav-language-list" />
        <ul className="ui-template-languages">
          {Object.values(languages).map((l) => (
            <li><a href={`/${l.lang}/`}>{l.menuName}</a></li>
          ))}
        </ul>
        <ul className="ui-template-index">
          {lang.pages.map((page) => (
            <li><a href={page.url}>{page.linkTitle}</a></li>
          ))}
        </ul>
      </div>
      <div className="ui-template-body">{children}</div>
    </Component>
  );
}
