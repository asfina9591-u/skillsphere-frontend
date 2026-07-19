import React, { useEffect, useState } from "react";
import axios from "axios";

const Reviews = ({ userId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/reviews/${userId}`);
        setReviews(res.data.reviews || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (userId) fetchReviews();
  }, [userId]);

  if (loading) return <p>Loading reviews...</p>;

  return (
    <div>
      <h2>Reviews</h2>
      {reviews.length === 0 ? (
        <p>No reviews found</p>
      ) : (
        reviews.map((r) => (
          <div key={r._id} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
            <p>⭐ {r.rating}</p>
            <p>💬 {r.comment}</p>
            <p>By: {r.reviewer?.name}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Reviews;