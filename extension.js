// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
//插件激活
function activate(context) {
    //注册命令 命令名必须与package.json中的command保持一致
    const removeLog = vscode.commands.registerCommand('editor.removeLog', function () {
        // vscode窗口对象
        const global = vscode.window;
        //vscode当前编辑页面的editor对象
        const editor = global.activeTextEditor;
        // 如果不存在editor，就返回
        if (!editor)
            return;
        // vscode文档对象
        const document = editor.document
        //获取用户选中的文本信息
        let txt = document.getText(editor.selection);
        //对文本信息进行正则替换，去掉console.xxx
        txt = txt.replace(/\s+console.(log|info|error|table)\((.*)\);?/g, '');
        //使替换后的文本在编辑器里生效
        editor.edit((edit) => {
            // 获取editBuilder实例，进行真正的替换
            edit.replace(editor.selection, txt);
        });
        // 弹出信息，提示用户删除成功
        global.showInformationMessage('已删除console')
    });

    const toUpperCaseSeparate = vscode.commands.registerCommand('editor.toUpperCaseSeparate', function () {
        // vscode窗口对象
        const global = vscode.window;
        //vscode当前编辑页面的editor对象
        const editor = global.activeTextEditor;
        // 如果不存在editor，就返回
        if (!editor)
            return;
        // vscode文档对象
        const document = editor.document
        //获取用户选中的文本信息
        let txt = document.getText(editor.selection);
        txt = txt.replace(/\s/g,'_');
        txt = txt.replace(/\B([A-Z\s])/g, '_$1').toUpperCase();
        //使替换后的文本在编辑器里生效
        editor.edit((edit) => {
            // 获取editBuilder实例，进行真正的替换
            edit.replace(editor.selection, txt);
        });
    })
    // 订阅 注册的命令
    context.subscriptions.push(removeLog, toUpperCaseSeparate);
}


// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
