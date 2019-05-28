module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const constants = __webpack_require__(1);
const vscode = __webpack_require__(2);
const cryptosb_1 = __webpack_require__(3);
let cryptosb;
function activate(context) {
    cryptosb = new cryptosb_1.Cryptosb(vscode.workspace.getConfiguration());
    cryptosb.activate();
    context.subscriptions.push(vscode.commands.registerCommand(constants.CMD_REFRESH, () => cryptosb.refresh()));
}
exports.activate = activate;
function deactivate() {
    cryptosb.clean();
}
exports.deactivate = deactivate;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.BASE_URL_API = 'https://min-api.cryptocompare.com/data/price';
exports.BASE_URL_PAGE = 'https://www.cryptocompare.com/coins/';
exports.CMD_REFRESH = 'extension.refresh';
exports.EXTNAME = 'vscode-cryptosb';


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("vscode");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants = __webpack_require__(1);
const utils = __webpack_require__(4);
const vscode = __webpack_require__(2);
class Cryptosb {
    constructor(config, cs = new Map()) {
        this.config = config;
        this.currencies = cs;
    }
    getCurrencies() {
        return this.currencies;
    }
    activate() {
        this.refresh();
        const configRefresh = this.config.get(`${constants.EXTNAME}.refreshInterval`);
        setInterval(this.refresh, (configRefresh ? configRefresh : 60000));
    }
    refresh() {
        const coins = this.config.get(`${constants.EXTNAME}.currencies`, Array()).map((c) => c.toUpperCase());
        if (!utils.arrEq(coins, Array.from(this.currencies.keys()))) {
            this.clean();
            coins.forEach((coin, i) => {
                const item = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, coins.length - i);
                item.text = `${coin}: `;
                item.show();
                this.currencies.set(coin, item);
            });
        }
        this.refreshPrices(coins, this.config.get(`${constants.EXTNAME}.fiat`, String).toString().toUpperCase());
    }
    clean() {
        this.currencies.forEach((currency) => {
            currency.hide();
            currency.dispose();
        });
        this.currencies = new Map();
    }
    refreshPrices(coins, fiat) {
        return __awaiter(this, void 0, void 0, function* () {
            coins.forEach((coin) => {
                utils.httpGet(`${constants.BASE_URL_API}?fsym=${coin}&tsyms=${fiat}`).then((resp) => {
                    const currency = this.currencies.get(coin);
                    if (currency) {
                        currency.text = `${coin.toUpperCase()}: ${JSON.parse(resp)[fiat].toString()} ${fiat}`;
                    }
                }).catch((e) => console.error(e));
            });
        });
    }
}
exports.Cryptosb = Cryptosb;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const https = __webpack_require__(5);
function arrEq(arr1, arr2) {
    return arr1.length === arr2.length && arr1.every((elem, i) => elem === arr2[i]);
}
exports.arrEq = arrEq;
function httpGet(url) {
    return new Promise((resolve, reject) => {
        //console.log(`GET ${url}`);
        https.get(url, (resp) => {
            let data = '';
            resp.on('data', (elem) => data += elem);
            resp.on('end', () => {
                if (resp.statusCode === 200) {
                    resolve(data);
                }
                else {
                    reject(`[${resp.statusCode}] GET request failed ${url}`);
                }
            });
        });
    });
}
exports.httpGet = httpGet;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("https");

/***/ })
/******/ ]);
//# sourceMappingURL=extension.js.map