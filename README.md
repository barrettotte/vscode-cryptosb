# vscode-cryptosb


A basic VS Code extension for showing cryptocurrency prices in the status bar using CryptoCompare min API


![Visual Studio Marketplace Version](https://img.shields.io/visual-studio-marketplace/v/barrettotte.vscode-cryptosb.svg)
![Visual Studio Marketplace Downloads](https://img.shields.io/visual-studio-marketplace/d/barrettotte.vscode-cryptosb.svg)
![Visual Studio Marketplace Rating](https://img.shields.io/visual-studio-marketplace/r/barrettotte.vscode-cryptosb.svg)
![GitHub](https://img.shields.io/github/license/barrettotte/vscode-cryptosb.svg)


https://marketplace.visualstudio.com/items?itemName=barrettotte.vscode-cryptosb


<!--[![pipeline status](https://gitlab.com/barrettotte/vscode-cryptosb/badges/master/pipeline.svg)](https://gitlab.com/barrettotte/vscode-cryptosb/commits/master)-->


![screenshot](https://raw.githubusercontent.com/barrettotte/vscode-cryptosb/master/screenshots/screenshot.png?token=ADXGMX4OIDZ344H5I7T42D245XH52)


## Configuration - settings.json
```JSON
{
  "vscode-cryptosb.currencies": ["BTC", "ETH", "LTC"],
  "vscode-cryptosb.fiat": "USD",
  "vscode-cryptosb.refreshInterval": 60000
}
```


## Development
* Setup
  * ```npm install -g yo generator-code vscode```
  * ```npm install --save-dev ts-loader```
  * ```npm install -g vsce```
  * ```yo code```
* Debugging
  * F5 with **launch.json** configured
* Compile ```tsc -p ./``` or ```tsc -watch -p ./```


## Deployment
* Webpack ```webpack --mode none```
* ```vsce package```
* ```vsce create-publisher name```
* ```vsce publish minor```


## CryptoCompare min API Examples
* ```curl "https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD"```
* ```curl "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=JPY"```



## References
* CryptoCompare https://www.cryptocompare.com/
* Currency symbol list https://www.easymarkets.com/int/learn-centre/discover-trading/currency-acronyms-and-abbreviations/
* Bundling an extension https://code.visualstudio.com/api/working-with-extensions/bundling-extension
* VS Code Extension Tutorial https://code.visualstudio.com/api/get-started/your-first-extension
