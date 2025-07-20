import React, { useState } from 'react';
import Channel from './Channel.component';
import Gate from './Gate.component';
import { theme } from '../theme';
import { CELL_WIDTH } from '../constants';
import { Button } from './form/Button.component';
import { generateInstructions } from '../services/channel.service';

const classes = {
  root: {
    flex: 1,
    width: '100%',
    height: '100%',
    overflowY: 'auto',
    backgroundColor: theme.colors.white,
    paddingTop: 120,
    boxSizing: 'border-box',
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 20,
  },
  buttonContainer: {
    display: 'flex', gap: 10
  },
};

const BuilderWindow = () => {
  const [channels, setChannels] = useState([{ sprites: {} }]);

  const addChannel = () => {
    setChannels([...channels, { sprites: {} }]);
  };

  const removeChannel = () => {
    if (channels.length > 1) setChannels(channels.slice(0, -1));
  };
  const handleDropSprite = (
    channelIndex,
    col,
    sprite,
    originChannel = null,
    originCol = null
  ) => {
    setChannels(prev =>
      prev.map((channel, i) => {
        const newSprites = { ...channel.sprites };

        if (i === originChannel && originCol !== null) {
          delete newSprites[originCol];
        }

        if (i === channelIndex) {
          newSprites[col] = {
            ...sprite,
            height: sprite.type === 'image' ? 160 : CELL_WIDTH,
            isMultiQubit: sprite.type === 'image' && sprite.height === 160,
          };
        }

        return { ...channel, sprites: newSprites };
      })
    );
  };

  return (
    <div style={classes.root}>
      <div style={{ ...classes.contentContainer, position: 'relative' }}>
        {channels.map((channel, i) => (
          <Channel
            key={`channel-${i}`}
            channelIndex={i}
            sprites={channel.sprites}
            onDropSprite={handleDropSprite}
          />
        ))}

        {channels.map((channel, i) =>
          Object.entries(channel.sprites).map(([col, sprite]) => {
            const spriteHeight = sprite.height ?? CELL_WIDTH;
            if (!sprite.isMultiQubit) return null;

            const top = i * (CELL_WIDTH + 20) - (spriteHeight - CELL_WIDTH) / 2;

            return (
              <div
                key={`multi-${i}-${col}`}
                style={{
                  position: 'absolute',
                  top,
                  left: parseInt(col) * CELL_WIDTH + 20,
                  width: CELL_WIDTH,
                  height: spriteHeight,
                  pointerEvents: 'none',
                  zIndex: 10,
                }}
              >
                <Gate
                  index={sprite.index}
                  type={sprite.type}
                  src={sprite.src}
                  size={CELL_WIDTH}
                  height={spriteHeight}
                  originChannel={i}
                  originCol={parseInt(col)}
                />
              </div>
            );
          })
        )}

        <div style={classes.buttonContainer}>
          <Button onPress={addChannel} title="+ Add qubit" />
          <Button onPress={removeChannel} title="- Remove qubit" />
          <Button onPress={() => generateInstructions({test: "test"})} title="Run" />

        </div>
      </div>

    </div>
  );
};

export default BuilderWindow;
