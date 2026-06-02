export { default as FactGridHeader } from './FactGrid/FactGridHeader.js';
export { default as FactGridCell } from './FactGrid/FactGridCell.js';

import FactGrid from './FactGrid/FactGrid.js';
import FactGridCell from './FactGrid/FactGridCell.js';
import FactGridHeader from './FactGrid/FactGridHeader.js';

FactGrid.Header = FactGridHeader;
FactGrid.Cell = FactGridCell;

export { FactGrid as default, FactGrid };
