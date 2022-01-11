import React from "react";
import "./Switch.css";

interface setValueFunc {
	(newValue: boolean): void;
}

interface SwitchProps {
	value: boolean;
	setValue: setValueFunc;
	disabled?: boolean;
}

export default function Switch(props: SwitchProps) {

	const { value, setValue, disabled } = props;

	return (
		<label className="switch">
			<input
				type="checkbox"
				checked={value}
				onChange={ () => setValue(!value) }
				disabled={disabled}
			/>
			<span className="slider round" />
		</label>
	);

}
