import { BarChart, Book, CollectionsBookmark, Dashboard, DeveloperBoard, Groups, Home, LocalPostOffice, People, Settings, Storage } from "@mui/icons-material";
import { BiRightArrowAlt } from "react-icons/bi";

export const studentLinks = [
  {
    id: "home",
    link: "/",
    title: "Home",
    icon: <Home />
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
  {
    id: "offeredCourse",
    link: "/faculty/course-loads/subjects",
    title: "Offered courses",
    icon: <CollectionsBookmark />,
  },

  {
    id: "repository",
    link: "manage/repository",
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
    id: "repository",
    link: "/faculty/course-loads/subjects",
    title: "Offered courses",
    icon: <LocalPostOffice />,
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


