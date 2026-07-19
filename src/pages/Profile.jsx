import React, { useState } from "react";
import axios from "axios";

const Profile = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");
  const [profilePic, setProfilePic] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      setStatusMsg("");
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setStatusMsg("Please select an image first.");
      return;
    }

    setUploading(true);
    setStatusMsg("");

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("profilePic", selectedFile);

      const res = await axios.put(
        "http://localhost:5000/api/profile/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setStatusMsg("✅ Profile picture updated successfully!");
      setProfilePic(res.data.profilePic);
    } catch (err) {
      console.error(err);
      setStatusMsg(
        err.response?.data?.message || "Failed to upload profile picture."
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "40px auto" }}>
      <h2>Profile Picture</h2>

      {profilePic && (
        <div style={{ marginBottom: "15px" }}>
          <p>Current picture:</p>
          <img
            src={`http://localhost:5000${profilePic}`}
            alt="Profile"
            style={{ width: "150px", height: "150px", objectFit: "cover", borderRadius: "8px" }}
          />
        </div>
      )}

      {preview && !profilePic && (
        <div style={{ marginBottom: "15px" }}>
          <p>Preview:</p>
          <img
            src={preview}
            alt="Preview"
            style={{ width: "150px", height: "150px", objectFit: "cover", borderRadius: "8px" }}
          />
        </div>
      )}

      <input type="file" accept="image/*" onChange={handleFileChange} />

      <div style={{ marginTop: "15px" }}>
        <button onClick={handleUpload} disabled={uploading}>
          {uploading ? "Uploading..." : "Upload Picture"}
        </button>
      </div>

      {statusMsg && <p style={{ marginTop: "10px" }}>{statusMsg}</p>}
    </div>
  );
};

export default Profile;