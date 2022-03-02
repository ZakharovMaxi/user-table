import PropTypes from "prop-types";
// @mui
import Button  from "@mui/material/Button";
import Dialog  from "@mui/material/Dialog";
import DialogTitle  from "@mui/material/DialogTitle";
import DialogActions  from "@mui/material/DialogActions";
import DialogContent  from "@mui/material/DialogContent";
import DialogContentText  from "@mui/material/DialogContentText";

// ---------------------------------------------------------------------------------------------------------------------

Alert.propTypes = {
  open: PropTypes.bool,
  onAgree: PropTypes.func,
  onDisagree: PropTypes.func
};

// ---------------------------------------------------------------------------------------------------------------------

export default function Alert({ open, onAgree, onDisagree }) {
  return (
    <Dialog open={open} onClose={onDisagree}>
      <DialogTitle>
        Удаление
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Подтвердите удаление
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onAgree} autoFocus>Отмена</Button>
        <Button onClick={onDisagree}>Ок</Button>
      </DialogActions>
    </Dialog>
  )
}
