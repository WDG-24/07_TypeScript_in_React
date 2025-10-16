import ParentComponent from './ParentComponent';

export default function GrandMotherComponent({ isOn }: { isOn: boolean }) {
  return <ParentComponent isOn={isOn} />;
}
