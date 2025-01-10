import styles from './button.module.css'

export const Button = ({children}) => {
    return <button className={styles.btn}>
        {children}
    </button>
}