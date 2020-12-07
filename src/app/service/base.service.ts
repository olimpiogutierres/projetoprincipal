

import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

export abstract class BaseService {

    constructor() {

        this.headers = new HttpHeaders();
        this.headers.append('Access-Control-Allow-Origin', '*');
        this.headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
        this.headers.append('Accept', 'application/json');
        this.headers.append('content-type', 'application/json');
        this.headers.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');


        this.optionsHttp = { headers: this.headers, body: {} };
    }

    private headers: HttpHeaders;
    public optionsHttp: { headers: {}, body: {} };
}