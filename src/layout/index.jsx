import Footer from '@/components/Footer';
import { MenuData } from '@/utils/constant';
import { useEffect, useState } from 'react';
import { Helmet, history, Outlet, useIntl, useLocation, useModel } from 'umi';
import './index.less';

export default function Layout() {
  const { initialState } = useModel('@@initialState');
  const { isPhone } = initialState;
  const location = useLocation();
  const [name, setName] = useState('home');
  const isHome = location.pathname === '/' || (location.pathname === '/mobile' && isPhone);
  const { formatMessage, locale } = useIntl();

  // 屏蔽右键菜单下载资源
  useEffect(() => {
    document.addEventListener('contextmenu', (event) => event.preventDefault());
  }, []);

  useEffect(() => {
    let path = location.pathname;
    // TODO 需简化
    MenuData.find((item) => {
      let isCur = item.path === path || path === item.path?.[locale];
      if (isCur) {
        setName(item.name);
      } else if (item.children) {
        return item.children.find((it) => {
          let itPath = it.path;
          if (path === itPath || path === itPath?.[locale]) {
            setName(it.name);
          }
        });
      }
    });
    // 跳转
    if (path === '/mobile' && isPhone) return;
    if (path === '/') {
      if (isPhone) {
        history.push('/mobile');
      }
      setName('home');
      return;
    }
  }, [location.pathname, locale]);

  // 修改网站字体
  useEffect(() => {
    let fontFamily = locale === 'zh-CN' ? 'Noto Sans SC' : 'Noto Sans';
    document.body.style.fontFamily = fontFamily;
  }, [locale]);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="keywords" content={formatMessage({ id: `page.${name}.seo.keywords` })} />
        <meta name="description" content={formatMessage({ id: `page.${name}.seo.description` })} />
        <title>{formatMessage({ id: `page.${name}.seo.title` })}</title>
      </Helmet>
      <div className="layouts" id="app">
        <Outlet />
        {isHome ? null : <Footer />}
      </div>
      {/* SEO LOGO */}
      <img src={require('@/assets/imgs/seo-logo.jpg')} alt="seo-logo" title="seo" className="seoImg" />
    </>
  );
}
