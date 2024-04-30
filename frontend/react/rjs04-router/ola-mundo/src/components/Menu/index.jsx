export default function Menu() {
	return (
		<header className="capitalize text-2xl font-bold flex justify-center p-8">
			<nav>
				<ul>
					<li className="rounded-xl hover:bg-gray-200">
						<a href="/">Home</a>
					</li>
					<li className="rounded-xl hover:bg-gray-200">
						<a href="/about">About</a>
					</li>
				</ul>
			</nav>
		</header>
	);
}
