import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import { IconButton } from "@mui/material";
import { useState } from "react";
import { BiMenu } from "react-icons/bi";
import { Link } from "react-router-dom";
import { adminLinks, deanLink, facultyLinks, studentLinks } from "../../constants";
import { useAuth } from "../../utils/AuthContext";
import { Logout } from "@mui/icons-material";

export default function TemporaryDrawer() {
  const { userRole, logOutUser } = useAuth()
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
        <BiMenu />
      </IconButton>
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <div
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {userRole === "Student" &&
              studentLinks.map((route, index) => (
                <ListItem key={index}>
                  <ListItemButton>
                    <ListItemIcon>
                      {route.icon}
                    </ListItemIcon>
                    <Link to={route.link}>{route.title}</Link>
                  </ListItemButton>
                </ListItem>
              ))}

            {userRole === "Admin" &&
              adminLinks.map((route, index) => (
                <ListItem key={index}>
                  <ListItemButton>
                    <ListItemIcon>
                      {route.icon}
                    </ListItemIcon>
                    <Link to={route.link}>{route.title}</Link>
                  </ListItemButton>
                </ListItem>
              ))}

            {userRole === "Dean" &&
              deanLink.map((route, index) => (
                <ListItem key={index}>
                  <ListItemButton>
                    <ListItemIcon>
                      {route.icon}
                    </ListItemIcon>
                    <Link to={route.link}>{route.title}</Link>
                  </ListItemButton>
                </ListItem>
              ))}
            {userRole === "Faculty" &&
              facultyLinks.map((route, index) => (
                <ListItem key={index}>
                  <ListItemButton>
                    <ListItemIcon>
                      {route.icon}
                    </ListItemIcon>
                    <Link to={route.link}>{route.title}</Link>
                  </ListItemButton>
                </ListItem>
              ))}
            {/* <div className={`  flex items-center shadow-gray-400 mb-2 p-2 rounded-full  ease-in duration-300 group`}>
              <NavLink to={'/logout'} onClick={logOutUser} className={'flex flex-row gap-6 w-full md:gap-6 text-[14px] group-hover:text-paleRed text-white'}>
                <Logout />
                Logout
              </NavLink> */}
              <ListItem onClick={logOutUser}>
                <ListItemButton>
                  <ListItemIcon>
                  <Logout />
                  </ListItemIcon>
                  <Link to={'/logout'} >Logout</Link>
                </ListItemButton>
              </ListItem>
            {/* </div> */}
          </List>
        </div>
      </Drawer>
    </section>
  );
}
