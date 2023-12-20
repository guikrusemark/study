import Link from 'next/link';


export default function LinkPrefetchPage(): JSX.Element {
  return (
    <div>
      <li>
        <Link href="/"  prefetch={false}>
          <a>
            Home
          </a>
        </Link>
      </li>
      <li>
        <Link href="/sobre" prefetch={false}>
          <a>
            Sobre
          </a>
        </Link>
      </li>
      <li>
        <Link href="/link-prefetch">
          <a>
            Link Prefetch
          </a>
        </Link>
      </li>
    </div>
  )
}
