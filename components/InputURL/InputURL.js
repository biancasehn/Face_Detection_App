import styles from './inputURL.module.css'

export default function InputURL({ onChange, onSubmit }) {

    return(
        <div>
            <form onSubmit={onSubmit} className={styles.container}>
                <input
                type="text"
                placeholder="Enter the URL"
                className={styles.input}
                onChange={onChange}
                />
                <button type="submit">Detect</button>
            </form>
        </div>
    )
}