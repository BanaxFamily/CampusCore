/* eslint-disable react/prop-types */
const Modal = ({ heading, onDismiss, children }) => {
  return (
    <div className="fixed bg-black/70 inset-0 flex items-center justify-center z-50">
      <div className=" bg-white relative w-11/12 md:max-w-xl mx-auto rounded shadow-lg z-50 overflow-y-auto">
        <div className=" py-4 text-left px-6">
          <div className="flex justify-end">
            <button
              className="text-red-400 hover:text-red-700 absolute top-0 right-0 text-2xl cursor-pointer z-50"
              onClick={onDismiss}
            >
              &times;
            </button>
          </div>
          {heading}

          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
