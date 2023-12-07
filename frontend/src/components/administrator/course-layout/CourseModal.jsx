/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import * as CourseApi from "../../../network/course_api";
import Modal from "../Modal";
import DashboardHeading from "../../reusable/DashBoardHeading";

export default function CourseModal({ onClose }) {
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
      alert("User added successfully!");
      reset();
    }
  }
  return (
    <>
      <Modal onDismiss={onClose}>
        <div className="mb-3">
          <DashboardHeading title="Add course" desc="" className="py-6"/>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-start items-center"
        >
          <div className="w-full flex flex-col">
            <div className="flex flex-row">
              <div className="mb-4 flex flex-col gap-8 text-sm font-semibold">
                <label htmlFor="name">Name&nbsp;</label>
                <label htmlFor="status">Status&nbsp;</label>
                <label htmlFor="desc  ription">Description&nbsp;</label>
              </div>
              <div className="flex flex-col flex-grow gap-6">
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="course.."
                  className=" bg-gray-200 pl-2 py-1 w-full border-b border-gray-500 rounded-md"
                  {...register("name", { required: true })}
                />
                <input
                  type="text"
                  id="status"
                  name="status"
                  className=" bg-gray-200 py-1 w-full border-b border-gray-500 rounded-md"
                  {...register("status", { required: true })}
                />
                <input
                  type="text"
                  id="description"
                  name="description"
                  className=" bg-gray-200 py-1 w-full border-b border-gray-500 rounded-md"
                  {...register("description", { required: true })}
                />
              </div>
            </div>
            <button
              disabled={isSubmitting}
              type="submit"
              className="w-1/4 flex self-end justify-center
              bg-mainBlueColor text-white font-bold tracking-wide py-1 rounded-md
              hover:cursor-pointer hover:bg-mainBlueColor/90"
            >
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
