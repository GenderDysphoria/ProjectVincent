import clsx from 'clsx';

import Button from '#src/components/Button';
import SvgIcon from '#src/components/SvgIcon';
import Text from '#src/components/Text';

const CssPrefix = 'ui-template';
const NAVCHECK_ID = `${CssPrefix}-show-nav`;
const LANG_DROPDOWN_ID = `${CssPrefix}-show-languages`;

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
    <>
      <input type="checkbox" id={NAVCHECK_ID} className="hidden" aria-hidden="true" />
      <div className={`${CssPrefix}-topnav`}>
        <Text component="h1" family="brand">The Gender Dysphoria Bible</Text>
        <div className={`${CssPrefix}-hamburger`}>
          <Button component="label" for={NAVCHECK_ID}>
            <SvgIcon viewBox="0 0 24 24" role="img" aria-label="Menu Button">
              <title>Menu</title>
              <desc>Three horizontal bars indicating a menu button</desc>
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
            </SvgIcon>
          </Button>
        </div>
      </div>
      <div className={`${CssPrefix}-drawer`}>
        <Navigation />
      </div>
      <Component {...props} className={classes}>
        <div className={`${CssPrefix}-sidenav`}>
          <Navigation />
        </div>
        <div className={`${CssPrefix}-body`}>{children}</div>
      </Component>
    </>
  );
}

function Navigation () {
  const { languages } = this;
  const lang = languages[this.metadata.lang];

  return (
    <nav className={`${CssPrefix}-navigation`}>
      <label for={LANG_DROPDOWN_ID}>{lang.name}</label>
      <input type="checkbox" id={LANG_DROPDOWN_ID} className="hidden" aria-hidden="true" />
      <ul className={`${CssPrefix}-languages`}>
        {Object.values(languages).map((l) => (
          <li><a href={`/${l.lang}/`}>{l.menuName}</a></li>
        ))}
      </ul>
      <ol className={`${CssPrefix}-index`}>
        {lang.pages.map((page) => (
          <li><a href={page.url}>{page.linkTitle}</a></li>
        ))}
      </ol>
    </nav>
  );
}
