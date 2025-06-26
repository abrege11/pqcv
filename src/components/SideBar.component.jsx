import React from 'react';
import theme from '../theme';

const classes = {
  container: {
    position: "absolute",
    width: 350,
    height: '100%',
    backgroundColor: theme.colors.lightGrey,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default function SideBar() {
  return <div style={classes.container}></div>;
}
