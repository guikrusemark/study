import { Heading } from "@/components/Heading";
import { ArrowBack } from "@/components/icons/ArrowBack";
import Image from "next/image";
import Link from "next/link";

import style from './error/error.module.css'
import banner from './error/404.png'

export default async function NotFound() {
  return (
    <div className={style.container}>
      <Image src={banner}/>
      <Heading>Opa! Ocorreu um erro.</Heading>
      <p className={style.text}>Não conseguimos carregar a página, volte para seguir navegando.</p>
      <Link href="/">
        Voltar ao feed <ArrowBack color='#81FE88'/>
      </Link>
    </div>
  )
}