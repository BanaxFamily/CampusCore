/* eslint-disable react/prop-types */

export default function WrapperLayout({children}) {
  return (
    <div className="2xl:w-3/4 2xl:mx-auto mt-4  text-sm">
      <div className="flex flex-col gap-2 py-2 ">
            {children}
      </div>
    </div>
  );
}
