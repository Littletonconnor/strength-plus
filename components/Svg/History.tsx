import React from 'react';
import cx from 'classnames';

interface Props {
  className?: string;
}

export default function SvgComponent(props: Props) {
  return (
    <svg
      className={cx(props.className)}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}
