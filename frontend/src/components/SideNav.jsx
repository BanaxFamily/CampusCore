import { Link } from "react-router-dom"
import { LuGraduationCap } from "react-icons/lu"
import { AiOutlineFileSearch, AiOutlineCalendar, AiOutlineIssuesClose, AiOutlineSetting, AiOutlineHome } from "react-icons/ai"
import { RiGitRepositoryCommitsLine } from "react-icons/ri"

export const SideNav = () => {
    return (
        <div className="w-[16%] h-fit p-2 border rounded-lg shadow-lg sticky top-0">
            <div className="w-full flex flex-col justify-start items-start gap-6 text-[12px]  
                 
            ">
                <Link to="/" className="w-full">
                    <div className="active:bg-mainBlueColor active:text-white w-full px-2 py-1 rounded-lg 
                                border border-slate-400 hover:border-slate-700 
                                hover:bg-mainBlueColor hover:text-white
                ">
                        <span className="flex justify-start items-center gap-3">
                            <AiOutlineHome />
                            <button className=" w-full flex justify-start bg-transparent ">Home</button>
                        </span>

                    </div>
                </Link>

                <Link to="/courses" className="w-full">
                    <div className="active:bg-mainBlueColor active:text-white w-full px-2 py-1 rounded-lg 
                                border border-slate-400 hover:border-slate-700 
                                hover:bg-mainBlueColor hover:text-white
                ">
                        <span className="flex justify-start items-center gap-3 ">
                            <LuGraduationCap />
                            <button className=" w-full flex justify-start bg-transparent">Courses</button>
                        </span>
                    </div>
                </Link>


                <Link to="/files" className="w-full">
                    <div className="active:bg-mainBlueColor active:text-white w-full px-2 py-1 rounded-lg 
                                border border-slate-400 hover:border-slate-700 
                                hover:bg-mainBlueColor hover:text-white
                ">
                        <span className="flex justify-start  items-center gap-3">
                            <AiOutlineFileSearch />
                            <button className=" w-full flex justify-start bg-transparent">Files</button>
                        </span>
                    </div>
                </Link>




                <Link to="/repository" className="w-full">
                    <div className="active:bg-mainBlueColor active:text-white w-full px-2 py-1 rounded-lg 
                                border border-slate-400 hover:border-slate-700 
                                hover:bg-mainBlueColor hover:text-white
                ">
                        <span className="flex justify-start items-center gap-3 ">
                            <RiGitRepositoryCommitsLine />
                            <button className=" w-full flex justify-start bg-transparent">Repository</button>
                        </span>
                    </div>
                </Link>


                <Link to="/" className="w-full">
                    <div className="active:bg-mainBlueColor active:text-white w-full px-2 py-1 rounded-lg 
                                border border-slate-400 hover:border-slate-700 
                                hover:bg-mainBlueColor hover:text-white
                ">
                        <span className="flex justify-start items-center gap-3 ">
                            <AiOutlineCalendar />
                            <button className=" w-full flex justify-start bg-transparent">Timetable</button>
                        </span>
                    </div>
                </Link>

                <Link to="/" className="w-full">
                    <div className="active:bg-mainBlueColor active:text-white w-full px-2 py-1 rounded-lg 
                                border border-slate-400 hover:border-slate-700 
                                hover:bg-mainBlueColor hover:text-white
                ">
                        <span className="flex justify-start items-center gap-3 ">
                            <AiOutlineIssuesClose />
                            <button className=" w-full flex justify-start bg-transparent">Issues</button>
                        </span>
                    </div>
                </Link>

                <Link to="/" className="w-full">
                    <div className="active:bg-mainBlueColor active:text-white w-full px-2 py-1 rounded-lg 
                                border border-slate-400 hover:border-slate-700 
                                hover:bg-mainBlueColor hover:text-white
                ">
                        <span className="flex justify-start items-center gap-3 ">
                            <AiOutlineSetting />
                            <button className=" w-full flex justify-start bg-transparent">Settings</button>
                        </span>
                    </div>
                </Link>
            </div>
        </div>
    )
}
