import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const navigate = useNavigate();
  const sessionUserId = window.sessionStorage.getItem("userId");

  return { sessionUserId: sessionUserId ? <></> : <></> };
};
export default useAuth;
