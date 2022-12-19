import { Component, Input, OnInit } from '@angular/core';
import { DataTechnologies } from 'src/app/consts/DataTechnologies.const';
import { InitPage } from 'src/app/models/InitPage.model';
import { ObservableService } from 'src/app/services/observable/observable.service';

@Component({
  selector: 'app-pixel',
  templateUrl: './pixel.component.html',
  styleUrls: ['./pixel.component.sass']
})
export class PixelComponent implements OnInit {
  selectedPage$ = this.observableService.selectedPage$
  selectedPage: InitPage = {
    page: '',
    subPage: '',
    subPageItem: '',
    textBox: false,
  }
  decorationLength = 0
  decorationPagination = 0
  decorationPag = 0
  decoration: any = []
  @Input() main: any
  @Input() experience: any
  @Input() projects: any
  @Input() studies: any
  technologies = DataTechnologies
  urlScreen = 'assets/icon/screens/'
  screen = this.urlScreen + 'screen-main-main.svg'
  subScreen = this.urlScreen + 'sub-screen-main-main.svg'
  working = true
  tecInfo = false
  tecInfoName:string = ""
  tecInfoDescription:string[] = [""]

  constructor(private observableService: ObservableService,) { }

  ngOnInit(): void {
    let randomVar = Math.floor(Math.random() * 2);
    if(randomVar == 0){
      this.working = false
    }else{
      this.working = true
    }

    this.selectedPage$.subscribe((selectedPage) => {
      console.log("selectedPage",selectedPage)
      this.selectedPage = selectedPage
      this.decorationPagination = 0
      this.decorationPag = 0
      this.decoration = []
      this.screen = this.urlScreen + 'screen-main-main.svg'
      this.subScreen = this.urlScreen + 'sub-screen-main-main.svg'
      this.getDecorations();
      this.getScreens();
    });
  }

  getScreens() {
    this.screen = this.urlScreen + 'screen-' + this.selectedPage.page + '-' + this.selectedPage.subPage + '.svg'
    if(this.selectedPage.subPage != this.selectedPage.subPageItem){
      this.subScreen = this.urlScreen + 'sub-screen-' + this.selectedPage.page + '-' + this.selectedPage.subPageItem + '.svg'
    }
  }

  getDecorations() {
    let tecTemp: any[] = []
    let tecList: any = {}
    let viewTemp: any[] = []
    let viewList: any[] = []

    switch (this.selectedPage.page) {
      case "main":
        tecTemp = this.main
        break;
      case "experience":
        tecTemp = this.experience
        break;
      case "projects":
        tecTemp = this.projects
        break;
      case "studies":
        tecTemp = this.studies
        break;
    }

    const getTec = tecTemp.find((x:any) => x.tag == this.selectedPage.subPage)
    tecList = getTec.technologies

    if (this.selectedPage.subPage != this.selectedPage.subPageItem) {
      const setSubTec = (getTec.subData).find((x:any) => x.tag == this.selectedPage.subPageItem)
      tecList = setSubTec.technologies
    }

    let tecArray: any[] = []
    if(tecList.all){
      viewList = this.technologies
    }else{
      (tecList.used).map((technology:any)=>{
        tecArray.push(this.technologies.find((x:any) => x.id == technology))
      });
      viewList = tecArray
    }

    this.decorationLength = viewList.length

    let cont = 0
    let tempList: any[] = []

    viewList.map((item: any) => {
      tempList.push(item)
      cont = cont + 1
      if (cont == 16) {
        viewTemp.push(tempList)
        tempList = []
        cont = 0
      }
    });

    if(tempList.length != 0){
      viewTemp.push(tempList)
    }

    this.decorationPagination = viewTemp.length - 1
    this.decoration = viewTemp
  }

  changePag(change: number) {
    this.decorationPag = this.decorationPag + change
  }

  openTextBox(){
    let tempSelectedPage : InitPage = {
      page: this.selectedPage.page,
      subPage: this.selectedPage.subPage,
      subPageItem: this.selectedPage.subPageItem,
      textBox: true,
    };
    this.observableService.setPage(tempSelectedPage)
  }

  closeTecInfo() {
    this.tecInfo = false
  }

  openTecInfo(name:string, description:string[]) {
    this.tecInfoName = name
    this.tecInfoDescription = description
    this.tecInfo = true
  }
}
