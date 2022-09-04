import _styled from '@emotion/styled';
const styled = _styled.default;

const ImageBase = styled.img`
  max-width: 100%;
`;

export default function Image ({
  ...props
}) {
  return (
    <ImageBase {...props} />
  );
}
