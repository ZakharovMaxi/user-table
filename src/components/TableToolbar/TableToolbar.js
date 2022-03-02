import PropTypes from "prop-types";
// @mui
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
// icons
import DeleteIcon from "@mui/icons-material/Delete";
import Add from "@mui/icons-material/Add";
// utils
import {alpha} from "@mui/material/styles";

// ---------------------------------------------------------------------------------------------------------------------

TableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRemoveSelected: PropTypes.func.isRequired,
  onAddNew: PropTypes.func.isRequired
};

// ---------------------------------------------------------------------------------------------------------------------

export default function TableToolbar({ numSelected, onRemoveSelected, onAddNew }) {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} Выбрано
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Пользователи
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Удалить">
          <IconButton onClick={() => onRemoveSelected()}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Новый">
          <IconButton onClick={() => onAddNew()}>
            <Add/>
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

