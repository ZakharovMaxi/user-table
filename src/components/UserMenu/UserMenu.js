import PropTypes from "prop-types";
import {useState} from "react";
// @mui
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
// icons
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from "@mui/material/IconButton";
import {styled} from "@mui/material";

// --------------------------------------------------------------------------------------------------------------------

UserMenu.propTypes = {
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired
}

const MenuItemDelete = styled(MenuItem)(({theme}) => ({
  color: theme.palette.error.dark
}));

// ---------------------------------------------------------------------------------------------------------------------

export default function UserMenu({ onEdit, onDelete }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const isOpenMenu = Boolean(anchorEl);

  const onOpenMenu = (event) => setAnchorEl(event.currentTarget);
  const onCloseMenu = () => setAnchorEl(null);

  const handleMenuClick = (listener) => () => {
    listener();
    onCloseMenu();
  };

  return (
    <>
      <MenuIcon onClick={onOpenMenu} />
      <Menu
        anchorEl={anchorEl}
        open={isOpenMenu}
        onClose={onCloseMenu}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleMenuClick(onEdit)} dense>Редактировать</MenuItem>
        <MenuItemDelete onClick={handleMenuClick(onDelete)} dense>Удалить</MenuItemDelete>
      </Menu>
    </>
  )
}

// ---------------------------------------------------------------------------------------------------------------------

MenuIcon.propTypes = {
  onClick: PropTypes.func
}

function MenuIcon({ onClick }) {
  return (
    <IconButton onClick={onClick} size='small'>
      <MoreVertIcon fontSize='small'/>
    </IconButton>
  )
}


