import { MokumokuFrontPage } from './app.po';

describe('mokumoku-front App', function() {
  let page: MokumokuFrontPage;

  beforeEach(() => {
    page = new MokumokuFrontPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
