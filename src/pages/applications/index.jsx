import React, { useEffect, useState } from 'react';
import { useLocation, Outlet } from 'umi';
import Menu from '@/components/Menu';
import Header from '@/components/Header';
export default function Products() {
  const location = useLocation();
  const [current, setCurrent] = useState('');
  useEffect(() => {
    let name = location.pathname.split('/');
    setCurrent(name[2]);
  }, [location.pathname]);
  const bgs = {
    microorganism: '/microorganism.png',
    human: '/human.png',
    animal: '/animal.png',
    plant: '/plant.png',
    clinical: '/clinical.png',
  };
  return (
    <>
      <Menu />
      <Header name={current} bg={bgs[current]} />
      <Outlet />
    </>
  );
}
