import { useState, useEffect } from 'react';
import { Select } from 'antd';
import { useIntl } from 'umi';
import Title from '@/components/Title';
import { useWow } from '@/utils/common';
import styles from './index.less';
const { Option } = Select;

// 单位次方（以10为基数）
// const POWERS = {
//   bp: 0,
//   kb: 3,
//   mol: 0,
//   mmol: -3,
//   μmol: -6,
//   nmol: -9,
//   pmol: -12,
//   fmol: -15,
// };

const POWERS = {
  bp: -3,
  kb: 0,
  mol: 15,
  mmol: 12,
  μmol: 9,
  nmol: 6,
  pmol: 3,
  fmol: 0,
};

const Tools = () => {
  const { formatMessage } = useIntl();
  const [data, setData] = useState({ lengthUnit: 'bp', molesUnit: 'fmol' });
  const [volume, setVolume] = useState('');

  useWow();

  useEffect(() => {
    validate();
  }, [data]);

  const handleChange = (e, field) => {
    let newValue = e;
    if (!field.includes('Unit')) {
      let val = e.target.value;
      newValue = validateInput(val);
    }
    setData({ ...data, [field]: newValue });
  };

  const validateInput = (value) => {
    let reg = /^(([1-9][0-9]*)(\.\d*)?|0(\.\d*)?)/;
    let res = reg.exec(value);
    let newValue;
    if (!res) {
      newValue = '';
    } else if (res[0]) {
      newValue = res[0];
    }
    return newValue;
  };

  // 验证是否三个输入框都填完并且格式正确
  const validate = () => {
    let pass = Object.keys(data).length === 5;
    for (const key in data) {
      if (Object.hasOwnProperty.call(data, key)) {
        const val = data[key];
        if (!val || Number(val) === 0) {
          pass = false;
          setVolume('');
        }
      }
    }
    if (pass) {
      compute();
    }
  };

  // 计算
  const compute = () => {
    let { length, moles, qubit, lengthUnit, molesUnit } = data;
    // let bp = Math.pow(10, POWERS[lengthUnit]) * Number(length);
    // let mol = Math.pow(10, POWERS[molesUnit]) * Number(moles);
    // let mass = mol * (bp * 617.96 + 36.04);
    // let volume = ((mass * Math.pow(10, 9)) / Number(qubit)).toFixed(2); // V (μL) = n * N / C(ng/μL)
    let kbp = Math.pow(10, POWERS[lengthUnit]) * Number(length);
    let fmol = Math.pow(10, POWERS[molesUnit]) * Number(moles);
    let volume = ((fmol * 0.62 * kbp) / Number(qubit)).toFixed(2); // V (μL) = n * 0.62 * N / C(ng/μL)
    console.log('volume:', volume);
    setVolume(volume);
  };

  return (
    <div className={styles.tools}>
      <Title name="support.tools" />
      <p className={styles.desc + ' wow animate__fadeInUpSmall anidelay-1'}>
        {formatMessage({ id: 'support.tools.desc1' })}
        <br />
        {formatMessage({ id: 'support.tools.desc2' })}
      </p>
      <div className={styles.content + ' wow animate__fadeInUpSmall'}>
        <ul className={styles.items}>
          <li className={styles.item}>
            <label> {formatMessage({ id: 'support.tools.length' })}</label>
            <div className={styles.wrapper}>
              <input type="text" value={data.length} onChange={(e) => handleChange(e, 'length')} />
              <Select defaultValue="bp" onChange={(val) => handleChange(val, 'lengthUnit')} value={data.lengthUnit}>
                <Option value="kb">kb</Option>
                <Option value="bp">bp</Option>
              </Select>
            </div>
          </li>
          <li className={styles.item}>
            <label> {formatMessage({ id: 'support.tools.moles' })}</label>
            <div className={styles.wrapper}>
              <input type="text" value={data.moles} onChange={(e) => handleChange(e, 'moles')} />
              <Select defaultValue="fmol" onChange={(val) => handleChange(val, 'molesUnit')} value={data.molesUnit}>
                <Option value="mol">mol</Option>
                <Option value="mmol">mmol</Option>
                <Option value="μmol">μmol</Option>
                <Option value="nmol">nmol</Option>
                <Option value="pmol">pmol</Option>
                <Option value="fmol">fmol</Option>
              </Select>
            </div>
          </li>
          <li className={styles.item}>
            <label> {formatMessage({ id: 'support.tools.qubit' })}</label>
            <div className={styles.wrapper}>
              <input type="text" value={data.qubit} onChange={(e) => handleChange(e, 'qubit')} />
            </div>
          </li>
        </ul>
        <i className={styles.arrow}></i>
        <div className={styles.result}>
          <label>{formatMessage({ id: 'support.tools.volume' })}</label>
          <p className={styles.volume}>
            {volume}
            {volume ? 'μL' : ''}
          </p>
        </div>
      </div>
      <h5 className={styles.desc + ' wow animate__fadeInUpSmall'}>
        {formatMessage({ id: 'support.tools.formula' })}：V (μL) = n * 0.62 * N / C(ng/μL)
      </h5>
    </div>
  );
};

export default Tools;
