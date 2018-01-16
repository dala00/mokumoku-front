import { browser, element, by } from 'protractor';

export class MokumokuFrontPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('.mdl-layout__header .mdl-layout-title')).getText();
  }
}
