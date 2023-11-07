import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineUserAdd } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import * as UserApi from "../../../network/user_api";
import TableBody from "./TableBody";
import AddModal from "./AddModal";
import UpdateModal from "./UpdateModal";

export default function UserWrapper() {
  const navigate = useNavigate();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [userToUpdate, setUserToUpdate] = useState(null);
  let count = 0;
  const {
    // register,
    // handleSubmit,
    formState: { isSubmitting },
  } = useForm();
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    async function loadUsers() {
      const response = await UserApi.viewUser();
      setUsers(response.data);
      setFilteredUsers(response.data);
    }
    loadUsers();
  }, []);

  async function handleDeleteUser(id) {
    const response = await UserApi.deleteUser(id);
    if (response.status) {
      alert(`Error: ${response.status}`);
    } else {
      alert("User deleted successfully!");
      setFilteredUsers(
        filteredUsers.filter((userExist) => userExist.id !== id)
      );
      navigate(0);
    }
  }

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);

    const filteredData = users.filter(
      (user) =>
        user.firstName &&
        user.firstName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
    );

    setFilteredUsers(filteredData);
  };

  const deleteConfirmation = (id) => {
    let text = "Are you sure you want to delete this user?";
    if (confirm(text) === true) {
      handleDeleteUser(id);
    }
  };

  return (
    <div className="mt-4 min-h-[20rem] overflow-auto text-sm">
      <div className="flex flex-col gap-2 py-2 ">
        <div className=" flex flex-col sm:flex-row sm:justify-between gap-2 ml-2 sm:px-4 w-ful tracking-wider">
          <div className="flex ">
            <div className="bg-blue-600 px-4 py-2 rounded-md">
              {/* <NavLink
                to="../user/register"
                relative="path"
                className="text-sm flex items-center gap-1 text-white uppercase px-2 "
              > */}
              <span
                className="text-sm flex items-center gap-1 text-white uppercase px-
                group-hover:text-slate-300  hover:cursor-pointer"
              >
                {" "}
                Add
                <AiOutlineUserAdd
                  size={20}
                  onClick={() => setShowAddModal(true)}
                />
              </span>
            </div>
          </div>
          <span className="flex text-black ">
            <label htmlFor="" className="hidden">
              Search
            </label>
          </span>
          {/* Used Search function with the combination of View users and filter method */}
          {/* currently un-used the react hook form*/}
          <form className="flex">
            <input
              type="text"
              placeholder="search by name...."
              name="searchKey"
              defaultValue={searchTerm}
              onChange={handleInputChange}
              className=" text-white bg-mainBlueColor rounded-md px-16 w-full sm:w-min border-none py-1"
              // {...register("searchKey", { required: true })}
            />
            <button disabled={isSubmitting} className="cursor-pointer">
              <BsSearch className="ml-2" />
            </button>
          </form>
        </div>
        <div className="overflow-auto  shadow-md shadow-gray-500 rounded-sm">
          <table className="table-auto text-center max-h-80 overflow-auto min-w-[650px] lg:min-w-0 lg:w-full ">
            <thead className="uppercase">
              <tr className="text-[12px] bg-gray-300 font-medium">
                <td className="px-2 py-1">ID</td>
                <td className="px-2 py-1">username</td>
                <td className="px-2 py-1">firstname</td>
                <td className="px-2 py-1">lastname</td>
                <td className="px-2 py-1">email</td>
                <td className="px-2 py-1">status</td>
                <td className="px-2 py-1">role</td>
                <td className="px-2 py-1" colSpan="2">
                  action
                </td>
              </tr>
            </thead>
            {filteredUsers.map((user, index) => {
              count++;
              return (
                <TableBody
                  className="py-[1px] mt-1 px-2"
                  key={index}
                  index={count}
                  user={user}
                  onDeleteUserCliked={deleteConfirmation}
                  showModalUpdate={() => {
                    setShowUpdateModal(true);
                    setUserToUpdate(user);
                  }}
                />
              );
            })}
          </table>
        </div>
      </div>

      {showAddModal && <AddModal onClose={() => setShowAddModal(false)} />}
      {showUpdateModal && (
        <UpdateModal
          user={userToUpdate}
          onClose={() => {
            setUserToUpdate(null)
            setShowUpdateModal(false);
          }}
        />
      )}
    </div>
  );
}
