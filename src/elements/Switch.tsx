import React from "react";
import "./Switch.css";

interface setValueFunc {
	(newValue: boolean): void;
}

interface SwitchProps {
	value: boolean;
	setValue: setValueFunc;
}

export default function Switch(props: SwitchProps) {

	const { value, setValue } = props;

	return (
		<label className="switch">
			<input
				type="checkbox"
				checked={value}
				onClick={ () => setValue(!value) }
			/>
			<span className="slider round" />
		</label>
	);

}
