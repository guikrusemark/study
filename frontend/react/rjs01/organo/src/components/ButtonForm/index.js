import "./ButtonForm.css";

const ButtonForm = (props) => {
	return (
		<div className="button-form">
			<button type={props.type}>{props.children}</button>
		</div>
	);
};

export default ButtonForm;
