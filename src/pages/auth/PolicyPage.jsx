import styled from "@emotion/styled";
import { useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { IoMdArrowBack } from "react-icons/io";
import useModal from "../../components/useModal";
import { CloseDiv, HeaderDiv } from "./loginStyle";
import { useNavigate } from "react-router-dom";

// 체크박스
export const CheckBoxDiv = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  > * {
    cursor: pointer;
  }
  input {
    display: none;
  }
  em {
    display: inline-block;
    color: #ddd;
    transform: translateY(1.5px);
    margin-right: 8px;
  }
  input:checked + em {
    color: #ff0000;
  }
  b {
    color: #6f4cdb;
    font-size: 14px;
  }
  span {
    font-weight: 600;
  }
`;

export const AgreementDocumentDiv = styled.div`
  padding: 20px 30px 0;
  overflow-y: auto;
  text-align: left;
  max-width: 500px;
  line-height: 1.35em;
  margin-bottom: 10px;
  * {
    word-break: keep-all;
  }
  > div {
    padding: 5px 0;
    margin-bottom: 10px;

    p {
      font-weight: 600;
      line-height: 1.8em;
      margin-bottom: 5px;
    }
    span {
      display: block;
      padding: 5px 10px;
      font-size: 14px;
      color: #555;
      line-height: 1.5em;
    }
    > ul {
      font-size: 13px;
      padding: 10px 25px;
      &:last-of-type {
        margin-bottom: 0;
      }
      > li {
        color: #777;
        margin-bottom: 10px;
        > ul {
          background-color: #eee;
          margin-top: 10px;
          padding: 15px;
          line-height: 1.5em;
        }
      }
    }
  }
  .item {
    font-size: 14px;
    line-height: 2em;
    b {
      font-weight: 700;
      display: inline-block;
      width: 80px;
    }
    em {
      color: #777;
    }
  }
`;

const ContentDiv = styled.div`
  padding: 40px;
  margin: 0 auto;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
  border-radius: 10px;
  border: 0.5px solid #eee;
  box-shadow:
    0px 20px 25px -5px rgba(0, 0, 0, 0.1),
    0px 10px 10px -5px rgba(0, 0, 0, 0.04);
  button {
    padding: 10px 0;
    border-radius: 5px;
    background-color: #6f4cdb;
    color: #fff;
    margin-top: 150px;
  }
`;

function PolicyPage() {
  const [isAgree, setIsAgree] = useState({
    agree1: false,
    agree2: false,
    agree3: false,
    agree4: false,
  });

  const [isClick, setIsClick] = useState({
    modal1: false,
    modal2: false,
    modal3: false,
    modal4: false,
  });

  const navigate = useNavigate();

  const isAllChecked =
    isAgree.agree1 && isAgree.agree2 && isAgree.agree3 && isAgree.agree4;

  const titleChange = () => {
    if (isClick.modal1) {
      return "이용약관";
    } else if (isClick.modal2) {
      return "개인정보 처리방침";
    } else if (isClick.modal3) {
      return "위치 정보";
    } else if (isClick.modal4) {
      return "푸시 알림";
    }
  };

  const { Modal, open, close } = useModal({ title: titleChange() });

  return (
    <div style={{ textAlign: "center" }}>
      <HeaderDiv>
        <CloseDiv>
          <IoMdArrowBack
            style={{ width: "100%", height: "100%", cursor: "pointer" }}
            onClick={() => navigate(-1)}
          />
        </CloseDiv>
      </HeaderDiv>
      <div style={{ marginBottom: 20, fontSize: 28, fontWeight: 700 }}>
        <span style={{ color: "#6f4cdb" }}>[아따빠르네]</span> 이용약관 및
        개인정보 처리방침
      </div>
      <ContentDiv>
        {/* 전체 동의 */}
        <CheckBoxDiv>
          <input type="checkbox" checked={isAllChecked} />
          <em>
            <FaCheck
              onClick={() => {
                if (isAllChecked) {
                  setIsAgree({
                    agree1: false,
                    agree2: false,
                    agree3: false,
                    agree4: false,
                  });
                } else {
                  setIsAgree({
                    agree1: true,
                    agree2: true,
                    agree3: true,
                    agree4: true,
                  });
                }
              }}
            />
          </em>
          <span>전체동의</span>
        </CheckBoxDiv>
        <div
          style={{ border: "1px solid #eee", marginBottom: 20, width: "100%" }}
        />
        {/* 이용약관 */}
        <CheckBoxDiv>
          <input type="checkbox" checked={isAgree.agree1} />
          <em>
            <FaCheck
              onClick={() =>
                setIsAgree({ ...isAgree, agree1: !isAgree.agree1 })
              }
            />
          </em>
          <span>
            <b>(필수)</b> 이용약관에 동의합니다.
            <em>
              <FaChevronRight
                onClick={() => {
                  open();
                  setIsClick({ modal1: true });
                }}
                style={{
                  marginBottom: 2,
                  width: 12,
                  height: 12,
                  color: "#333",
                  marginLeft: 5,
                }}
              />
            </em>
          </span>
        </CheckBoxDiv>

        {/* 개인정보 처리방침 */}
        <CheckBoxDiv>
          <input type="checkbox" checked={isAgree.agree2} />
          <em>
            <FaCheck
              onClick={() =>
                setIsAgree({ ...isAgree, agree2: !isAgree.agree2 })
              }
            />
          </em>
          <span>
            <b>(필수)</b> 개인정보 처리방침에 동의합니다.
            <em>
              <FaChevronRight
                onClick={() => {
                  open();
                  setIsClick({ modal2: true });
                }}
                style={{
                  marginBottom: 2,
                  width: 12,
                  height: 12,
                  color: "#333",
                  marginLeft: 5,
                }}
              />
            </em>
          </span>
        </CheckBoxDiv>

        <CheckBoxDiv>
          <input type="checkbox" checked={isAgree.agree3} />
          <em>
            <FaCheck
              onClick={() =>
                setIsAgree({ ...isAgree, agree3: !isAgree.agree3 })
              }
            />
          </em>
          <span>
            <b>(필수)</b> 위치 정보 제공에 동의합니다.
            <em>
              <FaChevronRight
                onClick={() => {
                  open();
                  setIsClick({ modal3: true });
                }}
                style={{
                  marginBottom: 2,
                  width: 12,
                  height: 12,
                  color: "#333",
                  marginLeft: 5,
                }}
              />
            </em>
          </span>
        </CheckBoxDiv>
        <CheckBoxDiv>
          <input type="checkbox" checked={isAgree.agree4} />
          <em>
            <FaCheck
              onClick={() =>
                setIsAgree({ ...isAgree, agree4: !isAgree.agree4 })
              }
            />
          </em>
          <span>
            <b>(필수)</b> 푸시 알림에 동의합니다.
            <em>
              <FaChevronRight
                onClick={() => {
                  open();
                  setIsClick({ modal4: true });
                }}
                style={{
                  marginBottom: 2,
                  width: 12,
                  height: 12,
                  color: "#333",
                  marginLeft: 5,
                }}
              />
            </em>
          </span>
        </CheckBoxDiv>
        <button
          style={{ backgroundColor: !isAllChecked && "#ddd" }}
          disabled={!isAllChecked}
          onClick={() => navigate("/auth/signup")}
        >
          다음
        </button>
      </ContentDiv>

      {/* 이용약관 내용 */}
      {isClick.modal1 && (
        <Modal>
          <AgreementDocumentDiv>
            <div>
              <p>제1조 (목적)</p>
              <span>
                이 약관은 [아따빠르네] (이하 &quot;서비스&quot;)가 제공하는
                음식점 예약 및 회사 식대 관리 서비스의 이용에 대한 규정과 조건을
                정하는 것을 목적으로 합니다.
              </span>
            </div>
            <div>
              <p>제2조 (서비스 이용)</p>
              <span>
                1. 서비스는 사용자에게 음식점 예약, 대기 시간 알림, 그리고
                회사의 식대 관리 기능을 제공합니다.
              </span>
              <span>
                2. 서비스 이용자는 서비스 내에서 제공되는 모든 기능을 본 약관과
                법령에 따라 사용해야 합니다.
              </span>
            </div>
            <div>
              <p>제3조 (회원 가입 및 계정 관리)</p>
              <span>
                1. 서비스 이용자는 회원 가입 시 정확한 정보를 제공해야 하며,
                이를 최신 상태로 유지해야 합니다.
              </span>
              <span>
                2. 회원은 자신의 계정을 안전하게 관리해야 하며, 제3자에게 계정을
                공유하거나 양도할 수 없습니다.
              </span>
            </div>
            <div>
              <p>제4조 (음식점 예약 서비스)</p>
              <span>
                1. 사용자는 앱을 통해 원하는 음식점의 예약을 진행할 수 있습니다.
              </span>
              <span>
                2. 예약 시 정확한 정보(예약 시간, 인원 등)를 제공해야 하며, 예약
                후 취소 시에는 해당 음식점의 정책에 따라 처리가 될 수 있습니다.
              </span>
              <span>
                3. 음식점 예약 및 대기 시간이 변동될 수 있으며, 사용자는 이에
                동의한 상태에서 서비스를 이용합니다.
              </span>
            </div>
            <div>
              <p>제5조 (회사 식대 관리)</p>
              <span>
                1. 회사는 이 앱을 통해 직원들의 식대를 관리할 수 있으며, 관련된
                정보(식사 내역, 금액 등)를 기록할 수 있습니다.
              </span>
              <span>
                2. 사용자는 회사가 제공하는 식대 관리 기능을 통해 본인의 식사
                내역을 확인하고 관리할 수 있습니다.
              </span>
              <span>
                3. 회사 식대 관련 데이터는 회사 내부 정책에 따라 관리되며,
                사용자는 이에 동의한 상태에서 서비스를 이용합니다.
              </span>
            </div>
            <div>
              <p>제6조 (책임의 한계)</p>
              <span>
                1. 서비스 제공자는 서버 오류나 네트워크 문제로 인해 서비스
                이용에 불편이 발생할 수 있으며, 이에 대한 책임을 지지 않습니다.
              </span>
              <span>
                2. 사용자는 예약 정보나 식대 관련 내역에 오류가 발생했을 경우,
                해당 문제를 음식점이나 회사와 직접 해결해야 합니다.
              </span>
            </div>
          </AgreementDocumentDiv>
        </Modal>
      )}

      {/* 개인정보 수집 내용 */}
      {isClick.modal2 && (
        <Modal>
          <AgreementDocumentDiv>
            <div>
              <p>1. 개인정보의 수집 항목</p>
              <span>서비스는 다음과 같은 개인정보를 수집합니다:</span>
              <span>
                - 필수 항목: 이름, 전화번호, 이메일, 예약 내역, 식사 내역, 회사
                관련 정보(식대 관리), 위치 정보 (위치 기반 서비스 사용 시)
              </span>
            </div>
            <div>
              <p>2. 개인정보의 이용 목적</p>
              <span>수집된 개인정보는 다음의 목적을 위해 사용됩니다:</span>
              <span>
                - 음식점 예약 서비스 제공 (예약 정보, 대기 시간 알림 등)
              </span>
              <span>- 회사 식대 관리 (직원 식대 내역 관리)</span>
              <span>- 회원 관리 및 서비스 개선</span>
            </div>
            <div>
              <p>3. 개인정보의 보유 기간</p>
              <span>
                회원 탈퇴 시까지 개인정보는 보유됩니다. 탈퇴 후에는 해당 정보가
                즉시 삭제됩니다.
              </span>
            </div>
            <div>
              <p>4. 개인정보의 제3자 제공</p>
              <span>
                서비스는 개인정보를 제3자에게 제공하지 않으며, 서비스 제공에
                필요한 범위 내에서만 사용됩니다.
              </span>
            </div>
          </AgreementDocumentDiv>
        </Modal>
      )}

      {/* 위치 정보 제공 동의 */}
      {isClick.modal3 && (
        <Modal>
          <AgreementDocumentDiv>
            <div>
              <p>위치 정보 제공 동의</p>
              <span>
                서비스는 위치 기반 서비스를 제공하기 위해 사용자의 위치 정보를
                수집하고, 이를 통해 근처 음식점 예약가능 여부 예측 등을
                제공합니다.
              </span>
              <span>
                위치 정보 제공에 동의하시면 서비스를 원활하게 이용할 수
                있습니다.
              </span>
            </div>
          </AgreementDocumentDiv>
        </Modal>
      )}

      {/* 푸시 알림 동의 */}
      {isClick.modal4 && (
        <Modal>
          <AgreementDocumentDiv>
            <div>
              <p>푸시 알림 동의</p>
              <span>
                서비스는 예약 확인, 대기 시간 알림, 식대 내역 업데이트 등의
                알림을 푸시 알림을 통해 제공합니다.
              </span>
              <span>
                푸시 알림을 수신하려면 동의가 필요합니다. 푸시 알림 수신 여부는
                설정에서 언제든지 변경할 수 있습니다.
              </span>
            </div>
          </AgreementDocumentDiv>
        </Modal>
      )}
    </div>
  );
}
export default PolicyPage;
