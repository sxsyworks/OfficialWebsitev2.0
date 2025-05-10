import LogoBlue from '@/assets/icons/logoBlue.png';
import MobileIcon from '@/assets/icons/menuMobile.png';
import { LangItems, MenuDataNew } from '@/utils/constant';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { FormattedMessage, getLocale, history, Link, setLocale, useIntl, useLocation, useParams } from 'umi';
import styles from './index.less';

const Menu = () => {
  const params = useParams();
  const { locale } = useIntl();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeParentIndex, setActiveParentIndex] = useState(null);
  const [current, setCurrent] = useState(['']);
  const [curLang, setCurLang] = useState('');
  const [data, setData] = useState([]);
  const [showChildMenu, setShowChildMenu] = useState(false);
  const [showGrandchildScreen, setShowGrandchildScreen] = useState(false);
  const [selectedChild, setSelectedChild] = useState(null);

  const location = useLocation();

  const triggerMenu = () => setIsMobileMenuOpen(true);
  const closeMenu = () => {
    setIsMobileMenuOpen(false);
    setActiveParentIndex(null);
    setShowChildMenu(false);
    setShowGrandchildScreen(false);
    setSelectedChild(null);
  };

  const closeChildMenu = () => {
    setShowChildMenu(false);
    setShowGrandchildScreen(false);
    setSelectedChild(null);
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
    if (isMobileMenuOpen) {
      className += ` ${styles.menuActive}`;
    }
    if (curLang === 'en-US') {
      className += ` ${styles.menuEn}`;
    }
    return className;
  }, [isMobileMenuOpen, curLang]);

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
            <div className={styles.menuIcon}>
              <div className={styles.mobileIcon}>
                <img src={MobileIcon} alt="menu" className={styles.mobileIconImg} onClick={triggerMenu} />
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

      {isMobileMenuOpen && !showChildMenu && (
        <div className={styles.fullscreenMenu}>
          <div className={styles.closeBtn} onClick={closeMenu}>
            ×
          </div>
          <div className={styles.mobileMenuContent}>
            <div className={styles.menuLeft}>
              {data.map((item, idx) => {
                const hasChildren = item.children && item.children.length > 0;
                return (
                  <div
                    key={idx}
                    className={`${styles.parentItem} ${idx === activeParentIndex ? styles.active : ''}`}
                    onClick={() => {
                      if (hasChildren) {
                        setShowChildMenu(true);
                        setActiveParentIndex(idx);
                      } else if (item.path) {
                        if (item.target) {
                          window.open(item.path, item.target);
                        } else {
                          history.push(item.path);
                        }
                        closeMenu();
                      }
                    }}
                  >
                    <FormattedMessage id={'menu.' + item.name} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {showChildMenu && !showGrandchildScreen && (
        <div className={styles.fullscreenMenu}>
          <div className={styles.closeBtn} onClick={closeMenu}>
            ×
          </div>
          <div className={styles.menuLeft}>
            <div className={styles.backBtn} onClick={closeChildMenu}>
              <ArrowLeftOutlined style={{ fontSize: '24px', color: '#3078ff' }} />
            </div>
          </div>
          <div className={styles.mobileMenuContent}>
            <div className={styles.menuRight}>
              {data[activeParentIndex]?.children?.map((child, i) => (
                <div
                  key={i}
                  className={styles.childItem}
                  onClick={() => {
                    if (activeParentIndex === 0 && [1, 2, 3].includes(i)) {
                      setSelectedChild(child);
                      setShowGrandchildScreen(true);
                    } else {
                      if (child.target) {
                        window.open(child.path, child.target);
                      } else {
                        history.push(child.path);
                      }
                      closeMenu();
                    }
                  }}
                >
                  <FormattedMessage id={'menu.' + child.name} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {showGrandchildScreen && selectedChild && (
        <div className={styles.fullscreenMenu}>
          <div className={styles.closeBtn} onClick={closeMenu}>
            ×
          </div>
          <div className={styles.menuLeft}>
            <div
              className={styles.backBtn}
              onClick={() => {
                setShowGrandchildScreen(false);
                setSelectedChild(null);
              }}
            >
              <ArrowLeftOutlined style={{ fontSize: '24px', color: '#3078ff' }} />
            </div>
          </div>
          <div className={styles.mobileMenuContent}>
            <div className={styles.GrandchildItem}>
              <div className={styles.GrandchildItemTitle}>
                <FormattedMessage id={'menu.' + selectedChild.name} />
              </div>
              <div className={styles.GrandchildItemSubTitle}>
                {(() => {
                  const idx = data[0]?.children?.findIndex((c) => c.name === selectedChild.name);
                  if (idx === 1)
                    return (
                      <div className={styles.extraContent}>
                        <div className={styles.subExtraContent}>
                          <div className={styles.thirdSubtitle}>
                            {locale === 'zh-CN' ? '测序平台' : 'Nanopore Sequencer'}
                          </div>
                          <div className={styles.thirdTitle}>
                            <a href="">QNome</a>
                            <a href="">QPursue</a>
                          </div>
                        </div>
                        <div className={styles.subExtraContent}>
                          <div className={styles.thirdSubtitle}>
                            {locale === 'zh-CN' ? '配套试剂/芯片' : 'Supporting Reagent / Flow cell'}
                          </div>
                          <div className={styles.thirdTitle}>
                            <a href="">{locale === 'zh-CN' ? '建库试剂盒' : 'DNA Library prep kit'}</a>
                            <a href="">{locale === 'zh-CN' ? '极速建库试剂盒' : 'Ultra-fast DNA Library Prep Kit'}</a>
                            <a href="">
                              {locale === 'zh-CN' ? '极速条形码建库试剂盒' : 'Ultra-fast Barcoding Library Prep Kit-8'}
                            </a>
                            <a href="">
                              {locale === 'zh-CN' ? '直接条形码建库试剂盒' : 'Ligation Native Barcoding Kit'}
                            </a>
                            <a href="">{locale === 'zh-CN' ? '测序试剂盒' : 'DNA Sequencing kits'}</a>
                            <a href="">{locale === 'zh-CN' ? '清洗试剂盒' : 'Wash kit'}</a>
                            <a href="">QCell-384</a>
                            <a href="">QCell-6k</a>
                          </div>
                        </div>
                        <div className={styles.subExtraContent}>
                          <div className={styles.thirdSubtitle}>
                            {locale === 'zh-CN' ? '测序软件' : 'Sequencing Software'}
                          </div>
                          <div className={styles.thirdTitle}>
                            <a href="">QPreasy</a>
                          </div>
                        </div>
                      </div>
                    );
                  if (idx === 2)
                    return (
                      <div className={styles.extraContent}>
                        <div className={styles.subExtraContent}>
                          <div className={styles.thirdSubtitle}>
                            {locale === 'zh-CN' ? '自动化工作站' : 'Sequencing Auto-Library Prep Workstation'}
                          </div>
                          <div className={styles.thirdTitle}>
                            <a href="">QPrenano-32</a>
                            <a href="">QPrenano-100</a>
                            <a href="">QApure-mini</a>
                          </div>
                        </div>
                        <div className={styles.subExtraContent}>
                          <div className={styles.thirdSubtitle}>
                            {locale === 'zh-CN' ? '配套仪器' : 'Supporting Instrument'}
                          </div>
                          <div className={styles.thirdTitle}>
                            <a href="">QFluo-200</a>
                            <a href="">QBioprep-6</a>
                          </div>
                        </div>
                      </div>
                    );
                  if (idx === 3)
                    return (
                      <div className={styles.extraContent}>
                        <div className={styles.subExtraContent}>
                          <div className={styles.thirdTitleLast}>
                            {locale === 'zh-CN' ? (
                              <>
                                <a href="">宏基因组测序配套仪器</a>
                                <a href="">多重呼吸道病原体核酸检测配套仪器</a>
                                <a href="">单病原基因组靶向测序配套仪器</a>
                                <a href="">分枝杆菌分型及耐药检测配套仪器</a>
                                <a href="">超灵敏度新型冠状病毒全基因组捕获配套仪器</a>
                                <a href="">全质粒测序配套仪器</a>
                                <a href="">全长 HLA 分型配套仪器</a>
                                <a href="">全长转录组测序配套仪器</a>
                                <a href="">全长线粒体测序配套仪器</a>
                                <a href="">65 位点 STR 配套仪器</a>
                              </>
                            ) : (
                              <>
                                <a href="">QPathNano Nanopore Metagenomic Sequencing Solution</a>
                                <a href="">QPathNano Multiplex Respiratory Pathogen Nucleic Acid Detection Solution</a>
                                <a href="">Nanopore Single Pathogen Targeted Sequencing Solutions</a>
                                <a href="">QPathNano Mycobacterial typing and drug resistance testing solutions</a>
                                <a href="">
                                  QPathNano ultra-sensitive SARS-CoV-2 whole genome capture and nanopore sequencing
                                  solution
                                </a>
                                <a href="">Nanopore Whole Plasmid Sequencing Total Solution</a>
                                <a href="">Full-length HLA typing solution</a>
                                <a href="">Full-length transcriptome library preparation kit</a>
                                <a href="">Full-Length Mitochondrial DNA Nanopore Sequencing Solution</a>
                                <a href="">Short Tandem Repeats Nanopore Sequencing Solution</a>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  return null;
                })()}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Menu;
