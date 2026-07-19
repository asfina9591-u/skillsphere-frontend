import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchDashboard();
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h2>Dashboard</h2>
      <p>💰 Earnings: {data.earnings}</p>
      <p>📄 Active Contracts: {data.activeContracts}</p>
      <p>📨 Pending Proposals: {data.pendingProposals}</p>
      <p>⭐ Reviews: {data.reviews}</p>
    </div>
  );
};

export default Dashboard;
