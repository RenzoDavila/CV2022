import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { InitPage } from 'src/app/models/InitPage.model';
import { AppService } from 'src/app/services/app/app.service';
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

  constructor(private observableService: ObservableService, public translate: TranslateService) {}

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

  download(){
    AppService.downloadFile(this.translate.currentLang)
  }

  switchLang(lang: string) {
    this.translate.use(lang);
  }

}
