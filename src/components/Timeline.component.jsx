import React from 'react';
import { theme } from '../theme';
import { FOOTER_LINKS } from '../constants';

const classes = {
  container: {
    position: "absolute",
    bottom: 40,
    left: "20vw",
    width: "60vw",
    height: 220,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderTop: `1px solid ${theme.color.lightGrey}`,
    borderRight: `1px solid ${theme.color.lightGrey}`,
    backgroundColor: theme.color.background,
    gap: 30,
  },
  link: {
    fontSize: 13,
    color: theme.color.darkGrey,
    textDecoration: 'none',
    cursor: 'pointer',
    opacity: 0.8,
  },
};

export default function Timeline() {
  return (
    <div style={classes.container}>
    </div>
  );
}
