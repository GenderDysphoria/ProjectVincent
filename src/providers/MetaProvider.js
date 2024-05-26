
import { jsx, createContext } from 'essex';

const MetaContext = createContext('MetaContext', 'metadata');

export function MetaProvider ({
  metadata = {},
  children,
}) {
  function apply (metaprops) {
    Object.assign(metadata, metaprops);
  }

  return (
    jsx(MetaContext.Provider, {
      value: {
        apply,
        metadata,
      },
      children,
    })
  );
}

export function Meta (props) {
  this.metadata.apply(props);
  return null;
}
