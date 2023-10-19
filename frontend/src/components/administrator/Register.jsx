// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import { MdOutlineCheckBoxOutlineBlank, MdOutlineCheckBox } from 'react-icons/md'

export const Register = () => {
  const [agreed, setAgreed] = useState(false);

  const termsAndConditionChecked = () => {
    setAgreed(!agreed);
  }
  return (

    <div className=" w-[95%] m-auto border border-slate-600 overflow-hidden 
                  bg-white h-auto md:mt-14 md:h-fit md:w-[65%] flex flex-col rounded-md">
      <div className="m-2 p-2">
        <h1 className=" text-black font-bold tracking-wide text-[20px]">Create an account</h1>
        <p className="text-neutral-400 text-sm">Create an account to use dashboard</p>
      </div>

      <div className="shadow-md">
        <div className="  flex justify-center items-center gap-16 md:gap-10">
          <div>
            <button className=" p-2 border border-slate-600 rounded-lg text-[10px] font-semibold
                              tracking-wider">Register with google</button>
          </div>

          <div>
            <button className="p-2 border border-slate-600 rounded-lg text-[10px] font-semibold
                              tracking-wider">Register with lms</button>
          </div>
        </div>

        <div className="p-2">

          <form action="">
            <div className="w-full flex justify-start gap-4 md:gap-2">
              <div className="flex flex-col justify-center w-1/2">
                <label className="text-[18px] md:text-[15px] font-[200]" htmlFor="firstname">Firstname</label>
                <input className=" bg-gray-300 rounded-lg w-[140px] md:w-full mr-2 py-2 px-4 md:py-1" type="text" name="firstname" placeholder="Paul" id="firstname" />
              </div>
              <div className="flex flex-col w-1/2">
                <label className="text-[18px] md:text-[15px] font-[200]" htmlFor="lastname">Lastname</label>
                <input className=" bg-gray-300 rounded-lg w-[140px] md:w-full mr-2 py-2 px-4 md:py-1" type="text" name="lastname" placeholder="Ebara" id="lastname" />
              </div>
            </div>

            <div className="w-full flex flex-col mt-2 gap-3">
              <label className="text-[18px] md:text-[15px] font-[200]" htmlFor="email">Email address</label>
              <input className=" w-full bg-gray-300 rounded-lg mr-2 py-2 px-4 md:py-1" type="email" name="email" placeholder="juan@gmail.com"
                id="email" />

              <label className="text-[18px] md:text-[15px] font-[200]" htmlFor="password">Password</label>
              <input className="w-full bg-gray-300 rounded-lg  mr-2 py-2 px-4 md:py-1" type="password"
                name="password" placeholder="***********" id="password" />

              <label className="text-[18px]  md:text-[15px] font-[200]" htmlFor="email">Confirm password</label>
              <input className="w-full bg-gray-300 rounded-lg mr-2 py-2 px-4 md:py-1" type="password" name="email" placeholder="juan@gmail.com"
                id="confirm-password" />


              <div className="w-full flex flex-row justify-start items-center my-2">
                <div onClick={termsAndConditionChecked}>
                  {agreed ? <MdOutlineCheckBox /> : <MdOutlineCheckBoxOutlineBlank />}
                </div>
                <div>
                  <p className="ml-2 md:text-[12px]">I agree to the <span><a href="" className=' text-blue-400'>terms and agreement</a></span></p>
                </div>
              </div>

            </div>

            <button className='bg-mainBlueColor text-white font-bold
            w-full rounded-lg py-4 tracking-wider md:py-2'>Sign Up</button>
          </form>

        </div>
      </div>
    </div>

  )
}
