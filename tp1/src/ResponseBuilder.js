export default class ResponseBuilder {
    request;
    response;
    status;
    type;

    constructor(request, response, status, type) {
        this.request = request;
        this.response = response;
        this.status = status;
        this.type = type;
    }

    createResponse() {
        this.setHeader();
        this.writeResponse();
        this.close();
    }

}