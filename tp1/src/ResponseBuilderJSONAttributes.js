import ResponseBuilderJSON from "./ResponseBuilderJSON.js";

export default class ResponseBuilderJSONAttributes extends ResponseBuilderJSON {
    BASE = "http://localhost:8080";

    constructor(request, response) {
        super(request, response, 200, 'application/json')
    }

    writeResponse() {
        const url = new URL(this.request.url, this.BASE);
        const allParams = url.searchParams;
        let json = "{";
        for(const [name,val] of allParams) {
            json += `"${name}":"${val}",`
        }
        const now = new Date();
        json += `"date":${JSON.stringify(now.toJSON())}}`
        this.response.write(json);  
    }
}