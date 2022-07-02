import { useEffect } from "react";
import Timeline from "../components/timeline";
import Sidebar from "../components/sidebar";
import Header from "../components/header";

const Dashboard = () => {
  useEffect(() => (document.title = "Instagram"));
  return (
    <div className="bg-gray-background">
      <Header />
      <div className="grid">
        <Timeline />
        <Sidebar />
      </div>
    </div>
  );
};

export default Dashboard;
