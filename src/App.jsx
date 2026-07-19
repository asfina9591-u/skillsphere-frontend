import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Gigs from "./pages/Gigs";
import CreateGig from "./pages/CreateGig";
import GigDetails from "./pages/GigDetails";
import Contracts from "./pages/Contracts";
import Reviews from "./pages/Reviews";
import Notifications from "./pages/Notifications";

// Wrapper to extract dynamic userId from URL params for the Reviews component
function ReviewsWrapper() {
  const { userId } = useParams();
  return <Reviews userId={userId} />;
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* User & Dashboard Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />

        {/* Gig Management Routes */}
        <Route path="/gigs" element={<Gigs />} />
        <Route path="/gigs/:id" element={<GigDetails />} />
        <Route path="/creategig" element={<CreateGig />} />

        {/* Features & Interactions */}
        <Route path="/contracts" element={<Contracts />} />
        <Route path="/reviews/:userId" element={<ReviewsWrapper />} />
        <Route path="/notifications" element={<Notifications />} />
      </Routes>
    </Router>
  );
}

export default App;