# 🌟 **아따빠르네 프로젝트** 🍽️💼

🚀 **회사원의 점심 예약 & 식대 관리 솔루션**

## 🌐 사이트 접속 정보

- **서비스 주소**: [https://attaparune.kro.kr:5232](https://attaparune.kro.kr:5232)
- **각 서비스별 접속 페이지**는 **서비스 하단 우측**에서 확인할 수 있습니다.

## 📱 디바이스 기반 자동 라우팅

접속 디바이스의 종류에 따라 사용자를 적절한 페이지로 자동 유도합니다.  
User-Agent 분석 + 화면 너비 조건을 함께 고려한 **맞춤형 라우팅 전략**을 적용했습니다.

---

### 🧠 구현 방식

```ts
function getDeviceType(): string {
  const userAgent = navigator.userAgent.toLowerCase();

  if (/mobile/i.test(userAgent)) {
    return "mobile";
  }

  if (
    /ipad|tablet/i.test(userAgent) ||
    (/android/i.test(userAgent) && !/mobile/i.test(userAgent)) ||
    (width >= 768 && width <= 1400) // 태블릿 해상도
  ) {
    return "tablet";
  }

  return "desktop";
}
```

📍 라우팅 기준

📱 모바일	userAgent.includes('mobile')	/user (일반 사용자 페이지)   
📟 태블릿	userAgent.includes('tablet') or width 768 ~ 1400px	/store (식당 관리자 페이지)   
💻 데스크탑	그 외 모든 경우	/service (서비스 소개 페이지)   


---

## 🧪 테스트 계정 정보

### 👤 사용자
- **ID**: `00010009`  
- **PW**: `qwer12#$`

### 🍽️ 식당 관리자
- **ID**: `restaurant5`  
- **PW**: `qwer12#$`

### 🏢 회사 관리자
- **ID**: `companyadmin1`  
- **PW**: `qwer12#$`

---

## 📖 **1. 프로젝트 소개**

- **프로젝트명**: **아따빠르네 (atta parune)**
- **컨셉**:   
  ✅ 사용자는 빠르고 간편한 점심 예약 🏃‍♂️💨  
  ✅ 식당은 예약·결제·매출관리까지 한 번에 📱💰  
  ✅ 회사는 효율적인 식대 관리 💳📊

---

## 🏢 회사 입장에서의 장점

### 🧾 식대 관리 자동화
- 웹서비스로 직원 식대 관리, 정산, 이력 확인 가능  
🖥️ _“손쉽게 정산하고, 보기쉽게 관리하세요.”_

### 💰 포인트 충전 시 5% 추가 지급
- 사전 포인트 구매로 예산 효율 극대화  
🎁 _“식대 예산, 더 오래 갑니다.”_

### 🌿 직원 복지 향상
- 쾌적한 점심시간 → 피로도 ↓ 만족도 ↑  
😊 _“작은 점심의 변화가, 직원 만족을 바꿉니다.”_

---

## 🙋 사용자 입장에서의 장점

### ⏱️ 줄 서지 않고 빠르게!
- 식당 탐색/대기 없이 바로 예약 → 빠르게 식사  
🏃‍♂️💨 _“줄 설 시간에 이미 식사 중!”_

### 💳 간편한 QR 결제
- 결제도 빠르게, 지갑 없이도 OK  
📱 _“터치 한 번이면 결제 끝!”_

### 🧘‍♂️ 점심시간이 진짜 휴식으로
- 여유 생긴 시간에 커피 한잔 또는 산책  
☕ _“식사 후 15분, 온전히 내 시간입니다.”_

---

## 🍽️ 식당 입장에서의 장점

### 📊 매출 현황을 한눈에!
- 대시보드를 통해 매출과 예약 현황을 간편하게 확인
- 별도 정산 없이 데이터 기반 운영 가능  
📈 _“어제보다 잘 됐는지 바로 확인하세요!”_

### 🛎️ 예약 관리의 자동화
- 앱을 통해 예약 정보 수신 → 전화 응대 최소화
- 노쇼 방지 및 운영 효율 향상  
📲 _“앱에서 예약 확인하고, 테이블만 준비하세요.”_

### 💳 POS 없이 QR 결제
- 별도 기기 없이 스마트폰/태블릿으로 QR 스캔 결제  
📱 _“QR 찍으면 결제 끝, 주문에만 집중하세요!”_

### 💼 고정 고객 확보
- 회사 단위 계약으로 점심시간 예약 손님 유입  
🍱 _“점심시간, 빈자리 없게 만들어 드릴게요.”_

---

## 🎥 **2. 시연 영상**

<table align="center">
  <!-- 메인페이지 관련 -->
  <tr>
    <td align="center">
      <b>검색 필터</b><br><br>
      <img src="https://github.com/user-attachments/assets/f1c220d2-3272-4437-b356-dc45999d9817" width="250">
    </td>
    <td align="center">
      <b>무한스크롤</b><br><br>
      <img src="https://github.com/user-attachments/assets/a99dd135-0945-4124-b92f-69e10a195648" width="250">
    </td>
    <td align="center">
      <b>업종별 보기</b><br><br>
      <img src="https://github.com/user-attachments/assets/fe4ff676-6377-4211-a1bb-dfe00409ed41" width="250">
    </td>
  </tr>
  <!-- 식당 찾기 -->
  <tr>
    <td align="center">
      <b>식당 검색</b><br><br>
      <img src="https://github.com/user-attachments/assets/e5c99b66-7714-4b0c-86df-d06c5be94c1b" width="250">
    </td>
    <td align="center">
      <b>식당 필터</b><br><br>
      <img src="https://github.com/user-attachments/assets/d8a59b87-639f-4b76-9428-c0a58a2b5ce6" width="250">
    </td>
    <td align="center">
      <b>식당 목록</b><br><br>
      <img src="https://github.com/user-attachments/assets/a03a2710-d96a-4350-a449-be851ccdba49" width="250">
    </td>
  </tr>
  <!-- 식당 상세 -->
  <tr>
    <td align="center">
      <b>리뷰 목록</b><br><br>
      <img src="https://github.com/user-attachments/assets/6fcfef1d-a0d9-407e-880e-66aa5a4ee5fc" width="250">
    </td>
    <td align="center">
      <b>메뉴 목록</b><br><br>
      <img src="https://github.com/user-attachments/assets/36efdaf4-af03-41d7-af47-1d5fe95a3982" width="250">
    </td>
    <td align="center">
      <b>식권 생성</b><br><br>
      <img src="https://github.com/user-attachments/assets/0c8aa4d2-6cc2-4771-8a4e-6cc63d97bac7" width="250">
    </td>
  </tr>
  <!-- 리뷰 관련 -->
  <tr>
    <td align="center">
      <b>결제 후 리뷰 작성</b><br><br>
      <img src="https://github.com/user-attachments/assets/0296ab38-f05b-4b46-8503-ef65c3c535ab" width="250">
    </td>
    <td align="center">
      <b>내가 쓴 리뷰</b><br><br>
      <img src="https://github.com/user-attachments/assets/c8c5af35-cc6f-4687-b1a0-6e9df56c0313" width="250">
    </td>
    <td align="center">
      <b>리뷰 삭제</b><br><br>
      <img src="https://github.com/user-attachments/assets/7dd29eb5-279a-4905-a885-97038b45aa2a" width="250">
    </td>
  </tr>
  <!-- 주문 관련 -->
  <tr>
    <td align="center">
      <b>실시간 알림</b><br><br>
      <img src="https://github.com/user-attachments/assets/6935491e-7799-4c0d-bf19-21153373fc8b" width="250">
    </td>
    <td align="center">
      <b>진행 중인 주문</b><br><br>
      <img src="https://github.com/user-attachments/assets/c39a3c85-08bf-4be6-bb44-5613882774cd" width="250">
    </td>
    <td align="center">
      <b>지난 주문 내역</b><br><br>
      <img src="https://github.com/user-attachments/assets/c3bff819-efb8-4f3a-a39e-95871d1b1407" width="250">
    </td>
  </tr>
  <!-- 기타 -->
  <tr>
    <td align="center">
      <b>회원정보 수정</b><br><br>
      <img src="https://github.com/user-attachments/assets/3e80d049-4e39-43e2-baa1-3b1501dd62af" width="250">
    </td>
    <td></td>
    <td></td>
  </tr>
</table>

<br/>

---

## 👩‍💻👨‍💻 **3. 프로젝트 참여자**

| [이한샘](https://github.com/213am) | [강정호](https://github.com/jungho-Kang) | [권혜지](https://github.com/hyeji-007) | [사공수기](https://github.com/proregular) | [이어진](https://github.com/djwls0823) | [김우준](https://github.com/KWooJun) |
| :--: | :--: | :--: | :--: | :--: | :--: |
| <img src="https://avatars.githubusercontent.com/u/93510588?v=4" alt="이한샘 프로필" width="120"/> | <img src="https://avatars.githubusercontent.com/u/186558760?v=4" alt="강정호 프로필" width="120"/> | <img src="https://avatars.githubusercontent.com/u/173993634?v=4" alt="권혜지 프로필" width="120"/> | <img src="https://avatars.githubusercontent.com/u/111679358?v=4" alt="사공수기 프로필" width="120"/> | <img src="https://avatars.githubusercontent.com/u/184086242?v=4" alt="이어진 프로필" width="120"/> | <img src="https://avatars.githubusercontent.com/u/130899969?v=4" alt="김우준 프로필" width="120"/> |
| `Front-end` | `Front-end` | `Back-end` | `Back-end` | `Back-end` | `Back-end` |

<br/>

---

## ✍️ **4. FE 역할 분담**

### 💡 강정호

#### 📌 2차 작업
- 🔑 **로그인 기능** (Cookie, Recoil)
- 🗺️ **식당 찾기** (Kakao Map)
- 🍽️ **사용자 예약 & 앉아서 주문**
- 📋 **식당 메뉴 CRUD**
- 🏠 **사장님 정보 관리**
- 🏢 **가게 등록 기능**

#### 📌 3차 작업
- ⏳ 진행 예정

---

### 📲 이한샘

#### 📌 2차 작업
- 🔔 **알림 기능** (WebSocket + Stomp)
- 📜 **주문 내역 관리**
- 🔳 **QR 코드 생성** (qrcode.react)
- 💳 **사용자 결제 기능**
- 🛠️ **사용자 정보 관리**
- 🛎️ **주문 CRUD**
- 🏠 **메인 화면 개발**

#### 📌 3차 작업
- ⏳ 진행 예정
---

## 📅 **5. 개발 기간**

⏳ **2025.01.09 ~ 2025.03.21**

---

## ⚙️ **6. 기술 스택**

### 🎨 Frontend
- **React 18 + TypeScript** – 전체 프로젝트 프론트엔드 프레임워크
- **Vite** – 빠른 개발 환경과 빌드 툴
- **Tailwind CSS** – 유틸리티 기반 스타일링
- **Emotion (styled, react)** – 스타일 커스터마이징
- **Framer Motion** – 애니메이션 효과
- **Recoil** – 상태 관리 라이브러리
- **React Router DOM v7** – 라우팅 처리
- **React Hook Form + Yup + @hookform/resolvers** – 폼 관리 및 유효성 검사
- **SweetAlert2** – 사용자 친화적 알림창
- **Swiper** – 슬라이더

### 📊 데이터 시각화 & 차트
- **Chart.js + react-chartjs-2**
- **ag-grid-react** – 고성능 데이터 그리드 컴포넌트

### 📦 API & 유틸리티
- **Axios** – HTTP 통신
- **Dayjs** – 날짜 처리

### 📸 미디어 & 입력 도구
- **React Quill** – WYSIWYG 에디터
- **React Daum Postcode** – 주소 검색
- **qrcode.react** – QR코드 생성

### 🛰️ 실시간 통신 & 결제
- **SockJS-client + @stomp/stompjs** – WebSocket 기반 실시간 통신
- **tosspayments/tosspayments-sdk** – 간편 결제 API 연동

### 🌍 외부 API & 기타
- **React Kakao Maps SDK** – 카카오 지도 연동
- **Dompurify** – XSS 방지용 HTML Sanitizer
- **React Cookie** – 쿠키 기반 인증

---

## 🧪 개발 환경 & 툴링

- **TypeScript** – 정적 타입 시스템
- **Vite** – 번들링 및 dev server
- **ESLint + Prettier** – 코드 품질 및 스타일 관리
- **eslint-plugin-react / react-hooks / prettier / refresh**
- **TypeScript ESLint** – 타입 기반 린팅

---

## 🖥️ **7. 설치 및 실행 방법**

1️⃣ **`git clone https://github.com/213am/atta_pparune.git .`** → 프로젝트 클론  
2️⃣ **`npm i`** → 라이브러리 설치  
3️⃣ **`npm run dev`** → 프로젝트 실행

---

## 📂 **8. 협업 자료**

📜 **업무기록** 
- [**Notion**](https://www.notion.so/2-17757d27ea1780b5bad3fea038d6931a)  

🎨 **레이아웃**
- [**2차 Figma**](https://www.figma.com/design/NefxkP15saJiPNTBjAluG8/2%EC%B0%A8-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-UI?node-id=18-8&p=f&t=kleJhbkLApa6Xhx8-0)
- [**3차 Figma**](https://www.figma.com/design/25XZ970lOnvXHOMTTKk9DG/3%EC%B0%A8-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8?node-id=0-7&p=f&t=iHAlczJtnckHQT24-0)
  
📊 **발표 자료**
- [**2차 Canva**](https://www.canva.com/design/DAGjeJ6ZlTg/IAdQh0kEVExWQ9zMR5cV3A/edit?utm_content=DAGjeJ6ZlTg&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)
- [**3차 Canva**](https://www.canva.com/design/DAGjeLOb2FQ/opEXobd0OQKDcDwtkKTF-g/edit?utm_content=DAGjeLOb2FQ&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)

---

## 🗂️ **9. 프로젝트 구조**

📁 **프로젝트 디렉토리**

```
atta_pparune/
├── public/                      # 정적 파일 (이미지, 로고 등)
│   └── *.png, *.jpg, *.webp ...
├── src/
│   ├── assets/                  # 파비콘 등 정적 에셋
│   ├── atoms/                   # Recoil 전역 상태 관리
│   ├── components/              # 공통 UI 컴포넌트 및 레이아웃
│   │   ├── layouts/             # 사용자별 레이아웃 모음
│   │   ├── notification/        # 알림 관련 컴포넌트
│   │   └── ...                  # 기타 공통 컴포넌트
│   ├── constants/               # URL, 언어 설정, 사용자 역할구분 등
│   ├── hooks/                   # 커스텀 훅
│   ├── pages/                   # 페이지별 라우트 모음
│   │   ├── auth/                # 로그인, 회원가입, 비밀번호 등
│   │   ├── admin/               # 시스템 관리자 페이지
│   │   ├── company/             # 가맹 회사 관리자 페이지
│   │   ├── service/             # 서비스 소개, 공지사항
│   │   ├── storeManager/        # 제휴 식당 관리자 기능
│   │   └── user/                # 일반 사용자 페이지
│   ├── index.css                # 전역 스타일
│   ├── App.tsx                  # 라우팅 및 루트 컴포넌트
│   ├── main.tsx                 # 앱 엔트리 포인트
│   └── vite-env.d.ts            # 타입 환경설정
├── .prettierrc            
├── eslint.config.js    
├── package.json              
├── tailwind.config.js    
├── tsconfig*.json            
├── vite.config.ts             
└── README.md

```

---


## 📧 **10. 연락처**

- **강정호**: rkdwjdgh08@gmail.com  
- **이한샘**: dev.213am@gmail.com

🚀 **아따빠르네 프로젝트와 함께, 더 빠르고 편리한 점심 시간!** 🍽️🎉
