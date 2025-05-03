import DocumentTable from '@/components/DocumentTable';
import { useMemo } from 'react';
import { useRouteProps } from '@umijs/max'
import { DocumentBlockList } from './constant';

export default function Document() {
  const routeProps = useRouteProps();
  const blockList = useMemo(() => {
    const blocks = routeProps?.blocks || ['manuals', 'demo', 'article'];
    return DocumentBlockList.filter((item) => {
      if (blocks.includes(item.key)) {
        return item;
      }
    });
  }, [routeProps?.blocks]);

  return (
    <>
      {blockList.map((item) => {
        return <DocumentTable key={item} item={item} />;
      })}
    </>
  );
}