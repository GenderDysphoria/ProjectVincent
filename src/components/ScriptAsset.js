export default function ScriptAsset ({ src, ...props }) {
  const { BUILD_HASH } = this;

  return (
    <script src={`/static/${BUILD_HASH}/${src}`} {...props} />
  );
}
