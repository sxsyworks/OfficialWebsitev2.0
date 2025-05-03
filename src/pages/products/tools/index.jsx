import ImgTextLR from '@/components/ImgTextLR';
export default function Tools() {
  const data = [
    {
      name: 'metagenome',
      src: require('./metagenome.png'),
      content: 'metagenomeValue',
      btn: 'more',
    },
  ];
  return (
    <div>
      {data.map((item, index) => {
        return <ImgTextLR data={item} index={index} />;
      })}
    </div>
  );
}
