import React from 'react';
import { theme } from '../theme';
import { FOOTER_LINKS } from '../constants';

const classes = {
  container: {
    bottom: 0,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderTop: `1px solid ${theme.color.lightGrey}`,
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
