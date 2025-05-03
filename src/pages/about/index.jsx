import React, { useEffect, useState } from 'react';
import { useLocation, Outlet } from 'umi';
import Header from '@/components/Header';
import Menu from '@/components/Menu';

export default function About() {
  const location = useLocation();
  const [current, setCurrent] = useState('');
  useEffect(() => {
    let name = location.pathname.split('/');
    setCurrent(name[2]);
  }, [location.pathname]);
  const bgs = {
    aboutUs: '/aboutUs.png',
    joinUs: '/joinUs.png',
  };
  return (
    <>
      <Menu />
      <Header name={current} bg={bgs[current]} />
      <Outlet />
    </>
  );
}
