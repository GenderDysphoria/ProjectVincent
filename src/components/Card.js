import {
  Card as CardRoot,
  CardContent,
  CardMedia,
  CardHeader,
} from '@mui/material';

export default function Card (props) {
  return <CardRoot {...props} />;
}

Card.Content = CardContent;
Card.Media = CardMedia;
Card.Header = CardHeader;
