import {useState} from "react";
import PropTypes from "prop-types";
// @mui
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
// utils
import {removeSelectedItem, toggleSelectedItem} from "../../utils";
// components
import TableToolbar from "../TableToolbar";
import TableHeader from "../TableHeader";
import TableFooter from "../TableFooter";
import UserRow from "../UserRow";
import Modal from "../Modal";


// ---------------------------------------------------------------------------------------------------------------------

UserTable.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSetUser: PropTypes.func.isRequired,
  onRemoveUser: PropTypes.func.isRequired
};

// ---------------------------------------------------------------------------------------------------------------------

export default function UserTable(props) {
  const {users} = props;

  // state

  const [selected, setSelected] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [openModal, setOpenModal] = useState(false);
  const [editUser, setEditUser] = useState(null);

  const [openDialog, setOpenDialog] = useState(false);
  const [removeUsersId, setRemoveUsersId] = useState(null);

  // Selected Methods

  const onSelectAll = ({target}) => {
    target.checked ? setSelected(props.users.map((user) => user.id)) : setSelected([]);
  };

  const onRemoveSelected = () => {
    setRemoveUsersId(selected);
    setOpenDialog(true);
  };

  // User Methods

  const isSelectUser = (id) => selected.indexOf(id) !== -1;

  const onSelectUser = (id) => {
    setSelected(
      toggleSelectedItem(selected, id)
    );
  };

  const onRemoveUser = (id) => {
    setRemoveUsersId([id]);
    setOpenDialog(true);
  };

  const onSaveUser = (user) => {
    onCloseModal();
    props.onSetUser(user);
  };

  const removeUsers = () => {
    props.onRemoveUser(removeUsersId);

    if (removeUsersId === selected) {
      return setSelected([]);
    }

    const id = removeUsersId[0];

    if (selected.includes(id)) setSelected(
      removeSelectedItem(selected, id)
    )
  };

  // Modal Methods

  const onOpenModal = (user) => {
    if (user) setEditUser(user);
    setOpenModal(true);
  };

  const onCloseModal = () => {
    setEditUser(null);
    setOpenModal(false);
  };

  // Dialog Methods

  const closeDialog = () => {
    setOpenDialog(false);
    setRemoveUsersId(null);
  };

  const onAgreeRemove = () => {
    closeDialog();
    removeUsers();
  };

  const numSelected = selected.length;
  const numUsers = users.length;

  const showElements = [page * rowsPerPage, page * rowsPerPage + rowsPerPage];

  return (
    <>
      <TableContainer>
        <TableToolbar
          onAddNew={onOpenModal}
          numSelected={numSelected}
          onRemoveSelected={onRemoveSelected}
        />
        <Table sx={{ minWidth: 750 }} id='user-table'>
          <TableHeader
            rowCount={numUsers}
            numSelected={numSelected}
            onSelectAll={onSelectAll}
          />
          <TableBody>
            {numUsers ? (
              <UserRows
                users={users}
                onEditUser={onOpenModal}
                showElements={showElements}
                onRemoveUser={onRemoveUser}
                onSelectUser={onSelectUser}
                isSelectUser={isSelectUser}
              />
            ) : <EmptyTableRow />}
          </TableBody>
          <TableFooter
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            paginationCount={numUsers}
          />
        </Table>
      </TableContainer>
      <Modal
        open={openModal}
        editItem={editUser}
        onSave={onSaveUser}
        onClose={onCloseModal}
      />
      <Dialog open={openDialog} onClose={closeDialog}>
        <DialogContent>
          {
            removeUsersId?.length > 1 ?
              "Удалить выбранных пользователей ?" :
              "Удалить выбранного пользователя ?"
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} autoFocus>Отмена</Button>
          <Button onClick={onAgreeRemove}>Удалить</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

// ---------------------------------------------------------------------------------------------------------------------

UserRows.propTypes = {
  users: PropTypes.array,
  showElements: PropTypes.arrayOf(PropTypes.number),
  onEditUser: PropTypes.func,
  onRemoveUser: PropTypes.func,
  onSelectUser: PropTypes.func,
  isSelectUser: PropTypes.func
};

function UserRows({ users, showElements, ...eventProps}) {
  return users
    .slice(...showElements)
    .map((user) => <UserRow key={user.id} user={user} {...eventProps} />);
}

function EmptyTableRow() {
  return (
    <TableRow>
      <TableCell colSpan="1000" align="center" sx={{color: 'gray'}}>Пусто</TableCell>
    </TableRow>
  )
}
