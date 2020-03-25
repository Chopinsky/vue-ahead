import React from 'react';
import styles from '../shared.css';

const iconClass = "react-ahead__dropdown-icon";

const ClearIcon = _props => {
	const iconStyle = styles[iconClass] || iconClass;

	return (
		<svg 
			x="0px" y="0px"
			width="16" height="16"
			focusable="false"
			viewBox="0 0 18 18"
			className={iconStyle}
			aria-hidden="true"
		>
			<path
				d="M 14.348 14.849 c -0.469 0.469 -1.229 0.469 -1.697 0 l -2.651 -3.03 l -2.651 3.029 c -0.469 0.469 -1.229 0.469 -1.697 0 c -0.469 -0.469 -0.469 -1.229 0 -1.697 l 2.758 -3.15 l -2.759 -3.152 c -0.469 -0.469 -0.469 -1.228 0 -1.697 s 1.228 -0.469 1.697 0 l 2.652 3.031 l 2.651 -3.031 c 0.469 -0.469 1.228 -0.469 1.697 0 s 0.469 1.229 0 1.697 l -2.758 3.152 l 2.758 3.15 c 0.469 0.469 0.469 1.229 0 1.698 Z"
			/>
		</svg>
	);
};

export default ClearIcon;
