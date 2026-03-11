// ライブラリが読み込まれたかチェック
function checkReady() {
    if (window.ts) {
        document.getElementById('status').innerText = "準備完了！入力してください。";
        runConvert();
    } else {
        setTimeout(checkReady, 500); // 0.5秒ごとに再確認
    }
}

function runConvert() {
    if (!window.ts) return;

    const tsCode = document.getElementById('tsInput').value;
    const outputArea = document.getElementById('jsOutput');
    const status = document.getElementById('status');

    try {
        // transpileModule を使用 (ブラウザ用)
        const result = ts.transpileModule(tsCode, {
            compilerOptions: { 
                module: ts.ModuleKind.CommonJS, 
                target: ts.ScriptTarget.ES2015 
            }
        });
        outputArea.value = result.outputText;
        status.innerText = "変換成功！";
        status.style.color = "#4ec9b0";
    } catch (e) {
        status.innerText = "エラー: " + e.message;
        status.style.color = "#f44747";
    }
}

// 読み込み完了時の処理
window.onload = () => {
    checkReady();
    // 入力イベントの監視を追加
    document.getElementById('tsInput').addEventListener('input', runConvert);
};
