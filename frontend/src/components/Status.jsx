
export const Status = () => {
  return (
    <div className="w-[30%] flex flex-col gap-6">

      <div className=" h-48 border shadow-lg overflow-hidden ">

        <div className=" bg-mainBlueColor py-2 sticky top-0">
          <h2 className="text-[10px] pl-2 tracking-wider uppercase text-white">Completion Status</h2>
        </div>

        <div className=" max-h-48 overflow-y-scroll overflow-x-hidden">
          <p>STATUS HERE!</p>
        </div>
      </div>

      <div className=" h-72 border shadow-lg">
        <div className="bg-paleRed py-2 sticky top-0">
          <h2 className="text-[10px] pl-2 tracking-wider uppercase text-white">Dealines</h2>
        </div>

        <div className=" max-h-72 overflow-y-scroll overflow-x-hidden">
          <p>DEALINES HERE!</p>
        </div>
      </div>
    </div>
  )
}
