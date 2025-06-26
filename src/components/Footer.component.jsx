import React from 'react';
import theme from '../theme';

const classes = {
  container: {
    bottom: 0,
    height: 90,
    backgroundColor: theme.colors.lightGrey,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default function Footer() {
  return <div style={classes.container}></div>;
}

