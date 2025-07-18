import React from 'react';
import SideBar from '../components/SideBar.component';
import BuilderWindow from '../components/BuilderWindow.component';
import Footer from '../components/Footer.component';
import { SPRITE_ORDER } from '../constants';
import Gate from '../components/Gate.component';
import { CELL_WIDTH } from '../constants';

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
          {SPRITE_ORDER.map((item, i) => {
            console.log(item);
            return <Gate key={i} {...item} size={CELL_WIDTH} />
          })}
        </SideBar>
        <BuilderWindow />
      </div>
      <Footer />
    </div>
  );
}