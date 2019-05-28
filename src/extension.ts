import * as vscode from 'vscode';
import * as https from 'https';

let currencies: Map<string, vscode.StatusBarItem>;
const EXTNAME: string = 'vscode-cryptosb';
const CMD_REFRESH = 'extension.refresh';
const BASE_URL = 'https://min-api.cryptocompare.com/data/price';

export function activate(context: vscode.ExtensionContext) {
  currencies = new Map<string, vscode.StatusBarItem>();
  refresh();
  const configRefresh: number|undefined = vscode.workspace.getConfiguration().get(`${EXTNAME}.refreshInterval`);
  setInterval(refresh, (configRefresh ? configRefresh : 60000));
  context.subscriptions.push(vscode.commands.registerCommand(CMD_REFRESH, () => refresh()));
}

export function deactivate() {
  clean();
}

function refresh(): void {
  const config: vscode.WorkspaceConfiguration = vscode.workspace.getConfiguration();
  const coins: Array<string> = config.get(`${EXTNAME}.currencies`, Array<string>()).map(c => c.toUpperCase()).slice(0,3);
  if (!arrEq(coins, Array.from(currencies.keys()))){
    clean();
    coins.forEach((coin, i) => {
      const item: vscode.StatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, coins.length-i);
      item.text = `${coin}: $ `;
      item.show();
      currencies.set(coin, item);
    });
  }
  refreshPrices(coins, config.get('vscode-cryptosb.fiat', String).toString().toUpperCase());
}

function arrEq(arr1: any[], arr2: any[]): boolean {
  return arr1.length === arr2.length && arr1.every((elem, i) => elem === arr2[i]);
}

function clean(): void {
  currencies.forEach(currency => {
    currency.hide();
    currency.dispose();
  });
  currencies = new Map<string, vscode.StatusBarItem>();
}

async function refreshPrices(coins: string[], fiat: string): Promise<void> {
  coins.forEach(coin => {
    httpGet(`${BASE_URL}?fsym=${coin}&tsyms=${fiat}`).then(resp => {
      let currency: vscode.StatusBarItem|undefined = currencies.get(coin);
      if(currency){
        currency.text = `${coin.toUpperCase()}: ${JSON.parse(resp)[fiat].toString()} ${fiat}`
      }
    }).catch(e => console.error(e));
  });
}

function httpGet(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    //console.log(`GET ${url}`);
    https.get(url, resp => {
      let data: string = '';
      resp.on('data', elem => data += elem);
      resp.on('end', () => {
        if(resp.statusCode === 200){
          resolve(data);
        } else{
          reject(`[${resp.statusCode}] GET request failed ${url}`);
        }
      });
    });
  });
}