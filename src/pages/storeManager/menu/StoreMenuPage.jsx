import styled from "@emotion/styled";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useRef, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import * as yup from "yup";
import SideBar from "../SideBar";

import axios from "axios";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { getCookie } from "../../../components/cookie";
import useModal from "../../../components/useModal";
import { DOCKER_URL } from "../../../constants/url";

const LayoutDiv = styled.div`
  display: flex;
  gap: 30px;
  background-color: #eee;
  max-height: 100vh;
  height: auto;
  overflow: hidden;
`;

const ContentDiv = styled.div`
  flex-wrap: wrap;
  padding: 20px 0;
  padding-bottom: 30px;
  width: 100%;
  max-height: calc(100vh - 60px);
  overflow-y: auto;
`;

const TitleDiv = styled.div`
  padding-left: 10px;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 20px;
`;

const MenuDiv = styled.div`
  background-color: #fff;
  margin: 10px 0;
  padding: 20px;
  border-radius: 5px;
  box-shadow:
    0px 20px 25px -5px rgba(0, 0, 0, 0.1),
    0px 10px 10px -5px rgba(0, 0, 0, 0.04);
`;

const MenuImg = styled.img`
  width: 210px;
  height: 210px;
  border-radius: 5px;
  background-color: #eee;
`;

const MenuNameDiv = styled.div`
  margin-top: 5px;
  font-size: 20px;
  overflow: hidden;
  max-height: 30px;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
const MenuCostDiv = styled.div`
  margin-top: 5px;
  font-size: 14px;
  font-weight: 700;
`;

const MenuAddDiv = styled.div`
  margin: 10px auto;
  img {
    display: block;
    width: 200px;
    height: 200px;
    border-radius: 5px;
    background-color: #eee;
    position: relative;
  }
  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
  }
  span {
    display: block;
    width: 60px;
    text-align: left;
  }
  input {
    width: 120px;
  }
  button {
    margin-top: 20px;
    padding: 5px 20px;
    color: #fff;
    background-color: #6f4cdb;
    border-radius: 5px;
  }
  p {
    width: 25px;
    height: 25px;
    position: absolute;
    right: 96px;
    bottom: 37%;
    color: #6f4cdb;
    background-color: #fff;
    border-radius: 15px;
  }
`;

const MenuSchema = yup.object({
  categoryName: yup.string(),
  menuName: yup.string(),
  price: yup.string(),
});

function StoreMenuPage() {
  const restaurantId = sessionStorage.getItem("restaurantId");
  const accessToken = getCookie();

  const [isClick, setIsClick] = useState({
    modal1: false,
    modal2: false,
  });
  const [menuCateList, setMenuCateList] = useState([]);

  // 이미지 미리보기 state
  const [preview, setPreview] = useState();
  // 이미지 파일 state
  const [imgFile, setImgFile] = useState([]);

  const fileInputRef = useRef(null);

  const [patchMenuData, setPatchMenuData] = useState({});

  // 수정할 메뉴 이미지
  const [menuEditPic, setMenuEditPic] = useState();

  const { register, handleSubmit, setValue } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(MenuSchema),
  });

  const titleChange = () => {
    if (isClick.modal1) {
      return "메뉴 추가하기";
    } else if (isClick.modal2) {
      return "메뉴 수정하기";
    }
  };
  const { Modal, open } = useModal({
    title: titleChange(),
  });

  // 식당 상세정보 보기
  const getStoreInfo = async () => {
    try {
      const res = await axios.get(
        `/api/restaurant?restaurantId=${restaurantId}`,
      );
      const result = res.data.resultData;
      // console.log("이거 써!", result);
      setMenuCateList(result.menuCateList);
    } catch (error) {
      console.log(error);
    }
  };

  // 메뉴 삭제
  const deleteMenu = async (cateId, menuId) => {
    try {
      await axios.delete(
        `/api/admin/restaurant/v3/menu?categoryId=${cateId}&menuId=${menuId}&restaurantId=${restaurantId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );
      getStoreInfo();
      Swal.fire("메뉴가 삭제 되었습니다.", "", "success");
    } catch (error) {
      console.log(error);
    }
  };

  // 메뉴 추가
  const postMenu = async data => {
    try {
      await axios.post("/api/admin/restaurant/v3/menu", data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setIsClick({});
      Swal.fire({
        title: "메뉴가 추가되었습니다.",
        icon: "success",
        confirmButtonText: "확인",
        showConfirmButton: true, // ok 버튼 노출 여부
        allowOutsideClick: false, // 외부 영역 클릭 방지
      });
      getStoreInfo();
    } catch (error) {
      Swal.fire({
        title: "입력 데이터가 부족합니다.",
        icon: "error",
        confirmButtonText: "확인",
        showConfirmButton: true, // ok 버튼 노출 여부
        allowOutsideClick: false, // 외부 영역 클릭 방지
      });
      console.log(error);
    }
  };

  // 메뉴 이미지 수정
  const patchImg = async data => {
    try {
      await axios.patch("/api/admin/restaurant/v3/pic/menu", data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  // 메뉴 정보 수정
  const patchMenu = async data => {
    try {
      await axios.patch("/api/admin/restaurant/menu", data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setIsClick({});
      Swal.fire({
        title: "메뉴가 수정되었습니다.",
        icon: "success",
        confirmButtonText: "확인",
        showConfirmButton: true, // ok 버튼 노출 여부
        allowOutsideClick: false, // 외부 영역 클릭 방지
      });
      getStoreInfo();
    } catch (error) {
      // console.log(data);
      console.log(error);
    }
  };

  // 삭제 버튼
  const handleClickDelete = (cateId, menuId) => {
    Swal.fire({
      title: "메뉴를 삭제하시겠습니까?",
      text: "삭제한 메뉴는 복구할 수 없습니다.",
      icon: "warning",

      showCancelButton: true,
      confirmButtonColor: "#79BAF2",
      cancelButtonColor: "#E44B58",
      confirmButtonText: "확인",
      cancelButtonText: "취소",

      reverseButtons: false,
    }).then(result => {
      if (result.isConfirmed) {
        deleteMenu(cateId, menuId);
      }
    });
  };

  // 이미지 미리보기
  const handleChangePreview = e => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setImgFile([file]);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // 폼 데이터 전송
  const handleSubmitForm = data => {
    console.log("폼데이터:", data);

    const postData = new FormData();

    // JSON 형식으로 p 객체 추가
    const pData = {
      restaurantId: restaurantId,
      categoryName: data.categoryName,
      menuName: data.menuName,
      price: parseInt(data.price),
    };
    console.log("이거 먼데??", imgFile);
    if (imgFile) {
      postData.append("pic", imgFile[0]); // 파일 추가
    } else {
      postData.append("pic", "");
    }
    // JSON으로 변경
    postData.append(
      "p",
      new Blob([JSON.stringify(pData)], { type: "application/json" }),
    );

    const patchData = {
      menuId: patchMenuData.menuId,
      categoryId: patchMenuData.categoryId,
      menuName: data.menuName,
      price: data.price,
    };

    const patchImgData = new FormData();
    if (imgFile) {
      patchImgData.append("pic", imgFile[0]);
    } else {
      patchImgData.append("pic", []);
    }
    patchImgData.append(
      "p",
      new Blob([JSON.stringify({ menuId: patchMenuData.menuId })], {
        type: "application/json",
      }),
    );

    console.log("FormData 확인:", [...postData.entries()]); // FormData 내부 확인
    console.log("patchData 확인:", patchData); // FormData 내부 확인
    console.log("ImgData 확인:", [...patchImgData.entries()]); // FormData 내부 확인
    if (isClick.modal1) {
      postMenu(postData);
    } else if (isClick.modal2) {
      patchImg(patchImgData);
      patchMenu(patchData);
    }
  };

  useEffect(() => {
    getStoreInfo();
  }, []);

  return (
    <div>
      <LayoutDiv>
        <SideBar />
        <div className="p-[10px]">
          <ContentDiv className="scrollbar-hide">
            <div className="absolute right-0 mr-10">
              <button
                type="button"
                onClick={() => {
                  setIsClick({ modal1: true });
                  setValue("categoryName", "");
                  setValue("menuName", "");
                  setValue("price", "");
                  setImgFile([]);
                  setPreview(null);
                  open();
                }}
                className="px-4 py-2 bg-primary text-white rounded-[5px] shadow-lg"
              >
                메뉴추가
              </button>
            </div>
            {menuCateList.map(item => (
              <div key={item.categoryId}>
                <TitleDiv>{item.categoryName}</TitleDiv>
                <div className="flex gap-[40px] flex-wrap mb-[30px]">
                  {item.menuList.map(menu => (
                    <MenuDiv key={menu.menuId}>
                      <MenuImg
                        src={`${DOCKER_URL}/pic/menu/${menu.menuId}/${menu?.menuPic}`}
                      />
                      <div className="flex items-center w-[210px] justify-between">
                        <MenuNameDiv>{menu.menuName}</MenuNameDiv>

                        <div className="flex items-center gap-[5px]">
                          <FiEdit
                            onClick={() => {
                              setPatchMenuData(prev => ({
                                ...prev,
                                menuId: menu.menuId,
                                categoryId: item.categoryId,
                              }));
                              setMenuEditPic(
                                `${DOCKER_URL}/pic/menu/${menu.menuId}/${menu?.menuPic}`,
                              );
                              setIsClick({ modal2: true });
                              setValue("categoryName", item.categoryName);
                              setValue("menuName", menu.menuName);
                              setValue("price", menu.price);
                              setImgFile(
                                `${DOCKER_URL}/pic/menu/${menu.menuId}/${menu?.menuPic}`,
                              );
                              open();
                            }}
                            className="w-5 h-5 cursor-pointer"
                          />
                          <IoMdClose
                            onClick={() =>
                              handleClickDelete(item.categoryId, menu.menuId)
                            }
                            className="w-6 h-6 cursor-pointer"
                          />
                        </div>
                      </div>
                      <MenuCostDiv>{menu.price.toLocaleString()}원</MenuCostDiv>
                    </MenuDiv>
                  ))}
                </div>
              </div>
            ))}
          </ContentDiv>
        </div>
      </LayoutDiv>
      {isClick.modal1 && (
        <Modal>
          <MenuAddDiv>
            <form
              onSubmit={handleSubmit(handleSubmitForm)}
              className="text-[14px]"
            >
              <img src={preview} />
              <p>
                <label htmlFor="menuImg">
                  <FaPlusCircle className="w-full h-full cursor-pointer" />
                </label>
                <input
                  type="file"
                  id="menuImg"
                  className="opacity-0"
                  accept="image/png, image/jpeg"
                  ref={fileInputRef}
                  onChange={e => handleChangePreview(e)}
                />
              </p>
              <div>
                <span>카테고리</span>
                <input
                  type="text"
                  placeholder="카테고리 이름"
                  {...register("categoryName")}
                />
              </div>
              <div>
                <span>메뉴명</span>
                <input
                  type="text"
                  placeholder="메뉴명"
                  {...register("menuName")}
                />
              </div>
              <div>
                <span>메뉴가격</span>
                <input
                  type="number"
                  placeholder="가격"
                  {...register("price")}
                />
              </div>
              <button type="submit">추가</button>
            </form>
          </MenuAddDiv>
        </Modal>
      )}

      {isClick.modal2 && (
        <Modal>
          <MenuAddDiv>
            <form
              onSubmit={handleSubmit(handleSubmitForm)}
              className="text-[14px]"
            >
              <img src={preview || menuEditPic} />
              <p>
                <label htmlFor="menuImg">
                  <FaPlusCircle className="w-full h-full cursor-pointer" />
                </label>
                <input
                  type="file"
                  id="menuImg"
                  className="opacity-0"
                  accept="image/png, image/jpeg"
                  ref={fileInputRef}
                  onChange={e => handleChangePreview(e)}
                />
              </p>
              <div>
                <span>카테고리</span>
                <input
                  type="text"
                  placeholder="카테고리 이름"
                  readOnly
                  {...register("categoryName")}
                />
              </div>
              <div>
                <span>메뉴명</span>
                <input
                  type="text"
                  placeholder="메뉴명"
                  {...register("menuName")}
                />
              </div>
              <div>
                <span>메뉴가격</span>
                <input
                  type="number"
                  placeholder="가격"
                  {...register("price")}
                />
              </div>
              <button type="submit">수정완료</button>
            </form>
          </MenuAddDiv>
        </Modal>
      )}
    </div>
  );
}
export default StoreMenuPage;
