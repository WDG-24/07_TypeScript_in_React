import type { ComponentProps } from 'react';
import { useId } from 'react';
import './Toggle.css';

type ToggleProps = ComponentProps<'input'> & {
  name: string;
  label: string;
  setIsOn: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Toggle({ label, setIsOn, ...rest }: ToggleProps) {
  const ownID = useId();
  const id = rest.id ?? ownID;
  return (
    <label htmlFor={id} className='label'>
      <span>{label}</span>
      <span className='toggle'>
        <input type='checkbox' id={id} {...rest} onChange={() => setIsOn((o) => !o)} />
      </span>
    </label>
  );
}
