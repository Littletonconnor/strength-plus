import cx from 'classnames';
import Modal from 'components/Modal';
import Spacer from 'components/Spacer';
import { History, Start, User } from 'components/Svg';
import { AnimatePresence } from 'framer-motion';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

export async function getStaticProps() {
  return { props: {} };
}

export default function Home() {
  const [visible, setVisible] = useState(false);

  const router = useRouter();
  const { status } = useSession();

  if (status === 'loading') {
    return <div className="grid min-h-screen place-content-center">Loading...</div>;
  }

  if (status === 'unauthenticated') {
    router.push('/signin');
  }

  return (
    <div>
      <header className="fixed bottom-0 w-full border-t border-gray-200 py-3 px-2">
        <nav className="text-center">
          <ul className="grid grid-cols-3 text-xs">
            <li>
              <Link href="/profile">
                <a
                  className={cx('flex flex-col items-center font-medium', {
                    'text-primary': router.pathname === '/profile',
                    'text-black': router.pathname !== '/profile',
                  })}
                >
                  <User className="h-5 w-5" />
                  <span>Profile</span>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a
                  className={cx('flex flex-col items-center font-medium', {
                    'text-primary': router.pathname === '/',
                    'text-black': router.pathname !== '/',
                  })}
                >
                  <Start className="h-5 w-5" />
                  <span>Start workout</span>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/history">
                <a
                  className={cx('flex flex-col items-center font-medium', {
                    'text-primary': router.pathname === '/history',
                    'text-black': router.pathname !== '/history',
                  })}
                >
                  <History className="h-5 w-5 text-black" />
                  <span>History</span>
                </a>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className="mx-auto max-w-3xl p-3">
        <h2 className="sr-only">Quick Start</h2>
        <button
          className="px4 flex w-full justify-center rounded-md bg-primary py-2 text-lg font-semibold text-white"
          onClick={() => setVisible(true)}
        >
          Start workout
        </button>
        <Spacer size={32} />
        <div>
          <h2 className="text-2xl font-semibold">Templates</h2>
          <p>TODO</p>
        </div>
      </main>
      <AnimatePresence>{visible && <Modal onClose={() => setVisible(false)}>Some children</Modal>}</AnimatePresence>
    </div>
  );
}
