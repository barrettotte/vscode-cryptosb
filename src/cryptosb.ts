import * as constants from './constants';
import * as utils from './utils';
import * as vscode from 'vscode';

export class Cryptosb{

  private config: vscode.WorkspaceConfiguration;
  private currencies: Map<string, vscode.StatusBarItem>;

  constructor(config: vscode.WorkspaceConfiguration, 
    cs: Map<string, vscode.StatusBarItem> = new Map<string, vscode.StatusBarItem>()
  ){
    this.config = config;
    this.currencies = cs;
  }

  public getCurrencies(): Map<string, vscode.StatusBarItem>{
    return this.currencies;
  }

  public activate(): void{
    this.refresh();
    const configRefresh: number|undefined = this.config.get(`${constants.EXTNAME}.refreshInterval`);
    setInterval(this.refresh, (configRefresh ? configRefresh : 60000));
  }

  public refresh(): void {
    const coins: Array<string> = this.config.get(`${constants.EXTNAME}.currencies`, Array<string>()).map(
      (c: string) => c.toUpperCase()
    );
    if(!utils.arrEq(coins, Array.from(this.currencies.keys()))){
      this.clean();
      coins.forEach((coin: string, i: number) => {
        const item: vscode.StatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, coins.length-i);
        item.text = `${coin}: `;
        item.show();
        this.currencies.set(coin, item);
      });
    }
    this.refreshPrices(coins, this.config.get(`${constants.EXTNAME}.fiat`, String).toString().toUpperCase());
  }

  public clean(): void {
    this.currencies.forEach((currency: vscode.StatusBarItem) => {
      currency.hide();
      currency.dispose();
    });
    this.currencies = new Map<string, vscode.StatusBarItem>();
  }

  public async refreshPrices(coins: string[], fiat: string): Promise<void> {
    coins.forEach((coin: string) => {
      utils.httpGet(`${constants.BASE_URL_API}?fsym=${coin}&tsyms=${fiat}`).then((resp: string) => {
        const currency: vscode.StatusBarItem|undefined = this.currencies.get(coin);
        if(currency){
          currency.text = `${coin.toUpperCase()}: ${JSON.parse(resp)[fiat].toString()} ${fiat}`;
        }
      }).catch((e: any) => console.error(e));
    });
  }
}