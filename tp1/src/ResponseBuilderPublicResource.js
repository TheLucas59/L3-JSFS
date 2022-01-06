import ResponseBuilder from "./ResponseBuilder.js";
import fs from 'fs';

export default class ResponseBuilderPublicResource extends ResponseBuilder {
    
    constructor(request, response) {
        super(request, response, 200, 'text/plain');
    }

    setHeader() {
        this.getResponse().setHeader('Content-Type', this.getType());
        this.getResponse().statusCode = this.getStatus();
    }

    writeResponse() {
        const path = '.' + this.getRequest().url;
        try {
            fs.accessSync(path, fs.constants.R_OK);
            const fileData = fs.readFileSync(path);
            this.getResponse().write(fileData);
        }
        catch(err) {
            this.getResponse().statusCode = 404;
        }
    }

    close() {}
}