/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const SideNav = (props) => {
  return (
    <div
      className={`${props.classNames}  flex items-center shadow-gray-400 mb-2 p-2 rounded-full ease-in duration-300 `}
    >
      <NavLink
        onClick={props.onDismiss}
        to={props.link}
        key={props.id}
        activeclassname="active"
        className={`flex flex-row gap-6 w-full text-[14px] items-center md:gap-6 hover:text-paleRed text-white`}
      >
          {props.icon}
        {/* <span className=" flex flex-row gap-6 text-sm md:text-sm lg:text-[0.9rem] font-semibold justify-start  leading-3"> */}
          {props.title}
        {/* </span> */}
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
