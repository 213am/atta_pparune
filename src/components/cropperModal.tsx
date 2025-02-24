interface cropperModalProps {
  children?: React.ReactNode;
}

const cropperModal = ({ children }: cropperModalProps): JSX.Element => {
  return (
    <div className="absolute w-dvw h-dvh bg-green-300">
      <div>
        <span>이미지 크롭</span>
        <div></div>
      </div>
    </div>
  );
};

export default cropperModal;
