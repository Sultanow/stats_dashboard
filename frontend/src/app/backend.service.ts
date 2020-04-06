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

  generateGraph(filename: string): Observable<void> {
    return this.http.post<void>("http://localhost:8000/api/"+filename, null);
  }

  getTable(filename: string): Observable<HTMLDocument> {
    return this.http.get<HTMLDocument>("http://localhost:8000/api/"+filename+"/table");
  }

  getLinePlot(filename: string): Observable<HTMLDocument> {
    return this.http.get<HTMLDocument>("http://localhost:8000/api/"+filename+"/lineplot");
  }
}
