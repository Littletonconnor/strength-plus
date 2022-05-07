import Spacer from 'components/Spacer/Spacer';
import Link from 'next/link';
import { Error } from 'components/Svg';
import http from 'lib/http';
import React, { useState } from 'react';

export default function SignIn() {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  // todo(connor): Pull error message into its own component
  const [error, setError] = useState<any>(null);

  const onHandleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await http.post('/api/auth/signin', { email, password });
      // redirect to logged in now??
      console.log({ response });
    } catch (error) {
      setError(error); // todo(connor): Fix type.
    }
    setLoading(false);
  };

  const onHandleInput = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);

  const onHandlePassword = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  const getIsDisabled = () => !Boolean(email && password);

  return (
    <div className="h-full w-full">
      <div className="mx-auto flex max-w-5xl justify-center pt-14">
        <div className="flex w-[calc(1024px_/_2)] max-w-[calc(1024px_/_2)] flex-col px-4">
          <h1 className="pl-5 pb-10 text-3xl font-bold">Strength Plus</h1>
          <div
            style={{ boxShadow: '0 15px 35px 0 rgb(0, 0, 0, 0.1), 0 5px 15px 0 rgb(0, 0, 0, 0.1)' }}
            className="flex flex-col rounded-md px-5 py-8 md:py-14 md:px-12"
          >
            <h2 className="text-2xl font-semibold">Sign in to your account</h2>
            <Spacer size={32} />
            <form className="flex flex-col" action="submit" onSubmit={onHandleSubmit}>
              <label htmlFor="email" className="cursor-pointer text-sm font-medium text-gray-700">
                Email
              </label>
              <Spacer size={32 / 2} />
              <input
                type="text"
                name="email"
                id="email"
                className="rounded-md border border-gray-200 py-2 px-4 focus:outline-2 focus:outline-primary"
              />
              {error && error.email ? (
                <span className="mt-2 flex items-center text-sm font-medium text-red-400">
                  <Error className="mr-1 h-4 w-4 text-red-500" />
                  {error.message}
                </span>
              ) : null}
              <Spacer size={32 / 2} />
              <label htmlFor="password" className="cursor-pointer text-sm font-medium text-gray-700">
                Password
              </label>
              {error && error.password ? (
                <span className="mt-2 flex items-center text-sm font-medium text-red-400">
                  <Error className="mr-1 h-4 w-4 text-red-500" />
                  {error.message}
                </span>
              ) : null}
              <Spacer size={32 / 2} />
              <input
                type="password"
                name="password"
                id="password"
                className="rounded-md border border-gray-200 py-2 px-4 focus:outline-2 focus:outline-primary"
              />
              <Spacer size={32 * 1.5} />
              <button
                type="submit"
                className="px4 w-full rounded-md bg-primary py-2 text-center text-lg font-semibold text-white"
              >
                Sign In
              </button>
            </form>
            {error && error.login ? (
              <span className="mt-2 flex items-center text-sm font-medium text-red-400">
                <Error className="mr-1 h-4 w-4 text-red-500" /> {error.message}
              </span>
            ) : null}
          </div>
          <div className="pt-8 pl-5">
            <span className="text-sm font-normal text-gray-700">
              Don&apos;t have an account?{' '}
              <Link href="/signup">
                <a className="text-primary transition-colors hover:text-gray-700">Sign up</a>
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
