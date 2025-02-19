import { Button } from "@material-ui/core";
import { Input, InputAdornment, InputLabel } from "@material-ui/core";
import { UsuarioContext } from "common/context/Usuario";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Container, InputContainer, Titulo } from "./styles";

function Login() {
	const history = useHistory();
	const { nome, setNome, saldo, setSaldo } = useContext(UsuarioContext);
	return (
		<Container>
			<Titulo>Insira o seu nome</Titulo>
			<InputContainer>
				<InputLabel>Nome</InputLabel>
				<Input
					type="text"
					value={nome}
					onChange={(evento) => setNome(evento.target.value)}
				/>
			</InputContainer>
			<InputContainer>
				<InputLabel>Saldo</InputLabel>
				<Input
					type="number"
					value={saldo}
					onChange={(evento) =>
						setSaldo(Number.parseInt(evento.target.value) || "")
					}
					startAdornment={<InputAdornment position="start">R$</InputAdornment>}
				/>
			</InputContainer>
			<Button
				variant="contained"
				color="primary"
				disabled={nome < 4 || !saldo}
				onClick={() => history.push("/feira")}
			>
				Avançar
			</Button>
		</Container>
	);
}

export default Login;
