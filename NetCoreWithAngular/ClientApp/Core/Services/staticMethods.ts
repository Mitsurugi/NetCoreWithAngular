import { HttpParams } from '@angular/common/http';

export class StaticMethods {

    static ObjectToUrlParams(parameterName: string, object: any): string {
        let result: string = '';

        Object.keys(object).forEach(i => {
            let value = object[i];
            if (value) result += parameterName + '.' + i + '=' + object[i] + '&';
        });

        return result;
    }

    static ObjectToHttpParams(parameterName: string, object: any): HttpParams {
        let result: HttpParams = new HttpParams();

        Object.keys(object).forEach(i => {
            let value = object[i];
            if (value) result = result.append(parameterName + '.' + i, value);
        });

        return result;
    }
}