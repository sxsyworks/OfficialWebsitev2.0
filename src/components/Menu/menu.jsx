import LogoBlue from '@/assets/icons/logoBlue.png';
import Phone from '@/assets/icons/phoneBlue.png';
import { LangItems, MenuData } from '@/utils/constant';
import { Dropdown } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { FormattedMessage, getLocale, history, Link, setLocale, useIntl, useLocation } from 'umi';
import styles from './index.less';

export default function Menu() {
  const { formatMessage } = useIntl();
  const location = useLocation();
  const [current, setCurrent] = useState(['']);
  const [curLang, setCurLang] = useState('');
  const [data, setData] = useState([]);
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const [isSubmenuHovered, setIsSubmenuHovered] = useState(false);
  const [hoveredSubmenuIndex, setHoveredSubmenuIndex] = useState(null);

  const lang = useMemo(() => {
    return LangItems.find((item) => item.key === curLang)?.lang;
  }, [curLang]);

  // Reorganize menu data & route navigation
  useEffect(() => {
    if (!curLang) return;
    let { pathname } = location;
    let arr = [];
    let otherLang = curLang === 'zh-CN' ? 'en-US' : 'zh-CN';

    MenuData.map((item) => {
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
  }, [curLang, MenuData, location]);

  const MenuDataItem = useMemo(() => {
    return data?.map((item, index) => {
      return (
        <div
          className={`${styles.menuItem} ${current[0] === item.name ? styles.current : ''} ${
            item.path ? styles.link : ''
          }`}
          key={index}
          onMouseEnter={() => handleMenuHover(item)}
          onMouseLeave={handleMenuLeave}
        >
          {item.path ? (
            <Link className={styles.menuTitle} key={index} to={item.path}>
              <FormattedMessage id={'menu.' + item.name} />
            </Link>
          ) : (
            <div className={styles.menuTitle} key={index}>
              <FormattedMessage id={'menu.' + item.name} />
            </div>
          )}
        </div>
      );
    });
  }, [data, current]);

  useEffect(() => {
    let name = location.pathname.split('/');
    name.shift();
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

  const handleMenuHover = (item) => {
    setHoveredMenu(item);
  };

  const handleMenuLeave = () => {
    if (!isSubmenuHovered) {
      setHoveredMenu(null);
    }
  };

  const handleSubmenuEnter = () => {
    setIsSubmenuHovered(true);
  };

  const handleSubmenuLeave = () => {
    setIsSubmenuHovered(false);

    setHoveredMenu(null);
  };

  return (
    <div
      className={styles.menuWrapper}
      onMouseEnter={() => setIsSubmenuHovered(true)}
      onMouseLeave={() => setIsSubmenuHovered(false)}
    >
      <div className={styles.menu}>
        <div className={styles.logo}>
          <Link to="/">
            <img src={LogoBlue} alt="logo" className={styles.logoBlue} />
          </Link>
        </div>

        <div className={styles[formatMessage({ id: 'page.css.menus' })]}>{MenuDataItem}</div>

        <div className={styles.extra}>
          <div className={styles.extraItem}>
            <img className={styles.topPhoneIcon} src={Phone} />
            <span className={styles.phoneNum}> +86-400-800-2038</span>
          </div>
          <div className={styles.extraItem2}>
            <Dropdown
              menu={{ items: LangItems, onClick: handleChangeLang, selectedKeys: [curLang] }}
              autoAdjustOverflow
              placement="bottom"
            >
              <a onClick={(e) => e.preventDefault()} className={styles.locale}>
                <i className={styles.localIcon}></i>
                {lang}
              </a>
            </Dropdown>
          </div>
        </div>
      </div>

      {hoveredMenu && hoveredMenu.children?.length > 0 && (
        <div className={styles.submenuContainer} onMouseEnter={handleSubmenuEnter} onMouseLeave={handleSubmenuLeave}>
          <div className={styles.submenuInner}>
            {hoveredMenu.children.map((child, idx) => (
              <div
                className={styles.submenuItem}
                key={idx}
                onMouseEnter={() => setHoveredSubmenuIndex(idx)}
                onMouseLeave={() => setHoveredSubmenuIndex(null)}
              >
                {!child.target ? (
                  <Link to={child.path} target="_parent">
                    <FormattedMessage id={'menu.' + child.name} />
                  </Link>
                ) : (
                  <a href={child.path} target={child.target} rel="noopener noreferrer">
                    <FormattedMessage id={'menu.' + child.name} />
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* {hoveredSubmenuIndex === 1 && ( */}
          <div className={styles.submenuRight}>
            <div className={styles.submenuRightTop}>
              <div className={styles.submenuRightTopLeft}>测序平台</div>
              <div className={styles.submenuRightTopRight}>top right</div>
            </div>
            <div className={styles.submenuRightBottom}>
              <div className={styles.submenuRightBottomLeft}>配套试剂/芯片</div>
              <div className={styles.submenuRightBottomRight}>bottom right</div>
            </div>
          </div>
          {/* )} */}
        </div>
      )}
    </div>
  );
}
