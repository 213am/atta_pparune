import { useEffect } from "react";
import "../layouts/store.css"; // 매장 페이지 전용 스타일

const StoreLayout = ({ children }) => {
  useEffect(() => {
    document.body.classList.add("store-layout");
    return () => document.body.classList.remove("store-layout");
  }, []);

  return (
    <div className="store-layout w-full block bg-white shadow-xl overflow-y-scroll overflow-x-hidden scrollbar-hide">
      {children}
    </div>
  );
};

export default StoreLayout;
