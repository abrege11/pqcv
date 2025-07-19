import React, { useMemo, useRef } from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../constants';
import Gate from './Gate.component';
import { theme } from '../theme';
import { CELL_WIDTH } from '../constants';

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
  gateContainer: {
    backgroundColor: '#ffffff',
    zIndex: 11
  },
  wireContentContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    gap: 20,
    padding: '0 30px',
  }
};

const Channel = ({ sprites, onDropSprite, channelIndex }) => {
  const dropRef = useRef(null);
  const gateIdList = useMemo(() => {
    return Object.entries(sprites)
      .sort(([a], [b]) => parseInt(a) - parseInt(b))
      .map(([_, sprite]) => sprite.gateId);
  }, [sprites]);
  // console.log("gate list", gateIdList)
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
          {
            index: item.index,
            type: item.type,
            height: item.height,
            src: item.src,
            gateId: item.gateId,
          },
          item.originChannel,
          item.originCol
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
      minWidth: '80vw',
      backgroundColor: isOver ? '#f0f0f0' : 'transparent',
      boxSizing: 'border-box',
    },
    gateWrapper: {
      width: CELL_WIDTH,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }
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
      <div
        style={classes.wireContentContainer}
      >
        {Object.entries(sprites)
          .sort(([a], [b]) => parseInt(a) - parseInt(b))
          .map(([col, sprite]) => {
            const spriteHeight = sprite.height ?? CELL_WIDTH;
            return (
              <div
                key={`${col}-${channelIndex}`}
                style={{ ...stateClasses.gateWrapper, height: spriteHeight }}
              >
                <div style={classes.gateContainer}>
                  <Gate
                    {...sprite}
                    size={CELL_WIDTH}
                    originChannel={channelIndex}
                    originCol={parseInt(col)}
                  />
                </div>
              </div>
            );
          })}
      </div>

    </div>
  );
};

export default Channel;
