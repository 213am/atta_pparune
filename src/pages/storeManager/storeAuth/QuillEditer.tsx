import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const QuillEditer = ({ value }: { value: string }): JSX.Element => {
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    setDescription(value);
  }, [value]);

  return (
    <ReactQuill
      value={description}
      onChange={e => {
        setDescription(e);
      }}
      className="flex flex-col w-2/3 h-full"
      readOnly={false}
      modules={{
        toolbar: false,
      }}
    />
  );
};

export default QuillEditer;
