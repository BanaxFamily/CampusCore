import { Outlet } from 'react-router-dom'

const Main = () => {
  return (
    <>
      <div className="w-full flex flex-col justify-start px-4">
        <Outlet />
      </div>
    </>
  )
}

export default Main 