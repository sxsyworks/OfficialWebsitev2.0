import Phone from '@/assets/icons/phoneRing.png';
import ContactIcons from '@/components/ContactIcons';
import { MenuData } from '@/utils/constant';
import { useEffect, useMemo, useState } from 'react';
import { FormattedMessage, Link, useIntl, useLocation, useModel } from 'umi';
import './index.less';

const Footer = () => {
  const { initialState } = useModel('@@initialState');
  const { isPhone } = initialState;
  const location = useLocation();
  const { formatMessage, locale } = useIntl();
  const [data, setData] = useState([]);
  const business = {
    business: 'business@qitantech.com',
    investment: 'ir@qitantech.com',
    media: 'pr@qitantech.com',
    career: 'hiring@qitantech.com',
  };

  useEffect(() => {
    if (!locale) return;
    const lang = locale === 'zh-CN' ? 'en-US' : 'zh-CN';
    let arr = [];
    MenuData.map((item) => {
      let { children = [], langs = [], path: topPath } = item;
      let newItem = item;
      let isShowItem = !langs.length || langs.includes(locale);
      if (topPath && typeof topPath === 'object') {
        let newTopPath = topPath[locale];
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
            newPath = path[locale];
            otherPath = path[lang];
          }
          newPath && acc.push({ ...cur, path: newPath });
          return acc;
        }, []);
        newItem = { ...newItem, children: childrenArr };
      }
      isShowItem && arr.push(newItem);
    });
    setData(arr);
  }, [locale, MenuData]);

  const businessDom = useMemo(() => {
    let dom = [];
    Object.getOwnPropertyNames(business).forEach((key) => {
      dom.push(
        <div className="cooItem" key={key}>
          <div className="title">
            <FormattedMessage id={'contact.' + key} />
          </div>
          {!isPhone && <div className="linkText">{business[key]}</div>}
        </div>,
      );
    });
    return dom;
  }, []);

  const links = useMemo(() => {
    return data.map((item, index) => {
      if (!item.hideInFooter) {
        return (
          <div key={item.name} className="footerLinks">
            {item.path ? (
              <Link to={item.path}>
                <FormattedMessage id={'menu.' + item.name} />
              </Link>
            ) : (
              <div>
                <FormattedMessage id={'menu.' + item.name} />
              </div>
            )}
            <ul className="footerLinkList">
              {item.children &&
                item.children.map((child) => {
                  return (
                    <li key={index + '_' + child.name} className="linkText">
                      <a href={child.path} target={child.target || '_parent'} rel="noopener noreferrer">
                        <FormattedMessage id={'menu.' + child.name} />
                      </a>
                    </li>
                  );
                })}
            </ul>
          </div>
        );
      }
    });
  }, [data]);

  return (
    <div className={`footer ${isPhone ? 'mobileFooter' : ''}`} id="footer">
      <div className="topBox">
        <div className="leftBox">
          <div>
            <Link to="/">
              <img
                src={require('@/assets/icons/logoWhite.png')}
                alt="齐碳科技logo"
                className="seoLogo"
                title="齐碳科技"
              />
            </Link>
          </div>
          <div className="cooperation">{businessDom}</div>
        </div>
        <div className="footerMenu">{links}</div>
      </div>
      <div className="bottomBox">
        <div className="rowBox">
          <div className="centerBox">
            <img src={Phone} alt="telephone" className="phoneIcon" />
            +86-400-800-2038
          </div>
          <div className="contact">
            <div className="contactIcon">
              <ContactIcons />
            </div>
          </div>
        </div>

        <div className="legalBox">
          <div className="linkText1">备案/许可证号： 蜀ICP备17004819号-1</div>
          <div className="linkText2">Copyright ©2016-2022 Qitan Tech. All Rights Reserved.</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
