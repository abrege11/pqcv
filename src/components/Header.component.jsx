import React from 'react';
import theme from '../theme';

const classes = {
  container: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: 90,
    backgroundColor: theme.colors.lightGrey,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default function Header() {
  return <div style={classes.container}></div>;
}

