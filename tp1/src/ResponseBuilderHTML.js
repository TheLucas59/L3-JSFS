import ResponseBuilder from "./ResponseBuilder.js";

export default class ResponseBuilderHTML extends ResponseBuilder {
    constructor(request, response, status, type) {
        super(request, response, status, type)
    }

    setHeader() {
        this.getResponse().setHeader('Content-Type', this.getType());
        this.getResponse().statusCode = this.getStatus();
        this.createHTMLHeader();
    }

    createHTMLHeader() {
        this.getResponse().write('<html><head></head><body>');
    }

    close() {
        const now = new Date();
        this.getResponse().write(`<footer>${now.toString()}</footer></body></html>`);
    }
}