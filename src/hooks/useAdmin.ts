"use client";

import { getRole } from "@/utils/role";
import { getToken } from "@/utils/token";
import { useEffect, useState } from "react";

export const useAdmin =  () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const check = () => setIsAdmin(Boolean(getToken() && getRole()));
    check();

    const interval = setInterval(check, 1000); //fallback

    window.addEventListener("auth-change", check);
    return () => {
      clearInterval(interval);
      window.removeEventListener('auth-change', check);
    }
  }, []);
  return isAdmin;
}
