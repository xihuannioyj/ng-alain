import { Component, Inject } from '@angular/core';
import { SettingsService, ALAIN_I18N_TOKEN } from '@delon/theme';
import { I18NService } from '@core/i18n/i18n.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'header-i18n',
  template: `
  <nz-dropdown>
    <div nz-dropdown>
      <i class="anticon anticon-edit"></i>
      {{ 'menu.lang' | translate}}
      <i class="anticon anticon-down"></i>
    </div>
    <ul nz-menu>
      <li nz-menu-item *ngFor="let item of langs"
        [nzSelected]="item.code === settings.layout.lang"
        (click)="change(item.code)">{{item.text}}</li>
    </ul>
  </nz-dropdown>
  `,
})
export class HeaderI18nComponent {
  langs: any[];

  constructor(
    public settings: SettingsService,
    @Inject(ALAIN_I18N_TOKEN) private i18n: I18NService,
    @Inject(DOCUMENT) private doc: any,
  ) {
    this.langs = this.i18n.getLangs();
  }

  change(lang: string) {
    this.i18n.use(lang);
    this.settings.setLayout('lang', lang);
    setTimeout(() => this.doc.location.reload(), 100);
  }
}
