import { ContactMapAddr } from '@/utils/constant';
import { useEffect, useState } from 'react';
import { useIntl } from 'umi';
import styles from './index.less';

const ContactMap = () => {
  const { formatMessage } = useIntl();
  const [cur, setCur] = useState(ContactMapAddr[0]?.key);
  const [map, setMap] = useState(null);
  const [icon, setIcon] = useState(null);

  const handleAddrChange = (key) => {
    setCur(key);
  };

  useEffect(() => {
    // 创建地图
    // const tMap = new T.Map('mapDiv');
    // setMap(tMap);
    // tMap.disableScrollWheelZoom();
    // tMap.disableDoubleClickZoom();
    // tMap.disableDrag();
    // TODO 这些事件失效，之前可使用，应该是天地图自身api问题导致
    // tMap.enableDrag();
    // 添加鼠标点击事件 失效可以通过.mapWrap .map的样式 取消样式pointer-events：none 来获取坐标
    // const cp = new T.CoordinatePickup(tMap, {
    //   callback: (lnglat) => {
    //     console.log(`经纬度坐标:[ ${lnglat.lng.toFixed(6)} , ${lnglat.lat.toFixed(6)}]`);
    //   },
    // });
    // cp.addEvent();
    // tMap.addEventListener('click', (e) => {
    //   console.log(e.lnglat.getLng() + ',' + e.lnglat.getLat());
    // });
    //创建icon图片对象
    // const tIcon = new T.Icon({
    //   iconUrl: Icon,
    //   iconSize: new T.Point(32, 32),
    //   iconAnchor: new T.Point(5, 5),
    // });
    // setIcon(tIcon);
  }, []);

  useEffect(() => {
    if (!map || !icon) return;
    // 设置地图位置
    const coord = ContactMapAddr.find((item) => item.key === cur)?.coord;
    let lngLat = new T.LngLat(coord[0], coord[1]);
    map.centerAndZoom(lngLat, 17);
    //向地图上添加自定义标注
    var marker = new T.Marker(lngLat, { icon: icon });
    map.addOverLay(marker);
  }, [map, icon, cur]);

  return (
    <div className={styles.mapWrap + ' ' + styles[formatMessage({ id: 'page.css.page' })]}>
      <ul className={styles.addrs}>
        {ContactMapAddr.map((item, idx) => (
          <li
            key={item.key}
            className={`${styles.addr} ${cur === item.key ? styles.active : ''}`}
            onClick={() => handleAddrChange(item.key)}
          >
            <i className={`${styles.icon}`}></i>
            <div className={styles.info}>
              <h4 className={styles.name}>{formatMessage({ id: `contact.map.title.${item.key}` })}</h4>
              <p className={styles.text}>{formatMessage({ id: `contact.map.addr.${item.key}` })}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className={styles.map} id="mapDiv"></div>
    </div>
  );
};

export default ContactMap;
