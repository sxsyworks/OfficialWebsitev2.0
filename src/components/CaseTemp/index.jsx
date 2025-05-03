import { FormattedMessage } from 'umi';
import { ResearchBgIcon, ResearchCnIcon, ResearchResultIcon, SummaryIcon } from './icon';
import styles from './index.less';
export default function CaseTemplate({ data = [], id = '' }) {
  // TODO
  const getIcon = (name) => {
    if (name === 'summary') {
      return <SummaryIcon />;
    } else if (name === 'researchBg') {
      return <ResearchBgIcon />;
    } else if (name === 'researchCn') {
      return <ResearchCnIcon />;
    } else if ((name = 'researchResult')) {
      return <ResearchResultIcon />;
    } else {
      return null;
    }
  };

  return (
    <div className={styles.caseBox} id={id}>
      {data.map((item, index) => {
        return (
          <>
            <div className={styles.index}>
              {index + 1}
              <div className={styles.name}>{item.name}</div>
            </div>
            <div className={styles.cases}>
              {Object.getOwnPropertyNames(item).map((it) => {
                if (it === 'name') return null;
                return (
                  <div className={styles.caseItem} key={it}>
                    <div className={styles.caseLeft}>
                      {getIcon(it)}
                      <div className={styles.caseTitle}>
                        <FormattedMessage id={'case.' + it} />
                      </div>
                    </div>
                    <div className={styles.caseRight}>{item[it]}</div>
                  </div>
                );
              })}
            </div>
          </>
        );
      })}
    </div>
  );
}
