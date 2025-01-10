import { Button } from '@/components/Button'
import styles from './searchform.module.css'

export const SearchForm = () => {

    return (<form className={styles.form} action='/'>
        <input 
            name='q' 
            className={styles.input} 
            placeholder='Digite o que você procura' 
        />
        <Button>
            Buscar
        </Button>
    </form>)
}