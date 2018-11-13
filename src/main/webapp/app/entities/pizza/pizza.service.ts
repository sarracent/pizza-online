import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPizza } from 'app/shared/model/pizza.model';

type EntityResponseType = HttpResponse<IPizza>;
type EntityArrayResponseType = HttpResponse<IPizza[]>;

@Injectable({ providedIn: 'root' })
export class PizzaService {
    public resourceUrl = SERVER_API_URL + 'api/pizzas';

    constructor(private http: HttpClient) {}

    create(pizza: IPizza): Observable<EntityResponseType> {
        return this.http.post<IPizza>(this.resourceUrl, pizza, { observe: 'response' });
    }

    update(pizza: IPizza): Observable<EntityResponseType> {
        return this.http.put<IPizza>(this.resourceUrl, pizza, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IPizza>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPizza[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
