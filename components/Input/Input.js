import { useRef } from "react";
import styles from "./input.module.css";

export default function InputURL({ onChange, url }) {
  const hiddenFileInput = useRef(null);

  const handleClick = () => {
    hiddenFileInput.current.click();
  };
  return (
    <div>
      <form className={styles.container}>
        <div className={styles.main}>
          <input
            type="text"
            id="myUrl"
            value={url || ""}
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
          <div onClick={handleClick} className={styles.fileInput}>
            Choose a file
          </div>
        </div>
      </form>
    </div>
  );
}
