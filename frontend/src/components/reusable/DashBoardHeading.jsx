import PropTypes from "prop-types";

const DashBoardHeading = (props) => {
  return (
    <div className=" bg-mainBlueColor w-full py-3 shadow-blue-600 shadow-md rounded-sm border border-slate-600  text-white">
      <h1 className={` text-[20px] tracking-wider ml-8 uppercase`}>
        {" "}
        {props.title}{" "}
      </h1>
    </div>
  );
};

DashBoardHeading.propTypes = {
  title: PropTypes.string,
};

export default DashBoardHeading;
