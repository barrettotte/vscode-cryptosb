import * as constants from './constants';
import * as vscode from 'vscode';
import { Cryptosb } from './cryptosb';

let cryptosb: Cryptosb;

export function activate(context: vscode.ExtensionContext) {
  cryptosb = new Cryptosb(vscode.workspace.getConfiguration());
  cryptosb.activate();
  context.subscriptions.push(vscode.commands.registerCommand(constants.CMD_REFRESH, () => cryptosb.refresh()));
}

export function deactivate() {
  cryptosb.clean();
}