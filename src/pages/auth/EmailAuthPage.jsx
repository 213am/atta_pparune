import styled from "@emotion/styled";
import { AiFillUnlock } from "react-icons/ai";
import { Link } from "react-router-dom";
import { LayoutDiv } from "./loginStyle";
// const ResendBtn = styled.button`
//   margin-top: 20px;
//   background-color: #d5cbf5;
//   color: #333;
//   padding: 10px 25px;
//   border-radius: 5px;
//   font-weight: 700;
// `;

const FlexDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const MailImg = styled.img`
  width: 200px;
  margin-top: 30px;
`;

const ContentDiv = styled.div`
  font-size: 20px;
  span {
    color: #6f4cdb;
  }
`;

const TitleH1 = styled.h1`
  margin-top: 30px;
  margin-bottom: 30px;
  font-size: 24px;
`;

const NoticeDiv = styled.div`
  margin: 20px 0;
  padding: 15px 20px;
  border-radius: 5px;
  background-color: #eee;
  width: 500px;
  text-align: center;
`;

const NoticeTitleDiv = styled.div`
  font-size: 18px;
  margin-bottom: 10px;
  font-weight: 700;
`;
const NoticeContentDiv = styled.div`
  margin-top: 5px;
  color: #999;
`;

function EmailAuthPage() {
  return (
    <LayoutDiv>
      <FlexDiv>
        <MailImg src="/emailauth.png" alt="이메일 인증" />
      </FlexDiv>
      <TitleH1>인증 메일이 발송되었습니다.</TitleH1>
      <ContentDiv>
        메일함에서 (<span>jumoney1012@gmail.com</span>) 인증 메일을 확인
        바랍니다.
      </ContentDiv>
      <ContentDiv>
        이메일에서 인증 확인 링크를 선택하면 이메일 인증이 완료됩니다.
      </ContentDiv>
      <FlexDiv>
        <NoticeDiv>
          <NoticeTitleDiv>유의사항</NoticeTitleDiv>
          <NoticeContentDiv>
            1. 인증메일은 발송 시점으로부터 24시간 동안만 유효합니다.
          </NoticeContentDiv>
          <NoticeContentDiv>
            2. 메일이 도착하지 않았다면 스팸함을 확인해 주시기 바랍니다.
          </NoticeContentDiv>
          {/* <ResendBtn>인증메일 재발송</ResendBtn> */}
        </NoticeDiv>
      </FlexDiv>
      <Link to={"/auth"}>
        <AiFillUnlock style={{ width: 24, height: 24 }} />
        로그인 하러가기
      </Link>
    </LayoutDiv>
  );
}
export default EmailAuthPage;
