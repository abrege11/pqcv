import React from 'react';
import { theme } from '../theme';
import { FOOTER_LINKS } from '../constants';

const classes = {
  container: {
    bottom: 0,
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 40,
  },
  link: {
    fontSize: 14,
    color: theme.colors.darkGrey,
    textDecoration: 'none',
    cursor: 'pointer',
  },
};

export default function Footer() {
  return (
    <div style={classes.container}>
      {FOOTER_LINKS.map(({ title, link }) => (
        <a key={title} href={link} target="_blank" rel="noopener noreferrer" style={classes.link}>
          {title}
        </a>
      ))}
    </div>
  );
}
