
export const Status = () => {
  return (
    <div className="flex ">

      <div className=" h-48 w-full border shadow-lg overflow-hidden ">

        <div className=" bg-mainBlueColor p-2 rounded-md  ">
          <h2 className="text-[8px] md:text-[12px] tracking-wider uppercase text-white">Completion Status</h2>
        </div>

        <div className=" max-h-48 overflow-y-scroll overflow-x-hidden">
          <h2>Announcement</h2>
        </div>
      </div>

      {/* <div className=" h-72 border shadow-lg">
        <div className="bg-paleRed py-2 ">
          <h2 className="text-[8px] md:text-[12px] pl-2 tracking-wider uppercase text-white">Dealines</h2>
        </div>

        <div className=" max-h-72 overflow-y-scroll overflow-x-hidden">
          <p>DEALINES HERE!</p>
        </div>
      </div> */}
    </div>
  )
}
