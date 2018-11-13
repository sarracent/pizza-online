import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPizzaOrder } from 'app/shared/model/pizza-order.model';

type EntityResponseType = HttpResponse<IPizzaOrder>;
type EntityArrayResponseType = HttpResponse<IPizzaOrder[]>;

@Injectable({ providedIn: 'root' })
export class PizzaOrderService {
    public resourceUrl = SERVER_API_URL + 'api/pizza-orders';

    constructor(private http: HttpClient) {}

    create(pizzaOrder: IPizzaOrder): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(pizzaOrder);
        return this.http
            .post<IPizzaOrder>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(pizzaOrder: IPizzaOrder): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(pizzaOrder);
        return this.http
            .put<IPizzaOrder>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IPizzaOrder>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IPizzaOrder[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(pizzaOrder: IPizzaOrder): IPizzaOrder {
        const copy: IPizzaOrder = Object.assign({}, pizzaOrder, {
            placedDate: pizzaOrder.placedDate != null && pizzaOrder.placedDate.isValid() ? pizzaOrder.placedDate.toJSON() : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.placedDate = res.body.placedDate != null ? moment(res.body.placedDate) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((pizzaOrder: IPizzaOrder) => {
                pizzaOrder.placedDate = pizzaOrder.placedDate != null ? moment(pizzaOrder.placedDate) : null;
            });
        }
        return res;
    }
}
