"use client";

import React from "react";
import { Button } from "@/components/ui/button";

interface NavigationProps {
  activeTab: "posting" | "community" | "messages";
  setActiveTab: (tab: "posting" | "community" | "messages") => void;
}

const DashNavigationButtons: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="px-10 md:px-20 lg:px-50">
      <Button
        size="default"
        variant={activeTab === "posting" ? "default" : "outline"}
        onClick={() => setActiveTab("posting")}
        className="hover:text-blue-500 mr-4 hover:bg-transparent font-medium"
      >
        Postings
      </Button>
      <Button
        size="default"
        variant={activeTab === "community" ? "default" : "outline"}
        onClick={() => setActiveTab("community")}
        className="hover:text-blue-500 mr-4 hover:bg-transparent font-medium"
      >
        Community
      </Button>
      <Button
        size="default"
        variant={activeTab === "messages" ? "default" : "outline"}
        onClick={() => setActiveTab("messages")}
        className="hover:text-blue-500 mr-4 hover:bg-transparent font-medium"
      >
        Messages
      </Button>
    </div>
  );
};

export default DashNavigationButtons;
