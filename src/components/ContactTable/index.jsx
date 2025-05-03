import styles from './index.less';

const ContactTable = (props) => {
  const { tableList } = props;

  const renderChildren = (children = []) => {
    return (
      <div className={styles.children}>
        {children.map((child) => (
          <div className={styles.child}>
            {Object.keys(child).map((key) => (
              <p className={styles.childCol}>{child[key]}</p>
            ))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <ul className={styles.contactTable}>
      {tableList.map((item, idx) => {
        return (
          <li key={idx} className={styles.item}>
            {Object.keys(item)?.map((key) => {
              if (key === 'children') {
                return renderChildren(item.children);
              }
              return <p className={styles.itemCol}>{item[key]}</p>;
            })}
          </li>
        );
      })}
    </ul>
  );
};

export default ContactTable;
