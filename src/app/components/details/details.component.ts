import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Issue } from 'src/app/interfaces/issue';
import { IssuesApiService } from 'src/app/services/issues-api.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  loading = true;
  issue: Issue = {
    _id: "",
    description: "",
    status: "",
    assignee: ""
  };
  values: Issue = {
    _id: "",
    description: "",
    status: "",
    assignee: ""
  };

  editIssue = false;
  issueUpdated = false;

  constructor(private route:ActivatedRoute,
    private issuesApiService: IssuesApiService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
    this.issuesApiService.getIssueDetails(params['_id']).subscribe(issueDetails => {
      this.values = {...issueDetails};
      this.issue = issueDetails;
      this.loading = false;
    })
  });
  }

  enableEditIssue():void {
    this.editIssue = true;
  }
  updateIssue(): void {
    this.loading = true;
    this.issuesApiService.updateIssue({ ...this.values}).subscribe(issueDetails => {
      this.values = issueDetails;
      this.editIssue = false;
      this.issueUpdated = true;
      this.loading = false;
    })
  }
}
