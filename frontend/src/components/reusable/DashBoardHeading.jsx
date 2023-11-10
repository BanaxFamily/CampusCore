/* eslint-disable react/prop-types */

const DashBoardHeading = (props) => {
  return (
    <div className= "shadow-blue-600 shadow-md rounded-md">
      <div className={`${props.className} rounded-t-md bg-mainBlueColor w-full py-3 border border-slate-600  text-white`}>
        <h1 className={` text-[20px] tracking-wider  ml-8 uppercase`}>
          {" "}
          {props.title}{" "}
        </h1>
      </div>
        {props.desc !== "" && <span className=" text-[15px] tracking-wider  ml-8 font-semibold uppercase">{props.desc}</span>}
    </div>
  );
};


export default DashBoardHeading;
