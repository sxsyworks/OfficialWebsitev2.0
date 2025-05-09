import { ReactComponent as Logo } from '@/assets/icons/logo.svg';
import { ReactComponent as MenuIcon } from '@/assets/icons/menu.svg';
import { LangItems, MenuData } from '@/utils/constant';
import { Dropdown } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { FormattedMessage, getLocale, history, Link, setLocale, useLocation, useParams } from 'umi';
import styles from './index.less';

const Menu = () => {
  const params = useParams();
  const [show, setShow] = useState(false);
  const [current, setCurrent] = useState(['']);
  const [curLang, setCurLang] = useState('');
  const [data, setData] = useState([]);
  const location = useLocation();

  const triggerMenu = () => {
    setShow(!show);
  };

  // 设置当前页面名称
  useEffect(() => {
    let name = location.pathname.split('/');
    name.shift();
    if (params.type) {
      name.push(params.type);
    }
    setCurrent(name);
  }, [location]);

  // 获取初始化语言
  useEffect(() => {
    const locale = getLocale();
    setCurLang(locale);
  }, []);

  // 切换语言
  const handleChangeLang = ({ key }) => {
    setLocale(key);
    setCurLang(key);
  };
  // 重组菜单数据&路由跳转 TODO
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
          // 正对中文的joinUS->英文的aboutUs
          if (newTopPath && pathname !== newTopPath && pathname === otherPath) {
            history.push(newItem.path);
          }
          // 对于新闻/换算中心 -> 404 | 切换document页面
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
    <div className={menuClassName}>
      <div className={styles.top}>
        <Link to="/mobile">
          <Logo />
        </Link>
        <div className={styles.menuIcon}>
          <MenuIcon onClick={triggerMenu} />
          <Dropdown menu={{ items: LangItems, onClick: handleChangeLang, selectedKeys: [curLang] }} placement="bottom">
            <i className={styles.localIcon}></i>
          </Dropdown>
        </div>
      </div>
      <div className={styles.menuData}>{MenuDataItem}</div>
    </div>
  );
};
export default Menu;
