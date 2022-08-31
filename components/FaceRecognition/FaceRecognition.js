import styles from "./FaceRecognition.module.css";

export default function FaceRecognition({ imgRef, pic, box, isLoading }) {
  if (
    pic == "" ||
    (pic.substring(0, 6) !== "https:" &&
      pic.substring(0, 15) !== "data:image/jpeg")
  ) {
    return <div className={styles.emptyContainer} />;
  }
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <img
          id="inputimage"
          ref={imgRef}
          src={pic}
          alt="face"
          className={styles.img}
          style={isLoading ? { opacity: "0.3" } : { opacity: 1 }}
        />
        {isLoading ? (
          <div className={styles.centerLoader}>
            <div className={styles.loader}></div>
          </div>
        ) : (
          !!box &&
          box.map((face, index) => (
            <div
              key={`${face}_${index}`}
              className={styles.box}
              style={{
                top: face.top_row,
                right: face.right_col,
                bottom: face.bottom_row,
                left: face.left_col,
              }}
            />
          ))
        )}
      </div>
    </div>
  );
}
