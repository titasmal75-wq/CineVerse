import { Route, Routes } from "react-router-dom";
import Profile from "../pages/Profile";
import Favourite from "../pages/Favourite";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home";
import MovieDetails from "../pages/MovieDetail";

export default function RoutePage() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/favourite" element={<Favourite />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/movie/:id" element={<MovieDetails />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
