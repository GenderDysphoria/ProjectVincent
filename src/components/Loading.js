import CircularProgress from '@mui/material/CircularProgress';
import Row from '#src/components/FlexRow';

export default function LoadingPage () {
  return (
    <Row center grow sx={{ minHeight: '50%' }}>
      <CircularProgress size={100} />
    </Row>
  );
}

