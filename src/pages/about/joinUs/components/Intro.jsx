import styles from '../index.less';

export const JoinIntro = [
  {
    key: 'Reliable',
    name: '可 靠',
    exp: (
      <>
        做最精准的
        <br />
        生命信息解读者
      </>
    ),
  },
  {
    key: 'Explorative',
    name: '探 索',
    exp: (
      <>
        做最敏锐的
        <br />
        生命奥秘发现者
      </>
    ),
  },
  {
    key: 'Passionate',
    name: '活 力',
    exp: (
      <>
        做最前沿的
        <br />
        基因测序技术领跑者
      </>
    ),
  },
];

export default function JoinUs() {
  const descs = [
    <>
      <p>我们坚信，科技创新是立足之本。齐碳的价值观不是墙上的文字，而是每一位齐碳人身体力行的准则和赖以生存的信念。</p>
      <p>
        作为新一代基因测序技术开拓者，齐碳科技跻身于全球纳米孔基因测序仪及芯片、试剂研发、制造行业的前列，并不断开拓新的应用领域，以满足生命健康领域对基因测序日益增长的需求。
      </p>
    </>,
    <>
      <p>
        你将与不同学科背景的卓越人才，并肩奔跑在探索生命科学的最前端。在这里，我们鼓励学习，提供多样的培训项目；我们激励创新，给予创新者丰厚的回馈；我们追求成长，建立清晰的发展通道。
      </p>
      <p>
        如果你也有此志向，如果你愿意与一群聪明、富有创造力和热爱挑战的科学家、工程师们一起提升职业生涯，齐碳将是你的不二之选。{' '}
      </p>
    </>,
    <>
      <p>
        我们期待更多卓越的同伴加入，
        <br />
        点击“职位搜索”，开启与齐碳的并行之路。
      </p>
      <a href="https://www.liepin.com/company/10224227/" className="btn" target="_blank">
        搜索职位
      </a>
    </>,
  ];
  return (
    <div className={styles.intro}>
      <div className={styles.left}>
        {JoinIntro.map((item, idx) => {
          let { key, name, exp } = item;
          return (
            <>
              <li className={styles.item + ' wow animate__fadeInUpSmall'}>
                <img src={require(`@/assets/imgs/join/img${idx + 1}.png`)} alt="values" className={styles.img} />
                <div className={styles.text}>
                  <h5 className={styles.name}>{name}</h5>
                  <h4 className={styles.subName}>{key}</h4>
                  <p className={styles.exp}>{exp}</p>
                </div>
              </li>
            </>
          );
        })}
      </div>

      <div className={styles.right}>
        {descs.map((item, idx) => {
          return (
            <div key={idx} className={styles.desc + ' wow animate__fadeInLeftSmall'}>
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );
}
