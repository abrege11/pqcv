import React from 'react';
import { theme } from '../theme';

const classes = {
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: theme.colors.white,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    margin: 10,
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
  },
};

export default function BuilderWindow() {
  return <div style={classes.container}></div>;
}
