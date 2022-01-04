import ResponseBuilderFirst from "./ResponseBuilderFirst.js"
import ResponseBuilderSecond from "./ResponseBuilderSecond.js"
import ResponseBuilder404 from "./ResponseBuilder404.js"
import ResponseBuilderJSONAttributes from "./ResponseBuilderJSONAttributes.js";
import ResponseBuilderJSONRandom from "./ResponseBuilderJSONRandom.js";

export default class RequestController {

    constructor(request, response) {
        this.req = request;
        this.res = response;
        this.url = new URL(this.req.url, `http://${request.headers.host}`)
    }

    handle() {
        this.buildResponse();
    }

    buildResponse() {
        if(this.url.pathname == '/first') {
            new ResponseBuilderFirst(this.req, this.res).createResponse();
        }
        else if(this.url.pathname == '/second') {
            new ResponseBuilderSecond(this.req, this.res).createResponse();
        }
        else if(this.url.pathname == '/json') {
            new ResponseBuilderJSONAttributes(this.req, this.res).createResponse();
        }
        else if(this.url.pathname == '/random') {
            new ResponseBuilderJSONRandom(this.req, this.res).createResponse()
        }
        else if(this.url.pathname == '/public') {
            new ResponseBuilderPublicImage(this.req, this.res).createResponse();
        }
        else {
            new ResponseBuilder404(this.req, this.res).createResponse();
        }
    }
}