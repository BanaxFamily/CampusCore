/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import * as CourseApi from "../../../network/course_api";
import Modal from "../Modal";
import DashboardHeading from "../../reusable/DashBoardHeading";
import { TextField, Button } from "@mui/material";

export default function AddModalCourse({ onClose }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();

  async function onSubmit(credentials) {
    const response = await CourseApi.addCourse(credentials);
    if (response.status) {
      alert(`Error: ${response.status}`);
    } else {
      alert("Course added successfully!");
      reset();
    }
  }
  return (
    <>
      <Modal onDismiss={onClose}>
        <div className="mb-3">
          <DashboardHeading title="Add course" desc="" className="py-6" />
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-start items-center"
        >
          <div className="w-full flex flex-col">
            <div className="flex flex-col flex-grow">
              <TextField
                  id="outline-name"
                  name="name"
                  label="Name"
                  variant="filled"
                  // value={selectedItem.id || ''}

                  {...register("name", { required: true })}
                />
              <div className="flex flex-col w-full mt-1">
                <TextField
                  id="filled-role"
                  select
                  label="Course status"
                  // defaultValue="  "
                  SelectProps={{
                    native: true,
                  }}
                  helperText="Please select a type of user"
                  variant="filled"
                  name="status"
                  {...register("status", { required: "select one option" })}
                >
                  <option value=""></option>
                  <option value="open">Open</option>
                  <option value="close">Close</option>
                </TextField>
              </div>
              <TextField
                  id="outline-name"
                  name="description"
                  label="Description"
                  variant="filled"
                  // value={selectedItem.id || ''}

                  {...register("description", { required: true })}
                />
            </div>
            <Button
              disabled={isSubmitting}
              type="submit"
              className="w-1/4 flex mt-2 self-end justify-center 
              bg-mainBlueColor text-white font-bold tracking-wide py-2 rounded-md
              hover:cursor-pointer hover:bg-blue-700"
            >
              Submit
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
