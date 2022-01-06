import ResponseBuilderHTML from "./ResponseBuilderHTML.js";

export default class ResponseBuilder404 extends ResponseBuilderHTML {
    
    constructor(request, response) {
        super(request, response, 404, 'text/html');
    }

    writeResponse() {
        this.getResponse().write(`<h1>404 : page ${this.getRequest().url} not found</h1>`);
    }
}