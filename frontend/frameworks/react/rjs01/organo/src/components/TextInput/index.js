import "./TextInput.css";

const TextInput = (props) => {
	const onChangeHandler = (event) => {
		props.onChangeHandler(event.target.value);
		// debugger;
	};

	return (
		<>
			<div className="campo-texto">
				<label htmlFor={props.label}>{props.label}</label>

				<input
					type="text"
					value={props.value}
					onChange={onChangeHandler}
					required={props.required}
					id={props.label}
				/>
			</div>
		</>
	);
};

export default TextInput;
