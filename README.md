# vscode-cryptosb

[![pipeline status](https://gitlab.com/barrettotte/vscode-cryptosb/badges/master/pipeline.svg)](https://gitlab.com/barrettotte/vscode-cryptosb/commits/master)



A basic VS Code extension for showing cryptocurrency prices in the status bar using CryptoCompare min API


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
  * ```npm i --save-dev ts-loader```
  * ```yo code```
* Debugging
  * F5 with **launch.json** configured
* Compile ```tsc -p ./``` or ```tsc -watch -p ./```

## Deployment
* Webpack ```webpack --mode none```


## CryptoCompare min API Examples
* ```curl "https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD"```
* ```curl "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=JPY"```



## References
* CryptoCompare https://www.cryptocompare.com/
* Currency symbol list https://www.easymarkets.com/int/learn-centre/discover-trading/currency-acronyms-and-abbreviations/
* Bundling an extension https://code.visualstudio.com/api/working-with-extensions/bundling-extension
* VS Code Extension Tutorial https://code.visualstudio.com/api/get-started/your-first-extension