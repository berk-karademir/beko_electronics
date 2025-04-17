import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/userSlice';
import { useToast } from '../context/ToastContext';
import { ShoppingCart, LogOut, LogIn, User, Search} from 'lucide-react';
import AnimatedLogo from './AnimatedLogo';
import { ELECTRONICS_CATEGORIES } from '../constants/electronicsCategories';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector(state => state.user);
  const { showToast } = useToast();
  const [search, setSearch] = useState('');

  // Kategori slug'ını path'ten tam olarak bul
  const currentCategory = location.pathname.startsWith('/category/')
    ? location.pathname.split('/').pop()
    : null;

  const handleLogout = () => {
    dispatch(logout());
    showToast('Çıkış yapıldı.', 'success');
    navigate('/');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/search?q=${encodeURIComponent(search.trim())}`);
      setSearch('');
    }
  };

  return (
    <>
      <header className="bg-white shadow sticky top-0 z-50" style={{
        borderTop: '5px solid',
        borderImage: 'linear-gradient(to right, #183153, #094335) 1',
        borderImageSlice: 1
      }}>
        <nav className="container mx-auto flex items-center justify-between py-2 px-4 relative" style={{borderBottom: 'none'}}>
          <Link to="/" className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <AnimatedLogo/>
            <span className="ml-1" style={{fontWeight: 700}}>BEKO Electronics</span>
          </Link>
          <ul className="flex bg-white/80 rounded-md shadow-sm overflow-hidden" style={{border: '1px solid #eee'}}>
            {ELECTRONICS_CATEGORIES.map((cat, idx) => (
              <li key={cat.slug} style={{minWidth: 120}}>
                <Link
                  to={`/category/${cat.slug}`}
                  className={`flex flex-col items-center py-2 px-3 h-full text-xs font-medium transition-colors ${currentCategory === cat.slug ? 'text-[#FF6B01] font-bold bg-orange-200' : 'text-gray-700'} hover:text-[#FF6B01]`}
                  style={{borderRight: idx !== ELECTRONICS_CATEGORIES.length-1 ? '1px solid #eee' : 'none', borderRadius: 0}}
                >
                  <span>{cat.name}</span>
                </Link>
              </li>
            ))}
          </ul>
          <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 ml-4">
            <div style={{
              padding: 2,
              borderRadius: 6,
              background: 'linear-gradient(90deg, #183153,  #094335)',
              display: 'flex',
              alignItems: 'center',
            }}>
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Ürün, kategori veya marka ara..."
                className="border-none outline-none px-2 py-1 text-sm rounded focus:outline-none focus:ring bg-white"
                style={{minWidth: 220, background: 'white', borderRadius: 4}}
              />
            </div>
            <button type="submit" className="text-[#FF6B01] hover:text-[#7C3AED]">
              <Search size={20} />
            </button>
          </form>
          <div className="flex items-center gap-4 ml-4">
            <Link to="/cart" className="relative group">
              <ShoppingCart size={22} />
            </Link>
            {isAuthenticated ? (
              <>
                <span className="text-gray-700 flex items-center gap-1"><User size={18} /> {user?.username}</span>
                <button onClick={handleLogout} className="text-red-600 hover:text-red-800 ml-2" title="Çıkış Yap">
                  <LogOut size={20} />
                </button>
              </>
            ) : (
              <Link to="/login" className="text-blue-700 hover:text-blue-900 flex items-center gap-1">
                <LogIn size={20} /> Giriş Yap
              </Link>
            )}
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
