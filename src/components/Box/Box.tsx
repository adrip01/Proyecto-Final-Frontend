import React, { FC } from 'react';
import './Box.scss';

interface BoxProps {}

const Box: FC<BoxProps> = () => (
  <div className="Box">
    Box Component
  </div>
);

export default Box;
