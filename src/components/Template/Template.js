import clsx from 'clsx';

import Article from '#src/components/Article';
import Button from '#src/components/Button';
import Paper from '#src/components/Paper';
import SvgIcon from '#src/components/SvgIcon';
import Text from '#src/components/Text';

import LightDark from './LightDark.js';

const CssPrefix = 'ui-template';
const NAVCHECK_ID = `${CssPrefix}-show-nav`;
const LANG_DROPDOWN_ID = `${CssPrefix}--show-languages`;

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

  return (
    <>
      <input type="checkbox" id={NAVCHECK_ID} className="hidden" aria-hidden="true" />
      <div className={`${CssPrefix}-topnav`}>
        <Text component="h1" family="brand" size="2xl">The Gender Dysphoria Bible</Text>
        <LightDark />
        <Hamburger />
      </div>
      <div className={`${CssPrefix}-drawer`}>
        <Navigation />
      </div>
      <Component {...props} className={classes}>
        <div className={`${CssPrefix}-sidenav`}>
          <Navigation />
        </div>
        <Article className={`${CssPrefix}-body`}>
          {/* <pre><code>{JSON.stringify({ meta: this.metadata, lang }, null, 2)}</code></pre> */}
          {children}
        </Article>
        <div className="ui-template-gutter-left" />
        <div className="ui-template-gutter-right" />
      </Component>
    </>
  );
}

function Navigation () {
  const { languages } = this;
  const lang = languages[this.metadata.lang];
  const { key } = this.metadata;
  return (
    <nav className={`${CssPrefix}-navigation`}>
      <div className={`${CssPrefix}-lang`}>

        <Button
          component="label"
          className={`${CssPrefix}-language`}
          variant="text"
          color={null}
          fullWidth
          square
        >
          {lang.name}
          <input
            type="checkbox"
            className={`${LANG_DROPDOWN_ID} hidden`}
            id={LANG_DROPDOWN_ID}
            aria-hidden="true"
          />
        </Button>
        <Paper component="ul" className={`${CssPrefix}-languages`} elevation={5} surface={1}>
          {Object.values(languages).map((l) => (
            <li><a href={l.keyed[key]?.url ?? l.pages[0].url}>{l.menuName}</a></li>
          ))}
        </Paper>
      </div>
      <ol className={`${CssPrefix}-index`}>
        {lang.pages.map((page) => (
          <li className={page.key === key ? 'active' : null}><a href={page.url}>{page.linkTitle}</a></li>
        ))}
      </ol>
    </nav>
  );
}

function Hamburger () {
  return (
    <div className={`${CssPrefix}-hamburger`}>
      <Button component="label" for={NAVCHECK_ID} color={null}>
        <SvgIcon viewBox="0 0 24 24" role="img" aria-label="Menu Button" size="lg">
          <title>Menu</title>
          <desc>Three horizontal bars indicating a menu button</desc>
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" fill="currentColor" />
        </SvgIcon>
      </Button>
    </div>
  );
}
