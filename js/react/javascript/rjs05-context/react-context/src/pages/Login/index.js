import { Button } from "@material-ui/core";
import { Container, Titulo, InputContainer } from "./styles";
import { Input, InputLabel, InputAdornment } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { UsuarioContext } from "common/context/Usuario";
import { useContext } from "react";

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
                    value={ nome }
                    onChange={ (evento) => setNome(evento.target.value) }
                />
            </InputContainer>
            <InputContainer>
                <InputLabel>Saldo</InputLabel>
                <Input
                    type="number"
                    value={ saldo }
                    onChange={ (evento) => setSaldo(parseInt(evento.target.value) || '') }
                    startAdornment={
                        <InputAdornment position="start">R$</InputAdornment>
                    }
                />
            </InputContainer>
            <Button
                variant="contained"
                color="primary"
                disabled={ nome < 4 || !saldo }
                onClick={ () => history.push("/feira") }
            >
                Avançar
            </Button>
        </Container>
    );
}

export default Login;
