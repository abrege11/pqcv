import React from 'react';
import Header from '../components/Header.component';
import SideBar from '../components/SideBar.component';
import BuilderWindow from '../components/BuilderWindow.component';
import Footer from '../components/Footer.component';
import theme from '../theme';

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
      <Header />
      <SideBar />
      <BuilderWindow />
      <Footer />
    </div>
  );
}

