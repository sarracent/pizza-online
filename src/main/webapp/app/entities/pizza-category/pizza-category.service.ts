import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPizzaCategory } from 'app/shared/model/pizza-category.model';

type EntityResponseType = HttpResponse<IPizzaCategory>;
type EntityArrayResponseType = HttpResponse<IPizzaCategory[]>;

@Injectable({ providedIn: 'root' })
export class PizzaCategoryService {
    public resourceUrl = SERVER_API_URL + 'api/pizza-categories';

    constructor(private http: HttpClient) {}

    create(pizzaCategory: IPizzaCategory): Observable<EntityResponseType> {
        return this.http.post<IPizzaCategory>(this.resourceUrl, pizzaCategory, { observe: 'response' });
    }

    update(pizzaCategory: IPizzaCategory): Observable<EntityResponseType> {
        return this.http.put<IPizzaCategory>(this.resourceUrl, pizzaCategory, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IPizzaCategory>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPizzaCategory[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
