import PropTypes from "prop-types";
// @mui
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Checkbox from "@mui/material/Checkbox";

// ---------------------------------------------------------------------------------------------------------------------

TableHeader.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onSelectAll: PropTypes.func.isRequired,
  rowCount: PropTypes.number.isRequired
};

const headers = [
  createHead('user', 'Пользователь'),
  createHead('organisation', 'Организация'),
  createHead('email', 'E-Mail'),
  createHead('menu')
];

// ---------------------------------------------------------------------------------------------------------------------

export default function TableHeader(props) {
  const {onSelectAll, numSelected, rowCount} = props;

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAll}
          />
        </TableCell>
        <TableHeadCells headers={headers} />
      </TableRow>
    </TableHead>
  );
};

// ---------------------------------------------------------------------------------------------------------------------

function TableHeadCells({headers}) {
  return headers.map(({id, label}) => (
    <TableCell key={id}>
      {label}
    </TableCell>
  ));
}

// ---------------------------------------------------------------------------------------------------------------------

function createHead(id, label) {
  return { id, label };
}

