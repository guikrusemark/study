import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import About from "@/pages/About";
import Home from "@/pages/Home";
import Layout from "@/pages/_layout";

export default function AppRouter() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Home />} />
					<Route path="about" element={<About />} />
				</Route>
			</Routes>
		</Router>
	);
}
