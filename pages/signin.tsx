import Error from 'components/Error';
import Spacer from 'components/Spacer/Spacer';
import Spinner from 'components/Spinner';
import http from 'lib/http';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const onHandleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(async () => {
      try {
        const nextAuthResponse = (await signIn('credentials', { email, password, redirect: false })) as any;
        if (nextAuthResponse?.error) {
          // hacky, but afaik signIn doesn't return the actual response of the endpoint. All it returns is if there was an error,
          // but i'd like to add error handling logic thats returned from my endpoint so if there's an error going to re-hit this api
          // for the actual response with the error message I want.
          const response = await http.post('/api/auth/signin', { email, password });
          setLoading(false);
          if (response.error) {
            setError(response);
          }
        } else {
          router.push('/');
        }
      } catch (error) {
        console.log('Error occurred: ', error);
      }
    }, 1000);
  };

  const onHandleInput = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);

  const onHandlePassword = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  return (
    <div className="h-full w-full">
      <BackgroundImage />
      <div className="relative mx-auto flex max-w-5xl justify-center pt-14">
        <div className="flex w-[calc(1024px_/_2)] max-w-[calc(1024px_/_2)] flex-col px-4">
          <h1 className="pl-5 pb-10 text-3xl font-bold">Strength Plus</h1>
          <div
            style={{ boxShadow: '0 15px 35px 0 rgb(0, 0, 0, 0.1), 0 5px 15px 0 rgb(0, 0, 0, 0.1)' }}
            className="flex flex-col rounded-md bg-white px-5 py-8 md:py-14 md:px-12"
          >
            <h2 className="text-2xl font-semibold">Sign in to your account</h2>
            <Spacer size={32} />
            <form className="flex flex-col" action="submit" onSubmit={onHandleSubmit}>
              <label htmlFor="email" className="cursor-pointer text-sm font-medium text-gray-700">
                Email
              </label>
              <Spacer size={32 / 2} />
              <input
                onChange={onHandleInput}
                type="text"
                name="email"
                id="email"
                className="rounded-md border border-gray-200 py-2 px-4 focus:outline-2 focus:outline-primary"
              />
              <Error error={error} type="email" />
              <Spacer size={32 / 2} />
              <label htmlFor="password" className="cursor-pointer text-sm font-medium text-gray-700">
                Password
              </label>
              <Error error={error} type="password" />
              <Spacer size={32 / 2} />
              <input
                onChange={onHandlePassword}
                type="password"
                name="password"
                id="password"
                className="rounded-md border border-gray-200 py-2 px-4 focus:outline-2 focus:outline-primary"
              />
              <Spacer size={32 * 1.5} />
              <button
                type="submit"
                className="px4 flex w-full justify-center rounded-md bg-primary py-2 text-lg font-semibold text-white"
              >
                {loading ? <Spinner className="h-6 w-6 text-white" /> : 'Sign up'}
              </button>
            </form>
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

// todo(connor): Clean this up
function BackgroundImage() {
  return (
    <div className="fixed left-0 -top-[300px] right-0 h-[500px] -skew-y-12 bg-offgray sm:-top-[550px] sm:h-[1000px]">
      <div className="absolute bottom-[-100vh] top-[-100vh] left-[calc(50%+240px)] hidden w-[1px] border border-dotted sm:block" />
      <div className="absolute bottom-[-100vh] top-[-100vh] right-[calc(50%+240px)] hidden w-[1px] border border-dotted sm:block" />
      <div className="absolute bottom-[-100vh] top-[-100vh] right-[calc(50%+480px)] hidden w-[1px] border border-dotted sm:block" />
      <div className="absolute bottom-[-100vh] top-[-100vh] left-1/2 hidden w-[1px] border border-dotted sm:block" />
      <div className="absolute bottom-[-100vh] top-[-100vh] left-[calc(50%+480px)] hidden w-[1px] border border-dotted sm:block" />

      <div className="absolute top-[470px] left-0 block h-10 w-10 bg-palePrimary sm:right-[calc(50%+400px)] sm:top-[1000px] sm:hidden"></div>
      <div className="absolute top-[430px] right-0 block h-10 w-32 bg-palePrimary sm:left-[calc(50%+400px)] sm:top-[960px] sm:hidden"></div>

      <div className="absolute left-0 right-[calc(50%+400px)] top-[1000px] hidden h-10 bg-palePrimary sm:block"></div>
      <div className="absolute right-0 left-[calc(50%+400px)] top-[960px] hidden h-10 bg-palePrimary sm:block"></div>
    </div>
  );
}
