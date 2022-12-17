import { Component, OnInit } from '@angular/core';
import { DataExperience } from 'src/app/consts/DataExperience.const';
import { DataMain } from 'src/app/consts/DataMain.const';
import { DataProjects } from 'src/app/consts/DataProjects.const';
import { DataStudies } from 'src/app/consts/DataStudies.const';
import { InitPage } from 'src/app/models/InitPage.model';
import { ObservableService } from 'src/app/services/observable/observable.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.sass']
})
export class ContentComponent implements OnInit {
  selectedPage$ = this.observableService.selectedPage$
  main = DataMain
  experience = DataExperience
  projects = DataProjects
  studies = DataStudies

  constructor(private observableService: ObservableService) { }

  ngOnInit(): void {
    this.selectedPage$.subscribe((selectedPage) => {
      this.goToTop()
    });
  }

  goToTop() {
    window.scroll({
      top: -1000,
      left: 0,
      behavior: 'smooth'
    });
  }
}
