// components/Toggle.tsx
// This component should receive `isOn` (boolean) and `onToggle` (function that takes no arguments and returns void)
// The onToggle function should change the value of `isOn` meaning you need to pass state down ;)

type ToggleProps = {
  isOn: boolean;
  // onToggle: () => void;
  onToggle: React.MouseEventHandler<HTMLButtonElement>;
  setIsOn: React.Dispatch<React.SetStateAction<boolean>>;
  add: () => void;
};

const Toggle = ({ isOn, onToggle, setIsOn, add }: ToggleProps) => {
  return (
    <button onClick={() => setIsOn((o) => !o)} type='button'>
      {isOn ? 'ON' : 'OFF'}
    </button>
  );
};

export default Toggle;
