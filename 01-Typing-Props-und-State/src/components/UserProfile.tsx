// Type-Definition für die Props der Komponente
// Definiert die Struktur und Typen aller Props
export type UserProfileProps = {
  username: string;
  img: string;
  info?: string;
  status: 'active' | 'paused' | 'inactive';
};

// Props werden mit TypeScript typisiert: Destructuring mit Typ-Annotation
export default function UserProfile({ username, img, info, status }: UserProfileProps) {
  return (
    <article>
      <h2>{username}</h2>
      <img src={img} alt='' />
      <p>{info}</p>
      <p>{status}</p>
    </article>
  );
}

// Alternative: Inline-Annotation
// export default function UserProfile({
//   username,
//   img,
//   info,
//   status,
// }: {
//   username: string;
//   img: string;
//   info?: string;
//   status: 'active' | 'paused' | 'inactive';
// }) {
//   return (
//     <article>
//       <h2>{username}</h2>
//       <img src={img} alt='' />
//       <p>{info}</p>
//       <p>{status}</p>
//     </article>
//   );
// }
