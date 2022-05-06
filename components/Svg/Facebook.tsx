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
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
    </svg>
  );
}
