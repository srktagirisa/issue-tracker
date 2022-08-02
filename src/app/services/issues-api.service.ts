import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Issue } from '../interfaces/issue';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IssuesApiService {

  private apiUrl = "https://issues-c37e.restdb.io/rest/issues";
  private apiKey = "62e8615d6851d057058c88ab";
  issues: Issue[] = [{
    id: 1,
    description: "",
    status: "",
    assignee: ""
  }]
  private _totalIssues = new BehaviorSubject<number>(0);
  readonly totalIssues = this._totalIssues.asObservable();


  constructor(private http: HttpClient) { }

  fetchAllIssues(): Observable<Issue[]> {
    return this.http.get<Issue[]>(`${this.apiUrl}`, {
      headers: { "x-apikey": this.apiKey}
    });
  }

  addIssue(issue: Issue): Observable<Issue> {
    console.log('service param: '+issue.id);
    return this.http.post<Issue>(`${this.apiUrl}`, issue, {
      headers: {"x-apikey": this.apiKey}
    });

  }

  setTotalIssues(){
    let newTotalIssues: number = 0;
    this.issues.forEach(issue => {newTotalIssues ++ })
    this._totalIssues.next(newTotalIssues);
  }

  getTotalIssues(): number | 0 {
    return this._totalIssues.getValue();
  }
}
