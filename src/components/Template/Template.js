import clsx from 'clsx';

import Article from '#src/components/Article';
import Button from '#src/components/Button';
import { FormattedMessage } from '#src/components/Intl';
import Pager from '#src/components/Pager/Pager';
import Paper from '#src/components/Paper';
import Stack from '#src/components/Stack';
import SvgIcon from '#src/components/SvgIcon';
import Text from '#src/components/Text';

import LightDark from './LightDark.js';
import Breakpoint from '../Breakpoint/Breakpoint.js';

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
        <div className="container">
          <Text component="h1" family="brand"><a href="/"><FormattedMessage id="SITE_TITLE" /></a></Text>

          <div class="spacer" />
          <ExtLinks />
          <LightDark />
          <Hamburger />
        </div>
      </div>
      <div className={`${CssPrefix}-topnav-filler`} />
      {false && <Breakpoint />}
      <div className={`${CssPrefix}-drawer`}>
        <ExtLinks />
        <Navigation />
      </div>
      <Component {...props} className={classes}>
        <div className={`${CssPrefix}-sidenav`}>
          <Navigation />
        </div>
        <Article className={`${CssPrefix}-body`}>
          {/* <pre><code>{JSON.stringify({ meta: this.metadata, lang }, null, 2)}</code></pre> */}
          {children}
          <Pager />
        </Article>
        <div className="ui-template-gutter-left" />
        <div className="ui-template-gutter-right" />
      </Component>
      <Footer />
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
      <ul className={`${CssPrefix}-index`}>
        <li className={key === 'fulltext' ? 'active' : null}><a href={`/${lang.lang}/fulltext`}><FormattedMessage id="FULL_TEXT" /></a></li>
        <li>
          <a href={`/${lang.lang}/gdb.pdf`}>
            <FormattedMessage id="PDF_DOWNLOAD" />
            <SvgIcon icon="pdf" />
          </a>
        </li>
      </ul>
      <ol className={`${CssPrefix}-index`}>
        {lang.pages.map((page) => (
          <li className={page.key === key ? 'active' : null}><a href={page.url}>{page.linkTitle}</a></li>
        ))}
      </ol>
    </nav>
  );
}

function ExtLinks () {
  return (
    <div class="ext-links">
      <Button className="link" color={null} target="_blank" rel="noreferrer" href="https://github.com/GenderDysphoria/GenderDysphoria.fyi" title="Github"><SvgIcon icon="github" role="img" aria-label="Github" size="md" /></Button>
      <Button className="link" color={null} target="_blank" rel="noreferrer" href="https://patreon.com/curvyandtrans" title="Patreon"><SvgIcon icon="patreon" role="img" aria-label="Patreon" size="md" /></Button>
      <Button className="link" color={null} target="_blank" rel="noreferrer" href="https://ko-fi.com/curvyandtrans" title="Ko-Fi"><SvgIcon icon="ko-fi" role="img" aria-label="Ko-fi" size="md" /></Button>
    </div>
  );
}

function Hamburger () {
  return (
    <div className={`${CssPrefix}-hamburger`}>
      <Button component="label" for={NAVCHECK_ID} color={null}>
        <SvgIcon icon="bars" role="img" aria-label="Menu Button" size="lg" />
      </Button>
    </div>
  );
}

function Footer () {
  const year = (new Date()).getFullYear();

  return (
    <footer className="footer">
      <p class="patreon">
        <FormattedMessage
          id="FOOTER_PATREON"
          values={{
            a: (...chunks) => <a href="https://www.patreon.com/curvyandtrans" target="_blank" rel="noreferrer">{chunks}</a>,
            b: (...chunks) => <a href="https://ko-fi.com/curvyandtrans" target="_blank" rel="noreferrer">{chunks}</a>,
          }}
        />
      </p>
      <p class="copyright">
        <FormattedMessage
          id="FOOTER_COPYRIGHT"
          values={{
            a: (...chunks) => <a href="https://creativecommons.org/licenses/by-nc-sa/2.0/" target="_blank" rel="noreferrer">{chunks}</a>,
          }}
        />
        <span class="cc-by-nc-sa">
          <SvgIcon icon="cc" />
          <SvgIcon icon="cc-by" />
          <SvgIcon icon="cc-nc" />
          <SvgIcon icon="cc-sa" />
        </span><br />&copy; {year} Twipped Media <FormattedMessage id="FOOTER_COPYRIGHT2" />
      </p>
      <p class="foot-nav"><a href="/privacy.html"><FormattedMessage id="FOOTER_PRIVACY_POLICY" /></a></p>
    </footer>
  );
}
