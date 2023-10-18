// import {useForm} from 'react-hook-form'

const Login = () => {

  // const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm();

  return (

    <div className=" w-[95%] m-auto border border-slate-600 overflow-hidden 
                  bg-white h-auto md:mt-14 md:h-fit md:w-[65%] flex flex-col rounded-md ">
      <div className="p-2 ">

        <h1 className=" text-black font-bold tracking-wide text-[25px]">Sign in</h1>
        <p className="text-neutral-400 text-sm">Sign in to your account</p>

        <form action="">

          <div className="w-full flex flex-col mt-2 gap-3">
            <label className="text-[18px] md:text-[15px] font-[200]" htmlFor="email">Email address</label>
            <input className=" w-full bg-gray-300 rounded-lg mr-2 py-2 px-4 md:py-1" 
                   type="email"
                   name="email"
                   placeholder="juan@gmail.com"
                   id="email" 
            />

            <label className="text-[18px] md:text-[15px] font-[200]" htmlFor="password">Password</label>
            <input className="w-full bg-gray-300 rounded-lg  mr-2 py-2 px-4 md:py-1" 
                   type="password"
                   name="password"
                   placeholder="***********"
                   id="password"
            />
          </div>

          
          <div className="w-full relative">
            <a className="absolute top-0 right-0 text-[12px] text-blue-400 mt-2 hover:text-blue-500" href="">Forgot your password?</a>
          </div>

          <button className='bg-mainBlueColor my-10 text-white font-bold w-full rounded-lg py-4 tracking-wider md:py-2'>Log in</button>
        </form>

      </div>
    </div>

  )
}

export default Login