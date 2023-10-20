import { Link } from "react-router-dom"
import PropTypes from 'prop-types'
// import { LuGraduationCap } from "react-icons/lu"
// import { AiOutlineFileSearch, AiOutlineCalendar, AiOutlineIssuesClose, AiOutlineSetting, AiOutlineHome } from "react-icons/ai"
// import { RiGitRepositoryCommitsLine } from "react-icons/ri"

const SideNav = (props) => {
    return (
        <Link to={props.link} key={props.id} className="w-full">
            <div className="active:bg-mainBlueColor active:text-white w-full px-2 py-1 rounded-lg 
                            border border-slate-400 hover:border-slate-700 
                            hover:bg-mainBlueColor hover:text-white
                ">
                <span className="flex justify-start items-center gap-3">
                    {/* <AiOutlineHome /> */}
                    {props.icon}
                    <button className=" w-full flex justify-start bg-transparent ">{props.text}</button>
                </span>

            </div>
        </Link>
    )
}

SideNav.propTypes = {
    link: PropTypes.string,
    icon: PropTypes.element,
    text: PropTypes.string,
    id: PropTypes.string
}

export default SideNav;