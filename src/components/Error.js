import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Row from '#src/components/FlexRow';

export default function ErrorPage ({ error }) {
  return (
    <Row center grow sx={{ minHeight: '50%' }}>
      <Paper elevation={3} sx={{ p: 1, width: 400, margin: 'auto' }}>
        <Typography variant="h2" component="h2">An Error Has Occured</Typography>
        <Typography variant="code">{error.message}</Typography>
      </Paper>
    </Row>
  );
}

ErrorPage.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
};
