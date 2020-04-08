import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
 })
export class BackendService {

  constructor(private http: HttpClient) {}

  getFiles(): Observable<string[]>{
    return this.http.get<string[]>('http://localhost:8000/api/files');
  }

  getGraphData(filename: string): Observable<string> {
    return this.http.get<string>("http://localhost:8000/api/"+filename);
  }

  getConfig(): Observable<string> {
    return this.http.get<string>("http://localhost:8000/api/bindings");
  }

  newConfig(identifier: string, excel: string, py: string): Observable<string> {
    const url= "http://localhost:8000/api/bindings/"+identifier+"?excel="+excel+"&py="+py;
    console.log("submitting: ", url);
    return this.http.post<string>(url, null);
  }

  deleteConfig(identifier:string): Observable<string> {
    return this.http.delete<string>("http://localhost:8000/api/bindings/"+identifier);
  }
}
