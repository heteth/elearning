import axios from "axios";

function toObject(xml) {
    if (!xml)
        return

    if (!xml.children?.length && xml.firstChild?.nodeValue)
        return xml.firstChild.nodeValue

    return xml.children && [].slice.call(xml.children).reduce(
        (o, c) => ({...o, [c.nodeName]: (o[c.nodeName] || []).concat(toObject(c))}), 
        xml.attributes && [].slice.call(xml.attributes).reduce((o, a) => ({...o, [a.name]: a.value}), {}) || {})
}

async function post(url, formData) {
    const res = await axios.post(url, formData)
    const data = new DOMParser().parseFromString(res.data, 'application/xml')
    return toObject(data)
} 

export default {
    async fetchStructure() {
        const store = (await import("@/store")).default;

        const formData = new FormData()

        formData.append("enc", store.state.enc)
        formData.append("type", store.state.type)
        formData.append("name", store.state.name)
        formData.append("courseid", store.state.courseid)

        return await post('/data/fetchStructure', formData)
    },

    async fetchSceneData(lev1) {
        const store = (await import("@/store")).default;

        const formData = new FormData()

        formData.append("enc", store.state.enc)
        formData.append("type", store.state.type)
        formData.append("name", store.state.name)
        formData.append("courseid", store.state.courseid)
        formData.append("lev1", lev1)

        return await post('/data/fetchData', formData)
    },

    /*async fetchChallenge(challenge) {

    },

    async fetchGlossary() {

    },

    async trackContent(id, ref) {

    },

    async trackQuestion(id, ans, ref) {

    },

    async trackChallenge(id, score, ref) {

    },

    async trackDownload(did, ref) {

    },*/
}