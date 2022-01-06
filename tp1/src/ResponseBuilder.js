export default class ResponseBuilder {
    #request;
    #response;
    #status;
    #type;

    constructor(request, response, status, type) {
        this.#request = request;
        this.#response = response;
        this.#status = status;
        this.#type = type;
    }

    createResponse() {
        this.setHeader();
        this.writeResponse();
        this.close();
    }

    getRequest() {
        return this.#request;
    }

    getResponse() {
        return this.#response;
    }

    getStatus() {
        return this.#status;
    }

    getType() {
        return this.#type;
    }

}