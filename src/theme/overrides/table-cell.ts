import palette from '../palette.theme'
import typography from '../typography.theme';

const tableCell = {
  root: {
    ...typography.body,
    borderBottom: `1px solid ${ palette.divider }`
  }
};

export default tableCell;
