import { BarChart, Book, Dashboard, DeveloperBoard, Group, Home, LocalPostOffice, People, Settings, Storage } from "@mui/icons-material";
import { BiRightArrowAlt } from "react-icons/bi";

export const studentLinks = [
  {
    id: "home",
    link: "/",
    title: "Home",
    icon: <Home />
  },

  {
    id: "repository",
    link: "/repository",
    title: "Repository",
    icon: <Storage />,
  },
  {
    id: "course",
    link: "/course",
    title: "Courses",
    icon: <Book />,
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
    title: "Dashboard",
    icon: <Dashboard />,
  },
  {
    id: "users",
    link: "/manage/user",
    title: "Manage users",
    icon: <People />,
  },

  {
    id: "course",
    link: "manage/course",
    title: "Course management",
    icon: <Book />,
  },
  // {
  //   id: "offeredCourse",
  //   link: "/faculty/course-loads/subjects",
  //   title: "Offered courses",
  //   icon: <CollectionsBookmark />,
  // },

  {
    id: "repository",
    link: "/repository",
    title: "Repository",
    icon: <Storage />,
  },
  {
    id: "analytics",
    link: "/analytics",
    title: "Analytics",
    icon: <BarChart />,
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
    link: "/submissions",
    title: "Submissions",
    icon: <Book />,
  },
  {
    id: "profile",
    link: "/deliverable-management",
    title: "Deliverable management",
    icon: <DeveloperBoard />,
  },
  {
    id: "profile",
    link: "/publish-request",
    title: "Request for Publication",
    icon: <DeveloperBoard />,
  },
  {
    id: "repository",
    link: "/faculty/course-loads/subjects",
    title: "Offered courses",
    icon: <LocalPostOffice />,
  },
  {
    id: "repository",
    link: "/repository",
    title: "Repository",
    icon: <Storage />,
  },
  {
    id: "setting",
    link: "/settings",
    title: "Settings",
    icon: <Settings />,
  },
];


export const facultyLinks = [
  {
    id: "home",
    link: "/",
    title: "Home",
    icon: <Home />,
  },
  {
    id: "courloads",
    link: "course/assigned",
    title: "Course assigned",
    icon: <Book />,
  },
  {
    id: "courloads",
    link: "/advisory",
    title: "Advisory",
    icon: <Group />,
  },
  {
    id: "repository",
    link: "/repository",
    title: "Repository",
    icon: <Storage />,
  },
  {
    id: "setting",
    link: "/settings",
    title: "Settings",
    icon: <Settings />,
  },
]

export const facultyAsideLinks = [
  {
    id: "repository",
    link: "/deliverable/management",
    title: "Deliverable management",
    // icon: <LocalPostOffice />,
  },
  {
    id: "groups",
    link: "/student/groups",
    title: "Student groups",
    // icon: <Approval />,
  },
  {
    id: "submission",
    link: "/submissions",
    title: "Submissions",
    // icon: < />,
  },
]


export const prcLink = [
  {
    id: "home",
    link: "/",
    title: "Home",
    icon: <Home />,
  },
  {
    id: "repository",
    link: "/repository",
    title: "Repository",
    icon: <Storage />,
  },
  {
    id: "deliverable",
    link: "/approval/submission",
    title: "Approve submissions",
    icon: <DeveloperBoard />,
  },

  {
    id: "setting",
    link: "/settings",
    title: "Settings",
    icon: <Settings />,
  },
]