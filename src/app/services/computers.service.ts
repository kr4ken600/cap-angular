import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IComputer } from '../model/computer.mode';

@Injectable({
  providedIn: 'root'
})
export class ComputersService {

  URL_BASE = "http://localhost:3000/computers";

  constructor(private http: HttpClient) { }

  getComputers(){
    return this.http.get<IComputer[]>(this.URL_BASE)
  }

  getComputer(id: number){
    return this.http.get<IComputer>(`${this.URL_BASE}/${id}`);
  }

  setComputers(req: IComputer){
    return this.http.post<IComputer>(this.URL_BASE, req);
  }

  deleteComputer(id: number) {
    return this.http.delete(`${this.URL_BASE}/${id}`);
  }

  editComputer(id: number, body: IComputer){
    return this.http.patch(`${this.URL_BASE}/${id}`, body);
  }
}
