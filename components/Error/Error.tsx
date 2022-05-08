import { Error as ErrorSvg } from 'components/Svg';
import { CODES, CODES_KEYS } from 'lib/constants';

function Error({ error, type }: { error: any; type: CODES_KEYS }) {
  if (error?.code !== CODES[type]) {
    return null;
  }

  return (
    <span className="slide-out-animation mt-2 flex items-center text-sm font-medium text-red-500">
      <ErrorSvg className="mr-1 h-4 w-4 text-red-500" />
      {error.message}
    </span>
  );
}
export default Error;
