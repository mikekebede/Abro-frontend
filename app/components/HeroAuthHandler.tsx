"use client";

import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";

const HeroAuthHandler = () => {
  const { authUser, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  console.log([authUser])
  return null;
};

export default HeroAuthHandler;
