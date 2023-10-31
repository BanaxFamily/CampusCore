import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const SideNav = (props) => {
  return (
    <div
      className={`flex flex-col bg-mainBlueColor shadow-gray-400 mb-2 p-3 rounded-full
            hover:scale-110 ease-in duration-300 group
        `}
    >
      <NavLink
        to={props.link}
        key={props.id}
        className={` flex flex-col items-center group-hover:text-paleRed text-white`}
      >
        {props.icon}

        <span className="text-[8px]">{props.title}</span>
      </NavLink>
    </div>
  );
};

SideNav.propTypes = {
  link: PropTypes.string,
  icon: PropTypes.element,
  text: PropTypes.string,
  id: PropTypes.string,
  title: PropTypes.string,
  mobile: PropTypes.bool,
};

export default SideNav;
