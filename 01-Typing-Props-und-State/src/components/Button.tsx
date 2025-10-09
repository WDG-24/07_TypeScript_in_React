import type { ComponentProps } from 'react'; // Type-Import von React internen Types

// Manuell definierter Type für Button-Props
type ButtonProps = {
  children: React.ReactNode; // ReactNode akzeptiert JSX, Strings, Numbers, Arrays etc.
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>; // Typ für onClick-Handler speziell für button-Elemente (aus Tooltip)
};

// export default function Button({ children, className, onClick }: ButtonProps) {
//   return (
//     <button onClick={onClick} className={`myBtn ${className}`} type='button'>
//       {children}
//     </button>
//   );
// }

// ComponentProps<'button'> übernimmt automatisch alle nativen button-Attribute
// & fügt einen zusätzlichen Typ hinzu (Intersection Type)
export default function Button({ username, onClick, ...rest }: ComponentProps<'button'> & { username: string }) {
  return (
    <button onClick={onClick} className={`myBtn ${rest.className}`} {...rest}>
      <span>{username} </span>
      {rest.children}
    </button>
  );
}
