import React from 'react';
import SideBar from '../components/SideBar.component';
import BuilderWindow from '../components/BuilderWindow.component';
import Footer from '../components/Footer.component';
import { SPRITE_ORDER } from '../constants';
import Gate from '../components/Gate.component';

const classes = {
  screen: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: '#FAFAFA',
  },
  main: {
    display: 'flex',
    flex: 1,
    overflow: 'hidden',
  },
};

export default function BuilderScreen() {
  return (
    <div style={classes.screen}>
      <div style={classes.main}>
        <SideBar>
          {SPRITE_ORDER.map((item, i) => (
            <Gate key={i} {...item} size={80} />
          ))}
        </SideBar>
        <BuilderWindow />
      </div>
      <Footer />
    </div>
  );
}