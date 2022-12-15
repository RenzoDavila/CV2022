import { Component, OnInit } from '@angular/core';
import { InitPage } from 'src/app/models/InitPage.model';
import { ObservableService } from 'src/app/services/observable/observable.service';

@Component({
  selector: 'app-text-box',
  templateUrl: './text-box.component.html',
  styleUrls: ['./text-box.component.sass']
})
export class TextBoxComponent implements OnInit {
  selectedPage$ = this.observableService.selectedPage$
  selectedPage: InitPage = {
    page: '',
    subPage: '',
    subPageItem: '',
    textBox: false,
  }

  constructor(private observableService: ObservableService,) { }

  ngOnInit(): void {
    this.selectedPage$.subscribe((selectedPage) => {
      this.selectedPage = selectedPage
    });
  }

  backPag() {
    let tempSelectedPage : InitPage = {
      page: this.selectedPage.page,
      subPage: this.selectedPage.subPage,
      subPageItem: this.selectedPage.subPageItem,
      textBox: false,
    };
    this.observableService.setPage(tempSelectedPage)
  }

}
