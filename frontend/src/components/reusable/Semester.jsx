/* eslint-disable react/prop-types */

export default function Semester(props) {
  return (
    <div className="w-full py-2 ">
      <span className="uppercase text-[14px] ml-8 underline underline-offset-4"> enrolled courses of {props.sem} 2023</span>
    </div>
  );
}
