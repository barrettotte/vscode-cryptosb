import * as assert from 'assert';
import * as vscode from 'vscode';
import { Cryptosb } from "../cryptosb";

let config: vscode.WorkspaceConfiguration = vscode.workspace.getConfiguration();
let currencies: Map<string, vscode.StatusBarItem>;

// Defines a Mocha test suite to group tests of similar kind together
suite("Cryptosb Tests", function () {
  
  test("should create object and activate", () => {
    let cryptosb: Cryptosb = new Cryptosb(config);
    cryptosb.activate();
  });

  test("should clean status bar", () => {
    currencies = new Map<string, vscode.StatusBarItem>();
    const item: vscode.StatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 0);
    item.text = "BTC";
    item.show();
    currencies.set("BTC", item);
    let cryptosb: Cryptosb = new Cryptosb(config, currencies);
    cryptosb.activate();
    cryptosb.clean();
    assert.equal(cryptosb.getCurrencies().keys.length, 0);
  });
});