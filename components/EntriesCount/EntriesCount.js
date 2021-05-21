export default function EntriesCount({userName, entries }) {

    return(
        <div>
           <h3>{`Hi, ${userName}! You have detected ${entries} faces.`}</h3>
        </div>
    )
}