import { format } from 'date-fns';
import cx from 'classnames';
import { History, Start, User } from 'components/Svg';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import http from 'lib/http';
import Spacer from '../components/Spacer';
import { DotsHorizontalIcon } from '@heroicons/react/solid';
import Spinner from '../components/Spinner';

export async function getStaticProps() {
  return { props: {} };
}

function HistoryPage() {
  const [workouts, setWorkouts] = useState<any>([]);

  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status !== 'authenticated') return;

    async function fetchHistory() {
      const response = await http.get('http://localhost:3000/api/history');
      setWorkouts(response.workouts);
    }

    fetchHistory();
  }, [status]);

  if (status === 'unauthenticated') {
    router.push('/signin');
  }

  if (status === 'loading' || workouts.length === 0) {
    return (
      <div className="grid min-h-screen place-content-center">
        <Spinner className="h-10 w-10 text-primary" />
      </div>
    );
  }

  return (
    <div className="flex flex-col" style={{ WebkitTapHighlightColor: 'transparent' }}>
      <header className="fixed bottom-0 w-full border-t border-gray-200 bg-white py-3 px-2">
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
      <main className="mx-auto max-w-3xl overflow-auto p-3">
        <h2 className="text-2xl font-semibold">History</h2>
        <Spacer size={32} />
        <div className="space-y-4">
          {workouts.map((workout: any) => {
            return (
              <div key={workout.id} className="flex w-full flex-col space-y-2 rounded-lg border border-gray-200 p-3">
                <div className="flex items-center justify-between">
                  <p className="text-lg font-bold text-gray-700">{workout.name}</p>
                  <button>
                    <DotsHorizontalIcon className="h-5 w-5 fill-primary" />
                  </button>
                </div>
                <p className="text-sm font-medium text-gray-700">
                  {format(new Date(workout.created_at), 'MMMM dd, yyyy')}
                </p>
                <table
                  style={{ borderSpacing: '2px 0', borderCollapse: 'separate' }}
                  className="w-full table-fixed text-left"
                >
                  <thead>
                    <tr>
                      <th>Exercise</th>
                      <th>Best Set</th>
                    </tr>
                  </thead>
                  <tbody>
                    {workout.exercises.map((exercise: any) => {
                      return (
                        <tr className="" key={exercise.id}>
                          <td className="line-clamp-1">{exercise.name}</td>
                          <td className="">{exercise.pr_weight}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            );
          })}
        </div>
      </main>
      <div style={{ height: 80 }} />
    </div>
  );
}

export default HistoryPage;
