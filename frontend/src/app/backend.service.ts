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
}
