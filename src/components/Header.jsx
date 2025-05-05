import React from 'react';
import Navbar from './Navbar';

const Header = () => {
 

  return (
    <>
      <header className="bg-white shadow sticky top-0 z-50" style={{
        borderTop: '5px solid',
        borderImage: 'linear-gradient(to right, #183153, #094335) 1',
        borderImageSlice: 1
      }}>
       <Navbar/>
      </header>
    </>
  );
};

export default Header;
