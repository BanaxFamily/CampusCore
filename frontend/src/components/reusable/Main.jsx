import { Outlet } from 'react-router-dom'

const Main = () => {
  return (
    <>
      <div className="w-full flex flex-col justify-start ">
        <Outlet />
      </div>
    </>
  )
}

export default Main 