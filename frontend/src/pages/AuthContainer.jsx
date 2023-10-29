import { Header } from "../components/Header";
import Main from "../components/Main";
import { Status } from "../components/Status";
import AdminLinks from "../components/administrator/AdminLinks";
    

const AuthContainer = () => {
    return (
        <>
            <Header />
            <div className="md:block hidden fixed top-[25%] ml-2 opacity-80 hover:opacity-100">
                <AdminLinks />
            </div>

            <div className='flex h-screen overflow-hidden'>
                <div className="w-full md:w-3/4 overflow-auto">
                    <div className='h-full pt-2'>
                        <Main />
                    </div>
                </div>

                <div className='hidden md:block w-1/4 pt-2 overflow-auto'>
                    <Status />
                </div>
            </div>
        </>
    );
}

export default AuthContainer;