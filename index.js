import * as vscode from 'vscode';
import compact from './src/compact.js';

export function activate(context) {
  console.log('JSON Reduce extension is now active!');

  let disposable = vscode.commands.registerCommand('json-reduce.run', function () {
    // Read file content from the active text editor
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showErrorMessage('No active text editor found.');
        return;
    }

    // Check if the file is a JSON file
    if (editor.document.languageId !== 'json') {
        vscode.window.showErrorMessage('The active file is not a JSON file.');
        return;
    }

    // Parse the JSON content
    let jsonContent;
    try {
        jsonContent = JSON.parse(editor.document.getText());
    }
    catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        vscode.window.showErrorMessage(`Failed to parse JSON: ${message}`);
        return;
    }

    // Reduce the JSON content
    const config = vscode.workspace.getConfiguration('jsonReduce');
    const stringLimit = config.get('stringLimit', 300);
    const arrayLimit = config.get('arrayLimit', 3);

    const reducedContent = compact(jsonContent, {stringLimit, arrayLimit});

    // Convert back to JSON string
    const reducedJsonString = JSON.stringify(reducedContent, null, 2);

    // Replace the content in the active text editor
    editor.edit(editBuilder => {
        editBuilder.replace(new vscode.Range(editor.document.positionAt(0), editor.document.positionAt(editor.document.getText().length)), reducedJsonString);
    });

    vscode.window.showInformationMessage('JSON file reduced for readability.');
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
