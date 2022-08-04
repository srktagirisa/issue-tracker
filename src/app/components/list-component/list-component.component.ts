import { Component, OnInit } from '@angular/core';
import { Issue } from 'src/app/interfaces/issue';
import { IssuesApiService } from 'src/app/services/issues-api.service';

@Component({
  selector: 'app-list-component',
  templateUrl: './list-component.component.html',
  styleUrls: ['./list-component.component.css']
})
export class ListComponentComponent implements OnInit {
  loading = true;
  issues: Issue[] = [{
    _id: "",
    description: "",
    status: "",
    assignee: ""
  }]
  issuesCopy: Issue[] = [{
    _id: "",
    description: "",
    status: "",
    assignee: ""
  }]
  searchInput: string = "";

  constructor(private issuesApiService: IssuesApiService){}

  ngOnInit(): void {
    this.getAllIssues();
  }

  getAllIssues(): void {
    this.issuesApiService.fetchAllIssues().subscribe(newIssue => {
      this.issues = newIssue;
      this.issuesCopy = this.issues;
      this.loading = false;
    })
  }
  filterIssues(): void {
    console.log('query: '+this.searchInput);
    this.issuesCopy = this.issues.filter((obj => {
      return obj.status === this.searchInput
        || obj.assignee === this.searchInput
        || obj.description.toLocaleLowerCase().includes(this.searchInput);
    }))
  }

  reset(): void {
    this.getAllIssues();
    this.searchInput = "";
  }
  closeIssue(issue: Issue): void {
    this.issuesApiService.closeIssue(issue).subscribe(res => 
      { this.loading = true;
        console.log(res);}, 
      err => {
      console.log(err);
    });
  }
}
