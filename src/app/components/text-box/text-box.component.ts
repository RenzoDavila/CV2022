import { Component, OnInit } from '@angular/core';
import { InfoExperience } from 'src/app/consts/InfoExperience.const';
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
  infoExperience = InfoExperience
  info:any = []
  whitOutInfo:boolean = false
  imageNum: number = 1

  constructor(private observableService: ObservableService,) { }

  ngOnInit(): void {
    this.selectedPage$.subscribe((selectedPage) => {
      this.selectedPage = selectedPage
      this.getInfo()
    });
  }

  getInfo(){
    const getInfo = this.infoExperience.find((x:any) => x.id == this.selectedPage.subPageItem)
    if(getInfo == undefined){
      this.whitOutInfo = true
    }else{
      this.whitOutInfo = false
      this.info = getInfo
    }
  }

  close() {
    let tempSelectedPage : InitPage = {
      page: this.selectedPage.page,
      subPage: this.selectedPage.subPage,
      subPageItem: this.selectedPage.subPageItem,
      textBox: false,
    };
    this.observableService.setPage(tempSelectedPage)
    this.goToBottom()
  }

  goToBottom() {
    var limit = (Math.max( document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight))
    window.scroll({
      top: limit,
      left: 0,
      behavior: 'smooth'
    });
  }

  arrowClick(sum: number){
    this.imageNum = this.imageNum + sum

    if (this.imageNum > this.info.images) {
      this.imageNum = 1
    }else if (this.imageNum < 1){
      this.imageNum = this.info.images
    }
  }

}
