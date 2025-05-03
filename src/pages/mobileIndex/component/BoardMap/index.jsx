import { getGeoJson } from '@/services/api';
import { MapChart, ScatterChart } from 'echarts/charts';
import {
  GeoComponent,
  MarkPointComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  VisualMapComponent,
} from 'echarts/components';
import * as echarts from 'echarts/core';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { useEffect, useRef, useState } from 'react';
import { useIntl } from 'umi';
import styles from './index.less';

const BoardMap = () => {
  echarts.use([
    TitleComponent,
    ToolboxComponent,
    TooltipComponent,
    VisualMapComponent,
    GeoComponent,
    MapChart,
    CanvasRenderer,
    UniversalTransition,
    ScatterChart,
    MarkPointComponent,
  ]);
  const { formatMessage } = useIntl();
  const [chart, setChart] = useState(null);
  const [cur, setCur] = useState(2);
  const timer = useRef(null);
  const nows = useRef(2);
  const radio = {
    zoom: 3.2,
    left: '-20%',
    top: '38%',
  };

  const style = {
    active: {
      symbolOffset: [-30, 30],
      symbol: 'image://' + require('@/assets/imgs/board/board-lights.png'),
      itemStyle: {
        borderColor: '#84EBFF',
      },
    },
    normol: {
      symbolOffset: [22, 18],
      symbol: 'image://' + require('@/assets/imgs/board/board-dark.png'),
      itemStyle: {
        borderColor: '#787878',
      },
    },
  };

  const points = [
    {
      name: '北京市',
      cityName: formatMessage({ id: 'home.board.beijing.name' }),
      coord: [116.405285, 39.904989],
      text: formatMessage({ id: 'home.board.beijing.addr' }),
      symbolOffset: [-30, 30],
      symbol: 'image://' + require('@/assets/imgs/board/board-lights.png'),
      // symbolRotate: -90, // TODO
      itemStyle: {
        color: 'transparent',
        borderColor: '#84EBFF',
      },
    },
    {
      name: '四川省',
      cityName: formatMessage({ id: 'home.board.chengdu.name' }),
      coord: [104.065735, 30.659462],
      text: formatMessage({ id: 'home.board.chengdu.addr' }),
    },
    {
      name: '广东省',
      cityName: formatMessage({ id: 'home.board.guangzhou.name' }),
      coord: [113.280637, 23.125178],
      text: formatMessage({ id: 'home.board.guangzhou.addr' }),
    },
    {
      name: '江苏省',
      cityName: formatMessage({ id: 'home.board.nanjing.name' }),
      coord: [119.486506, 32.983991],
      text: formatMessage({ id: 'home.board.nanjing.addr' }),
    },
  ];

  const option = {
    tooltip: {
      show: true, //是否显示提示框组件，包括提示框浮层和 axisPointer。
      trigger: 'item', //触发类型。item,axis,none
      enterable: false, //鼠标是否可进入提示框浮层中，默认为false，
      showContent: true, //是否显示提示框浮层
      triggerOn: 'none', //提示框触发的条件(mousemove|click|none)
      showDelay: 0, //浮层显示的延迟，单位为 ms，默认没有延迟，也不建议设置。在 triggerOn 为 'mousemove' 时有效。
      textStyle: {
        color: '#fff',
        fontSize: 10,
      },
      borderWidth: 0,
      position: () => {},
      // position: ['50%', '50%'],
      padding: [10, 10],
      hideDelay: 60, //浮层隐藏的延迟
      formatter: (o) => {
        return o.data ? `<div class="map-hover-mov">${o.data.text}</div>` : '';
      },
      backgroundColor: 'transparent', //提示框浮层的背景颜色。
      alwaysShowContent: true,
      transitionDuration: 1, // 提示框浮层的移动动画过渡时间，单位是 s，设置为 0 的时候会紧跟着鼠标移动。
      confine: true,
    },
    geo: {
      type: 'map',
      map: 'china',
      zoom: 3.2,
      left: '-20%',
      top: '40%',
      ...radio,
      itemStyle: {
        opacity: 0, //图形透明度 0 - 1
      },
      zlevel: 3,
      label: {
        show: false, //显示省份标签
        emphasis: {
          show: false, //对应的鼠标悬浮效果
        },
      },
    },
    series: [
      {
        name: 'dot',
        zLevel: 4, // TODO 不起效果，总是会被markPoint的图片覆盖
        map: 'china',
        type: 'scatter',
        coordinateSystem: 'geo',
        symbol: 'circle', // 可以替换为我们想要的图形，或者通过其他样式实现
        symbolSize: 10,
        label: {
          show: true,
          offset: [0, 60],
          fontSize: 18,
          color: '#fff',
          formatter: (params) => {
            return params.data.cityName;
          },
        },
        itemStyle: {
          color: '#fff',
        },
        data: points.map((item) => {
          return {
            name: item.name,
            value: item.coord,
            text: item.text,
            cityName: item.cityName,
          };
        }),
      },
      {
        name: 'circle',
        map: 'china',
        type: 'scatter',
        coordinateSystem: 'geo',
        symbol: 'circle', // 可以替换为我们想要的图形，或者通过其他样式实现
        symbolSize: 30,
        itemStyle: {
          color: 'transparent',
          borderColor: '#787878',
        },
        data: points.map((item) => {
          return {
            name: item.name,
            value: item.coord,
            text: item.text,
            cityName: item.cityName,
            itemStyle: item.itemStyle,
          };
        }),
      },
      {
        name: '中国',
        type: 'map',
        mapType: 'china',
        // zoom: 3.2,
        // left: '-20%',
        // top: '40%',
        ...radio,
        // selectedMode: 'multiple',
        tooltip: {
          show: false,
        },
        itemStyle: {
          opacity: 1,
          borderColor: '#293D70',
          borderWidth: 1,
          areaColor: '#32507D',
        },
        select: {
          label: {
            show: false,
          },
          itemStyle: {
            opacity: 1,
            borderColor: '#293D70',
            borderWidth: 1,
            areaColor: '#32507D',
          },
        },
        markPoint: {
          // TODO 自定义图片： 1.中心不太能和中间的点重合 2.这个图片太大，以至于会互相覆盖，还不能选择被其覆盖的区域了
          symbolSize: [500, 320],
          symbolOffset: [22, 18],
          // Tips：自定义图片的 路径(注：必须以image://开头)
          symbol: 'image://' + require('@/assets/imgs/board/board-dark.png'),
          data: points,
        },
        data: points.map((item) => {
          return {
            name: item.name,
          };
        }),
      },
    ],
  };

  useEffect(async () => {
    const chartDom = document.getElementById('main');
    let height = window?.innerHeight || document?.documentElement?.clientHeight || document?.body?.clientHeight;
    const myChart = echarts.init(chartDom, null, { height });
    const res = await getGeoJson();
    const GeoJson = res?.data;
    if (GeoJson) {
      echarts.registerMap('china', GeoJson);
      myChart.setOption(option);
      setChart(myChart);
    }
  }, []);

  // 切换且激活城市，触发chart重新更新options
  useEffect(() => {
    if (!chart) return;
    const newPoints = points.map((item, idx) => {
      return { ...item, ...(idx === cur ? style.active : style.normol) };
    });
    // 切换文本
    chart.dispatchAction({
      type: 'showTip',
      seriesIndex: 0,
      dataIndex: cur, // TODO
    });
    // 切换图片和点样式
    chart.setOption({
      series: [
        { name: 'dot' },
        {
          name: 'cicle',
          data: newPoints.map((item) => {
            return {
              name: item.name,
              value: item.coord,
              text: item.text,
              cityName: item.cityName,
              itemStyle: item.itemStyle,
            };
          }),
        },
        {
          name: '中国',
          markPoint: {
            symbolSize: [500, 320],
            data: newPoints,
          },
        },
      ],
    });
  }, [cur, chart]);

  // 开启轮询，每次更新cur值
  const poll = () => {
    timer.current = window.setInterval(() => {
      nows.current = (nows.current + 1) % points.length;
      setCur(nows.current);
    }, 2000);
  };

  useEffect(() => {
    if (!chart) return;
    // 循环
    poll();

    // 监听鼠标移入事件，停止轮询并触发城市激活高亮的效果
    // geoselectchanged TODO这个无法事件监听
    chart.on('mouseover', function (e) {
      let cur = points.findIndex((item) => item.name === e.name);
      if (e.componentType === 'markPoint') return;
      if (cur >= 0) {
        clearInterval(timer.current);
        setCur(cur);
        nows.current = cur;
      }
    });

    // 监听鼠标移出事件，立马开始轮询，并且从当前位置开始
    chart.on('mouseout', function (e) {
      let cur = points.findIndex((item) => item.name === e.name);
      if (e.componentType === 'markPoint') return;
      if (cur >= 0) {
        nows.current = (nows.current + 1) % points.length;
        setCur(nows.current);
        clearInterval(timer.current);
        timer.current = null;
        poll();
      }
    });

    return () => {
      clearInterval(timer.current);
      chart.off('mouseover');
      chart.off('mouseout');
    };
  }, [chart]);

  return <div id="main" className={styles.chart}></div>;
};

const Board = () => {
  return (
    <div className={`item ${styles.board}`}>
      <Map />
    </div>
  );
};

export default BoardMap;
