import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateGig = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [skills, setSkills] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/gigs",
        { title, description, budget, skills: skills.split(",") },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate("/gigs");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
      <input value={budget} onChange={(e) => setBudget(e.target.value)} placeholder="Budget" />
      <input value={skills} onChange={(e) => setSkills(e.target.value)} placeholder="Skills (comma separated)" />
      <button type="submit">Create Gig</button>
    </form>
  );
};

export default CreateGig;
