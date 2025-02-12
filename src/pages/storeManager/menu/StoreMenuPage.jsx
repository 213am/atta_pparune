import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import SideBar from "../SideBar";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import axios from "axios";
import { useForm } from "react-hook-form";
import { getCookie } from "../../../components/cookie";
import useModal from "../../../components/useModal";
import Swal from "sweetalert2";

const LayoutDiv = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-between;
  background-color: #eee;
  max-height: 100vh;
  height: auto;
  overflow: hidden;
`;

const ContentDiv = styled.div`
  flex-wrap: wrap;
  padding: 30px 30px;
  padding-bottom: 30px;
  background-color: #fff;
  border-radius: 10px;
  width: 750px;
  max-height: calc(100vh - 60px);
  overflow-y: auto;
  box-shadow:
    0px 20px 25px -5px rgba(0, 0, 0, 0.1),
    0px 10px 10px -5px rgba(0, 0, 0, 0.04);
`;

const TitleDiv = styled.div`
  font-size: 24px;
  font-weight: 700;
`;

const SideBarRightDiv = styled.div`
  box-shadow:
    0px 20px 25px -5px rgba(0, 0, 0, 0.1),
    0px 10px 10px -5px rgba(0, 0, 0, 0.04);
  width: 320px;
  background-color: #fff;
`;

const MenuDiv = styled.div`
  margin: 10px 0;
  width: calc(33.33% - 26.66px);
  height: 260px;
`;

const MenuImg = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 5px;
  background-color: #eee;
`;

const MenuNameDiv = styled.div`
  margin-top: 5px;
  font-size: 20px;
`;
const MenuCostDiv = styled.div`
  margin-top: 5px;
  font-size: 14px;
  font-weight: 700;
`;

const RightMenuDiv = styled.div`
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: 700;
  padding: 10px 0;
  display: flex;
  justify-content: center;
  cursor: pointer;
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
  restaurantId: yup.number(),
  categoryName: yup.string(),
  menuName: yup.string(),
  price: yup.number(),
  pic: yup.mixed(),
});

function StoreMenuPage() {
  const restaurantId = sessionStorage.getItem("restaurantId");
  const accessToken = getCookie();

  const [menuEdit, setMenuEdit] = useState(false);
  const [isClick, setIsClick] = useState({
    modal1: false,
    modal2: false,
  });
  const [menuCateList, setMenuCateList] = useState([]);

  // 이미지 미리보기 state
  const [preview, setPreview] = useState();

  // 가져온 데이터
  const [getData, setGetData] = useState({});

  const [patchMenuData, setPatchMenuData] = useState({});

  // 수정할 메뉴 이미지
  const [menuEditPic, setMenuEditPic] = useState();
  const { register, handleSubmit, setValue } = useForm({
    mode: "onChange",
    resolver: yupResolver(MenuSchema),
  });

  const titleChange = () => {
    if (isClick.modal1) {
      return "메뉴 추가하기";
    } else if (isClick.modal2) {
      return "메뉴 수정하기";
    }
  };
  const { Modal, open } = useModal({ title: titleChange() });

  const getStoreInfo = async () => {
    try {
      const res = await axios.get(
        `/api/restaurant?restaurantId=${restaurantId}`,
      );
      const result = res.data.resultData;
      // console.log("이거 써!", result);
      setGetData(result);
      setMenuCateList(result.menuCateList);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteMenu = async (cateId, menuId) => {
    try {
      await axios.delete(
        `/api/restaurant/menu?categoryId=${cateId}&menuId=${menuId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      getStoreInfo();
    } catch (error) {
      console.log(error);
    }
  };

  const postMenu = async data => {
    try {
      await axios.post("/api/restaurant/menu", data, {
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
      console.log(data);
      console.log(error);
    }
  };

  const patchImg = async data => {
    try {
      await axios.patch("/api/pic/restaurant/menu", data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const patchMenu = async data => {
    try {
      await axios.patch("/api/restaurant/menu", data, {
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
        Swal.fire("메뉴가 삭제 되었습니다.", "", "success");
      }
    });
  };

  const handleChangePreview = e => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setValue("pic", [file]);
    }
  };

  const handleSubmitForm = data => {
    console.log("폼데이터:", data);

    const postData = new FormData();

    // JSON 형식으로 p 객체 추가
    const pData = {
      restaurantId: data.restaurantId,
      categoryName: data.categoryName,
      menuName: data.menuName,
      price: data.price,
    };
    console.log(data.pic);
    postData.append("pic", data.pic[0]); // 파일 추가
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
    patchImgData.append("pic", data.pic[0]);
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
    setValue("restaurantId", restaurantId);
  }, []);

  return (
    <div>
      <LayoutDiv>
        <SideBar />
        <div style={{ padding: "10px 10px" }}>
          <ContentDiv className="scrollbar-hide">
            {menuCateList.map(item => (
              <div key={item.categoryId}>
                <TitleDiv>{item.categoryName}</TitleDiv>
                <div
                  style={{
                    display: "flex",
                    gap: 40,
                    flexWrap: "wrap",
                    marginBottom: 30,
                  }}
                >
                  {item.menuList.map(menu => (
                    <MenuDiv key={menu.menuId}>
                      <MenuImg
                        src={`http://112.222.157.156:5222/pic/menu/${menu.menuId}/${menu?.menuPic}`}
                        alt="없음"
                      />
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <MenuNameDiv>{menu.menuName}</MenuNameDiv>
                        {menuEdit ? (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 5,
                            }}
                          >
                            <FiEdit
                              onClick={() => {
                                setPatchMenuData(prev => ({
                                  ...prev,
                                  menuId: menu.menuId,
                                  categoryId: item.categoryId,
                                }));
                                setMenuEditPic(
                                  `http://112.222.157.156:5222/pic/menu/${menu.menuId}/${menu?.menuPic}`,
                                );
                                setIsClick({ modal2: true });
                                setValue("categoryName", item.categoryName);
                                setValue("menuName", menu.menuName);
                                setValue("price", menu.price);
                                setValue(
                                  "pic",
                                  `http://112.222.157.156:5222/pic/menu/${menu.menuId}/${menu?.menuPic}`,
                                );
                                open();
                              }}
                              style={{
                                width: 20,
                                height: 20,
                                cursor: "pointer",
                              }}
                            />
                            <IoMdClose
                              onClick={() =>
                                handleClickDelete(item.categoryId, menu.menuId)
                              }
                              style={{
                                width: 25,
                                height: 25,
                                cursor: "pointer",
                              }}
                            />
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                      <MenuCostDiv>{menu.price.toLocaleString()}원</MenuCostDiv>
                    </MenuDiv>
                  ))}
                </div>
              </div>
            ))}
          </ContentDiv>
        </div>
        <SideBarRightDiv>
          <div
            style={{ display: "flex", justifyContent: "center", marginTop: 50 }}
          >
            <MenuImg
              style={{ borderRadius: 100 }}
              src={`http://112.222.157.156:5222/pic/restaurant/${getData.restaurantId}/${getData.restaurantPics?.filePath}`}
              alt="없음"
            />
          </div>
          <TitleDiv
            style={{
              color: "#B3A1EC",
              marginLeft: 0,
              textAlign: "center",
              marginBottom: 40,
            }}
          >
            {getData.restaurantName}
          </TitleDiv>
          <RightMenuDiv
            onClick={() => {
              setIsClick({ modal1: true });
              setValue("categoryName", "");
              setValue("menuName", "");
              setValue("price", "");
              setValue("pic", null);
              setPreview(null);
              open();
            }}
          >
            메뉴 추가
          </RightMenuDiv>
          <RightMenuDiv
            style={{
              backgroundColor: menuEdit ? "#A28CE8" : "#fff",
              color: menuEdit ? "#fff" : "#333",
            }}
            onClick={() => setMenuEdit(!menuEdit)}
          >
            메뉴 수정
          </RightMenuDiv>
        </SideBarRightDiv>
      </LayoutDiv>
      {isClick.modal1 && (
        <Modal>
          <MenuAddDiv>
            <form onSubmit={handleSubmit(handleSubmitForm)}>
              <img src={preview} />
              <p>
                <label htmlFor="menuImg">
                  <FaPlusCircle style={{ width: "100%", height: "100%" }} />
                </label>
                <input
                  type="file"
                  id="menuImg"
                  className="opacity-0"
                  accept="image/png, image/jpeg"
                  {...register("pic")}
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
            <form onSubmit={handleSubmit(handleSubmitForm)}>
              <img src={preview || menuEditPic} />
              <p>
                <label htmlFor="menuImg">
                  <FaPlusCircle style={{ width: "100%", height: "100%" }} />
                </label>
                <input
                  type="file"
                  id="menuImg"
                  className="opacity-0"
                  accept="image/png, image/jpeg"
                  {...register("pic")}
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
              <button type="submit">수정완료</button>
            </form>
          </MenuAddDiv>
        </Modal>
      )}
    </div>
  );
}
export default StoreMenuPage;
