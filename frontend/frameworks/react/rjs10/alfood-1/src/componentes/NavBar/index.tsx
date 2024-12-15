import { Link } from "react-router-dom";
import estilos from "./NavBar.module.scss";

const NavBar = () => {
	return (
		<nav className={estilos.Link}>
			<ul>
				<li>
					<Link to="/">Home</Link>
				</li>
				<li>
					<Link to="/restaurantes">Restaurantes</Link>
				</li>
			</ul>
		</nav>
	);
};

export default NavBar;
