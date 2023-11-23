import { Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon } from "@mui/material";
import { useState } from "react";
import logoImg from "../../assets/CAMPUSCORE.png";
import { LogoutSharp } from "@mui/icons-material";
import { Link } from "react-router-dom";


const Logout = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (isOpen) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    )
      return;
    setOpen(isOpen);
  };
  return (
    <section>
      <IconButton
        className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
        edge="end"
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer(true)}
      >
        <span className="absolute -inset-1.5"></span>
        <span className="sr-only">Open user menu</span>
        <img
          className="h-8 w-8 rounded-full"
          src={logoImg}
        />
      </IconButton>
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        <div
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <LogoutSharp/>
                </ListItemIcon>
                <Link to="logout">Logout</Link>
              </ListItemButton>
            </ListItem>
          </List>
        </div>
      </Drawer>
    </section>
  );
};

export default Logout;
