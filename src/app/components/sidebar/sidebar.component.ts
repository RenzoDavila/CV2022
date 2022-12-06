
import { Component, OnInit } from '@angular/core';
import { DataExperience } from 'src/app/consts/DataExperience.const';
import { DataMain } from 'src/app/consts/DataMain.const';
import { DataProjects } from 'src/app/consts/DataProjects.const';
import { DataStudies } from 'src/app/consts/DataStudies.const';
import { InitPage } from 'src/app/models/InitPage.model';
import { ObservableService } from 'src/app/services/observable/observable.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass']
})
export class SidebarComponent implements OnInit {
  selectedPage$ = this.observableService.selectedPage$
  main = DataMain
  experience = DataExperience
  projects = DataProjects
  studies = DataStudies

  constructor(private observableService: ObservableService) { }

  ngOnInit(): void {

  }

  changeSelected(page: string, subPage: string, subPageItem: string){
    let tempSelectedPage : InitPage = {
      page: page,
      subPage: subPage,
      subPageItem: subPageItem,
    };
    this.observableService.setPage(tempSelectedPage)
  }

}
