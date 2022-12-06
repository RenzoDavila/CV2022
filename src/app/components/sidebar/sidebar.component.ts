
import { Component, Input, OnInit } from '@angular/core';
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
  selectedPage: InitPage = {
    page: '',
    subPage: '',
    subPageItem: ''
  }
  @Input() main: any
  @Input() experience: any
  @Input() projects: any
  @Input() studies: any
  menu: any = []

  constructor(private observableService: ObservableService) { }

  ngOnInit(): void {
    this.selectedPage$.subscribe((selectedPage) => {
      this.selectedPage = selectedPage
      this.menu = []
      this.getMenu();
    });
  }

  getMenu() {
    if (this.selectedPage.page == "main") {
      this.menu = this.main
    }
    if (this.selectedPage.page == "experience") {
      this.menu = this.experience
    }
    if (this.selectedPage.page == "projects") {
      this.menu = this.projects
    }
    if (this.selectedPage.page == "studies") {
      this.menu = this.studies
    }
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
