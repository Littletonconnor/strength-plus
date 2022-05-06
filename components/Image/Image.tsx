import NextImage, { ImageLoaderProps } from 'next/image';

interface Props {
  src: string;
  className?: string;
  alt: string;
}
function loader({ src, width, quality }: ImageLoaderProps) {
  return `https://res.cloudinary.com/connorlittleton/image/upload/f_auto,w_${width},q_${quality || 75}/${src}`;
}

function Image(props: Props) {
  return <NextImage className={props.className} src={props.src} layout="fill" objectFit="cover" loader={loader} />;
}

export default Image;
