import Link from "../src/components/Link";

function Title({ children, as }) {
  const Tag = as;
    return (
        <>
            <Tag>{children}</Tag>
            <style jsx>{`
                ${Tag} {
                    color: blue;
                }
            `}</style>
        </>
    );
}

export default function HomePage() {
    return (
        <>
            <Title as={"h2"}>Home</Title>
            <Link href="/sobre">Sobre</Link>
            <Link href="/contato">Contato</Link>
        </>
    );
}

