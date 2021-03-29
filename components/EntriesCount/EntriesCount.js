export default function EntriesCount({userName, entries }) {

    return(
        <div>
           <h3>{`Hi, ${userName}! Your current entry count is ${entries}`}</h3>
        </div>
    )
}