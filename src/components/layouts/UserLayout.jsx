import { useEffect } from "react";
import "../layouts/user.css"; // 유저 페이지 전용 스타일

const UserLayout = ({ children }) => {
  useEffect(() => {
    document.body.classList.add("user-layout");
    return () => document.body.classList.remove("user-layout");
  }, []);

  return (
    <div className="user-layout w-full block outline outline-black bg-white">
      {children}
    </div>
  );
};

export default UserLayout;
