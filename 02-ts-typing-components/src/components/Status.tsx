// components/Status.tsx
// This component should receive a `status` prop with one of: "loading", "success" , "error"
const Status = ({ status }: { status: 'loading' | 'success' | 'error' }) => {
  return <p>Status: {status}</p>;
};

export default Status;
