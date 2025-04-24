"use client";

import DashNavBar from "../components/DashNavBar";
import { useState, useEffect } from "react";
import Posting from "./posting/Posting";
import Community from "./community/Community";
import Messages from "./messages/Messages";
import { useAuthStore } from "../store/useAuthStore";

export default function DashboardPage() {
  const{ checkAuth, isCheckingAuth } = useAuthStore();
  const [activeTab, setActiveTab] = useState<"posting" | "community" | "messages">("posting");


  useEffect(() => {
    checkAuth(); // Call checkAuth on component mount
  }, []);

  if (isCheckingAuth) {
    return <p>Loading...</p>; // Show a loading state while checking auth
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden font-serif font-medium">
      {/*  Navbar remains fixed at the top */}
      <DashNavBar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/*  Content area below navbar, no overflow */}
      <div className="flex-1 overflow-hidden">
        {activeTab === "posting" && <Posting />}
        {activeTab === "community" && <Community />}
        {activeTab === "messages" && <Messages />}
      </div>
    </div>
  );
}
