import React from 'react';
import Header from '../components/Header.component';
import SideBar from '../components/SideBar.component';
import BuilderWindow from '../components/BuilderWindow.component';
import Footer from '../components/Footer.component';
import { theme } from '../theme';
import { SPRITE_ORDER } from '../constants';
import SpriteImage from '../components/SpriteImage.component';


const classes = {
  screen: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  },

};

export default function BuilderScreen() {
  return (
    <div style={classes.screen}>
      {/* <Header /> */}
      <SideBar>
        {SPRITE_ORDER.map((i) => (
          <SpriteImage key={i} index={i} size={80} />
        ))}
      </SideBar>
      <BuilderWindow />
      <Footer />
    </div>
  );
}

