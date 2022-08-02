import { Component, OnInit } from '@angular/core';
import { Issue } from 'src/app/interfaces/issue';
import { IssuesApiService } from 'src/app/services/issues-api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  totalIssues: number = 0;
  totalOpenIssues: number = 0;
  openIssuesPercent: number = 0;
  issues: Issue[] = [{
    id: 1,
    description: "",
    status: "",
    assignee: ""
  }]
  constructor(private issuesApiService: IssuesApiService) { }

  ngOnInit(): void {
    this.issuesApiService.fetchAllIssues().subscribe(newIssue => {
      this.issues = newIssue;
    })
    this.issuesApiService.setTotalIssues();
    this.issuesApiService.totalIssues.subscribe(newTotalIssues => this.totalIssues = newTotalIssues);
  }
  
}
