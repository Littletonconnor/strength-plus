import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { User, History, Start } from 'components/Svg';

export async function getStaticProps() {
  return { props: {} };
}

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div className="grid min-h-screen place-content-center">Loading...</div>;
  }

  if (status === 'unauthenticated') {
    router.push('/signin');
  }

  console.log({ session });
  return (
    <div>
      <main className="mx-auto max-w-3xl">Main content area</main>
      <header className="fixed bottom-0 w-full border-t border-gray-200 py-3 px-2">
        <nav className="text-center">
          <ul className="grid grid-cols-3 text-xs">
            <li>
              <Link href="/profile">
                <a className="flex flex-col items-center text-primary">
                  <User className="h-5 w-5" />
                  <span>Profile</span>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/start-workout">
                <a className="flex flex-col items-center transition-colors hover:text-primary">
                  <Start className="h-5 w-5 text-black" />
                  <span>Start workout</span>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/history">
                <a className="flex flex-col items-center">
                  <History className="h-5 w-5 text-black" />
                  <span>History</span>
                </a>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}
