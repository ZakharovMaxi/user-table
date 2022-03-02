// hooks
import {useEffect, useState} from "react";
import {useApi} from "../../hooks";
// @mui
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
// utils
import {addArrayItemByIndex} from "../../utils";
// components
import UserTable from "../UserTable";

// ---------------------------------------------------------------------------------------------------------------------

let lastUserId = 10;

export default function Main() {
  const API = useApi();

  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers(API.getUsers());
  }, [API.getUsers]);

  const setUsersStateAndStorage = (users) => {
    API.setUsers(users);
    setUsers(users);
  };

  const onRemoveUser = (usersId) => {
    setUsersStateAndStorage(
      users.filter((user) => !usersId.includes(user.id))
    );
  };

  const onSetUser = (user) => {
    const idx = users.findIndex(({id}) => id === user.id);

    if (idx !== -1) setUsersStateAndStorage(
      addArrayItemByIndex(users, user, idx)
    );
    else setUsersStateAndStorage(
      users.concat({...user, id: lastUserId++ })
    );
  };

  return (
    <Container sx={{pt: 5}} component="main">
      <Paper sx={{ width: '100%' }}>
        <UserTable
          users={users}
          onSetUser={onSetUser}
          onRemoveUser={onRemoveUser}
        />
      </Paper>
    </Container>
  )
}


