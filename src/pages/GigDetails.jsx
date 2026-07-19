import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const GigDetails = () => {
  const { id } = useParams();
  const [gig, setGig] = useState(null);
  const [bidAmount, setBidAmount] = useState("");
  const [message, setMessage] = useState("");
  const [applying, setApplying] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");

  useEffect(() => {
    const fetchGig = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/gigs/${id}`);
        setGig(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchGig();
  }, [id]);

  const handleApply = async () => {
    if (!bidAmount || !message) {
      setStatusMsg("Please enter both bid amount and message.");
      return;
    }

    setApplying(true);
    setStatusMsg("");

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5000/api/proposals",
        {
          gigId: id,
          bidAmount: Number(bidAmount),
          message
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setStatusMsg("✅ Proposal submitted successfully!");
      setBidAmount("");
      setMessage("");
    } catch (err) {
      console.error(err);
      setStatusMsg(
        err.response?.data?.message || "Failed to submit proposal."
      );
    } finally {
      setApplying(false);
    }
  };

  if (!gig) return <p>Loading...</p>;

  return (
    <div>
      <h2>{gig.title}</h2>
      <p>{gig.description}</p>
      <p>💰 Budget: {gig.budget}</p>
      <p>🛠 Skills: {gig.skills?.join(", ")}</p>
      <p>👤 Posted By: {gig.postedBy?.name}</p>

      <div style={{ marginTop: "20px" }}>
        <h3>Apply for this Gig</h3>
        <div>
          <input
            type="number"
            placeholder="Your bid amount"
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
          />
        </div>
        <div style={{ marginTop: "10px" }}>
          <textarea
            placeholder="Cover letter / message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            style={{ width: "300px" }}
          />
        </div>
        <button onClick={handleApply} disabled={applying} style={{ marginTop: "10px" }}>
          {applying ? "Submitting..." : "Apply"}
        </button>
        {statusMsg && <p>{statusMsg}</p>}
      </div>
    </div>
  );
};

export default GigDetails;