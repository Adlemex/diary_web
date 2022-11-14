import axios from "axios"
const base_url = "https://pskovedu.ml/api/"
async function getDay(guid: String,date: Date){
    let res = await axios.post(base_url + "journals/diaryday", {
        guid: guid
    })
    return res.data
}
export default getDay