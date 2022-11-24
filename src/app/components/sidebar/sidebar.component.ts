
import { Component, OnInit } from '@angular/core';
import { SidebarDataExperience } from 'src/app/consts/sidebarData.const';
import { InitPage } from 'src/app/models/InitPage.model';
import { ObservableService } from 'src/app/services/observable/observable.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass']
})
export class SidebarComponent implements OnInit {
  selectedPage$ = this.observableService.selectedPage$
  experience = SidebarDataExperience

  constructor(private observableService: ObservableService,) { }

  ngOnInit(): void {

  }

  changeSelected(page: string, subPage: string){
    let tempSelectedPage : InitPage = {
      page: page,
      subPage: subPage,
    };
    console.log("tempSelectedPage", tempSelectedPage)
    this.observableService.setPage(tempSelectedPage)
  }

}
