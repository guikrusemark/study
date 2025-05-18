import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Routes, Route } from "react-router";

// biome-ignore lint/style/noNonNullAssertion: <explanation>
createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/">
					<Route index element={<App />} />
					<Route path="team" element={<h1>Team</h1>} />
				</Route>
			</Routes>
		</BrowserRouter>
	</StrictMode>,
);
