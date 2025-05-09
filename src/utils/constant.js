export const OssBaseUrl = 'https://webjpg.qitantech.com';
// export const OssBaseUrl = 'https://qitan-officialweb.oss-cn-beijing.aliyuncs.com';

// export const Devices = [
//   {
//     key: '3841',
//     name: 'QNome-3841',
//     // label: '便携式纳米孔基因测序仪',
//     info: [
//       { key: 'flux', name: '设计通量', value: '5Gb' },
//       { key: 'length', name: '最大读长', value: '>4M' },
//       { key: 'weight', name: '重  量', value: '800g' },
//     ],
//   },
//   {
//     key: 'hex',
//     name: 'QNome-3841hex',
//     // label: '桌面式纳米孔基因测序仪',
//     info: [
//       { key: 'flux', name: '设计通量', value: '30Gb' },
//       { key: 'length', name: '最大读长', value: '>4M' },
//       { key: 'flowcell', name: '测序芯片', value: '6pcs' },
//     ],
//   },
// ];

export const Devices = [
  {
    key: 'QNome-3841',
    name: 'QNome-3841',
    info: [
      {
        name: 'flux',
        value: '5',
        unit: 'gb',
      },
      {
        name: 'length',
        value: 'Mb',
        unit: 'level',
      },
      {
        name: 'weight',
        value: '800',
        unit: 'g',
      },
    ],
    img: '',
  },
  {
    key: 'QNome-3841hex',
    name: 'QNome-3841hex',
    info: [
      {
        name: 'flux',
        value: '30',
        unit: 'gb',
      },
      {
        name: 'length',
        value: 'Mb',
        unit: 'level',
      },
      {
        name: 'weight',
        value: '10',
        unit: 'kg',
      },
    ],
    img: '',
  },
  {
    key: 'QPursue-6k',
    name: 'QPursue-6K',
    info: [
      {
        name: 'flux',
        value: '60',
        unit: 'gb',
      },
      {
        name: 'length',
        value: 'Mb',
        unit: 'level',
      },
      {
        name: 'weight',
        value: '1.6',
        unit: 'kg',
      },
    ],
    img: '',
  },
  {
    key: 'QPursue-6khex',
    name: 'QPursue-6khex',
    info: [
      {
        name: 'flux',
        value: '360',
        unit: 'gb',
      },
      {
        name: 'length',
        value: 'Mb',
        unit: 'level',
      },
      {
        name: 'weight',
        value: '13',
        unit: 'kg',
      },
    ],
    img: '',
  },
];

// 中英文菜单
export const LangItems = [
  {
    key: 'zh-CN',
    label: 'Chinese 中文',
    lang: '语言',
  },
  {
    key: 'en-US',
    label: 'English English',
    lang: 'Language',
  },
];

// 菜单列表配置 TODO info可以取消
export const MenuDataNew = [
  {
    name: 'products',
    children: [
      {
        name: 'technicalPrinciple',
        path: '/products/nanoporeGene',
        info: {
          title: '纳米孔测序-齐碳科技',
          keywords: '纳米孔测序,基因测序,长读长,四代测序,单分子测序',
          description:
            '纳米孔链测序法是通过电场力驱动单链核酸分子穿过纳米尺寸的蛋白孔道，由于不同的碱基通过纳米孔道时产生了不同阻断程度的电流信号，由此可根据电流信号识别每条核酸分子上的碱基信息，从而实现对单链核酸分子的测序。',
        },
      },
      {
        name: 'NanoporeSequencingPlatform',
        function: 'handle1.2',
        path: '/products/sequencer',
        info: {
          title: '基因测序仪-齐碳科技',
          keywords: '基因测序仪,长读长测序, QNome,第四代基因测序仪,国产基因测序仪',
          description: '国产第四代基因测序仪，实时、便携的长读长测序设备，让基因测序走进更多使用场景',
        },
        //children: [{ names: 'sequencer' }, { names: 'supplies' }],
      },
      {
        name: 'LaboratoryAutomation',
        path: '/products/supplies',
        info: {
          title: '测序耗材-齐碳科技',
          keywords: '测序试剂盒,试剂盒,测序芯片,纳米孔基因测序仪,DNA文库',
          description: '国产第四代基因测序仪，实时、便携的长读长测序设备，让基因测序走进更多使用场景',
        },
      },
      {
        name: 'OverallSolution',
        path: '/products/software',
        info: {
          title: '测序软件-齐碳科技',
          keywords: '测序软件,碱基识别,Qpreasy,芯片检查，测序数据分析',
          description:
            '测序软件运行在计算工作站上，控制纳米孔基因测序仪实现测序流程，包括芯片检查、测序、碱基识别和测序结果分析。测序软件向用户提供直观友好的界面，操作简单便捷。',
        },
      },
    ],
  },

  {
    name: 'support',
    children: [
      {
        name: 'Services',
        path: '/support/customer',
        info: {
          title: '售后服务-齐碳科技',
          keywords: '售后服务,齐碳科技,基因测序',
          description:
            '齐碳科技在中国多个地区设有技术服务中心和办事处，我们将第一时间响应客户需求，提供高效优质的售后服务。',
        },
      },
      {
        name: 'Publications',
        path: {
          'zh-CN': '/support/document',
          'en-US': '/support/documentArticle',
        },
        mapPath: '/support/documentArticle',
        onlyPc: true,
        info: {
          title: '文档中心-齐碳科技',
          keywords: '文档中心,齐碳科技,基因测序',
          description:
            '齐碳科技是一家致力于纳米孔基因测序仪及配套芯片、试剂的自主研发、制造与应用开发的国家高新技术企业。凭借国际一流的研发实力，公司成功发布国内首款自主研发的纳米孔基因测序仪并实现商业化，将为生命科学及相关领域的研究和应用提供更加便捷、有效的解决方案。',
        },
      },
      {
        name: 'Videos',
        path: '/support/video',
        info: {
          title: '视频集锦-齐碳科技',
          keywords: '视频集锦,齐碳科技,基因测序',
          description:
            '齐碳科技是一家致力于纳米孔基因测序仪及配套芯片、试剂的自主研发、制造与应用开发的国家高新技术企业。凭借国际一流的研发实力，公司成功发布国内首款自主研发的纳米孔基因测序仪并实现商业化，将为生命科学及相关领域的研究和应用提供更加便捷、有效的解决方案。',
        },
      },
      {
        name: 'community',
        path: 'https://github.com/QITAN-TECHNOLOGY',
        target: '_blank',
        info: {
          title: '交流社区-齐碳科技',
          keywords: '换算工具,齐碳科技,github',
          description:
            '齐碳科技是一家致力于纳米孔基因测序仪及配套芯片、试剂的自主研发、制造与应用开发的国家高新技术企业。凭借国际一流的研发实力，公司成功发布国内首款自主研发的纳米孔基因测序仪并实现商业化，将为生命科学及相关领域的研究和应用提供更加便捷、有效的解决方案。',
        },
      },
      {
        name: 'conversionTool',
        path: {
          'zh-CN': '/support/conversionTool',
        },
        info: {
          title: '换算工具-齐碳科技',
          keywords: '换算工具,齐碳科技,单位转换,上样体积计算器',
          description:
            'DNA测序单位转换及上样体积计算器，通过输入DNA摩尔数、DNA长度以及样品浓度，即可快速得到最终上样体积数。',
        },
      },
    ],
  },
  {
    name: 'news',
    langs: ['zh-CN'],
    children: [
      {
        name: 'dynamic',
        path: '/news/dynamic',
        info: {
          title: '企业动态-齐碳科技',
          keywords: '齐碳科技官方公众号，企业动态，齐碳科技',
          description: '',
        },
      },
      {
        name: 'report',
        path: '/news/report',
        info: {
          title: '媒体报道-齐碳科技',
          keywords: '媒体报道，齐碳科技',
          description: '',
        },
      },
    ],
  },
  {
    name: 'about',
    path: {
      'en-US': '/about/aboutUs',
    },
    children: [
      {
        name: 'aboutUs',
        path: {
          'zh-CN': '/about/aboutUs',
        },
        info: {
          title: '关于我们-齐碳科技',
          keywords: '',
          description: '',
        },
      },
      {
        name: 'joinUs',
        path: {
          'zh-CN': '/about/joinUs',
        },
        info: {
          title: '加入齐碳-齐碳科技',
          keywords: '招聘，齐碳科技，福利政策，职位搜索，股票期权',
          description: '',
        },
      },
    ],
  },
  {
    name: 'contact',
    path: '/contact',
    info: {
      title: '联系我们-齐碳科技',
    },
    hideInFooter: true,
  },
];

//  !DEl 应用全景图
export const Areas = [
  {
    key: 'medical',
    title: '医疗研究领域',
    num: 8,
    kinds: [
      {
        id: 1,
        name: <>肿瘤检测</>,
        desc: '纳米孔基因测序技术可全面准确检测肿瘤患者的点突变、插入缺失、染色体重排等与肿瘤发生发展相关的基因缺陷，有利于明确病因及制定临床管理策略。',
      },
      {
        id: 2,
        name: <>遗传病检测</>,
        desc: '纳米孔基因测序技术除了可准确地检出导致遗传病发生的点突变与插入缺失外，更有利于检出长片段结构变异并获得更精确的断点位置，助力锁定致病基因及制定临床管理策略。',
      },
      {
        id: 3,
        name: <>生殖健康</>,
        desc: '纳米孔基因测序技术可在孕前、产前和新生儿期三个阶段检测基因缺陷，在出生缺陷防治以及辅助生殖等方向发挥重要作用。',
      },
      {
        id: 4,
        name: <>基础医学研究</>,
        desc: '纳米孔基因测序技术可广泛用于探寻肿瘤患者、遗传病患者、感染性病原的遗传物质与疾病表型间的关系，助力了解不同类型疾病的发病规律与机制，发现新的生物标志物。',
        canme: true,
      },
      {
        id: 5,
        name: <>药物基因组学</>,
        desc: '纳米孔基因测序技术可更全面地评价各种基因突变，包括大片段结构变异与药效及药物安全性的关系，有助于加速新药研发与上市的进程，以及更精确地指导个体用药。',
      },
      {
        id: 6,
        name: <>新药研发</>,
        desc: '纳米孔基因测序技术可用于发现肿瘤及遗传病患者特殊的突变特征、解析病原基因组结构，从而有利于生物标志物的发现，以及靶向药物或疫苗的研发。',
        cname: true,
      },
      {
        id: 7,
        name: (
          <>
            公共卫生
            <br />
            与防疫
          </>
        ),
        cname: <>公共卫生与防疫</>,
        desc: '纳米孔基因测序设备小巧便携，可实时输出测序结果，长读长测序更有利于获得完整准确的病原检测结果，可在重大突发公共卫生事件中深入一线，助力疫情防控。',
      },
      {
        id: 8,
        name: <>病原体研究</>,
        desc: '纳米孔测序数据读长长，获得的长片段之间可以有更多的交叉重叠区域，有利于病原基因组和质粒组装，更可跨越短读长数据难以跨越的复杂区域，获得更完整精细的病原基因组信息。',
      },
    ],
  },
  {
    key: 'non-medical',
    title: '非医疗研究领域',
    num: 6,
    kinds: [
      {
        id: 1,
        name: <>司法鉴定</>,
        desc: '纳米孔基因测序读长范围广、通量灵活，可同时用于检测数百个扩增子长度不同的SNP、STR等多种法医领域常用的遗传标记，设备小巧操作简单，更有利于基层实验室安装使用。',
      },
      {
        id: 2,
        name: <>环境监测与保护</>,
        desc: '纳米孔基因测序设备小巧便携，操作简单，长读长特点可获得不同物种完整的基因组序列，更有利于深入不同现场环境，对不同生物样本进行实时测序和鉴定，便于环境质量状况的评估。',
      },
      {
        id: 3,
        name: <>农业育种</>,
        desc: '纳米孔基因测序技术可用于健全农林生态基因库信息，挖掘种质资源或品种的优势性状对应的功能基因，助力优良新品种的精准培育。',
      },
      {
        id: 4,
        name: <>物种鉴定</>,
        desc: '纳米孔基因测序技术可覆盖更长片段的物种保守区域和复杂基因组区域，有利于更简单准确地获得物种保守区的一致性序列，从而助力更简单准确地物种鉴定。',
      },
      {
        id: 5,
        cname: <>动植物疫病防治</>,
        name: (
          <>
            动植物
            <br />
            疫病防治
          </>
        ),
        desc: '纳米孔基因测序技术读长长、速度快，可快速准确地获得病原基因组信息，助力及时采取适当和必要的防治手段，阻止病原传播造成大范围的经济损失。',
      },
      {
        id: 6,
        cname: <>生物多样性保护</>,
        name: (
          <>
            生物
            <br />
            多样性保护
          </>
        ),
        desc: '纳米孔基因测序设备小巧便携、操作简便，可灵活地应用于多元应用场景，长读长特点更加适应不同物种的基因组数据采集，有利于不同生物基因组资源的采集和保护。',
      },
    ],
  },
];

export const TimelineData = {
  2022: {
    '2月': ['QNome-3841通过北京市计量检测科学研究院检测认证'],
    '3月': ['广州研发中心成立'],
    '5月': ['上榜CHC&中信证券“2021年度医疗健康最具投资价值企业TOP50”'],
    '6月': ['发布桌面式纳米孔基因测序仪QNome-3841hex', '上榜动脉网“2022未来医疗100强·创新医疗器械榜TOP100”'],
    '8月': ['入选36kr “2022中国10倍增长潜力医疗企业TOP100” '],
    '10月': ['荣获“四川省新经济示范企业”及被认定为“四川省‘专精特新’中小企业”'],
    '11月': ['获得《哈佛商业评论》“2022拉姆·查兰管理实践奖”'],
    '12月': ['完成7亿人民币C轮融资，由美团领投，华盖资本管理的首都大健康基金、博远资本持续追加投资'],
  },

  2021: {
    '4月': [
      'QNome-9604通过权威第三方TÜV莱茵（中国）检测认证',
      '作为成都高新区“四派人才”企业代表，向克强总理汇报工作，总理鼓励齐碳坚持自主创新、加快产业化进程',
      '二度入选动脉网“未来医疗100强中国创新器械榜TOP100”',
    ],
    '6月': ['完成超4亿人民币B轮融资，由高瓴创投、鼎晖VGC（创新与成长基金）联合领投', '上榜GEI2021中国潜在独角兽企业'],
    '10月': ['入选亿欧CHS“2021中国基因科技企业TOP10”'],
    '11月': [
      '入选2021年度成都市新经济百家重点培育企业',
      '齐碳科技创始人白净卫博士团队在《Chemical Science》在线发表纳米孔单分子蛋白质直接测序的最新研究成果',
    ],
    '12月': [
      '荣膺“2021VENTURE50风云榜”和“2021投资界医疗健康VENTURE50双项大奖',
      '发布国内首款可量产的纳米孔基因测序仪QNome-3841，开启纳米孔基因测序的国产化时代',
      '位于成都天府国际生物城的国内首个纳米孔基因测序生产基地落成',
      '首个基于国产第四代测序平台——齐碳QNome的科研成果，发表于法医遗传学的TOP期刊Forensic Science International: Genetics',
    ],
  },

  2020: {
    '4月': ['完成超1亿元A轮融资，高榕资本领投'],
    '7月': [
      '入选动脉网“2020医疗器械创新生命力榜·黑科技产品类TOP10”',
      '入选2020年度成都市新经济“双百工程”百家重点培育企业',
      '参与北京市科委国际科技合作专项联合研发课题“基于DNA自组装的符合纳米孔器件研制”',
    ],
    '9月': [
      ' 发布我国首款自主研发的纳米孔基因测序仪QNome-9604，打破关键技术被国外“卡脖子”的困境，填补国内新一代基因测序技术的空白',
    ],
    '10月': ['上榜创业家&I黑马“2020新医疗产业TOP50”'],
    '11月': ['入选《麻省理工科技评论》2020年度“50家聪明公司”'],
    '12月': ['北京研发中心获准设立博士后科研工作站'],
  },

  2019: {
    '4月': ['完成4000万元PRE-A轮融资，中关村协同创新基金领投'],
    '6月': ['全国大众创业万众创新活动周作为“重点企业”亮相，项目受到了国务院原副总理刘延东的认可与鼓励'],
    '9月': [
      '荣获“国家高新技术企业”认定',
      '参与工信部工业互联网创新发展工程“工业互联网标识解析节点服务能力测试验证平台”',
      '上榜动脉网&蛋壳研究院联合甄选的“2019未来医疗100强中国创新器械榜TOP100”',
    ],
    '10月': ['参与北京市自然科学基金重点研究专题项目“基于纳米孔测序的病原体快速鉴定及应用技术研究”'],
    '12月': ['参与科技部国家重点研发计划“新型纳米孔测序技术的研发及测序仪的研制"'],
  },
  2018: {
    '2月': [' 完成2000万元天使轮融资，华控基金领投，BV百度风投等跟投'],
    '4月': ['参加第三届清华校友创意创新创业大赛，获得生命健康专项一等奖'],
    '5月': ['参加2018成都全球创新创业交易会，入选“未来独角兽”企业'],
    '12月': ['实现纳米孔基因测序仪工程样机', '参加中关村前沿创新大赛获总决赛一等奖，上榜“医药健康领域TOP10”'],
  },
  2017: {
    '2月': [' 获得300万元融资，合力资本领投，乾明投资，华控基金等机构跟投'],
    '10月': ['实现纳米孔基因测序仪原理样机，建立基础平台'],
    '11月': ['成立北京研发中心'],
  },
  2016: {
    '9月': [' 齐碳科技成立，开启自主研发之路'],
  },
};

// 订阅资讯和联系我们的表单
export const SubMessage = {
  newsletter: [
    { key: 'name', name: '姓名' },
    {
      key: 'email',
      name: '邮箱*',
      reg: /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/,
      msg: '请填写正确的邮箱',
      require: true,
    },
  ],
  contact: [
    { key: 'name', name: '姓名*', reg: /.+/, msg: '请填写姓名', require: true },
    { key: 'company', name: '单位*', reg: /.+/, msg: '请填写单位', require: true },
    {
      key: 'telephone',
      name: '手机*',
      reg: /^1[34578][0-9]{9}$/,
      msg: '请填写正确的手机',
      require: true,
      isEn: false,
    },
    {
      key: 'telephone',
      name: '手机',
      reg: /^((\+\d{1,4}\s?)?1[34578][0-9]{9})?$/,
      msg: '请填写正确的手机',
      isEn: true,
    },
    { key: 'post', name: '职务' },
    {
      key: 'email',
      name: '邮箱*',
      reg: /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/,
      msg: '请填写正确的邮箱',
      require: true,
    },
    {
      key: 'province',
      name: '省份*',
      reg: /^(.+)$/,
      require: true,
      isEn: true,
    },
    {
      key: 'province',
      name: '省份',
      isEn: false,
    },
    {
      key: 'content',
      name: '内容*',
      reg: /.{10}.*/,
      msg: '请填写内容且字数不小于10个字符',
      newline: true,
      require: true,
    },
  ],
};

// 新闻
export const NewsList = [
  {
    key: 'dynamic',
    name: '企业动态',
    subName: 'COMPANY UPDATES',
  },
  {
    key: 'report',
    name: '媒体报道',
    subName: 'MEDIA COVERAGE',
  },
];

// 联系我们-邮箱
export const ContactEmails = [
  {
    key: 'business',
    name: '商务合作',
    email: 'business@qitantech.com',
  },
  {
    key: 'investment',
    name: '资本合作 ',
    email: 'ir@qitantech.com',
  },
  {
    key: 'media',
    name: '媒体采访',
    email: 'pr@qitantech.com',
  },
  {
    key: 'career',
    name: '简历投递 ',
    email: 'hiring@qitantech.com',
  },
];

export const MonthEnglish = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

//联系我们-地图列表 文字部分已用in18代替
export const ContactMapAddr = [
  {
    key: 'map1',
    coord: [104.06517, 30.63478],
    // name: '成都总部',
    // location: '武侯区人民南路四段3号成都来福士广场办公楼T2-2004',
  },
  {
    key: 'map2',
    coord: [116.35073, 40.05645],
    // name: '北京研发中心金隅办公区',
    // location: '北京市海淀区建材城中路27号金隅智造工场N2楼101-130',
  },
  {
    key: 'map3',
    coord: [116.35105, 40.04445],
    // name: '北京研发中心东升办公区',
    // location: '北京市海淀区西小口路66号中关村东升科技园北领地B1楼1-3F',
  },
  {
    key: 'map4',
    coord: [113.37419, 23.07079],
    // name: '广州研发中心',
    // location: '广州国际生物岛寰宇二路6号第三层319单元',
  },
  {
    key: 'map5',
    coord: [103.97133, 30.43752],
    // name: '成都生产基地',
    // location: '双流区凤凰路618号天府国际生物医学产业加速器6栋附104',
  },
  {
    key: 'map6',
    coord: [118.59856, 32.02044],
    // name: '成都生产基地',
    // location: '双流区凤凰路618号天府国际生物医学产业加速器6栋附104',
  },
];

export const MenuData = [
  {
    name: 'products',
    children: [
      {
        name: 'nanoporeGene',
        path: '/products/nanoporeGene',
        info: {
          title: '纳米孔测序-齐碳科技',
          keywords: '纳米孔测序,基因测序,长读长,四代测序,单分子测序',
          description:
            '纳米孔链测序法是通过电场力驱动单链核酸分子穿过纳米尺寸的蛋白孔道，由于不同的碱基通过纳米孔道时产生了不同阻断程度的电流信号，由此可根据电流信号识别每条核酸分子上的碱基信息，从而实现对单链核酸分子的测序。',
        },
      },
      {
        name: 'sequencer',
        path: '/products/sequencer',
        info: {
          title: '基因测序仪-齐碳科技',
          keywords: '基因测序仪,长读长测序, QNome,第四代基因测序仪,国产基因测序仪',
          description: '国产第四代基因测序仪，实时、便携的长读长测序设备，让基因测序走进更多使用场景',
        },
      },
      {
        name: 'supplies',
        path: '/products/supplies',
        info: {
          title: '测序耗材-齐碳科技',
          keywords: '测序试剂盒,试剂盒,测序芯片,纳米孔基因测序仪,DNA文库',
          description: '国产第四代基因测序仪，实时、便携的长读长测序设备，让基因测序走进更多使用场景',
        },
      },
      {
        name: 'software',
        path: '/products/software',
        info: {
          title: '测序软件-齐碳科技',
          keywords: '测序软件,碱基识别,Qpreasy,芯片检查，测序数据分析',
          description:
            '测序软件运行在计算工作站上，控制纳米孔基因测序仪实现测序流程，包括芯片检查、测序、碱基识别和测序结果分析。测序软件向用户提供直观友好的界面，操作简单便捷。',
        },
      },
      // { name: 'tools', path: '/products/tools' },
    ],
  },
  {
    name: 'applications',
    children: [
      {
        name: 'microorganism',
        path: '/applications/microorganism',
        info: {
          title: '微生物研究-齐碳科技',
          keywords: '微生物研究,微生物基因组,长片段,结构变异,基因组组装',
          description:
            '齐碳科技纳米孔基因测序仪，支持直接对原始DNA模板进行无扩增、无偏好的测序，支持cDNA测序，支持短片段与长片段DNA测序，使用齐碳科技长片段纳米孔测序技术探索微生物的秘密。',
        },
      },
      {
        name: 'human',
        path: '/applications/human',
        info: {
          title: '人类研究-齐碳科技',
          keywords: '人类基因组,转录组,遗传病, SNP,结构变异',
          description:
            '齐碳科技纳米孔基因测序仪，支持直接对原始DNA模板进行无扩增、无偏好的测序，支持cDNA测序，支持短片段与长片段DNA测序，使用齐碳科技纳米孔基因测序技术探索基因编码的秘密。',
        },
      },
      {
        name: 'animal',
        path: '/applications/animal',
        info: {
          title: '动物研究-齐碳科技',
          keywords: '动物基因组,动物转录组,基因组重测序,SNP,重复序列',
          description:
            '动物基因组学研究能够为许多科学研究领域提供宝贵见解，完成这些动物全基因组序列图谱的构建，并以此为核心，开展一系列基因注释、物种进化等研究，为人类疾病研究、动物环境适应性和进化、物种多样性保护以及气候变化等领域的深入研究奠定基础。齐碳科技纳米孔基因测序仪，支持直接对原始DNA模板进行无扩增、无偏好的测序，支持cDNA测序，支持短片段与长片段DNA测序。',
        },
      },
      {
        name: 'plant',
        path: '/applications/plant',
        info: {
          title: '植物研究-齐碳科技',
          keywords: '植物基因组, 植物转录组,基因组重测序,植物多样性,结构变异',
          description:
            '齐碳科技纳米孔基因测序仪长读长的优势，能够帮助更加准确地对大型且高度重复的植物基因组进行组装，更容易覆盖复杂区域，进一步解决结构变异等，为分子育种、遗传关系、进化过程的研究提供新思路',
        },
      },
      {
        name: 'clinical',
        path: '/applications/clinical',
        info: {
          title: '临床研究-齐碳科技',
          keywords: '遗传病研究,肿瘤研究,感染病原鉴定,靶向富集的核酸文库,药物敏感性检测',
          description:
            '齐碳科技纳米孔基因测序仪，支持直接对原始DNA模板进行无扩增无偏好的测序，支持cDNA测序，支持短片段与长片段DNA测序，除了常规的SNP/InDel鉴定外，更有利于长片段复杂区域鉴定，比如利用长片段优势进行结构变异鉴定、病原鉴定等。另外，纳米孔基因测序仪设备小巧便携的特性，可广泛应用于各地方单位实验室，而通量灵活无需凑样检测、实时测序的特点，则非常适合需要快速获取测序结果的医疗单位和检测机构。',
        },
      },
    ],
  },
  {
    name: 'support',
    children: [
      {
        name: 'customer',
        path: '/support/customer',
        info: {
          title: '售后服务-齐碳科技',
          keywords: '售后服务,齐碳科技,基因测序',
          description:
            '齐碳科技在中国多个地区设有技术服务中心和办事处，我们将第一时间响应客户需求，提供高效优质的售后服务。',
        },
      },
      {
        name: 'document',
        path: {
          'zh-CN': '/support/document',
          'en-US': '/support/documentArticle',
        },
        mapPath: '/support/documentArticle',
        onlyPc: true,
        info: {
          title: '文档中心-齐碳科技',
          keywords: '文档中心,齐碳科技,基因测序',
          description:
            '齐碳科技是一家致力于纳米孔基因测序仪及配套芯片、试剂的自主研发、制造与应用开发的国家高新技术企业。凭借国际一流的研发实力，公司成功发布国内首款自主研发的纳米孔基因测序仪并实现商业化，将为生命科学及相关领域的研究和应用提供更加便捷、有效的解决方案。',
        },
      },
      {
        name: 'video',
        path: '/support/video',
        info: {
          title: '视频集锦-齐碳科技',
          keywords: '视频集锦,齐碳科技,基因测序',
          description:
            '齐碳科技是一家致力于纳米孔基因测序仪及配套芯片、试剂的自主研发、制造与应用开发的国家高新技术企业。凭借国际一流的研发实力，公司成功发布国内首款自主研发的纳米孔基因测序仪并实现商业化，将为生命科学及相关领域的研究和应用提供更加便捷、有效的解决方案。',
        },
      },
      {
        name: 'conversionTool',
        path: {
          'zh-CN': '/support/conversionTool',
        },
        info: {
          title: '换算工具-齐碳科技',
          keywords: '换算工具,齐碳科技,单位转换,上样体积计算器',
          description:
            'DNA测序单位转换及上样体积计算器，通过输入DNA摩尔数、DNA长度以及样品浓度，即可快速得到最终上样体积数。',
        },
      },
      {
        name: 'community',
        path: 'https://github.com/QITAN-TECHNOLOGY',
        target: '_blank',
        info: {
          title: '交流社区-齐碳科技',
          keywords: '换算工具,齐碳科技,github',
          description:
            '齐碳科技是一家致力于纳米孔基因测序仪及配套芯片、试剂的自主研发、制造与应用开发的国家高新技术企业。凭借国际一流的研发实力，公司成功发布国内首款自主研发的纳米孔基因测序仪并实现商业化，将为生命科学及相关领域的研究和应用提供更加便捷、有效的解决方案。',
        },
      },
    ],
  },
  {
    name: 'news',
    langs: ['zh-CN'],
    children: [
      {
        name: 'dynamic',
        path: '/news/dynamic',
        info: {
          title: '企业动态-齐碳科技',
          keywords: '齐碳科技官方公众号，企业动态，齐碳科技',
          description: '',
        },
      },
      {
        name: 'report',
        path: '/news/report',
        info: {
          title: '媒体报道-齐碳科技',
          keywords: '媒体报道，齐碳科技',
          description: '',
        },
      },
    ],
  },
  {
    name: 'about',
    path: {
      'en-US': '/about/aboutUs',
    },
    children: [
      {
        name: 'aboutUs',
        path: {
          'zh-CN': '/about/aboutUs',
        },
        info: {
          title: '关于我们-齐碳科技',
          keywords: '',
          description: '',
        },
      },
      {
        name: 'joinUs',
        path: {
          'zh-CN': '/about/joinUs',
        },
        info: {
          title: '加入齐碳-齐碳科技',
          keywords: '招聘，齐碳科技，福利政策，职位搜索，股票期权',
          description: '',
        },
      },
    ],
  },
  {
    name: 'contact',
    path: '/contact',
    info: {
      title: '联系我们-齐碳科技',
    },
    hideInFooter: true,
  },
];
