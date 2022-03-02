import PropTypes from "prop-types";
// @mui
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Checkbox from "@mui/material/Checkbox";
// components
import UserMenu from "../UserMenu";

// ---------------------------------------------------------------------------------------------------------------------

UserRow.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    middleName: PropTypes.string,
    organisationId: PropTypes.number,
    email: PropTypes.string
  }),
  organisation: PropTypes.shape({
    id: PropTypes.number,
    fullName: PropTypes.string,
    shortName: PropTypes.string
  }),
  onSelectUser: PropTypes.func,
  onRemoveUser: PropTypes.func,
  onEditUser: PropTypes.func,
  isSelectedUser: PropTypes.func
}

// ---------------------------------------------------------------------------------------------------------------------

export default function UserRow(props) {
  const {user, organisation, onSelectUser, onEditUser, onRemoveUser, isSelectUser} = props;

  const handleClick = ({target}) => {
    if ((target.tagName === 'TD' || target.tagName === 'INPUT') && target.closest('#user-table')) {
      onSelectUser(user.id);
    }
  };

  const isSelected = isSelectUser(user.id);

  return (
    <TableRow
      hover
      onClick={handleClick}
      role="checkbox"
      aria-checked={isSelected}
      tabIndex={-1}
      selected={isSelected}
    >
      <TableCell padding="checkbox">
        <Checkbox color="primary" checked={isSelected} />
      </TableCell>
      <TableCell>
        { `${user.firstName} ${user.lastName} ${user.middleName}` }
      </TableCell>
      <TableCell>
        { organisation.shortName }
      </TableCell>
      <TableCell>
        { user.email }
      </TableCell>
      <TableCell padding="none">
        <UserMenu
          onDelete={() => onRemoveUser(user.id)}
          onEdit={() => onEditUser(user)}
        />
      </TableCell>
    </TableRow>
  );
}
