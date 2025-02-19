import styles from './heading.module.css'

export const Heading = ({children}) => {
    return <h1 className={styles.heading}>{children}</h1>
}