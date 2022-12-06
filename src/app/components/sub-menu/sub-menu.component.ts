import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { InitPage } from 'src/app/models/InitPage.model';
import { ObservableService } from 'src/app/services/observable/observable.service';

@Component({
  selector: 'app-sub-menu',
  templateUrl: './sub-menu.component.html',
  styleUrls: ['./sub-menu.component.sass']
})
export class SubMenuComponent implements OnInit {
  selectedPage$ = this.observableService.selectedPage$
  selectedPage: InitPage = {
    page: '',
    subPage: '',
    subPageItem: ''
  }
  menuLength = 0
  menuPagination = 0
  menuPag = 0
  menu: any = []
  subMenuExist = false
  subMenuLength = 0
  subMenuPagination = 0
  subMenuPag = 0
  subMenu: any = []
  selectedSubPage = ''
  @Input() main: any
  @Input() experience: any
  @Input() projects: any
  @Input() studies: any

  constructor(private observableService: ObservableService,) { }

  ngOnInit(): void {
    this.selectedPage$.subscribe((selectedPage) => {
      console.log("selectedPage", selectedPage)
      this.selectedPage = selectedPage
      this.menuPagination = 0
      this.menuPag = 0
      this.menu = []
      this.subMenuExist = false
      this.subMenuLength = 0
      this.subMenuPagination = 0
      this.subMenuPag = 0
      this.subMenu = []
      this.selectedSubPage = ''
      this.getMenu();
    });
  }

  getMenu() {
    let menuList: any[] = []
    let menuTemp: any[] = []

    if (this.selectedPage.page == "main") {
      menuList = this.main
    }
    if (this.selectedPage.page == "experience") {
      menuList = this.experience
    }
    if (this.selectedPage.page == "projects") {
      menuList = this.projects
    }
    if (this.selectedPage.page == "studies") {
      menuList = this.studies
    }

    this.menuLength = menuList.length

    let cont = 0
    let tempList: any[] = []
    menuList.map((item: any) => {
      tempList.push(item)
      cont = cont + 1
      if (cont == 4) {
        menuTemp.push(tempList)
        tempList = []
        cont = 0
      }
    });
    menuTemp.push(tempList)

    this.menuPagination = menuTemp.length - 1
    this.menu = menuTemp
  }

  itemSelected(multiple: boolean, page: string, subPage: string, subPageItem: string) {
    if (multiple) {
      this.subMenuExist = true
      this.selectedSubPage = subPage
      this.getSubMenu(subPage);
    } else {
      let tempSelectedPage: InitPage = {
        page: page,
        subPage: subPage,
        subPageItem: subPageItem,
      };
      this.observableService.setPage(tempSelectedPage)
    }
  }

  changePag(change: number) {
    this.menuPag = this.menuPag + change
  }

  getSubMenu(subPage: string){
    let subMenuList: any[] = []
    let subMenuTemp: any[] = []

    subMenuList = this.menu[this.menuPag].filter( (item: any ) => item.tag === subPage)[0].subData;

    console.log("subMenuList", subMenuList)

    this.subMenuLength = subMenuList.length

    let cont = 0
    let tempList: any[] = []
    subMenuList.map((item: any) => {
      tempList.push(item)
      cont = cont + 1
      if (cont == 4) {
        subMenuTemp.push(tempList)
        tempList = []
        cont = 0
      }
    });
    subMenuTemp.push(tempList)

    this.subMenuPagination = subMenuTemp.length - 1
    this.subMenu = subMenuTemp
  }

  changeSubPag(change: number) {
    this.subMenuPag = this.subMenuPag + change
  }

}
