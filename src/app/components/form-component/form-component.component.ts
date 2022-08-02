import { Component, OnInit } from '@angular/core';
import { Issue } from 'src/app/interfaces/issue';
import { IssuesApiService } from 'src/app/services/issues-api.service';

@Component({
  selector: 'app-form-component',
  templateUrl: './form-component.component.html',
  styleUrls: ['./form-component.component.css']
})
export class FormComponentComponent implements OnInit {

  values: Issue = {
    id: 1,
    description: "",
    status: "",
    assignee: ""
  }
  
  showSavedMessage = false;

  constructor(private issuesApiService: IssuesApiService) { }

  ngOnInit(): void {
  }

  submitForm(): void {
    this.issuesApiService.addIssue({ ...this.values });
    this.showSavedMessage = true;
  }
}
