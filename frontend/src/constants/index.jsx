import { LuGraduationCap } from "react-icons/lu";
import {
  AiOutlineFileSearch,
  AiOutlineIssuesClose,
  AiOutlineSetting,
  AiOutlineHome,
} from "react-icons/ai";
import { RiGitRepositoryCommitsLine } from "react-icons/ri";
import { BiRightArrowAlt } from "react-icons/bi";

export const studentLinks = [
  {
    id: "home",
    link: "/",
    title: "Home",
    icon: <AiOutlineHome />,
  },
  {
    id: "profile",
    link: "/manage/profile",
    title: "Manage profile",
    icon: <LuGraduationCap />,
  },
  {
    id: "research",
    link: "/research",
    title: "Research repository",
    icon: <AiOutlineFileSearch />,
  },
  {
    id: "course",
    link: "/course",
    title: "Courses",
    icon: <RiGitRepositoryCommitsLine />,
  },
  {
    id: "deliverable",
    link: "/deliverable",
    title: "Deliverables",
    icon: <AiOutlineIssuesClose />,
  },
  {
    id: "setting",
    link: "/issues",
    title: "Issues",
    icon: <AiOutlineSetting />,
  },
  {
    id: "setting",
    link: "/timatable",
    title: "Timetable",
    icon: <AiOutlineSetting />,
  },
];

export const adminLinks = [
  {
    id: "home",
    link: "/",
    title: "Home",
    icon: <AiOutlineHome size={20} />,
  },
  {
    id: "repository",
    link: "manage/repository",
    title: " repository",
    icon: <LuGraduationCap size={20} />,
  },
  {
    id: "profile",
    link: "manage/course",
    title: "Course management",
    icon: <LuGraduationCap size={20} />,
  },
  {
    id: "profile",
    link: "manage/profile",
    title: "Manage Profile",
    icon: <LuGraduationCap size={20} />,
  },
  {
    id: "repository",
    link: "/manage/user",
    title: "Manage users",
    icon: <AiOutlineHome size={20} />,
  },

  {
    id: "repository",
    link: "/faculty/course/loads",
    title: "Faculty course loads",
    icon: <AiOutlineHome size={20} />,
  },
  {
    id: "users",
    link: "/reports",
    title: "Generate reports",
    icon: <LuGraduationCap size={20} />,
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
