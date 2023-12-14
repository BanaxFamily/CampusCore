import { NotificationsSharp } from "@mui/icons-material";
import { Badge, IconButton, Stack, Typography } from "@mui/material";
import avatar from "../../assets/avatar.jpg";
import { useAuth } from "../../utils/AuthContext";


const Logout = () => {
  // const [open, setOpen] = useState(false);

  // const toggleDrawer = (isOpen) => (event) => {
  //   if (
  //     event.type === "keydown" &&
  //     (event.key === "Tab" || event.key === "Shift")
  //   )
  //     return;
  //   setOpen(isOpen);
  // };
  const { userRole } = useAuth()
  return (
    <Stack className="!flex-row items-center">
      <Typography className="!text-md !text-center text-black !font-bold">{userRole}</Typography>
      <section>
        <IconButton
          className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
          edge="end"
          color="inherit"
          aria-label="menu"
        // onClick={toggleDrawer(true)}
        >
          <span className="absolute -inset-1.5"></span>
          <span className="sr-only">Open user menu</span>
          <span className="relative">
            <img
              className="h-8 w-8 rounded-full"
              src={avatar}
            />
            <Badge color="error" badgeContent={2} className="!absolute top-5">
              <NotificationsSharp />
            </Badge>
          </span>
        </IconButton>
        {/* <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        <div
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <NotificationAddSharp/>
                </ListItemIcon>
                <Link >Notifications</Link>
              </ListItemButton>
            </ListItem>
          </List>
        </div>
      </Drawer> */}
        <Stack>

        </Stack>
      </section>
    </Stack>
  );
};

export default Logout;
