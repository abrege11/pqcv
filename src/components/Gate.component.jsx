import React, { useMemo } from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../constants';

const Gate = ({
  src,
  size = 70,
  height,
  originChannel = null,
  gateId,
  originCol = null,
}) => {
  const [, drag] = useDrag(() => ({
    type: ItemTypes.SPRITE,
    item: {
      src,
      height,
      originChannel,
      originCol,
      gateId,
    },
  }));

  const style = useMemo(() => ({
    width: size,
    height: height ?? size,
    backgroundImage: `url(${src})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundColor: '#ffffff',
    cursor: 'grab',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
  }), [src, size, height]);

  return <div ref={drag} style={style} />;
};

export default Gate;