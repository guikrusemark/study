import type { ReactNode } from "react";
import style from "./Card.module.scss";

interface CardProps {
	children: ReactNode;
}

const Card = ({ children }: CardProps) => {
	return <div className={style.Card}>{children}</div>;
};

export default Card;
