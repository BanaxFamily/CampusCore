import { Book, CalendarMonth, DeveloperBoard, Groups, Home, LocalPostOffice, People, Person, Report, Settings, Storage, SyncProblem } from "@mui/icons-material";
import { BiRightArrowAlt } from "react-icons/bi";

export const studentLinks = [
  {
    id: "home",
    link: "/",
    title: "Home",
    icon: <Home/>
  },
  {
    id: "profile",
    link: "/manage/profile",
    title: "Manage profile",
    icon: <Person />,
  },
  {
    id: "research",
    link: "/research",
    title: "Research repository",
    icon: <Storage />,
  },
  {
    id: "course",
    link: "/course",
    title: "Courses",
    icon: <Book />,
  },
  {
    id: "deliverable",
    link: "/deliverable",
    title: "Deliverables",
    icon: <DeveloperBoard />,
  },
  {
    id: "issues",
    link: "/issues",
    title: "Issues",
    icon: <SyncProblem />,
  },
  {
    id: "timetable",
    link: "/timetable",
    title: "Timetable",
    icon: <CalendarMonth />,
  },
  {
    id: "setting",
    link: "/settings",
    title: "Settings",
    icon: <Settings />,
  },
];

export const adminLinks = [
  {
    id: "home",
    link: "/",
    title: "Home",
    icon: <Home />,
  },
  {
    id: "repository",
    link: "manage/repository",
    title: "Repository",
    icon: <Storage />,
  },
  {
    id: "profile",
    link: "manage/course",
    title: "Course management",
    icon: <Book />,
  },
  {
    id: "profile",
    link: "manage/profile",
    title: "Manage Profile",
    icon: <Person />,
  },
  {
    id: "repository",
    link: "/manage/user",
    title: "Manage users",
    icon: <People />,
  },

  {
    id: "repository",
    link: "/faculty/course-loads/subjects",
    title: "Faculty course loads",
    icon: <LocalPostOffice />,
  },
  {
    id: "users",
    link: "/reports",
    title: "Generate reports",
    icon: <Report />,
  },
  {
    id: "setting",
    link: "/settings",
    title: "Settings",
    icon: <Settings />,
  },
];

export const userManagementPath = [
  {
    link: "/manage/user/add",
    title: "Add new user",
    icon: <BiRightArrowAlt />,
  },
  {
    link: "/manage/user/view",
    title: "Add new user",
    icon: <BiRightArrowAlt />,
  },
  {
    link: "/manage/user/add",
    title: "Add new user",
    icon: <BiRightArrowAlt />,
  },
  {
    link: "/manage/user/add",
    title: "Add new user",
    icon: <BiRightArrowAlt />,
  },
];

export const deanLink = [
  {
    id: "home",
    link: "/",
    title: "Home",
    icon: <Home />,
  },
  {
    id: "course",
    link: "/courses",
    title: "Courses",
    icon: <Book />,
  },
  {
    id: "profile",
    link: "/deliverable-management",
    title: "Deliverable management",
    icon: <DeveloperBoard />,
  },

  {
    id: "groups",
    link: "/student-groups",
    title: "Manage student groups",
    icon: <Groups />,
  },
  {
    id: "setting",
    link: "/settings",
    title: "Settings",
    icon: <Settings/>,
  },
];
