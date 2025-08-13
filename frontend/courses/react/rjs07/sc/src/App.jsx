import AppRouter from "@/routes.jsx";
import "normalize.css";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { StyledEngineProvider } from "@mui/material/styles";

import GlobalStyle from "@/styles/GlobalStyle.js";

const theme = createTheme({
	palette: {
		primary: {
			main: "#2A9F85",
		},
		secondary: {
			main: "#FF7070",
		},
	},
});

function App() {
	return (
		<StyledEngineProvider injectFirst>
			<ThemeProvider theme={theme}>
				<GlobalStyle />
				<AppRouter />
			</ThemeProvider>
		</StyledEngineProvider>
	);
}

export default App;
