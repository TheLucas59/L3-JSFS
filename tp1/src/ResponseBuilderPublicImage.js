import ResponseBuilderPublicResource from "./ResponseBuilderPublicResource.js"

export default class ResponseBuilderPublicImage extends ResponseBuilderPublicResource {
    constructor(request, response) {
        super(request, response, 200, 'application/json');
    }

    writeResponse() {
        const randomInt = Math.floor(Math.random()*101);
        const json = `{"randomValue":"${randomInt}"}`;
        this.response.write(json);
    }
}