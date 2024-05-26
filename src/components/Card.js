
import { styled } from 'essex-emotion';
import Image from './Image.js';

const CardRoot = styled('div')(({ theme }) => ({

}));

const CardContent = styled('div')(({ theme }) => ({

}));

const CardMedia = styled(Image)(({ theme }) => ({

}));

const CardHeader = styled('div')(({ theme }) => ({

}));

export default function Card (props) {
  return <CardRoot {...props} />;
}

Card.Content = CardContent;
Card.Media = CardMedia;
Card.Header = CardHeader;
