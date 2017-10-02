import { TruffleTestPage } from './app.po';

describe('truffle-test App', () => {
  let page: TruffleTestPage;

  beforeEach(() => {
    page = new TruffleTestPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
