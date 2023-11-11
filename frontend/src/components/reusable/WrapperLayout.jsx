/* eslint-disable react/prop-types */

export default function WrapperLayout({children}) {
  return (
    <div className="mt-4 min-h-[20rem] overflow-auto text-sm">
      <div className="flex flex-col gap-2 py-2 ">
            {children}
      </div>
    </div>
  );
}
