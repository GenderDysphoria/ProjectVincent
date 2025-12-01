export default function ScriptAsset ({ src }) {
  const { BUILD_HASH } = this;

  return (
    <script src={`/static/${BUILD_HASH}/${src}`} />
  );
}
