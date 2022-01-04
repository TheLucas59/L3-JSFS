import ResponseBuilder from "./ResponseBuilder.js";

export default class ResponseBuilderJSON extends ResponseBuilder {
    
    constructor(request, response, status, type) {
        super(request, response, status, type);
    }

    setHeader() {
        this.response.setHeader('Content-Type', this.type);
        this.response.statusCode = this.status;
    }

    close() {}
}