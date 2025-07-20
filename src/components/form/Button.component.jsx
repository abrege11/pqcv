import React, { useState } from 'react';

const classes = {
    button: {
        padding: 6
    }
}
export function Button ({onPress, title}) {
    return <button type="button" class="btn preset-filled" onPress={onPress} style={classes.button}>{title}</button>
}