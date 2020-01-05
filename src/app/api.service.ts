import { Injectable, Input } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, throwError, race, of } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Race } from './model/race';
import { Statistic } from './model/statistic';
@Injectable({
  providedIn: 'root'
})


export class ApiService {

  races:Race[] =[];
  baseurl = 'http://127.0.0.1:8080/api/';


  updateRaces(race:Race[]){
    this.races =race;
  }
  
  constructor(private http: HttpClient) { }

  getRaces():Observable<HttpResponse<Race[]>> {
    return this.http.get<Race[]>(this.baseurl + 'races',{ observe: 'response' });
  }

  runExtract():Observable<any> {
    return this.http.post<Statistic>(this.baseurl + 'extract',{ observe: 'response' });
  }

  runTransform():Observable<any> {
    return this.http.post<Statistic>(this.baseurl + 'transform',{ observe: 'response' });
  }

  runLoad():Observable<any> {
    return this.http.post<Statistic>(this.baseurl + 'load',{ observe: 'response' });
  }

  deleteRaces():Observable<HttpResponse<null>> {
    return this.http.delete<null>(this.baseurl + 'races',{ observe: 'response' });
  }

  writeRaceFiles():Observable<any> {
    return this.http.post<Statistic>(this.baseurl + 'raceFile',{ observe: 'response' });
  }

  writePersonFiles():Observable<any> {
    return this.http.post<Statistic>(this.baseurl + 'personFiles',{ observe: 'response' });
  }

private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
    console.error(error);
    this.log(`${operation} failed: ${error.message}`);

    return of(result as T);
  };
}

private log(message: string) {
  console.log(message);
}
}
