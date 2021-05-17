import styles from './input.module.css'
import React from 'react';

export default function InputURL({ onChange, onSubmit }) {
    const hiddenFileInput = React.useRef(null);

    const handleClick = () => {
        hiddenFileInput.current.click();
      }
    return(
        <div>
            <form onSubmit={onSubmit} className={styles.container}>
                <div className={styles.main}>
                    <input
                    type="text"
                    id="myUrl"
                    placeholder="Paste an URL"
                    className={styles.urlInput}
                    onChange={onChange}
                    />
                    <input
                    onChange={onChange}
                    ref={hiddenFileInput}
                    type="file"
                    id="myfile"
                    hidden
                    />
                    <div
                    onClick={handleClick}
                    className={styles.fileInput}
                    >Choose a file</div> 
                </div>
                <button className={styles.button} type="submit">Detect</button>
            </form>
        </div>
    )
}