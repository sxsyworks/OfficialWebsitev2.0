import Phone from '@/assets/icons/phoneRing.png';
import ContactIcons from '@/components/ContactIcons';
import { MenuData } from '@/utils/constant';
import { useEffect, useMemo, useState } from 'react';
import { FormattedMessage, Link, useIntl, useLocation, useModel } from 'umi';
//useIntl needs "typescript": "^5.8.3"
import './index.less';

const Footer = () => {
  const { initialState } = useModel('@@initialState');
  const { isPhone } = initialState;
  const location = useLocation();
  const { locale } = useIntl();
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
          <a href={`mailto:${business[key]}`} className="linkText">
            {business[key]}
          </a>
        </div>,
      );
    });
    return dom;
  }, []);

  return (
    <div className={`footer ${isPhone ? 'mobileFooter' : ''}`} id="footer">
      <div className="topBox">
        {isPhone && (
          <div className="phoneContact">
            <p className="text1">联系我们</p>
            <p className="text2">Contact us</p>
          </div>
        )}

        {!isPhone && (
          <div className="logoBox">
            <Link to="/">
              <img
                src={require('@/assets/icons/logoWhite.png')}
                alt="齐碳科技logo"
                className="seoLogo"
                title="齐碳科技"
              />
            </Link>
          </div>
        )}
        <div className="cooperation">{businessDom}</div>
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
