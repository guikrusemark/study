import Image from "next/image"
import { Avatar } from "../Avatar"
import styles from './cardpost.module.css'
import Link from "next/link"

import { incrementThumbsUp, postComment } from "@/actions"
import { ThumbsUpButton } from "./ThumbsUpButton"
import { ModalComment } from "../ModalComment"

export const CardPost = ({ post, highlight }) => {

    const submitThumbsUp = incrementThumbsUp.bind(null, post);
    const submitComment = postComment.bind(null, post);

    return (
        <article className={styles.card} style={{ width: highlight ? 993 : 486 }}>
            <header className={styles.header}>
                <figure style={{ height: highlight ? 300 : 133 }}>
                    <Image
                        src={post.cover}
                        fill
                        alt={`Capa do post de titulo: ${post.title}`}
                    />
                </figure>
            </header>
            <section className={styles.body}>
                <h2>{post.title}</h2>
                <p>{post.body}</p>
                <Link href={`/posts/${post.slug}`}>Ver detalhes</Link>
            </section>
            <footer className={styles.footer}>
                <div className={styles.actions}>
                    <form action={submitThumbsUp}>
                        <ThumbsUpButton />
                        <p>
                            {post.likes}
                        </p>
                    </form>
                    <div>
                        <ModalComment action={submitComment}/>
                        <p>
                            {post.comments.length}
                        </p>
                    </div>
                </div>
                <Avatar
                    imageSrc={post.author.avatar}
                    name={post.author.username}
                />
            </footer>
        </article>
    )
}