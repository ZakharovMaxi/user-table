import PropTypes from "prop-types";
// hooks
import {useEffect, useState} from "react";
import {useApi} from "../../hooks";
// components
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";

// ---------------------------------------------------------------------------------------------------------------------

Modal.propTypes = {
  open: PropTypes.bool,
  editItem: PropTypes.object,
  onSave: PropTypes.func,
  onClose: PropTypes.func
};

const maxWidthForm = 400;

const fields = {
  id: "id",
  email: "email",
  lastName: "lastName",
  firstName: "firstName",
  middleName: "middleName",
  organisation: "organisationId"
}

const initialUser = {
  [fields.id]: null,
  [fields.email]: "",
  [fields.lastName]: "",
  [fields.firstName]: "",
  [fields.middleName]: "",
  [fields.organisation]: ""
};

// ---------------------------------------------------------------------------------------------------------------------

export default function Modal({ open, editItem, onClose, onSave }) {
  const organisations = useApi().getOrganisations();

  const [user, setUser] = useState(initialUser);

  useEffect(() => {
    setUser(editItem || initialUser);
  }, [open]);

  const onSubmit = (event) => {
    event.preventDefault();
    onSave(user);
  };

  const onChangeField = ({target: field}) => {
    setUser((user) => ({ ...user, [field.name]: field.value }));
  };

  const getFieldProps = (field) => {
    return {
      name: field,
      value: user[field],
      onChange: onChangeField,
      fullWidth: true
    }
  };

  const title = editItem ? 'Редактирование пользователя' : 'Новый пользователь';

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <Box component="form" width={maxWidthForm} onSubmit={onSubmit}>
        <DialogContent sx={{'& > div': { my: 2 }, py: 0}}>
          <Box>
            <TextField
              label="Фамилия"
              required
              {...getFieldProps(fields.firstName)}
            />
          </Box>
          <Box>
            <TextField
              label="Имя"
              required
              {...getFieldProps(fields.lastName)}
            />
          </Box>
          <Box>
            <TextField
              label="Отчество"
              {...getFieldProps(fields.middleName)}
            />
          </Box>
          <Box>
            <OrganisationsSelect
              label="Организация"
              organisations={organisations}
              {...getFieldProps(fields.organisation)}
            />
          </Box>
          <Box>
            <TextField
              label="E-mail"
              required
              {...getFieldProps(fields.email)}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button type="button" onClick={onClose}>Отменить</Button>
          <Button type="submit">Сохранить</Button>
        </DialogActions>
      </Box>
    </Dialog>
  )
}

// ---------------------------------------------------------------------------------------------------------------------

function OrganisationsSelect({organisations, ...props}) {
  return (
    <FormControl fullWidth required>
      <InputLabel>Организация</InputLabel>
      <Select {...props}>
        {organisations.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {`${item.fullName} (${item.shortName})`}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
