import React from 'react';
import { theme } from '../../theme';

const classes = {
	button: {
		padding: '8px 14px',
		backgroundColor: theme.color.grey,
		color: theme.color.white,
		border: 'none',
		borderRadius: 6,
		fontSize: 16,
		fontWeight: 500,
		cursor: 'pointer',
		boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
		outline: 'none',
		transition: 'background-color 0.2s ease',
	},
	buttonHover: {
		backgroundColor: theme.color.darkGrey,
	},
	buttonDisabled: {
		backgroundColor: theme.color.lightGrey,
		color: theme.color.disabledText || '#999',
		cursor: 'not-allowed',
		pointerEvents: 'none',
		boxShadow: 'none',
	},
};

export function Button({ onPress, title, disabled = false }) {
	const [hover, setHover] = React.useState(false);

	return (
		<button
			type="button"
			onClick={!disabled ? onPress : undefined}
			disabled={disabled}
			onMouseEnter={() => !disabled && setHover(true)}
			onMouseLeave={() => !disabled && setHover(false)}
			style={{
				...classes.button,
				...(hover && !disabled ? classes.buttonHover : {}),
				...(disabled ? classes.buttonDisabled : {}),
			}}
		>
			{title}
		</button>
	);
}
