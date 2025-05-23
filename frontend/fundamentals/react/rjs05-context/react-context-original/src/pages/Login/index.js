import { Button } from "@material-ui/core";
import { Input, InputAdornment, InputLabel } from "@material-ui/core";
import { UsuarioContext } from "common/contexts/Usuario";
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
					onChange={(event) => setNome(event.target.value)}
				/>
			</InputContainer>
			<InputContainer>
				<InputLabel>Saldo</InputLabel>
				<Input
					value={saldo}
					type="number"
					onChange={(event) => setSaldo(Number(event.target.value))}
					startAdornment={<InputAdornment position="start">R$</InputAdornment>}
				/>
			</InputContainer>
			<Button
				variant="contained"
				color="primary"
				disabled={nome.length < 4}
				onClick={() => history.push("/feira")}
			>
				Avançar
			</Button>
		</Container>
	);
}

export default Login;
