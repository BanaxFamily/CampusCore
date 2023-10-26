import { LuGraduationCap } from "react-icons/lu"
import { AiOutlineFileSearch,  AiOutlineIssuesClose, AiOutlineSetting, AiOutlineHome } from "react-icons/ai"
import { RiGitRepositoryCommitsLine } from "react-icons/ri"

export const studentNavLinks = [
    {
        id:"home",
        link:"/",
        title:"Home",
        icon: <AiOutlineHome/>
    },
    {
        id:"course",
        link:"/course",
        title:"Courses",
        icon: <LuGraduationCap/>
    },
    {
        id:"files",
        link:"/files",
        title:"Files",
        icon: <AiOutlineFileSearch/>
    },
    {
        id:"repository",
        link:"/repository",
        title:"Repository",
        icon: <RiGitRepositoryCommitsLine/>
    },
    {
        id:"issues",
        link:"/issues",
        title:"Issues",
        icon: <AiOutlineIssuesClose/>
    },
    {
        id:"setting",
        link:"/settings",
        title:"Settings",
        icon: <AiOutlineSetting/>
    },
];

export const adminLinks = [
    {
        id:"home",
        link:"/",
        title:"Home",
        icon: <AiOutlineHome size={20}/>
    },
    {
        id:"profile",
        link:"/profile",
        title:"Profile",
        icon: <LuGraduationCap size={20}/>
    },
    {
        id:"repository",
        link:"/repository",
        title:"Repository",
        icon: <AiOutlineHome size={20}/>
    },
    {
        id:"course",
        link:"/course",
        title:"Courses",
        icon: <LuGraduationCap size={20}/>
    },
    {
        id:"users",
        link:"/user",
        title:"Users",
        icon: <LuGraduationCap size={20}/>
    },
    {
        id:"reports",
        link:"/report",
        title:"Reports",
        icon: <LuGraduationCap size={20}/>
    },
];

export const adminNavTitle = [
    {
        link: "Home"
    },
    {
        link: "Profile"
    },
    {
        link: "Repository"
    },
    {
        link: "Courses"
    },
    {
        link: "Users"
    },
    {
        link: "Reports"
    },

    
]