import axios from "axios";

function toObject(xml) {
    if (!xml)
        return

    if (xml.nodeName === 'answer')
        console.log({answer: xml})
    
    if (!xml.children?.length && xml.firstChild?.nodeValue && !xml.attributes.length)
        return xml.firstChild.nodeValue

    if (!xml.children?.length && xml.firstChild?.nodeValue)
        return [].slice.call(xml.attributes).reduce((o, a) => ({...o, ['_' + a.name]: a.value}), {nodeValue: xml.firstChild.nodeValue})

    return xml.children && [].slice.call(xml.children).reduce(
        (o, c) => ({...o, [c.nodeName]: (o[c.nodeName] || []).concat(toObject(c))}), 
        xml.attributes && [].slice.call(xml.attributes).reduce((o, a) => ({...o, ['_' + a.name]: a.value}), {}) || {})
}

async function post(url, formData) {
    const res = await axios.post(url, formData)
    const data = new DOMParser().parseFromString(res.data, 'application/xml')
    console.log({toObject, data})
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

    async fetchChallenge(challenge) {
        const store = (await import("@/store")).default;

        const formData = new FormData()

        formData.append("enc", store.state.enc)
        formData.append("type", store.state.type)
        formData.append("name", store.state.name)
        formData.append("courseid", store.state.courseid)
        formData.append("challenge", challenge)

        return await post('/data/fetchChallenge', formData)
    },

    /*async fetchGlossary() {

    },
    */
    async trackContent(id, ref) {
        const store = (await import("@/store")).default;

        const formData = new FormData()

        formData.append("enc", store.state.enc)
        formData.append("type", store.state.type)
        formData.append("name", store.state.name)
        formData.append("courseid", store.state.courseid)
        formData.append("id", id)
        formData.append("ref", ref)

        return await post('/track/content', formData)
    },
    
    async trackQuestion(id, ans, ref) {
        const store = (await import("@/store")).default;

        const formData = new FormData()

        formData.append("enc", store.state.enc)
        formData.append("type", store.state.type)
        formData.append("name", store.state.name)
        formData.append("courseid", store.state.courseid)
        formData.append("id", id)
        formData.append("ans", ans)
        formData.append("ref", ref)

        return await post('/track/question', formData)
    },
    
    async trackChallenge(id, score, ref) {
        const store = (await import("@/store")).default;

        const formData = new FormData()

        formData.append("enc", store.state.enc)
        formData.append("type", store.state.type)
        formData.append("name", store.state.name)
        formData.append("courseid", store.state.courseid)
        formData.append("id", id)
        formData.append("score", score)
        formData.append("ref", ref)

        return await post('/track/challenge', formData)
    },
/*
    async trackDownload(did, ref) {

    },*/
}