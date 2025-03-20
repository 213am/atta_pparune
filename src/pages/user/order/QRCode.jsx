import axios from "axios";
import { motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import Swal from "sweetalert2";
import { isWhiteIcon } from "../../../atoms/noticeAtom";
import { ticketDataAtom, ticketIdAtom } from "../../../atoms/userAtom";
import { getCookie } from "../../../components/cookie";
import LoadingScreen from "../../../components/LoadingScreen";
import MenuBar from "../../../components/MenuBar";
import Notification from "../../../components/notification/NotificationIcon";
import { DOCKER_URL } from "../../../constants/url";

const QRCode = () => {
  const [isWhite, setIsWhite] = useRecoilState(isWhiteIcon);
  const [newTicketId, setNewTicketId] = useRecoilState(ticketIdAtom);
  const [newTicketData, setTicketData] = useRecoilState(ticketDataAtom);
  const accessToken = getCookie();
  const signedUserId = sessionStorage.getItem("userId");
  const [isReady, setIsReady] = useState(false); // clip-path 적용 완료 여부

  const navigate = useNavigate();
  const { id } = useParams();

  const visualRef = useRef(null);
  const infoRef = useRef(null);

  const applyClipPath = () => {
    if (!visualRef.current || !infoRef.current) return;

    const visual = visualRef.current;
    const info = infoRef.current;
    const couponW = visual.clientWidth;
    const visualH = visual.clientHeight;
    const infoH = info.clientHeight;

    visual.style.clipPath = `path('M0 0 L0 ${visualH - 5} Q10 ${visualH - 5} 10 ${visualH} L ${couponW - 10} ${visualH} Q${couponW - 10} ${visualH - 5} ${couponW} ${visualH - 5} L${couponW} 0 Z')`;
    info.style.clipPath = `path('M10 0 Q10 10 0 10 L0 ${infoH} L${couponW} ${infoH} L${couponW} 10 Q${couponW - 10} 10 ${couponW - 10} 0 Z')`;
  };

  useEffect(() => {
    setIsWhite(false);
    if (id) {
      setNewTicketId(id);
      fetchTicketData(parseInt(id));
    } else {
      fetchTicketId();
    }
  }, [id]);

  useLayoutEffect(() => {
    const handleResize = () => {
      requestAnimationFrame(() => {
        applyClipPath();
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchTicketId = async () => {
    const params = { userId: signedUserId };
    try {
      const res = await axios.get("/api/order/ticket/ticketOne", {
        params,
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const ticketId = res.data.resultData;
      if (ticketId) {
        setNewTicketId(ticketId);
        fetchTicketData(ticketId);
      } else {
        console.warn("티켓 ID가 없습니다.");
      }
    } catch (error) {
      console.error("티켓 ID 가져오기 실패:", error);
    }
  };

  const fetchTicketData = async ticketId => {
    if (!ticketId) return;

    try {
      const res = await axios.get("/api/order/ticket", {
        params: { ticketId },
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const ticket = res.data.resultData.ticket;
      setTicketData(ticket);

      requestAnimationFrame(() => {
        applyClipPath();
        // 2초간 로딩 후 화면 렌더링
        setTimeout(() => {
          setIsReady(true);
        }, 1500);
      });
    } catch (error) {
      console.error("티켓 데이터를 가져오는 중 오류 발생:", error);
      alert("티켓 정보를 가져오는 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  useEffect(() => {
    if (!newTicketId) return;

    const intervalId = setInterval(async () => {
      try {
        const res = await axios.get("/api/order/ticket", {
          params: { ticketId: newTicketId },
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        const ticket = res.data.resultData.ticket;
        if (ticket.ticketStatus === 1) {
          clearInterval(intervalId);
          sessionStorage.removeItem("ticketId");
          Swal.fire({
            title: "식권이 사용되었어요",
            icon: "success",
            confirmButtonText: "확인",
            allowOutsideClick: false,
          }).then(result => {
            if (result.isConfirmed) {
              navigate("/user");
            }
          });
        }
      } catch (error) {
        console.error("티켓 상태 조회 실패:", error);
      }
    }, 3000);

    return () => clearInterval(intervalId);
  }, [newTicketId]);

  const qrValue =
    id && newTicketData.restaurantId
      ? `${DOCKER_URL}/store/request?ticketId=${id}&restaurantId=${newTicketData.restaurantId}`
      : "";

  return (
    <div className="flex flex-col w-full h-dvh px-5 py-20 overflow-x-hidden overflow-y-scroll scrollbar-hide">
      <Notification />
      <div className="absolute top-0 left-0 w-full flex justify-between items-center px-3 py-5 border-b-2 border-gray border-opacity-70 bg-white z-30">
        <span className="flex w-[10%] justify-center text-2xl cursor-pointer">
          <IoMdArrowBack onClick={() => navigate("/user/order")} />
        </span>
        <span className="text-xl font-semibold tracking-wider">내 식권</span>
        <span>&emsp;</span>
      </div>

      {!isReady ? (
        <LoadingScreen message="식권 준비 중..." />
      ) : (
        // 식권 UI 등장 애니메이션 (fade-in)
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* 시각적 요소 섹션 */}
          <section
            id="visual"
            ref={visualRef}
            className="overflow-visible mt-2"
          >
            <div className="gap-4 pb-5 flex flex-col items-center justify-center bg-gray rounded-t-2xl border-b-2 border-dotted border-darkGray">
              <div className="w-full text-center bg-primary rounded-t-2xl p-6 text-white font-bold">
                <span className="font-bold text-4xl text-nowrap">
                  {newTicketData.restaurantName}
                </span>
              </div>
              <div className="flex flex-col w-full items-center">
                <span className="text-base -ml-44 text-nowrap">
                  식권 발급 시간
                </span>
                <div className="flex text-2xl text-center font-semibold gap-8">
                  <span className="flex tracking-widest">
                    {newTicketData?.reservationTime?.split(" ")[0]}
                  </span>
                  <span className="flex tracking-widest">
                    {newTicketData?.reservationTime?.split(" ")[1]?.slice(0, 5)}
                  </span>
                </div>
              </div>
              <div className="flex flex-col w-full items-center gap-2 px-4">
                <span className="text-2xl">
                  {(() => {
                    const menuList = newTicketData.menuNames.split(",");
                    const firstMenu = menuList[0].trim();
                    const extraCount = menuList.length - 1;

                    return extraCount === 0
                      ? firstMenu
                      : `${firstMenu} 외 ${extraCount}개`;
                  })()}
                </span>
                <span className="text-4xl font-bold tracking-wider">
                  {newTicketData.totalAmount.toLocaleString("ko-KR")}원
                </span>
                <span className="text-xl">
                  {newTicketData.personCount === 0
                    ? `앉아서 주문`
                    : `${newTicketData.personCount}명 예약`}
                </span>
              </div>
            </div>
          </section>

          {/* 정보 요소 섹션 */}
          <section id="info" ref={infoRef}>
            <div className="p-10 flex flex-col justify-center items-center bg-gray rounded-b-2xl border-t-2 border-dotted border-darkGray">
              <div className="flex w-full justify-center items-center">
                {qrValue && (
                  <QRCodeSVG value={qrValue} size={180} bgColor="none" />
                )}
              </div>
            </div>
          </section>
          <div className="text-xl underline text-center mt-10 pb-16">
            예약 취소는 매장으로 문의해주세요
          </div>
        </motion.div>
      )}
      <MenuBar />
    </div>
  );
};

export default QRCode;
