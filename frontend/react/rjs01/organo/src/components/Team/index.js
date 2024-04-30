import "./Team.css";
import Card from "../Card";

const Team = (props) => {
	return props.teams.map((team) =>
		props.cards.filter((card) => card.team === team.name).length > 0 ? (
			<section
				className="team"
				style={{ backgroundColor: team.backgroundColor }}
				key={props.teams.indexOf(team)}
			>
				<h3 style={{ borderBottom: `solid 3px ${team.color}` }}>{team.name}</h3>

				<section className="cards">
					{props.cards
						.filter((card) => card.team === team.name)
						.map((card) => (
							<Card
								name={card.name}
								role={card.role}
								url={card.url}
								teamColor={team.color}
								key={props.cards.indexOf(card)}
							/>
						))}
				</section>
			</section>
		) : (
			<section
				className="team"
				style={{ backgroundColor: team.backgroundColor }}
				key={props.teams.indexOf(team)}
			>
				<h3 style={{ borderBottom: `solid 3px ${team.color}` }}>{team.name}</h3>

				<section className="cards">
					<section className="vazio">SEM CARDS CADASTRADOS</section>
				</section>
			</section>
		),
	);
};

export default Team;
