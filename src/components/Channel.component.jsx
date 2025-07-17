import React, { useMemo, useRef } from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../constants';
import Gate from './Gate.component';
import { theme } from '../theme';

const CELL_WIDTH = 80;

const classes = {
  wire: {
    position: 'absolute',
    top: '50%',
    left: 0,
    width: '100%',
    height: 2,
    backgroundColor: theme.colors.black,
    transform: 'translateY(-1px)',
  },
};

const Channel = ({ sprites, onDropSprite, channelIndex }) => {
  const dropRef = useRef(null);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.SPRITE,
    drop: (item, monitor) => {
      const clientOffset = monitor.getSourceClientOffset();
      const boundingRect = dropRef.current?.getBoundingClientRect();
      if (!clientOffset || !boundingRect) return;

      const x = clientOffset.x - boundingRect.left;
      const snappedCol = Math.floor(x / CELL_WIDTH);

      if (snappedCol >= 0) {
        onDropSprite(
          channelIndex,
          snappedCol,
          item.index,
          item.originChannel,
          item.originCol,
          item.type,
          item.height,
          item.src
        );
      }
    },
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const stateClasses = useMemo(() => ({
    channelContainer: {
      position: 'relative',
      minHeight: 60,
      height: 'auto',
      width: '100%',
      minWidth: '100vw',
      margin: '10px 0',
      backgroundColor: isOver ? '#f0f0f0' : 'transparent',
      boxSizing: 'border-box',
    },
  }), [isOver]);

  return (
    <div
      ref={node => {
        drop(node);
        dropRef.current = node;
      }}
      style={stateClasses.channelContainer}
    >
      <div style={classes.wire} />
      {Object.entries(sprites).map(([col, sprite]) => {
        const spriteHeight = sprite.height ?? CELL_WIDTH;
        const topOffset = spriteHeight > CELL_WIDTH ? -(spriteHeight - CELL_WIDTH) / 2 : 0;

        return (
          <div
            key={`${col}-${channelIndex}`}
            style={{
              position: 'absolute',
              left: col * CELL_WIDTH,
              top: topOffset,
              width: CELL_WIDTH,
              height: spriteHeight,
              pointerEvents: 'none',
            }}
          >
            <Gate
              index={sprite.index}
              type={sprite.type}
              src={sprite.src}
              size={CELL_WIDTH}
              height={spriteHeight}
              originChannel={channelIndex}
              originCol={parseInt(col)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Channel;
