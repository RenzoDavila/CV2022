import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { InitPage } from 'src/app/models/InitPage.model';

const initPage: InitPage = {
  page: 'main',
  subPage: 'main',
  subPageItem: 'main',
  textBox: false,
};

@Injectable({
  providedIn: 'root'
})

export class ObservableService {
  private page$ = new BehaviorSubject<InitPage>(initPage);

  constructor() { };

  get selectedPage$(): Observable<InitPage> {
    return this.page$.asObservable();
  }

  setPage(page: InitPage): void {
    this.page$.next(page);
  }
}
