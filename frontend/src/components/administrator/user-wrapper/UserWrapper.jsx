/* eslint-disable react/prop-types */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineUserAdd } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { IoRefreshCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import * as UserApi from "../../../network/user_api";
import AddModalUser from "./AddModalUser";
import UpdateModal from "./UpdateModal";
import WrapperLayout from "../../reusable/WrapperLayout";
import DynamicTable from "../../reusable/DynamicTable";
import { Button, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import TableBodyUser from "./TableBody";

export default function UserWrapper({ users }) {
  let count = 0;
  const navigate = useNavigate();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [userToUpdate, setUserToUpdate] = useState(null);
  // const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const userData = users.data;
  const [searchkey, setSearchKey] = useState("");
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

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

  async function handleSearchSubmit(key) {
    const response = await UserApi.searchUser(key);
    if (response.status === true) {
      setFilteredUsers(response.data);
      setSearchKey(key);
    }
  }

  const deleteConfirmation = (id) => {
    let text = "Are you sure you want to delete this user?";
    if (confirm(text) === true) {
      handleDeleteUser(id);
    }
  };

  return (
    <WrapperLayout>
      <div className=" flex flex-col sm:flex-row sm:justify-between gap-2 ml-2 sm:px-4 w-ful tracking-wider">
        <div className="flex ">
          <div className=" py-2 rounded-md">
            <Button
              onClick={() => setShowAddModal(true)}
              variant="outlined"
              className="mr-2 text-[15px] font-semibold hover:text-black">
              Add
              <AiOutlineUserAdd
                size={20}
              />
            </Button>
          </div>
        </div>
        <span className="flex text-black ">
          <label htmlFor="" className="hidden">
            Search
          </label>
        </span>
        <div className="flex  gap-4">
          <form className="flex" onSubmit={handleSubmit(handleSearchSubmit)}>
            <input
              type="text"
              placeholder="search by name...."
              name="searchKey"
              className=" text-white bg-mainBlueColor rounded-md px-16 w-full sm:w-min border-none py-1"
              {...register("searchKey", { required: true })}
            />
            <button disabled={isSubmitting} className="cursor-pointer">
              <BsSearch className="ml-2" />
            </button>
          </form>
          <button className="hover:text-slate-400" onClick={() => navigate(0)}>
            <IoRefreshCircleOutline size={30} />
          </button>
        </div>
      </div>
      <div className="overflow-auto shadow-md shadow-gray-500 rounded-sm">
        <DynamicTable>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>ID#</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Firstname</TableCell>
              <TableCell>Lastname</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Role</TableCell>
              <TableCell colSpan={2} align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {searchkey ? (
              filteredUsers.length > 0 ? (
                filteredUsers.map((user, index) => {
                  count++;
                  return (
                    <TableBodyUser
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
                })
              ) : (
                <span className="w-full flex just">No records found</span>
              )
            ) : (
              userData.map((user, index) => {
                count++;
                return (
                  <TableBodyUser
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
              })
            )}
          </TableBody>
        </DynamicTable>
      </div>
      {/* </div> */}

      {showAddModal && <AddModalUser onClose={() => {
        setShowAddModal(false)
        navigate(0)
        }}
      />}
      {showUpdateModal && (
        <UpdateModal
          user={userToUpdate}
          onClose={() => {
            setUserToUpdate(null);
            setShowUpdateModal(false);
          }}
        />
      )}
      {/* // </div> */}
    </WrapperLayout>
  );
}
