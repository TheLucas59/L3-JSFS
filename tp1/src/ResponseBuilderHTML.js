import ResponseBuilder from "./ResponseBuilder.js";

export default class ResponseBuilderHTML extends ResponseBuilder {
    constructor(request, response, status, type) {
        super(request, response, status, type)
    }

    setHeader() {
        this.response.setHeader('Content-Type', this.type);
        this.response.statusCode = this.status;
        this.createHTMLHeader();
    }

    createHTMLHeader() {
        this.response.write('<html><head></head><body>');
    }

    close() {
        const now = new Date();
        this.response.write(`<footer>${now.toString()}</footer></body></html>`);
    }
}