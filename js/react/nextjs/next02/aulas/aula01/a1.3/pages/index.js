import Link from 'next/link'

function HomePage() {
  return (
    <div>
      Welcome to Next.js!

      <img src="/images/avatar.png" />

      <ul>
        <li>
          <Link href="/sobre">
            <a>Ir para a /sobre</a>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default HomePage
