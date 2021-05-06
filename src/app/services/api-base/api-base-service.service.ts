import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/form-data'})
};
@Injectable({
  providedIn: 'root'
})
export class ApiBaseService {

  constructor(private http: HttpClient) {
  }

  private SECURITY_HEADER = 'Authorization';
  private TOKEN_STORAGE_KEY = 'token';
  public hostService = 'https://blumer.app';

  //public hostService = 'https://blumer.app/';

  getToken(): string {
    return localStorage.getItem('token');
  }

  createAuthorizationHeader() {
    let token = this.getToken();
    if (!token) {
      token = 'noUser';
    }

    httpOptions.headers = new HttpHeaders({'Content-Type': 'application/json'});
    httpOptions.headers = httpOptions.headers.append('Authorization', "Bearer " + token);
  }

  createAuthorizationHeader2() {
    let token = this.getToken();
    if (!token) {
      token = 'noUser';
    }

    httpOptions.headers = new HttpHeaders({'Content-Type': 'application/json'});
  }

  createAuthorizationHeader3() {
    let token = this.getToken();
    if (!token) {
      token = 'noUser';
    }

    httpOptions.headers = new HttpHeaders({'Content-Type': 'multipart/form-data'});
    httpOptions.headers = httpOptions.headers.append('Authorization', "Bearer " + token);
  }


  createPageArgs = function () {
    return 'page=' + this.queryArgs.page + '&' + 'pageSize=' + this.queryArgs.limit + '&' + 'filter=' + this.queryArgs.filter;
  };


  createArgumentsQuery = function (args) {
    if (args instanceof Array) {
      let retVal = '';
      let first = true;
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < args.length; i++) {
        const argx = args[i];
        if (!first) {
          retVal += '&';
        }
        retVal += argx.name + '=' + argx.value;
        first = false;
      }
      // tslint:disable-next-line:triple-equals
      if (retVal != null && retVal != '') {
        return retVal;
      }
    }
    if (args != null) {
      return args;
    }
    return '';
  };


  resolveServiceUrl = function (url, args, addPage) {
    const argsQry = this.createArgumentsQuery(args);
    url = this.hostService + url;
    // tslint:disable-next-line:triple-equals
    if (argsQry != null && argsQry != '') {
      return url + '?' + argsQry + (addPage ? ('&' + this.createPageArgs()) : '');
    }
    return url + (addPage ? ('?' + this.createPageArgs()) : '');

  };


  // tslint:disable-next-line:variable-name ban-types
  doGet(_this, url: String, args, successHandler, errorHandler, addPageHandler) {
    const service = this.resolveServiceUrl(url, args, addPageHandler);
    this.createAuthorizationHeader();
    // console.log(httpOptions);
    this.http.get(service, httpOptions).subscribe(
      data =>
        successHandler(_this, data)
      ,
      (err: HttpErrorResponse) => errorHandler(_this, err)
    );
  }

  // tslint:disable-next-line:variable-name
  doPost(_this, url, data, args, successHandler, errorHandler, addPageHandler) {
    const service = this.resolveServiceUrl(url, args, addPageHandler);
    this.createAuthorizationHeader();
    this.http.post(service, data, httpOptions).subscribe(
      // tslint:disable-next-line:no-shadowed-variable
      data => {
        successHandler(_this, data);
      },
      (err: HttpErrorResponse) => {
        errorHandler(_this, err);
      }
    );
  }

  // tslint:disable-next-line:variable-name
  post(_this, url, data, successHandler, errorHandler) {
    const service = this.resolveServiceUrl(url, [], false);
    this.createAuthorizationHeader();
    this.http.post(service, data, httpOptions).subscribe(
      // tslint:disable-next-line:no-shadowed-variable
      data => {
        successHandler(_this, data);
      },
      (err: HttpErrorResponse) => {
        errorHandler(_this, err);
      }
    );
  }

  postLogin(_this, url, data, successHandler, errorHandler) {
    const service = this.resolveServiceUrl(url, [], false);
    this.createAuthorizationHeader2();
    this.http.post(service, data, {responseType: 'json'}).subscribe(
      // tslint:disable-next-line:no-shadowed-variable
      data => {
        successHandler(_this, data);
      },
      (err: HttpErrorResponse) => {
        errorHandler(_this, err);
      }
    );
  }

  postLoginAuth(_this, url, data, successHandler, errorHandler) {
    const service = this.resolveServiceUrl(url, [], false);
    this.createAuthorizationHeader3();

    this.http.post(service, data, httpOptions).subscribe(
      // tslint:disable-next-line:no-shadowed-variable
      data => {
        successHandler(_this, data);
      },
      (err: HttpErrorResponse) => {
        errorHandler(_this, err);
      }
    );
  }

  get(_this, url, successHandler, errorHandler) {
    const service = this.resolveServiceUrl(url, [], false);
    this.createAuthorizationHeader();
    this.http.get(service, httpOptions).subscribe(
      (result) => {
        successHandler(_this, result);
      },
      (error) => errorHandler(_this, error)
    );
  };

  // tslint:disable-next-line:variable-name
  put(_this, url, data, successHandler, errorHandler) {
    const service = this.resolveServiceUrl(url, [], false);
    this.createAuthorizationHeader();
    this.http.put(service, data, httpOptions).subscribe(
      // tslint:disable-next-line:no-shadowed-variable
      data => {
        successHandler(_this, data);
      },
      (err: HttpErrorResponse) => {
        errorHandler(_this, err);
      }
    );
  }


}
