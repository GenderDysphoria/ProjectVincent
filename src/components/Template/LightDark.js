import Button from '#src/components/Button';
import ScriptAsset from '#src/components/ScriptAsset';
import SvgIcon from '#src/components/SvgIcon';

export default function LightDark () {
  return (
    <>
      <ScriptAsset src="light-dark.js" />
      <light-dark>
        <Button component="label" color={null} className="theme--light">
          <input type="radio" name="theme" value="light" className="hidden" aria-hidden="true" />
          <SvgIcon icon="sun" role="img" aria-label="Light Mode" size="md" className="icn--light" />
        </Button>
        <Button component="label" color={null} className="theme--dark">
          <input type="radio" name="theme" value="dark" className="hidden" aria-hidden="true" />
          <SvgIcon icon="moon" role="img" aria-label="Dark Mode" size="md" className="icn--dark" />
        </Button>
      </light-dark>
    </>
  );
}
