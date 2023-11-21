/* eslint-disable react/prop-types */

const DashBoardHeading = (props) => {
  return (
    <div className={`shadow-blue-600 shadow-md rounded-md ${props.shadow}`}>
      {props.title !== "" &&
        <div className={`${props.className} rounded-t-md bg-mainBlueColor w-full py-6 border border-slate-600 font-semibold text-white`}>
          <h1 className={` text-[20px] tracking-wider  ml-8 uppercase`}>{props.title}</h1>
        </div>}
      {props.desc !== "" && <div className={`${props.classname}  text-[15px] tracking-wider  ml-8 font-semibold uppercase`}>{props.desc}</div>}
    </div>
  );
};


export default DashBoardHeading;
