import cx from 'classnames';

interface Props {
  className?: string;
}

export default function Error(props: Props) {
  return (
    <svg className={cx(props.className)} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        stroke="currentColor"
        fill="none"
        d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01"
      />
    </svg>
  );
}
