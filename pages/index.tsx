import { useSession } from 'next-auth/react';

export async function getStaticProps() {
  return { props: {} };
}

export default function Home() {
  const { data: session, status } = useSession();

  console.log({ session, status });
  return <div className="grid min-h-screen place-content-center">You are signed in</div>;
}
