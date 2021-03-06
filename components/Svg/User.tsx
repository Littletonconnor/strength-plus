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
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
