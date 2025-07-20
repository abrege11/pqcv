import React, { useState } from 'react';

const classes = {
    button: {
        padding: 6
    }
}
export function Button ({onPress, title}) {
    return <button type="button" className="btn preset-filled" onClick={onPress} style={classes.button}>{title}</button>
}