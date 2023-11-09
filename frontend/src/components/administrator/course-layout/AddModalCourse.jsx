/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import * as CourseApi from "../../../network/course_api";
import Modal from "../Modal";
import DashboardHeading from "../../reusable/DashBoardHeading";

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
              <label htmlFor="name">Name&nbsp;</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="course.."
                className=" bg-gray-200 pl-2 py-1 w-full border-b border-gray-500 rounded-md"
                {...register("name", { required: true })}
              />
              <label htmlFor="status">Status&nbsp;</label>
              <select
                id="roles"
                name="status"
                {...register("status", { required: "select one option" })}
                className="w-full text-sm md:text-[12px] border-0 rounded-md bg-gray-300 py-2 md:py-2 px-4 "
              >
                <option defaultValue="" className="text-gray-300">
                  --open or close
                </option>
                <option value="Admin">Open</option>
                <option value="Faculty">Close</option>
              </select>
              <label htmlFor="desc  ription">Description&nbsp;</label>
              <input
                type="text"
                id="description"
                name="description"
                className=" bg-gray-200 py-1 w-full border-b border-gray-500 rounded-md"
                {...register("description", { required: true })}
              />
            </div>
            <button
              disabled={isSubmitting}
              type="submit"
              className="w-1/4 flex mt-2 self-end justify-center 
              bg-mainBlueColor text-white font-bold tracking-wide py-2 rounded-md
              hover:cursor-pointer hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
