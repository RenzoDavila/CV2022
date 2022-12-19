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
    subPage: 'main',
    subPageItem: 'main',
    textBox: false,
  };
  languaje:string = 'Español'

  constructor(private observableService: ObservableService) {}

  ngOnInit(): void {
    this.observableService.selectedPage$.subscribe((page:InitPage) => this.selectedPage = page)
  }

  changeSelected(page: string, subPage:string){
    let tempSelectedPage : InitPage = {
      page: page,
      subPage: subPage,
      subPageItem: subPage,
      textBox: false,
    };
    this.observableService.setPage(tempSelectedPage)
  }

  downloadCV(){
    console.log("Estamos Descargando el CV")
  }

  changeLanguage(lang: string){
    switch (lang) {
      case 'ENG':
        this.languaje = 'English'
      break;
      case 'ESP':
        this.languaje = 'Español'
      break;
    }
  }

}
