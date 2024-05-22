import { Link } from "react-router-dom";

import logoMeteora from "/assets/images/logo-meteora.png";

const Logo = () => {
	return (
		<Link className="navbar-brand" to={"/"}>
			<h1 className="m-0">
				<img className="d-block" src={logoMeteora} alt="Logo da loja Meteora" />
			</h1>
		</Link>
	);
};

export default Logo;
