import React, { useEffect, useState } from 'react';
import { useLocation, Outlet } from 'umi';
import Header from '@/components/Header';
import Menu from '@/components/Menu';
export default function Support(props) {
  const location = useLocation();
  const [current, setCurrent] = useState('');
  useEffect(() => {
    let name = location.pathname.split('/');
    setCurrent(name[2]);
  }, [location.pathname]);
  const bgs = {
    customer: '/customer.png',
    document: '/document.png',
    documentArticle: '/document.png',
    video: '/video.png',
    conversionTool: '/tools.png',
  };
  return (
    <>
      <Menu />
      <Header name={current} bg={bgs[current]} />
      <Outlet />
    </>
  );
}
