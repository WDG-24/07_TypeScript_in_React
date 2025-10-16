import './LightBulb.css';

export default function LightBulb({ isOn }: { isOn: boolean }) {
  return <div className={`light-bulb ${isOn ? 'light-bulb--on' : ''}`}></div>;
}
