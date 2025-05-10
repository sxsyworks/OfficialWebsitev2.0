import LogoBlue from '@/assets/icons/logoBlue.png';
import MobileIcon from '@/assets/icons/menuMobile.png';
import { LangItems, MenuDataNew } from '@/utils/constant';
import { Dropdown } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { FormattedMessage, getLocale, history, Link, setLocale, useLocation, useParams } from 'umi';
import styles from './index.less';

const Menu = () => {
  const params = useParams();
  const [show, setShow] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeParentIndex, setActiveParentIndex] = useState(null);
  const [current, setCurrent] = useState(['']);
  const [curLang, setCurLang] = useState('');
  const [data, setData] = useState([]);
  const location = useLocation();

  const triggerMenu = () => setIsMobileMenuOpen(true);
  const closeMenu = () => {
    setIsMobileMenuOpen(false);
    setActiveParentIndex(null);
  };

  useEffect(() => {
    let name = location.pathname.split('/');
    name.shift();
    if (params.type) {
      name.push(params.type);
    }
    setCurrent(name);
  }, [location]);

  useEffect(() => {
    const locale = getLocale();
    setCurLang(locale);
  }, []);

  const handleChangeLang = ({ key }) => {
    setLocale(key);
    setCurLang(key);
  };

  useEffect(() => {
    if (!curLang) return;
    let { pathname } = location;
    let arr = [];
    let otherLang = curLang === 'zh-CN' ? 'en-US' : 'zh-CN';
    MenuDataNew.map((item) => {
      let { children = [], langs = [], path: topPath } = item;
      let newItem = item;
      let isShowItem = !langs.length || langs.includes(curLang);
      let newTopPath = topPath;
      if (topPath && typeof topPath === 'object') {
        newTopPath = topPath[curLang];
        newItem = { ...newItem, path: newTopPath };
      }
      if (children) {
        const childrenArr = children?.reduce((acc, cur) => {
          let { path } = cur;
          let newPath = path;
          let otherPath;
          if (!isShowItem) {
            newPath = undefined;
            otherPath = path;
          } else if (typeof path === 'object') {
            newPath = path[curLang];
            otherPath = path[otherLang];
          }
          if (newTopPath && pathname !== newTopPath && pathname === otherPath) {
            history.push(newItem.path);
          }
          if (!newTopPath && pathname === otherPath) {
            let url = newPath || '/404';
            history.push(url);
          }
          newPath && acc.push({ ...cur, path: newPath });
          return acc;
        }, []);
        newItem = { ...newItem, children: childrenArr };
      }
      isShowItem && arr.push(newItem);
    });
    setData(arr);
  }, [curLang, location]);

  const MenuDataItem = useMemo(() => {
    return data.map((item, index) => {
      return (
        <div className={styles.menuItem} key={index}>
          {item.path ? (
            <Link
              className={styles.name + ' ' + (current[0] === item.name ? styles.current : '')}
              key={index}
              to={item.path}
            >
              <FormattedMessage id={'menu.' + item.name} />
            </Link>
          ) : (
            <div className={styles.name + ' ' + styles.noLink} key={index}>
              <FormattedMessage id={'menu.' + item.name} />
            </div>
          )}
          <div className={styles.dropMenu} key={index + 'drop'}>
            {item.children &&
              item.children.map((item) => {
                if (item.path && !item.onlyPc) {
                  return (
                    <div className={styles.menuTitle} key={index + item.name}>
                      {!item.target ? (
                        <Link
                          to={item.path}
                          target={item.target || '_parent'}
                          className={current[1] === item.name ? styles.current : ''}
                        >
                          <FormattedMessage id={'menu.' + item.name} />
                        </Link>
                      ) : (
                        <a href={item.path} target={item.target} rel="noopener noreferrer">
                          <FormattedMessage id={'menu.' + item.name} />
                        </a>
                      )}
                    </div>
                  );
                } else {
                  return null;
                }
              })}
          </div>
        </div>
      );
    });
  }, [data, current]);

  const menuClassName = useMemo(() => {
    let className = styles.menu;
    if (show) {
      className += ` ${styles.menuActive}`;
    }
    if (curLang === 'en-US') {
      className += ` ${styles.menuEn}`;
    }
    return className;
  }, [show, curLang]);

  return (
    <>
      {!isMobileMenuOpen && (
        <div className={menuClassName}>
          <div className={styles.top}>
            <div className={styles.logo}>
              <Link to="/">
                <img src={LogoBlue} alt="logo" className={styles.logoBlue} />
              </Link>
            </div>
            <div className={styles.menuIcon} onClick={triggerMenu}>
              <div className={styles.mobileIcon}>
                <img src={MobileIcon} alt="menu" className={styles.mobileIconImg} />
              </div>
              <Dropdown
                menu={{ items: LangItems, onClick: handleChangeLang, selectedKeys: [curLang] }}
                placement="bottom"
              >
                <i className={styles.localIcon}></i>
              </Dropdown>
            </div>
          </div>
          <div className={styles.menuData}>{MenuDataItem}</div>
        </div>
      )}

      {isMobileMenuOpen && (
        <div className={styles.fullscreenMenu}>
          <div className={styles.closeBtn} onClick={closeMenu}>
            ×
          </div>
          <div className={styles.mobileMenuContent}>
            <div className={styles.menuLeft}>
              {data.map((item, idx) => (
                <div
                  key={idx}
                  className={`${styles.parentItem} ${idx === activeParentIndex ? styles.active : ''}`}
                  onClick={() => setActiveParentIndex(idx)}
                >
                  <FormattedMessage id={'menu.' + item.name} />
                </div>
              ))}
            </div>
            <div className={styles.menuRight}>
              {activeParentIndex !== null &&
                data[activeParentIndex]?.children?.map((child, i) => (
                  <div key={i} className={styles.childItem}>
                    {child.target ? (
                      <a href={child.path} target={child.target} rel="noopener noreferrer">
                        <FormattedMessage id={'menu.' + child.name} />
                      </a>
                    ) : (
                      <Link to={child.path}>
                        <FormattedMessage id={'menu.' + child.name} />
                      </Link>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Menu;
