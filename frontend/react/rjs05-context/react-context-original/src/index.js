import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import { StylesProvider } from "@material-ui/core/styles";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Routes from "./router";

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

ReactDOM.render(
	<React.StrictMode>
		<StylesProvider injectFirst>
			<ThemeProvider theme={theme}>
				<Routes />
			</ThemeProvider>
		</StylesProvider>
	</React.StrictMode>,
	document.getElementById("root"),
);
