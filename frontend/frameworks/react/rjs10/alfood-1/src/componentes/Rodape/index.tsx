import estilos from "./Rodape.module.scss";

const NavBar = () => {
	return (
		<footer className={estilos.Rodape}>
			<div>
				<p>Copyright &copy; {new Date().getFullYear()} Alfood</p>
			</div>
			<div>
				<ul className="social-icons">
					<li>
						<i className="fa fa-facebook" />
					</li>
					<li>
						<i className="fa fa-twitter" />
					</li>
					<li>
						<i className="fa fa-linkedin" />
					</li>
					<li>
						<i className="fa fa-rss" />
					</li>
					<li>
						<i className="fa fa-dribbble" />
					</li>
				</ul>
			</div>
			<div>
				<p>
					Uma alegria <em>a cada prato</em>
				</p>
			</div>
		</footer>
	);
};

export default NavBar;
