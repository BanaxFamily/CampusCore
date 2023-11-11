import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';
import { IconButton } from "@mui/material";
import { useState } from "react";
import { BiMenu } from "react-icons/bi";
import { Link } from "react-router-dom";
import { adminLinks } from "../../constants";

export default function TemporaryDrawer() {
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
        edge="end"
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer(true)}
      >
        <BiMenu/>
      </IconButton>
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <div
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {adminLinks.map((route, index) => (
              <ListItem key={index}>
                <ListItemButton>
                  <ListItemIcon>
                    {route.icon}
                  </ListItemIcon>
                  <Link to={route.link}>{route.title}</Link>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </section>
  );
}
