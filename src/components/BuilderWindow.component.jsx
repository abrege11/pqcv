import React from 'react';
import theme from '../theme';

const classes = {
  container: {
    height: '100%',
    backgroundColor: theme.colors.white,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default function BuilderWindow() {
  return <div style={classes.container}></div>;
}
