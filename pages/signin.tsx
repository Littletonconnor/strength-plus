import Spacer from 'components/Spacer/Spacer';
import { Facebook, Github, Mail } from 'components/Svg';
import Link from 'next/link';

export default function SignIn() {
  return (
    <div className="h-full w-full" style={{ background: 'linear-gradient(to right, #d3cce3, #e9e4f0)' }}>
      <div className="relative mx-auto grid h-full min-h-screen w-full max-w-2xl place-content-center px-6">
        <h1 className="text-4xl font-semibold text-gray-800">Strength Plus</h1>
        <Spacer size={32 / 2} />
        <form className="flex w-72 flex-col" action="">
          <input className="rounded-lg bg-white py-2 px-3 outline-offset-4" placeholder="Enter username" />
          <Spacer size={32 / 2} />
          <input className="rounded-lg bg-white py-2 px-3 outline-offset-4" placeholder="Password" />
        </form>
        <Spacer size={32} />
        <button className="w-full rounded-lg bg-[#FA6A69] px-3 py-2 font-bold text-white outline-offset-4">
          Sign In
        </button>
        <Spacer size={32} />
        <p className="flex items-center text-center text-sm text-gray-500 before:mr-2 before:h-[1px] before:flex-1 before:bg-gray-400 before:content-[''] after:ml-2 after:h-[1px] after:flex-1 after:bg-gray-400 after:content-['']">
          Or continue with
        </p>
        <Spacer size={32} />
        <div className="grid grid-cols-3 gap-4">
          <button className="grid place-content-center rounded-lg border-2 border-white py-3">
            <Mail className="h-6 w-6" />
          </button>
          <button className="grid place-content-center rounded-lg border-2 border-white py-3">
            <Facebook className="h-6 w-6" />
          </button>
          <button className="grid place-content-center rounded-lg border-2 border-white py-3">
            <Github className="h-6 w-6" />
          </button>
        </div>
        <Spacer size={32 * 2} />
        <p className="text-center text-sm font-semibold text-gray-600">
          Not a member?{' '}
          <Link href="/signup">
            <a className="text-blue-500">Register now</a>
          </Link>
        </p>
      </div>
    </div>
  );
}
