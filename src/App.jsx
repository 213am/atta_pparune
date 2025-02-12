import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import React, { Suspense, lazy, useEffect } from "react";
import {
  initializeSocket,
  subscribeStoreLogin,
  subscribeUserLogin,
} from "./components/notification/StompComponent";
import { useRecoilState } from "recoil";
import { loginAtom } from "./atoms/userAtom";
import { isLoginStoreAtom } from "./atoms/restaurantAtom";
import Loading from "./components/Loading";
import { removeCookie, removeCookieRefresh } from "./components/cookie";

const IndexPage = lazy(() => import("./pages/IndexPage"));
const EditPwPage = lazy(() => import("./pages/auth/EditPwPage"));
const FindIdPage = lazy(() => import("./pages/auth/FindIdPage"));
const FindPwPage = lazy(() => import("./pages/auth/FindPwPage"));
const LoginPage = lazy(() => import("./pages/auth/LoginPage"));
const SignUpPage = lazy(() => import("./pages/auth/SignUpPage"));
const Order = lazy(() => import("./pages/payment/PaymentList"));
const Restaurant = lazy(() => import("./pages/restaurant/RestaurantPage"));
const Store = lazy(() => import("./pages/storeManager/StorePage"));
const MenuPage = lazy(() => import("./pages/storeManager/menu/StoreMenuPage"));
const StoreSales = lazy(
  () => import("./pages/storeManager/salesConfirm/Sales"),
);
const OrderPage = lazy(
  () => import("./pages/storeManager/salesConfirm/SalesPage"),
);
const EditInfoPage = lazy(() => import("./pages/userInfo/EditInfoPage"));
const UserInfo = lazy(() => import("./pages/userInfo/IndexPage"));
const EmailAuthPage = lazy(() => import("./pages/auth/EmailAuthPage"));
const PolicyPage = lazy(() => import("./pages/auth/PolicyPage"));
const PlaceToOrder = lazy(
  () => import("./pages/order/placetoorder/PlaceToOrder"),
);
const MealTicketPage = lazy(() => import("./pages/order/placetoorder/QRCode"));
const StoreInfoPage = lazy(
  () => import("./pages/storeManager/storeAuth/StoreInfoPage"),
);
const UserMainPage = lazy(() => import("./pages/user/UserMainPage"));
const RestaurantDetailPage = lazy(
  () => import("./pages/restaurant/RestaurantDetailPage"),
);
const AddStorePage = lazy(() => import("./pages/storeManager/AddStorePage"));
const OrderMemberPage = lazy(
  () => import("./pages/order/placetoorder/OrderMemberPage"),
);
const OrderPricePage = lazy(
  () => import("./pages/order/placetoorder/OrderPricePage"),
);
const MenuSelectPage = lazy(() => import("./pages/restaurant/MenuSelectPage"));
const NotFound = lazy(() => import("./pages/NotFound"));
const OrderRequestPage = lazy(
  () => import("./pages/order/placetoorder/OrderRequestPage"),
);

const App = () => {
  const sessionRestaurant = sessionStorage.getItem("restaurantId");
  const sessionUser = sessionStorage.getItem("userId");
  const [isLogin, setIsLogin] = useRecoilState(loginAtom);
  const [isLoginStore, setIsLoginStore] = useRecoilState(isLoginStoreAtom);

  useEffect(() => {
    initializeSocket();

    if (sessionRestaurant && isLoginStore) {
      subscribeStoreLogin(sessionRestaurant);
    }

    if (sessionUser && isLogin) {
      subscribeUserLogin(sessionUser);
    }
  }, [sessionRestaurant, sessionUser, isLogin, isLoginStore]);

  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/auth">
            <Route index element={<LoginPage />} />
            <Route path="findid" element={<FindIdPage />} />
            <Route path="findpw" element={<FindPwPage />} />
            <Route path="editpw" element={<EditPwPage />} />
            <Route path="policy" element={<PolicyPage />} />
            <Route path="signup">
              <Route index element={<SignUpPage />} />
              <Route path="emailauth" element={<EmailAuthPage />} />
            </Route>
          </Route>
          <Route path="/user">
            <Route index element={<UserMainPage />} />
            <Route path="userinfo">
              <Route index element={<UserInfo />} />
              <Route path="edit" element={<EditInfoPage />} />
            </Route>
            <Route path="order">
              <Route index element={<Order />} />
            </Route>
            <Route path="placetoorder">
              <Route index element={<PlaceToOrder />} />
              <Route path="coupon">
                <Route path=":id" element={<MealTicketPage />} />
              </Route>
              <Route path="member">
                <Route path=":id" element={<OrderMemberPage />} />
              </Route>
              <Route path="price">
                <Route path=":id" element={<OrderPricePage />} />
              </Route>
              <Route path="request">
                <Route path=":id" element={<OrderRequestPage />} />
              </Route>
            </Route>
            <Route path="restaurant">
              <Route index element={<Restaurant />} />
              <Route path="detail">
                <Route path=":id" element={<RestaurantDetailPage />} />
                <Route path="reserve/:id" element={<MenuSelectPage />} />
              </Route>
            </Route>
          </Route>
          <Route path="/addstore" element={<AddStorePage />} />
          <Route path="/store">
            <Route index element={<Store />} />
            <Route path="menu" element={<MenuPage />} />
            <Route path="order" element={<OrderPage />} />
            <Route path="sales" element={<StoreSales />} />
            <Route path="info" element={<StoreInfoPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
