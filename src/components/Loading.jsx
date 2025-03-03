import styled from "@emotion/styled";
import { MoonLoader } from "react-spinners";

const SubmitDiv = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
`;

const Loading = () => {
  return (
    <SubmitDiv>
      <MoonLoader size={200} speedMultiplier={0.3} />
    </SubmitDiv>
  );
};
export default Loading;
