import { Component, OnInit } from '@angular/core';
import { InitPage } from 'src/app/models/InitPage.model';
import { ObservableService } from 'src/app/services/observable/observable.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {
  selectedPage: InitPage = {
    page: 'main',
    subPage: 'first',
    subPageItem: 'first'
  };

  constructor(private observableService: ObservableService) {}

  ngOnInit(): void {
    this.observableService.selectedPage$.subscribe((page:InitPage) => this.selectedPage = page)
  }

  changeSelected(page: string){
    let tempSelectedPage : InitPage = {
      page: page,
      subPage: 'first',
      subPageItem: 'first'
    };
    // this.selectedPage.page = page;
    this.observableService.setPage(tempSelectedPage)
  }

}
