import Header from '@/components/Header';
import Menu from '@/components/Menu';
import isIE from '@/utils/isIE';
import ContactInfo from './Info';
import ContactMap from './Map';
export default function Contact() {
  const ie = isIE();
  return (
    <>
      <Menu />
      <Header name="contact" bg="/contact.png" />
      <>
        <ContactInfo />
        {ie ? null : <ContactMap />}
      </>
    </>
  );
}
