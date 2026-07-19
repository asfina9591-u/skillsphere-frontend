import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Gigs = () => {
  const [gigs, setGigs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGigs = async () => {
      try {
        // Get token from localStorage
        const token = localStorage.getItem("token");

        console.log("Token:", token);

        const res = await axios.get(
          "http://localhost:5000/api/gigs",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("API Response:", res.data);

        setGigs(res.data);
      } catch (err) {
        console.error("Error fetching gigs:", err);

        if (err.response) {
          console.log("Status:", err.response.status);
          console.log("Response:", err.response.data);
        }
      }
    };

    fetchGigs();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>🔥 TEST GIGS PAGE 🔥</h2>

      {gigs.length === 0 ? (
        <p>No gigs found</p>
      ) : (
        gigs.map((gig) => (
          <div
            key={gig._id}
            style={{
              border: "1px solid gray",
              margin: "15px 0",
              padding: "15px",
              borderRadius: "8px",
            }}
          >
            <h3>{gig.title}</h3>

            <p>{gig.description}</p>

            <p>
              <strong>Budget:</strong> ₹{gig.budget}
            </p>

            <p>
              <strong>Posted By:</strong>{" "}
              {gig.postedBy?.name || "Unknown"}
            </p>

            <button
              onClick={() => navigate(`/gigs/${gig._id}`)}
            >
              View Details
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Gigs;