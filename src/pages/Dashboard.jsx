import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");
        const role = JSON.parse(atob(token.split(".")[1])).role;
        const endpoint = role === "freelancer" ? "freelancer" : "client";

        const res = await axios.get(`http://localhost:5000/api/dashboard/${endpoint}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load dashboard.");
      }
    };
    fetchDashboard();
  }, []);

  if (error) return <p>{error}</p>;
  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h2>Dashboard</h2>
      {data.totalEarnings !== undefined && <p>💰 Earnings: {data.totalEarnings}</p>}
      {data.activeContracts !== undefined && <p>📄 Active Contracts: {data.activeContracts}</p>}
      {data.pendingProposals !== undefined && <p>📨 Pending Proposals: {data.pendingProposals}</p>}
      {data.totalGigs !== undefined && <p>📋 Total Gigs Posted: {data.totalGigs}</p>}
      {data.completedProjects !== undefined && <p>✅ Completed Projects: {data.completedProjects}</p>}
    </div>
  );
};

export default Dashboard;