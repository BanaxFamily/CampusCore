/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const SideNav = (props) => {
  return (
    <div
      className={`${props.classNames}  flex items-center shadow-gray-400 mb-2 p-2 rounded-full hover:scale-90 ease-in duration-300 group`}
    >
      <Link
        onClick={props.onDismiss}
        to={props.link}
        key={props.id}
        className={`flex flex-row gap-6 w-full md:gap-6 group-hover:text-paleRed text-white`}
      >
        <span className=" flex flex-row gap-6 text-[14px] sm:text-lg md:text-sm lg:text-sm justify-start tracking-wide">
          {props.icon}
          {props.title}
        </span>
      </Link>
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
