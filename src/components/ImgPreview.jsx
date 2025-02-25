import { ImCross } from "react-icons/im";

const ImgPreview = ({ image, onClose }) => {
  console.log(image);

  return (
    <div className="absolute flex flex-col w-full h-full bg-black">
      <div className="flex w-full h-[20%] text-white p-4">
        <ImCross className="cursor-pointer" onClick={onClose} />
      </div>
      <div className="flex w-full h-[50%] items-center justify-center">
        <img src={image} alt="" className="flex w-full h-full" />
      </div>
    </div>
  );
};
export default ImgPreview;
