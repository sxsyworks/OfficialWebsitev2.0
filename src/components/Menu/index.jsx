import { useModel } from 'umi';
import Menu from './menu';
import MenuMobile from '@/components/MenuMobile';
const TheMenu = () => {
  const { initialState } = useModel('@@initialState');
  const { isPhone } = initialState;
  return isPhone ? <MenuMobile /> : <Menu />;
};
export default TheMenu;
