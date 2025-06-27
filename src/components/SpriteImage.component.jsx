import React from 'react';
import sprite from '../../assets/spritesheet.png';

const SPRITE_COLUMNS = 4;
const SPRITE_ROWS = 2;
const ORIGINAL_TILE_SIZE = 500;

const SpriteImage = ({ index, size = 100 }) => {
  const row = Math.floor(index / SPRITE_COLUMNS);
  const col = index % SPRITE_COLUMNS;

  const scale = size / ORIGINAL_TILE_SIZE;

  return (
    <div
      style={{
        width: size,
        height: size,
        backgroundImage: `url(${sprite})`,
        backgroundPosition: `-${col * ORIGINAL_TILE_SIZE * scale}px -${row * ORIGINAL_TILE_SIZE * scale}px`,
        backgroundSize: `${SPRITE_COLUMNS * ORIGINAL_TILE_SIZE * scale}px ${SPRITE_ROWS * ORIGINAL_TILE_SIZE * scale}px`,
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'transparent',
      }}
    />
  );
};

export default SpriteImage;
