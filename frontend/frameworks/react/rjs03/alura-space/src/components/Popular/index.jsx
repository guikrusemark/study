import React from "react";

import pics from "./fotos-populares.json";

import styles from "./Popular.module.scss";

export default function Popular() {
	return (
		<aside className={styles.populares}>
			<h2>Populares</h2>
			<ul className={styles.populares__imagens}>
				{pics.map((pic) => (
					<li key={pic.id}>
						<img src={pic.path} alt={pic.alt} />
					</li>
				))}
			</ul>
			<button>Ver mais fotos</button>
		</aside>
	);
}
