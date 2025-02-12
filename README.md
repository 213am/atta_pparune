### 🌟 **아따빠르네 프로젝트** 🍽️💼

🚀 **회사원의 점심 예약 & 식대 관리 솔루션**

---

## 📖 **1. 프로젝트 소개**

- **프로젝트 명**: **아따빠르네 (atta parune)**
- **컨셉**:  
  ✅ **빠르고 간편한 점심 예약** 🏃‍♂️💨  
  ✅ **효율적인 회사 식대 관리** 💳📊

---

## 👩‍💻👨‍💻 **2. 프로젝트 참여자**

### 🎨 **Front-End (FE)**

- **🧑‍💼 팀장**: 강정호
- **👨‍💻 팀원**: 이한샘

### 🔧 **Back-End (BE)**

- **🧑‍💼 팀장**: 김우준
- **👩‍💻 팀원**: 권혜지, 김일지, 사공수기, 이어진

---

## ✍️ **3. FE 역할 분담**

### 💡 **강정호**

- 🔑 **로그인 기능** (Cookie, Recoil)
- 🗺️ **식당 찾기** (Kakao Map)
- 🍽️ **사용자 예약 & 앉아서 주문**
- 📋 **식당 메뉴 CRUD**
- 🏠 **사장님 정보 관리**
- 🏢 **가게 등록**

### 📲 **이한샘**

- 🔔 **알림 기능** (Socket)
- 📜 **주문 내역 관리**
- 🔳 **QR 코드 생성** (qrcode.react)
- 💳 **사용자 결제 기능**
- 🛠️ **사용자 정보 관리**
- 🛎️ **주문 CRUD**
- 🏠 **메인 화면 개발**

---

## 📅 **4. 개발 기간**

⏳ **2025.01.09 ~ 2025.02.13**

---

## ⚙️ **5. 기술 스택**

💻 **Front-End**

- **React**, **TypeScript**, **Vite**
- **Tailwind CSS**, **Emotion**
- **Recoil**, **Yup**

🛠 **라이브러리 & API**

- **axios** (API 통신)
- **qrcode.react** (QR 코드 생성)
- **Kakao Map** (지도 기능)
- **Swiper** (슬라이드 UI)
- **SockJS** (웹소켓)

---

## 🖥️ **6. 설치 및 실행 방법**

1️⃣ **`git clone https://github.com/jungho-Kang/second-project.git .`** → 프로젝트 클론

2️⃣ **`npm i`** → 라이브러리 설치

3️⃣ **`npm run dev`** → 프로젝트 실행

---

## 📂 **7. 협업 자료**

📜 **회의록**: [**Notion**](https://www.notion.so/2-17757d27ea1780b5bad3fea038d6931a)  
🎨 **레이아웃**: [**Figma**](https://www.figma.com/design/NefxkP15saJiPNTBjAluG8/2%EC%B0%A8-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-UI?node-id=18-3&p=f&t=W2wpdpQ5RhGg9GtA-0)  
📊 **발표 자료**: [**Canva**](https://www.canva.com/design/DAGeODjVcyI/V7uKqkA6ogICdGNIbhrr5A/edit)

---

## 🗂️ **8. 프로젝트 구조**

📁 **프로젝트 디렉토리**

```
📂public
┃ ┣ 📜emailauth.png
┃ ┣ 📜loadingImage.jpg
┃ ┣ 📜logo.png
┃ ┣ 📜menu.png
┃ ┣ 📜profile.jpeg
┃ ┣ 📜startingPage.png
┃ ┣ 📜storeimg.png
┃ ┗ 📜storemain.png
📂src
┃ ┣ 📂assets
┃ ┃ ┗ 📜vite.svg
┃ ┣ 📂atoms
┃ ┃ ┣ 📜noticeAtom.jsx
┃ ┃ ┣ 📜restaurantAtom.jsx
┃ ┃ ┣ 📜roleAtom.jsx
┃ ┃ ┗ 📜userAtom.jsx
┃ ┣ 📂components
┃ ┃ ┣ 📂notification
┃ ┃ ┃ ┣ 📜NotificationIcon.jsx
┃ ┃ ┃ ┣ 📜NotificationMessage.jsx
┃ ┃ ┃ ┣ 📜NotificationPage.jsx
┃ ┃ ┃ ┗ 📜StompComponent.jsx
┃ ┃ ┣ 📜api.js
┃ ┃ ┣ 📜axios.js
┃ ┃ ┣ 📜cookie.js
┃ ┃ ┣ 📜Loading.jsx
┃ ┃ ┣ 📜MenuBar.jsx
┃ ┃ ┣ 📜Modal.jsx
┃ ┃ ┣ 📜useAuth.jsx
┃ ┃ ┗ 📜useModal.jsx
┃ ┣ 📂constants
┃ ┃ ┗ 📜Role.js
┃ ┣ 📂pages
┃ ┃ ┣ 📂auth
┃ ┃ ┃ ┣ 📜EditPwPage.jsx
┃ ┃ ┃ ┣ 📜EmailAuthPage.jsx
┃ ┃ ┃ ┣ 📜FindIdPage.jsx
┃ ┃ ┃ ┣ 📜FindPwPage.jsx
┃ ┃ ┃ ┣ 📜LoginPage.jsx
┃ ┃ ┃ ┣ 📜loginStyle.js
┃ ┃ ┃ ┣ 📜PolicyPage.jsx
┃ ┃ ┃ ┗ 📜SignUpPage.jsx
┃ ┃ ┣ 📂order
┃ ┃ ┃ ┣ 📂placetoorder
┃ ┃ ┃ ┃ ┣ 📜OrderLoading.jsx
┃ ┃ ┃ ┃ ┣ 📜OrderMemberPage.jsx
┃ ┃ ┃ ┃ ┣ 📜OrderPricePage.jsx
┃ ┃ ┃ ┃ ┣ 📜OrderRequestPage.jsx
┃ ┃ ┃ ┃ ┣ 📜PlaceToOrder.jsx
┃ ┃ ┃ ┃ ┣ 📜QRCode.jsx
┃ ┃ ┃ ┃ ┗ 📜QRCodeScan.tsx
┃ ┃ ┃ ┗ 📜IndexPage.jsx
┃ ┃ ┣ 📂payment
┃ ┃ ┃ ┗ 📜PaymentList.jsx
┃ ┃ ┣ 📂restaurant
┃ ┃ ┃ ┣ 📜MenuSelectPage.jsx
┃ ┃ ┃ ┣ 📜RestaurantDetailPage.jsx
┃ ┃ ┃ ┗ 📜RestaurantPage.jsx
┃ ┃ ┣ 📂storeManager
┃ ┃ ┃ ┣ 📂menu
┃ ┃ ┃ ┃ ┗ 📜StoreMenuPage.jsx
┃ ┃ ┃ ┣ 📂salesConfirm
┃ ┃ ┃ ┃ ┣ 📜LineChart.jsx
┃ ┃ ┃ ┃ ┣ 📜Sales.jsx
┃ ┃ ┃ ┃ ┣ 📜SalesConfirm.jsx
┃ ┃ ┃ ┃ ┗ 📜SalesPage.jsx
┃ ┃ ┃ ┣ 📂storeAuth
┃ ┃ ┃ ┃ ┣ 📜StoreInfo.jsx
┃ ┃ ┃ ┃ ┗ 📜StoreInfoPage.jsx
┃ ┃ ┃ ┣ 📂tableManage
┃ ┃ ┃ ┃ ┣ 📜OderList.jsx
┃ ┃ ┃ ┃ ┗ 📜Table.jsx
┃ ┃ ┃ ┣ 📜AddStorePage.jsx
┃ ┃ ┃ ┣ 📜SideBar.jsx
┃ ┃ ┃ ┣ 📜SideBarRight.jsx
┃ ┃ ┃ ┗ 📜StorePage.jsx
┃ ┃ ┣ 📂user
┃ ┃ ┃ ┗ 📜UserMainPage.jsx
┃ ┃ ┣ 📂userInfo
┃ ┃ ┃ ┣ 📜EditInfoPage.jsx
┃ ┃ ┃ ┗ 📜IndexPage.jsx
┃ ┃ ┣ 📜IndexPage.jsx
┃ ┃ ┗ 📜NotFound.jsx
📂tree
📜.env
📜.gitignore
📜.prettierrc
📜eslint.config.js
📜index.html
📜manifest.json
📜package-lock.json
📜package.json
📜README.md
📜tailwind.config.js
📜tsconfig.app.json
📜tsconfig.json
📜tsconfig.node.json
📜vite.config.ts
```

---

## 📧 **9. 연락처**

- **강정호**: rkdwjdgh08@gmail.com
- **이한샘**: dev.213am@gmail.com

🚀 **아따빠르네 프로젝트와 함께, 더 빠르고 편리한 점심 시간!** 🍽️🎉
