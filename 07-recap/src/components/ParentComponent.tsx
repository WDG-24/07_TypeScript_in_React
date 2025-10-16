import LightBulb from './LightBulb';

export default function ParentComponent({ isOn }: { isOn: boolean }) {
  return <LightBulb isOn={isOn} />;
}
