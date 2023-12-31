/* eslint-disable react/prop-types */
// import { useForm } from "react-hook-form";
// import Modal from "../Modal";
// import { useNavigate } from "react-router-dom";
// import DashBoarHeading from "../../reusable/DashBoardHeading";

import { Checkbox, List, ListItem, Divider } from "@mui/material";
import { useEffect, useState } from "react";
import DashBoardHeading from "../../reusable/DashBoardHeading";
import Modal from "../Modal";
import { TextField, Button } from "@mui/material"
import { useForm } from "react-hook-form";
import * as OfferCourse from "../../../network/offeredCourse_api"
import * as UserRole from "../../../network/getUserRole_api"
import { useNavigate } from "react-router-dom";

export default function AddOfferedCourse({ offeredCourse, onClose }) {
  const navigate = useNavigate()
  const [selectedItem, setSelectedItem] = useState([]);
  const [userRoles, setUserRoles] = useState([]);
  const {
    register,
    handleSubmit,
    setValue,
    // reset,
    formState: { isSubmitting },
  } = useForm();

  const handleToggle = (data) => {
    setSelectedItem(data);
    setValue("courseId", data.id || "");
    // setValue("Course", data.name || "");
  };

  async function onSubmit(credentials) {
    const response = await OfferCourse.addOfferCourse(credentials);
    if (response.isSuccess) {
      navigate(0);
      return
    }
  }

  useEffect(() => {
    async function getUserRoles() {
      const response = await UserRole.getUserRoles({ "role": "faculty" })
      setUserRoles(response.data)
    }
    getUserRoles()
  }, [])


  return (
    <Modal
      onDismiss={onClose}
      heading={<DashBoardHeading title="Add offered course" desc="" />}
    >
      <div className="w-full">
        <div className="p-2">
          <div className="flex flex-col sm:flex-row sm:gap-1 overflow-hidden ">
            <div className="w-full h-32 flex-col sm:h-[400px] overflow-y-auto sm:flex sm:w-1/2 md:border-r-2 md:gap-[3px]">
              <p className="text-lg font-semibold">Opened Subjects</p>
              <List >
                {offeredCourse.map((data, index) => (
                  <ListItem className="!text-[14px] !p-0" onClick={() => handleToggle(data)} key={index}>
                    <Checkbox
                      color="primary"
                      checked={data.id === selectedItem?.id}
                    />
                    {data.name} ({data.description})
                  </ListItem>
                ))}
              </List>
            </div>
            <span className="block md:hidden">
              <Divider />
            </span>
            <form action="" className="w-full h-64 sm:h-full md:h-[400px] md:w-1/2 flex flex-col gap-2 overflow-y-auto" onSubmit={handleSubmit(onSubmit)}>
              <p className="text-lg font-semibold py-2">To be assigned course</p>
              <div className=" w-full py-2 mb-4 mt-2 flex flex-col gap-2">
                <TextField
                  id="outline-courseId"
                  name="courseId"
                  label="courseId ID"
                  InputLabelProps={{ style: { fontSize: '0.775rem' } }}
                  value={selectedItem.id || ''}
                  size="small"
                  style={{ display: "none" }}
                  {...register("courseId", { required: "this si required" })}
                />

                <TextField
                  required
                  id="outlined-required"
                  label="Course"
                  InputLabelProps={{ style: { fontSize: '0.775rem' } }}
                  size="small"
                  value={selectedItem.name || ''}

                />

                <TextField

                  id="filled-sem"
                  select
                  label="Semester"
                  SelectProps={{
                    native: true,
                  }}
                  required
                  InputLabelProps={{ style: { fontSize: '0.775rem' } }}
                  variant="outlined"
                  name="sem"
                  size="small"
                  {...register("sem", { required: "select one option" })}
                >
                  <option value=""></option>
                  <option value="first">first</option>
                  <option value="second">second</option>
                  <option value="summer">summer</option>
                </TextField>

                <TextField
                  required
                  id="outline-year"
                  name="acadYear"
                  size="small"
                  label="Year"
                  InputLabelProps={{ style: { fontSize: '0.775rem' } }}
                  {...register("acadYear", { required: "this is required" })}

                // value={selectedItem.name || ''}
                />

                <TextField
                  required
                  id="outline-schedule"
                  name="schedule"
                  label="Schedule"
                  size="small"
                  InputLabelProps={{ style: { fontSize: '0.775rem' } }}
                  {...register("schedule", { required: "this si required" })}

                />

                <TextField
                  id="filled-role"
                  select
                  label="Faculty"
                  SelectProps={{
                    native: true,
                  }}
                  size="small"
                  InputLabelProps={{ style: { fontSize: '0.775rem' } }}
                  helperText="Please select a proffesor to handle this subject"
                  name="facultyId"
                  {...register("facultyId", { required: "select one option" })}
                >
                  <option value=""></option>
                  {
                    userRoles.map((role, index) => (
                      <option value={role.id} key={index}>{role.fullName}</option>
                    ))
                  }
                </TextField>
              </div>

              <Button type="submit" disabled={isSubmitting} variant="outlined" className="w-full mt-2">Submit</Button>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
}
