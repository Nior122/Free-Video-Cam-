import React from 'react';

export const WandIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 4V2" />
    <path d="M15 8V6" />
    <path d="m12.5 6.5 1.5-1.5" />
    <path d="m17.5 6.5-1.5-1.5" />
    <path d="m3 21 9-9" />
    <path d="M12.5 11.5 14 10" />
  </svg>
);