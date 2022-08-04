import { Component, OnInit } from '@angular/core';
import { Issue } from 'src/app/interfaces/issue';
import { IssuesApiService } from 'src/app/services/issues-api.service';

@Component({
  selector: 'app-form-component',
  templateUrl: './form-component.component.html',
  styleUrls: ['./form-component.component.css']
})
export class FormComponentComponent implements OnInit {
  loading = false;
  values: Issue = {
    description: "",
    status: "",
    assignee: ""
  }
  
  showSavedMessage = false;

  constructor(private issuesApiService: IssuesApiService) { }

  ngOnInit(): void {
  }

  submitForm(): void {
    this.loading = true;
    this.issuesApiService.addIssue({ ...this.values })
    .subscribe(res => 
      {
        this.showSavedMessage = true;
        this.loading = false;
        console.log(res);}, 
      err => {
      console.log(err);
    });

  }
}
