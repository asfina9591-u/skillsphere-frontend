import React, { useEffect, useState } from "react";
import axios from "axios";

const Contracts = () => {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/contracts", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setContracts(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchContracts();
  }, []);

  if (loading) return <p>Loading contracts...</p>;

  return (
    <div>
      <h2>Contracts</h2>
      {contracts.length === 0 ? (
        <p>No contracts found</p>
      ) : (
        contracts.map((c) => (
          <div key={c._id} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
            <h3>{c.gigId?.title}</h3>
            <p>Client: {c.clientId?.name}</p>
            <p>Freelancer: {c.freelancerId?.name}</p>
            <p>Status: {c.status}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Contracts;