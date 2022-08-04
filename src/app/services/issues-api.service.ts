import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Issue } from '../interfaces/issue';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IssuesApiService {

  private apiUrl = "https://issues-c37e.restdb.io/rest/issues";
  private apiKey = "62e8615d6851d057058c88ab";
  issues: Issue[] = [{
    _id: "",
    description: "",
    status: "",
    assignee: ""
  }]
  private _totalIssues = new BehaviorSubject<number>(0);
  readonly totalIssues = this._totalIssues.asObservable();
  private _totalOpenIssues = new BehaviorSubject<number>(0);
  readonly totalOpenIssues = this._totalOpenIssues.asObservable();
  private _openIssuesPercentage = new BehaviorSubject<number>(0);
  readonly openIssuesPercentage = this._openIssuesPercentage.asObservable();
  constructor(private http: HttpClient) { }

  fetchAllIssues(): Observable<Issue[]> {
    return this.http.get<Issue[]>(`${this.apiUrl}`, {
      headers: { "x-apikey": this.apiKey}
    });
  }

  getIssueDetails(id: number): Observable<Issue> {
    return this.http.get<Issue>(`${this.apiUrl}/${id}`, {
      headers: { "x-apikey": this.apiKey}
    });
  }

  addIssue(issue: Issue): Observable<Issue> {
    console.log('service param: '+issue.description);
    return this.http.post<Issue>(`${this.apiUrl}`, issue, {
      headers: {"Content-Type": "application/json",
                "x-apikey": this.apiKey}
    }).pipe(tap(() => {this.setTotalAndOpenIssues()}));

  }

  closeIssue(issue: Issue): Observable<Issue> {
    issue.status = "closed";
    console.log('service param: '+issue.status);
    return this.http.put<Issue>(`${this.apiUrl}/${issue._id}`, issue, {
      headers: {"Content-Type": "application/json",
                "x-apikey": this.apiKey}
    }).pipe(tap(() => {this.setTotalAndOpenIssues()}));

  }

  setTotalAndOpenIssues(){

    this.fetchAllIssues().subscribe(issue => {
      let newTotalIssues: number = 0;
      let newTotalOpenIssues: number = 0;
      let newopenIssuesPercentage: number = 0;
      console.log('issue:'+issue);
      this.issues = issue;
      this.issues.forEach(iss => {
        newTotalIssues ++;
        if(iss.status === 'open') {
          newTotalOpenIssues ++;
        }
      })
      console.log('newTotalIssues : ' +newTotalIssues);
      this._totalIssues.next(newTotalIssues);
      console.log('newTotalOpenIssues : ' +newTotalOpenIssues);
      this._totalOpenIssues.next(newTotalOpenIssues);
      newopenIssuesPercentage = newTotalOpenIssues/newTotalIssues;
      console.log('newopenIssuesPercentage : ' +newopenIssuesPercentage);
      this._openIssuesPercentage.next(newopenIssuesPercentage);
     });

  }

  updateIssue(issue: Issue): Observable<Issue> {
    console.log('issue description: '+issue.description);
    console.log('issue status: '+issue.status);
    console.log('issue assignee: '+issue.assignee);
    return this.http.put<Issue>(`${this.apiUrl}/${issue._id}`, issue, {
      headers: {"Content-Type": "application/json",
                "x-apikey": this.apiKey}
    }).pipe(tap(() => {this.setTotalAndOpenIssues()}));

  }

}
