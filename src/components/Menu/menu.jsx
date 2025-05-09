import LogoBlue from '@/assets/icons/logoBlue.png';
import Phone from '@/assets/icons/phoneBlue.png';
import { LangItems, MenuDataNew } from '@/utils/constant';
import { Dropdown } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { FormattedMessage, getLocale, history, Link, setLocale, useIntl, useLocation } from 'umi';
import styles from './index.less';

export default function Menu() {
  const { formatMessage } = useIntl();
  const { locale } = useIntl();
  const location = useLocation();
  const [current, setCurrent] = useState(['']);
  const [curLang, setCurLang] = useState('');
  const [data, setData] = useState([]);
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const [isSubmenuHovered, setIsSubmenuHovered] = useState(false);
  const [hoveredSubmenuIndex, setHoveredSubmenuIndex] = useState(null);
  const [clickedSubmenuIndex, setClickedSubmenuIndex] = useState(null);

  const lang = useMemo(() => {
    return LangItems.find((item) => item.key === curLang)?.lang;
  }, [curLang]);

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
  }, [curLang, MenuDataNew, location]);

  const MenuDataItem = useMemo(() => {
    return data?.map((item, index) => (
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
    ));
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
    setClickedSubmenuIndex(null);
  };

  const handleMenuLeave = () => {
    if (!isSubmenuHovered) {
      setHoveredMenu(null);
      setClickedSubmenuIndex(null);
    }
  };

  const handleSubmenuEnter = () => {
    setIsSubmenuHovered(true);
  };

  const handleSubmenuLeave = () => {
    setIsSubmenuHovered(false);
    setHoveredMenu(null);
    setClickedSubmenuIndex(null);
  };

  const handleSubmenuClick = (idx) => {
    setClickedSubmenuIndex((prev) => (prev === idx ? null : idx));
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
          <div
            className={`${styles.submenuInner} ${
              hoveredMenu?.name === 'products' && clickedSubmenuIndex >= 1 ? styles.alignEnd : ''
            }`}
          >
            {hoveredMenu.children.map((child, idx) => (
              <div
                className={`${styles.submenuItem} ${clickedSubmenuIndex === idx ? styles.active : ''}`}
                key={idx}
                onMouseEnter={() => setHoveredSubmenuIndex(idx)}
                onMouseLeave={() => setHoveredSubmenuIndex(null)}
                onClick={() => {
                  handleSubmenuClick(idx);

                  if (hoveredMenu?.name === 'products') {
                    if (idx === 0) {
                      history.push('/contact');
                    }
                  } else {
                    if (child?.path) {
                      if (typeof child.path === 'string') {
                        history.push(child.path);
                      } else if (typeof child.path === 'object' && child.path[curLang]) {
                        history.push(child.path[curLang]);
                      }
                    }
                  }
                }}
              >
                <p className={styles.submenuChildren}>
                  <FormattedMessage id={'menu.' + child.name} />
                </p>
              </div>
            ))}
          </div>

          {hoveredMenu?.name === 'products' && clickedSubmenuIndex === 1 && (
            <div className={styles.submenuRight}>
              <div className={styles.submenuRightTop}>
                <div className={styles.submenuRightTopLeft}>
                  {locale === 'zh-CN' ? '测序平台' : 'Nanopore Sequencer'}
                </div>
                <div
                  className={`${styles.submenuRightTopRight1} ${
                    locale === 'en-US' ? styles.submenuRightTopRight1En : ''
                  }`}
                >
                  <a href="">QNome</a>
                  <a href="">QPursue</a>
                </div>
              </div>
              <div className={styles.submenuRightTop}>
                <div className={styles.submenuRightTopLeft}>
                  {locale === 'zh-CN' ? '配套试剂/芯片' : 'Supporting Reagent / Flow cell'}
                </div>
                <div className={styles.submenuRightTopRight}>
                  <a href="">{locale === 'zh-CN' ? '建库试剂盒' : 'DNA Library prep kit'}</a>
                  <a href="">{locale === 'zh-CN' ? '极速建库试剂盒' : 'Ultra-fast DNA Library Prep Kit'}</a>
                  <a href="">
                    {locale === 'zh-CN' ? '极速条形码建库试剂盒' : 'Ultra-fast Barcoding Library Prep Kit-8'}
                  </a>
                  <a href="">{locale === 'zh-CN' ? '直接条形码建库试剂盒' : 'Ligation Native Barcoding Kit'}</a>
                  <a href="">{locale === 'zh-CN' ? '测序试剂盒' : 'DNA Sequencing kits'}</a>
                  <a href="">{locale === 'zh-CN' ? '清洗试剂盒' : 'Wash kit'}</a>
                  <a href="">QCell-384</a>
                  <a href="">QCell-6k</a>
                </div>
              </div>
              <div className={styles.submenuRightBottom}>
                <div className={styles.submenuRightBottomLeft}>
                  {locale === 'zh-CN' ? '测序软件' : 'Sequencing Software'}
                </div>
                <div
                  className={`${styles.submenuRightBottomRight} ${
                    locale === 'en-US' ? styles.submenuRightBottomRightEn : ''
                  }`}
                >
                  <a href="">QPreasy</a>
                </div>
              </div>
            </div>
          )}

          {hoveredMenu?.name === 'products' && clickedSubmenuIndex === 2 && (
            <div className={styles.submenuRight}>
              <div className={styles.submenuRightTop}>
                <div className={styles.submenuRightTopLeft}>
                  {locale === 'zh-CN' ? '自动化工作站' : 'Sequencing Auto-Library Prep Workstation'}
                </div>
                <div className={styles.submenuRightTopRight}>
                  <a href="">QPrenano-32</a>
                  <a href="">QPrenano-100</a>
                  <a href="">QApure-mini</a>
                </div>
              </div>
              <div className={styles.submenuRightBottom}>
                <div className={styles.submenuRightBottomLeft}>
                  {locale === 'zh-CN' ? '配套仪器' : 'Supporting Instrument'}
                </div>
                <div
                  className={`${styles.submenuRightBottomRight} ${
                    locale === 'en-US' ? styles.submenuRightBottomRight2En : ''
                  }`}
                >
                  <a href="">QFluo-200</a>
                  <a href="">QBioprep-6</a>
                </div>
              </div>
            </div>
          )}

          {hoveredMenu?.name === 'products' && clickedSubmenuIndex === 3 && (
            <div className={styles.submenuRight}>
              <div className={styles.submenuRightBottom}>
                <div className={styles.submenuRightBottomRight1}>
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
                        QPathNano ultra-sensitive SARS-CoV-2 whole genome capture and nanopore sequencing solution
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
          )}
        </div>
      )}
    </div>
  );
}
