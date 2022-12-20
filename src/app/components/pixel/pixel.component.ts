import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
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
  tecInfoTag:string = ""
  tecInfoDescription:string[] = [""]
  language = this.translate.getBrowserLang()
  textBoxMessage = `text-sm-${this.language}-click`
  textBox:boolean = true
  textBoxClick:boolean = true
  timeout1:any
  timeout2:any
  timeout3:any
  timeout4:any
  @Output() message = new EventEmitter<string>();
  @Input()
  get externalMessage(): string {return this._externalMessage}
  set externalMessage(value: any){
    this.changeTextBoxMessage(value)
    console.log("value", value)
    this._externalMessage = ""
  }
  private _externalMessage:any

  constructor(private observableService: ObservableService, public translate: TranslateService) { }

  ngOnInit(): void {
    let randomVar = Math.floor(Math.random() * 2);
    if(randomVar == 0){
      this.working = false
    }else{
      this.working = true
    }

    this.selectedPage$.subscribe((selectedPage) => {
      if(this.selectedPage.page !== selectedPage.page || this.selectedPage.subPage !== selectedPage.subPage || this.selectedPage.subPageItem !== selectedPage.subPageItem){
        this.textBoxClick = true
      }
      this.selectedPage = selectedPage
      this.decorationPagination = 0
      this.decorationPag = 0
      this.decoration = []
      this.screen = this.urlScreen + 'screen-main-main.svg'
      this.subScreen = this.urlScreen + 'sub-screen-main-main.svg'
      this.getDecorations();
      this.getScreens();
      this.changeTextBoxMessage();
    });

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.language = event.lang;
      this.changeTextBoxMessage();
    });
  }


  changeTextBoxMessage(message?: string){
    clearTimeout(this.timeout1);
    clearTimeout(this.timeout2);
    clearTimeout(this.timeout3);
    clearTimeout(this.timeout4);
    if(this.textBoxClick){
      this.textBox = true
      this.textBoxMessage = `text-${this.language}-click`;
    }else{
      switch (message) {
        case 'interesting':
          this.textBox = true
          this.textBoxMessage = `text-${this.language}-interesting`;
          this.timeout1 = setTimeout(() => this.textBox = false, 6000);
          break;
        case 'angular':
          this.textBox = true
          this.textBoxMessage = `text-${this.language}-angular`;
          this.timeout1 = setTimeout(() => this.textBox = false, 6000);
          break;
        case 'infoless':
          this.textBox = true;
          this.textBoxMessage = `text-${this.language}-infoless`;
          this.timeout1 = setTimeout(() => this.textBoxMessage = `text-ellipsis`, 6000);
          this.timeout2 = setTimeout(() => this.textBoxMessage = `text-${this.language}-embarrassing`, 12000);
          this.timeout3 = setTimeout(() => this.textBox = false, 18000);
          break;
        // default:

        //   break;
      }
    }
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
    this.textBox = false
    this.textBoxClick = false
    this.message.emit("none");
  }

  closeTecInfo(tec?:string) {
    this.tecInfo = false
    switch (tec) {
      case 'angular':
        console.log("angular")
        this.changeTextBoxMessage('angular');
        break;
      default:
        console.log("interesting")
        this.changeTextBoxMessage('interesting');
        break;
    }
  }

  openTecInfo(name:string, description:string[], tag:string) {
    this.tecInfoName = name
    this.tecInfoTag = tag
    this.tecInfoDescription = description
    this.tecInfo = true
  }
}
