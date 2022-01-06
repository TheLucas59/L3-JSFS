import ResponseBuilderHTML from "./ResponseBuilderHTML.js";

export default class ResponseBuilderSecond extends ResponseBuilderHTML {
    
    constructor(request, response) {
        super(request, response, 200, 'text/html');
    }

    writeResponse() {
        this.getResponse().write("<h1>Welcome to the second page !</h1>");
        this.getResponse().write('<link href="./public/style/style.css" rel="stylesheet" type="text/css">');
        this.getResponse().write('<img src="./public/img/timoleon_oceanie.jpg" alt="timoleon bien sur">');
        this.getResponse().write('<link href="./public/style/inexistante.css" rel="stylesheet" type="text/css">')
    }
}