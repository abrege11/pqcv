import React from 'react';
import { theme } from '../theme';

const classes = {
  container: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: 90,
    backgroundColor: theme.color.lightGrey,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 20,
  },
  title: {
    paddingLeft: 10,
    fontSize: 40,
    fontWeight: 'bold',
    color: theme.color.white,
  },
};

export default function Header() {
  return (
    <div style={classes.container}>
      <div style={classes.title}>PQCV</div>
    </div>
  );
}
