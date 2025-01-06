export { default as CardActionArea } from './Card/CardActionArea.js';
export { default as CardActions } from './Card/CardActions.js';
export { default as CardContent } from './Card/CardContent.js';
export { default as CardHeader } from './Card/CardHeader.js';
export { default as CardMedia } from './Card/CardMedia.js';

import Card from './Card/Card.js';
import CardActionArea from './Card/CardActionArea.js';
import CardActions from './Card/CardActions.js';
import CardContent from './Card/CardContent.js';
import CardHeader from './Card/CardHeader.js';
import CardMedia from './Card/CardMedia.js';

Card.ActionArea = CardActionArea;
Card.Actions = CardActions;
Card.Content = CardContent;
Card.Header = CardHeader;
Card.Media = CardMedia;

export { Card };
