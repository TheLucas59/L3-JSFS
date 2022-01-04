import ResponseBuilderHTML from "./ResponseBuilderHTML.js";

export default class ResponseBuilder404 extends ResponseBuilderHTML {
    
    constructor(request, response) {
        super(request, response, 404, 'text/html');
    }

    writeResponse() {
        this.response.write(`<h1>404 : page ${this.request.url} not found</h1>`);
    }
}