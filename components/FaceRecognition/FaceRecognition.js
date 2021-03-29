import styles from './FaceRecognition.module.css'

export default function FaceRecognition({pic, box}) {
    if (pic == '') {
        return(
            <div />)
    } else {
            return(
                <div style={{display:"flex", justifyContent:"center"}}>
                    <div className={styles.container}>
                        <img id='inputimage'
                            src={pic}
                            alt="face"
                            width={"500px"}
                            height={"auto"}
                        />           
                        {box 
                        ? box.map(face => (
                            <div
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