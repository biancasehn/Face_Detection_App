import styles from './FaceRecognition.module.css'

export default function FaceRecognition({pic, box}) {
    if ((pic == '') || ((pic.substring(0,6) !== "https:") && (pic.substring(0,15) !== "data:image/jpeg"))) {
        return (
            <div />
        )
        } else {
            return(
                <div className={styles.container}>
                    <div className={styles.main}>
                        <img id='inputimage'
                            src={pic}
                            alt="face"
                            className={styles.img}
                        />           
                        {box 
                        ? box.map(face => (
                            <div key={face}
                            className={styles.box}
                            style={{
                                top: face.top_row, 
                                right: face.right_col, 
                                bottom: face.bottom_row,
                                left: face.left_col
                                }}
                            />
                        )) : <div/>
                        }            
                    </div>
                </div>
            )
        }
}