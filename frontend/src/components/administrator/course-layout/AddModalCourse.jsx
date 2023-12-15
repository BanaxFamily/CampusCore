/* eslint-disable react/prop-types */
import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import * as CourseApi from "../../../network/course_api";
import DashBoardHeading from "../../reusable/DashBoardHeading";
import Modal from "../Modal";

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
      {/* <div className="mb-3">
        <DashboardHeading title="Add course" desc="" className="py-6" />
      </div> */}
      <Modal onDismiss={onClose} width="md:!w-[30rem]" heading={<DashBoardHeading title="Add course" desc="" />}>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-start items-center"
        >
          <div className="w-full flex flex-col gap-2">
            <div className="flex flex-col flex-grow gap-2">
              <TextField
                id="outline-name"
                name="name"
                label="Name"
                size="small"
                InputLabelProps={{ style: { fontSize: '0.775rem' } }}
                {...register("name", { required: true })}
              />
              <div className="flex flex-col w-full mt-1">
                <TextField
                  id="filled-role"
                  select
                  label="Course status"
                  InputLabelProps={{ style: { fontSize: '0.775rem' } }}
                  SelectProps={{
                    native: true,
                  }}
                  name="status"
                  size="small"
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
                size="small"
                InputLabelProps={{ style: { fontSize: '0.775rem' } }}
                {...register("description", { required: true })}
              />
            </div>
            <Button
              disabled={isSubmitting}
              type="submit"
              variant="contained"
              className="w-1/4 flex !mt-2 self-end justify-center
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
