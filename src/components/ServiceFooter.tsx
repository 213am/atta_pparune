import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { roleAtom } from "../atoms/roleAtom";
import { COMPANY, STORE, USER } from "../constants/Role";
import { IoLogoFigma, IoLogoGithub } from "react-icons/io5";
import { RiNotionFill } from "react-icons/ri";

const ServiceFooter = (): JSX.Element => {
  const navigate = useNavigate();
  const [_, setRole] = useRecoilState(roleAtom);

  const handleClick = (icon: string) => {
    let url;
    switch (icon) {
      case "GitHub":
        url = "https://github.com/213am/atta_pparune";
        break;
      case "Notion":
        url =
          "https://buttercup-lyric-4ee.notion.site/19f6cf890caa80118725cc8758d33945?pvs=4";
        break;
      case "Figma":
        url =
          "https://www.figma.com/design/25XZ970lOnvXHOMTTKk9DG/3%EC%B0%A8-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8?node-id=0-1&p=f&t=X24f0fauGuIFK0KT-0";
        break;
    }

    window.open(url, "_blank", "noopener noreferrer");
  };

  return (
    <div className="w-[100vw] z-20 bg-black bg-opacity-[0.97] text-darkGray pt-[30px] bottom-0 mt-[300px]">
      <div className="flex justify-between text-tableGray">
        <div>
          <div className="w-[150px] mx-[250px] text-center">
            <div className="w-[150px] cursor-pointer">
              <img src="/adminLogo.png" alt="" />
            </div>
            {/* <div className="text-[20px]">아따 빠르네</div> */}
          </div>
          <div className="mx-[250px] my-[40px] font-normal text-[14px] flex flex-col gap-2">
            <div>대구광역시 중구 중앙대로 394, 제일빌딩 5층</div>
            <div>
              (주)아따빠르네 | 대표이사: 사공수기 | 사업자등록번호: 401-81-98765
            </div>
            <div>통신판매업 신고번호: 2025-대구중구-41937호</div>
            <div>Email: jumoney1012@gmail.com</div>
          </div>
        </div>

        <ul className="mr-[250px] flex flex-col gap-5 text-[14px]">
          <li className="text-white font-bold text-[16px] mb-3">
            서비스 이용하기
          </li>
          <li
            className="hover:text-gray cursor-pointer"
            onClick={() => {
              setRole(COMPANY);
              navigate("/auth");
            }}
          >
            회사 서비스
          </li>
          <li
            className="hover:text-gray cursor-pointer"
            onClick={() => {
              setRole(STORE);
              navigate("/auth");
            }}
          >
            식당 서비스
          </li>
          <li
            className="hover:text-gray cursor-pointer"
            onClick={() => {
              setRole(USER);
              navigate("/auth");
            }}
          >
            사용자 서비스
          </li>
        </ul>
      </div>
      <div className="bg-black py-[30px]">
        <div className="flex justify-between mx-[250px] items-center">
          <div>© 2025. Atta Pparune All rights reserved.</div>
          <div className="flex gap-5 text-white">
            {/* 깃허브 */}
            <div
              onClick={() => handleClick("GitHub")}
              className="cursor-pointer"
            >
              <div className="flex justify-center">
                <IoLogoGithub className="w-8 h-8" />
              </div>
            </div>
            {/* 노션 */}
            <div
              onClick={() => handleClick("Notion")}
              className="cursor-pointer"
            >
              <div className="flex justify-center">
                <RiNotionFill className="w-8 h-8" />
              </div>
            </div>
            {/* 피그마 */}
            <div
              onClick={() => handleClick("Figma")}
              className="cursor-pointer"
            >
              <div className="flex justify-center">
                <IoLogoFigma className="w-8 h-8" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceFooter;
