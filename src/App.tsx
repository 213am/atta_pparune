import { Suspense, lazy, useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isLoginStoreAtom } from "./atoms/restaurantAtom";
import { loginAtom } from "./atoms/userAtom";
import StoreLayout from "./components/layouts/StoreLayout";
import UserLayout from "./components/layouts/UserLayout";
import Loading from "./components/Loading";
import {
  initializeSocket,
  subscribeStoreLogin,
  subscribeUserLogin,
} from "./components/notification/StompComponent";
import Enquiry from "./pages/admin/enquiry/Enquiry";
import Franchisee from "./pages/admin/franchisee/Franchisee";
import Refund from "./pages/admin/refund/Refund";
import Transaction from "./pages/admin/transaction/Transaction";
import DetailPage from "./pages/service/notice/DetailPage";

const WritePostPage = lazy(
  () => import("./pages/service/notice/WritePostPage"),
);
const StoreReviewPage = lazy(
  () => import("./pages/storeManager/review/StoreReviewPage"),
);
const EnrollServicePage = lazy(
  () => import("./pages/service/EnrollServicePage"),
);
const AboutPage = lazy(() => import("./pages/service/AboutPage"));
const ServiceMainPage = lazy(() => import("./pages/service/IndexPage"));
const AddCompanyPage = lazy(() => import("./pages/service/AddCompanyPage"));
const NoticePage = lazy(() => import("./pages/service/notice/NoticePage"));
// 타입스크립트 lazy Loading
const PaymentCheckoutPage = lazy(() =>
  import("./pages/company/toss/PaymentCheckoutPage").then(module => ({
    default: module.PaymentCheckoutPage,
  })),
);
const WidgetSuccessPage = lazy(() =>
  import("./pages/company/toss/WidgetSuccess").then(module => ({
    default: module.WidgetSuccessPage,
  })),
);

const TableComponent = lazy(
  () => import("./pages/admin/franchisee/Franchisee"),
);
const AdminPage = lazy(() => import("./pages/admin/AdminPage"));
const MyReviewPage = lazy(() => import("./pages/user/userInfo/MyReviewPage"));
const RestaurantReviewPage = lazy(
  () => import("./pages/user/restaurant/RestaurantReviewPage"),
);
const WriteReview = lazy(() => import("./pages/user/userInfo/WriteReview"));
const IndexPage = lazy(() => import("./pages/IndexPage"));
const EditPwPage = lazy(() => import("./pages/auth/EditPwPage"));
const FindIdPage = lazy(() => import("./pages/auth/FindIdPage"));
const FindPwPage = lazy(() => import("./pages/auth/FindPwPage"));
const LoginPage = lazy(() => import("./pages/auth/LoginPage"));
const SignUpPage = lazy(() => import("./pages/auth/SignUpPage"));
const Order = lazy(() => import("./pages/user/payment/PaymentList"));
const Restaurant = lazy(() => import("./pages/user/restaurant/RestaurantPage"));
const Store = lazy(() => import("./pages/storeManager/StorePage"));
const MenuPage = lazy(() => import("./pages/storeManager/menu/StoreMenuPage"));
const StoreSales = lazy(
  () => import("./pages/storeManager/salesConfirm/Sales"),
);
const OrderPage = lazy(
  () => import("./pages/storeManager/salesConfirm/SalesPage"),
);
const EditInfoPage = lazy(() => import("./pages/user/userInfo/EditInfoPage"));
const UserInfo = lazy(() => import("./pages/user/userInfo/IndexPage"));
const EmailAuthPage = lazy(() => import("./pages/auth/EmailAuthPage"));
const PolicyPage = lazy(() => import("./pages/auth/PolicyPage"));
const PlaceToOrder = lazy(() => import("./pages/user/order/PlaceToOrder"));
const MealTicketPage = lazy(() => import("./pages/user/order/QRCode"));
const StoreInfoPage = lazy(
  () => import("./pages/storeManager/storeAuth/StoreInfoPage"),
);
const UserMainPage = lazy(() => import("./pages/user/UserMainPage"));
const RestaurantDetailPage = lazy(
  () => import("./pages/user/restaurant/RestaurantDetailPage"),
);
const AddStorePage = lazy(() => import("./pages/service/AddStorePage"));
const OrderMemberPage = lazy(
  () => import("./pages/user/order/OrderMemberPage"),
);
const OrderPricePage = lazy(() => import("./pages/user/order/OrderPricePage"));
const MenuSelectPage = lazy(
  () => import("./pages/user/restaurant/MenuSelectPage"),
);
const NotFound = lazy(() => import("./pages/NotFound"));
const OrderRequestPage = lazy(
  () => import("./pages/user/order/OrderRequestPage"),
);

const App = (): JSX.Element => {
  const sessionRestaurant = sessionStorage.getItem("restaurantId");
  const sessionUser = sessionStorage.getItem("userId");
  const isLogin = useRecoilValue(loginAtom);
  const isLoginStore = useRecoilValue(isLoginStoreAtom);

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

          {/* 사용자 */}
          <Route path="/user">
            <Route
              index
              element={
                <UserLayout>
                  <UserMainPage />
                </UserLayout>
              }
            />
            <Route path="userinfo">
              <Route
                index
                element={
                  <UserLayout>
                    <UserInfo />
                  </UserLayout>
                }
              />
              <Route
                path="edit"
                element={
                  <UserLayout>
                    <EditInfoPage />
                  </UserLayout>
                }
              />
              <Route
                path="myReview"
                element={
                  <UserLayout>
                    <MyReviewPage />
                  </UserLayout>
                }
              />
            </Route>
            <Route path="order">
              <Route
                index
                element={
                  <UserLayout>
                    <Order />
                  </UserLayout>
                }
              />
            </Route>
            <Route path="placetoorder">
              <Route
                index
                element={
                  <UserLayout>
                    <PlaceToOrder />
                  </UserLayout>
                }
              />
              <Route path="coupon">
                <Route
                  path=":id"
                  element={
                    <UserLayout>
                      <MealTicketPage />
                    </UserLayout>
                  }
                />
              </Route>
              <Route path="member">
                <Route
                  path=":id"
                  element={
                    <UserLayout>
                      <OrderMemberPage />
                    </UserLayout>
                  }
                />
              </Route>
              <Route path="price">
                <Route
                  path=":id"
                  element={
                    <UserLayout>
                      <OrderPricePage />
                    </UserLayout>
                  }
                />
              </Route>
              <Route path="request">
                <Route
                  path=":id"
                  element={
                    <UserLayout>
                      <OrderRequestPage />
                    </UserLayout>
                  }
                />
              </Route>
            </Route>
            <Route path="restaurant">
              <Route
                index
                element={
                  <UserLayout>
                    <Restaurant />
                  </UserLayout>
                }
              />
              <Route path="detail">
                <Route
                  path=":id"
                  element={
                    <UserLayout>
                      <RestaurantDetailPage />
                    </UserLayout>
                  }
                />
                <Route
                  path="reserve/:id"
                  element={
                    <UserLayout>
                      <MenuSelectPage />
                    </UserLayout>
                  }
                />
                <Route
                  path="review/:id"
                  element={
                    <UserLayout>
                      <RestaurantReviewPage />
                    </UserLayout>
                  }
                />
              </Route>
            </Route>
            <Route
              path="review"
              element={
                <UserLayout>
                  <WriteReview />
                </UserLayout>
              }
            />
          </Route>

          {/* 식당 */}
          <Route path="/store">
            <Route
              index
              element={
                <StoreLayout>
                  <Store />
                </StoreLayout>
              }
            />
            <Route
              path="menu"
              element={
                <StoreLayout>
                  <MenuPage />
                </StoreLayout>
              }
            />
            <Route
              path="order"
              element={
                <StoreLayout>
                  <OrderPage />
                </StoreLayout>
              }
            />
            <Route
              path="sales"
              element={
                <StoreLayout>
                  <StoreSales />
                </StoreLayout>
              }
            />
            <Route
              path="info"
              element={
                <StoreLayout>
                  <StoreInfoPage />
                </StoreLayout>
              }
            />
            <Route
              path="review"
              element={
                <StoreLayout>
                  <StoreReviewPage />
                </StoreLayout>
              }
            />
          </Route>

          {/* 서비스 소개 페이지 */}
          <Route path="/service">
            <Route index element={<ServiceMainPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="enroll">
              <Route index element={<EnrollServicePage />} />
              <Route path="addstore" element={<AddStorePage />} />
              <Route path="addcompany" element={<AddCompanyPage />} />
            </Route>
            <Route path="notice">
              <Route index element={<NoticePage />} />
              <Route path="writepost" element={<WritePostPage />} />
              <Route path="detail" element={<DetailPage />} />
            </Route>
          </Route>
          <Route path="/storeManage" element={<TableComponent />}></Route>

          <Route path="/admin">
            <Route index element={<AdminPage />} />
            <Route path="enquiry" element={<Enquiry />} />
            <Route path="transaction" element={<Transaction />} />
            <Route path="franchisee" element={<Franchisee />} />
            <Route path="refund" element={<Refund />} />
          </Route>

          {/* 회사 */}
          <Route path="/company">
            <Route index element={<PaymentCheckoutPage />} />
          </Route>

          {/* 결제 성공 */}
          <Route path="/success" element={<WidgetSuccessPage />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
