import { useEffect } from "react";
import "../layouts/user.css"; // 유저 페이지 전용 스타일

const UserLayout = ({ children }) => {
  useEffect(() => {
    document.body.classList.add("user-layout");
    return () => document.body.classList.remove("user-layout");
  }, []);

<<<<<<< HEAD
  return (
    <div className="user-layout w-full block outline outline-black">
      {children}
    </div>
  );
=======
  return <div className="user-layout h-[100vh]">{children}</div>;
>>>>>>> 3cf4eebd5cab5826abc51aee2747fe1cd71ff691
};

export default UserLayout;
