import axios from "axios"
const base_url = "https://pskovedu.ml/api/"
export async function getDiaryDay(setter, guid, day){
    let res = await axios.post(base_url + "journals/diaryday", {
        guid: guid
    })
    setter(res.data)
}