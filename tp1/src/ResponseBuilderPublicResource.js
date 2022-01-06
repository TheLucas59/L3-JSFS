import ResponseBuilder from "./ResponseBuilder.js";

export default class ResponseBuilderResource extends ResponseBuilder {
    
    constructor(request, response, status, type) {
        super(request, response, status, type);
    }

    setHeader() {
        this.getResponse().setHeader('Content-Type', this.getType());
        this.getResponse().statusCode = this.getStatus();
    }

    close() {}
}