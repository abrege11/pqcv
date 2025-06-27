import React from 'react';
import { theme } from '../theme';

const classes = {
  container: {
    position: "absolute",
    width: 300,
    // top: 90,
    height: '100%',
    backgroundColor: theme.colors.lightGrey,
    display: 'grid',
    gridTemplateColumns: 'repeat(2, min-content)',
    gridAutoRows: 'auto',
    gap: 40,
    justifyContent: 'center',
    alignContent: 'start',
    padding: 10,
    paddingTop: 100,
  },
};


export default function SideBar({ children }) {
  return <div style={classes.container}>
    {children}
  </div>;
}
