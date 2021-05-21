import Tilt from 'react-tilt';
import Image from 'next/image'


export default function Logo() {

    return(
            <Tilt 
            className="Tilt" 
            options={{ max : 50 }} 
            style={{ 
                height: 80, 
                width: 80, 
                boxShadow: "2px 2px 2px 1px rgba(0, 0, 0, 0.2)", 
                borderRadius:10, 
                position:"absolute", 
                background: "#E5E5F7",
                opacity:0.8,
                display:"flex",
                justifyContent: "center",
                alignItems: "center"
                 }} >
                <div className="Tilt-inner">
                    <Image 
                    alt='logo'
                    src="/face.png"
                    width={65}
                    height={65}
                    />
                </div>        
            </Tilt>

    )
}