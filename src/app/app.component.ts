import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  constructor(public translate: TranslateService) {
    translate.addLangs(['es', 'en']);
    const lang = translate.getBrowserLang()
    if(lang !== 'es' && lang !== 'en'){
      translate.setDefaultLang('en');
      translate.use('en')
    }else{
      translate.setDefaultLang(lang);
      translate.use(lang)
    }
  }

  title = 'CV2022';
}
