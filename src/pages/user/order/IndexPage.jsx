import { ClipLoader } from "react-spinners";

function IndexPage() {
  return (
    <div>
      <span>예약하기</span>
      <div className="flex">
        <ClipLoader />
        <span>예약 대기중</span>
      </div>
    </div>
  );
}
export default IndexPage;
