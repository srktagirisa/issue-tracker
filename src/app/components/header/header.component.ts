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
  openIssuesPercentage: number = 0;

  constructor(private issuesApiService: IssuesApiService) { }

  ngOnInit(): void {

    this.issuesApiService.setTotalAndOpenIssues();
    this.issuesApiService.totalIssues.subscribe(newTotalIssues => {this.totalIssues = newTotalIssues});
    this.issuesApiService.totalOpenIssues.subscribe(newTotalOpenIssues => {this.totalOpenIssues = newTotalOpenIssues});
    this.issuesApiService.openIssuesPercentage.subscribe(newOpenIssuesPercentage => {this.openIssuesPercentage = newOpenIssuesPercentage});
  }
  
}
