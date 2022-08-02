import { Component, OnInit } from '@angular/core';
import { Issue } from 'src/app/interfaces/issue';
import { IssuesApiService } from 'src/app/services/issues-api.service';

@Component({
  selector: 'app-list-component',
  templateUrl: './list-component.component.html',
  styleUrls: ['./list-component.component.css']
})
export class ListComponentComponent implements OnInit {
  issues: Issue[] = [{
    id: 1,
    description: "",
    status: "",
    assignee: ""
  }]

  constructor(private issuesApiService: IssuesApiService){}

  ngOnInit(): void {
    this.issuesApiService.fetchAllIssues().subscribe(newIssue => {
      this.issues = newIssue;
    })
  }
}
