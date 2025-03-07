"use client";

import DashNavBar from "../components/DashNavBar";
import { useState } from "react";
import Posting from "./posting/Posting";
import Community from "./community/Community";
import Messages from "./messages/Messages";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"posting" | "community" | "messages">("posting");

  return (
    <div>
      {/* ✅ Pass `activeTab` and `setActiveTab` to DashNavBar */}
      <DashNavBar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* ✅ Content changes based on `activeTab` */}
      <div className="mt-20 p-6">
        {activeTab === "posting" && <Posting/>}
        {activeTab === "community" && <Community />}
        {activeTab === "messages" && <Messages />}
      </div>
    </div>
  );
}
