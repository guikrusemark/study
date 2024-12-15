import NextLink from "next/link";

export default function Link({ children, href, ...props }) {
	return (
		<NextLink href={href} passHref>
			<h1 {...props}>{children}</h1>
		</NextLink>
	);
}
