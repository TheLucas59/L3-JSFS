import ResponseBuilderHTML from "./ResponseBuilderHTML.js";

export default class ResponseBuilderSecond extends ResponseBuilderHTML {
    
    constructor(request, response) {
        super(request, response, 200, 'text/html');
    }

    writeResponse() {
        this.response.write("<h1>Welcome to the second page !</h1>");
    }
}