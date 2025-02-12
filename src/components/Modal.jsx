import { IoMdClose } from "react-icons/io";

const Modal = ({ onClose, children, title }) => {
  return (
    <div className="w-full h-dvh overflow-hidden fixed top-0 left-0 bg-darkGray bg-opacity-70 flex justify-center items-center text-center z-10">
      <div
        onClick={e => e.stopPropagation()}
        className="absolute top-40 left-1/3 w-[400px] h-[450px] z-50 bg-white border-2 border-darkGray rounded-lg border-opacity-30 overflow-x-hidden overflow-y-scroll scrollbar-hide"
      >
        <div className="relative flex w-full h-[15%]">
          <div className="absolute top-0 left-0 flex w-full h-full justify-between items-center px-5 border-b-2 border-gray">
            <span className="font-medium text-2xl">{title}</span>
            <IoMdClose onClick={onClose} className="font-semibold size-6" />
          </div>
        </div>
        <div className="flex w-full h-[85%]">{children}</div>
      </div>
    </div>
  );
};
export default Modal;
