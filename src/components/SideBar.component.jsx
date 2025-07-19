import React from 'react';
import { theme } from '../theme';

const classes = {
  container: {
    width: '20vw',
    backgroundColor: '#F5F5F5',
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 100px)',
    gridAutoRows: 'min-content',
    gap: 20,
    justifyContent: 'center',
    alignContent: 'start',
    padding: '100px 10px 20px 10px',
    borderRight: `1px solid ${theme.colors.lightGrey}`,
    boxShadow: '2px 0 4px rgba(0,0,0,0.03)',
  },
};

export default function SideBar({ children }) {
  return <div style={classes.container}>{children}</div>;
}
