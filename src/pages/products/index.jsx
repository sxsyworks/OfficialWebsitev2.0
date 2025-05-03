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
    nanoporeGene: '/gene.png',
    sequencer: '/sequencer.png',
    supplies: '/supplies.png',
    software: '/software.png',
    tools: '/tools.png',
  };
  return (
    <>
      <Menu />
      <Header name={current} bg={bgs[current]} />
      <Outlet />
    </>
  );
}
