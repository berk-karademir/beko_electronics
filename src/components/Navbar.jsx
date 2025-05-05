import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/userSlice";
import {
  ShoppingCart,
  LogOut,
  LogIn,
  User,
  Search,
  ClipboardPen,
} from "lucide-react";
import AnimatedLogo from "./AnimatedLogo";
import { ELECTRONICS_CATEGORIES } from "../constants/electronicsCategories";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const [search, setSearch] = useState("");

  // Kategori slug'ını path'ten tam olarak bul
  const currentCategory = location.pathname.startsWith("/category/")
    ? location.pathname.split("/").pop()
    : null;

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/search?q=${encodeURIComponent(search.trim())}`);
      setSearch("");
    }
  };

  return (
    <>
      <nav
        className="flex items-center justify-center py-4 gap-4"
        style={{ borderBottom: "none" }}
      >
        <Link
          to="/"
          className="text-2xl font-bold tracking-tight flex items-center "
        >
          <AnimatedLogo />
          <span className="ml-2">BEKO Electronics</span>
        </Link>
        <ul
          className="flex bg-white rounded-md shadow-sm overflow-hidden"
          style={{ border: "1px solid #eee" }}
        >
          {ELECTRONICS_CATEGORIES.map((cat, idx) => (
            <li key={cat.slug}>
              <Link
                to={`/category/${cat.slug}`}
                className={`flex items-center justify-center px-5 py-2 text-xs font-medium transition-colors ${
                  currentCategory === cat.slug
                    ? "text-[#FF6B01] font-bold bg-orange-200"
                    : "text-gray-700"
                } hover:text-[#FF6B01]`}
                style={{
                  borderRight:
                    idx !== ELECTRONICS_CATEGORIES.length - 1
                      ? "1px solid #eee"
                      : "none",
                  borderRadius: 0,
                }}
              >
                <span>{cat.name}</span>
              </Link>
            </li>
          ))}
        </ul>

        <form onSubmit={handleSearchSubmit} className="flex items-center">
          <div
            style={{
              padding: 2,
              borderRadius: 6,
              background: "linear-gradient(90deg, #183153,  #094335)",
              display: "flex",
              alignItems: "center",
            }}
          >
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="products, categories or brands..."
              className="border-none outline-none py-1 px-2  text-sm rounded focus:outline-none focus:ring bg-white"
              style={{ minWidth: 220, background: "white", borderRadius: 4 }}
            />
          </div>
          <button type="submit" className="text-[#FF6B01] hover:text-[#7C3AED]">
            <Search size={24} color="#183153" />
          </button>
        </form>
        {/*------- VERTICAL DESIGN ---------*/}
        {/* <div className="bg-gray-200 rounded-md py-2 w-30">
          {!isAuthenticated && (
            <div className="flex flex-col gap-2 items-center">
              <Link to="/login" className="flex items-center gap-2">
                <LogIn size={24} color="#183153" />
                Giriş Yap
              </Link>

              <div className="w-full border border-gray-400"></div>

              <Link to="/register" className="flex items-center gap-2">
                <ClipboardPen size={24} color="#183153" />
                Kayıt Ol
              </Link>
            </div>
          )}
        </div> */}

        {/*------- HORIZONTAL DESIGN ---------*/}
        <div className="bg-gray-200 rounded-md px-3">
          {!isAuthenticated && (
            <div className=" flex gap-2 items-center">
              <Link to="/login" className="flex items-center gap-2">
                <LogIn size={24} color="#183153" />
                Login
              </Link>

              { <div className="h-10 border border-gray-400"></div> }

              <Link to="/register" className="flex items-center gap-2">
                <ClipboardPen size={24} color="#183153" />
                Register
              </Link>
            </div>
          )}
        </div>

        <div>
          <Link to="/cart" className="flex items-center gap-1">
            <ShoppingCart size={26} />
            Cart
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Header;
