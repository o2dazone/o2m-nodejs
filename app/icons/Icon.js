import React from 'react';

const IconBase = ({ children, color = '#fff', size = '1em', ...props }) => (
  <svg children={children}
    fill={color}
    preserveAspectRatio="xMidYMid meet"
    height={size}
    width={size}
    role="img"
    aria-labelledby="title"
    {...props}>
    {children}
  </svg>
);

export default IconBase;
