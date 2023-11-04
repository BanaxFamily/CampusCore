import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const SideNav = (props) => {
  return (
    <div className={`${props.classNames}  flex items-center shadow-gray-400 mb-2 p-2 rounded-full hover:scale-110 ease-in duration-300 group`}>
      
      <NavLink
        to={props.link}
        key={props.id}
        className={`flex justify-start gap-2 group-hover:text-paleRed text-white`}
      >
        {props.icon}

        <span className="text-[12px] text-center">{props.title}</span>
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
  classNames: PropTypes.string,
};

export default SideNav;
