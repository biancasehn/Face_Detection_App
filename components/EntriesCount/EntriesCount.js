export default function EntriesCount({userName, entries }) {

    return(
        <div>
           <h3>{`Hi, ${userName}! You have detected faces in ${entries} pictures.`}</h3>
        </div>
    )
}