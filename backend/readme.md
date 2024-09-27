- **dependencies**: 這個區塊包含應用程式在生產環境中運行所需的第三方模組。它們是核心運行時必要的模組。例如，Express 或 Mongoose 等框架、資料庫連接工具等。
- **devDependencies**: 這個區塊包含只在開發和測試環境中使用的模組，例如測試框架（如 Mocha、Jest）、打包工具（如 Webpack）、或代碼檢查工具（如 ESLint）。這些模組不會在生產環境中被使用。

```json
{
  "scripts": {
    "start": "node app.js",
    "test": "mocha",
    "testAndStart": "npm test && npm start"
  }
}
```
- `npm start` 會執行 `node app.js`
- `npm test` 會執行 `mocha` 來跑測試
- `npm testAndStart` 會執行 `npm test` 和 `npm start`

1. 新增 `.env` 檔案，裡面放環境變數，搭配 `dotenv` 套件，載入環境變數 (記得把 `.env` 加到 `.gitignore`)
2. `PORT=4000 node app.js` 也可以指定 port

應上傳的檔案：程式碼、配置文件（例如 `package.json`）、`README.md` 說明文件等核心項目文件。
應忽略的檔案：在 `.gitignore` 中設定不應上傳的檔案，如：
- `node_modules/`：這些依賴可通過 `package.json` 恢復，不需要上傳。
- `.env`：包含敏感資訊（如 API 金鑰、資料庫連接字串），不應公開上傳。
- 編譯過的文件或臨時文件（如 `dist/`、`build/`）。

- `cjs` + `require`，副檔名 `.js`、`.cjs` 就可以直接用了
- `esm` + `import`，副檔名 `.mjs` 或在 `package.json` 設定 `"type": "module"`

`localhost` 是一個預設的主機名稱，指向本機電腦，即運行程式的當前電腦的內部循環網路。使用 `localhost` 表示訪問本機服務，而不需要使用實際的網路地址或 IP。對於開發者來說，`localhost` 常用於測試應用程式或伺服器，因為它會在本地執行，而不需要與外部網路進行連接。

通常，`localhost` 對應的 IP 地址是 `127.0.0.1`，這是一個特殊的 loopback 地址，專門用於本地連線。當你在開發過程中啟動伺服器時，訪問 `http://localhost:PORT` 就能夠在瀏覽器中查看本地執行的應用。

`curl` 是一個用於發送和接收資料的命令行工具，它支援多種協議，包括 HTTP、HTTPS、FTP 等。`curl` 可以用來從命令行進行網路請求，測試 API、下載文件，甚至測試伺服器連接。

比如說 Postman 是圖形化的工具，`curl` 是命令列的工具，兩者都可以用來測試 API。而我通常會使用 `curl` 來測試端點的 latency，查看 DNS query time, TCP handshake time, TTFB, Total Response Time 等。`ping` 這個指令也可以測試延遲，但有的時候會被防火牆擋掉。

```bash
curl -o /dev/null -s -w %{time_namelookup}:"%{time_connect} %{time_starttransfer} %{time_total}" http://api.example.com
```
- `-o /dev/null`: 將輸出重定向到 `/dev/null`，表示不保存輸出內容。
- `-s`: 靜默模式，不顯示進度條或錯誤信息。
- `-w`: 格式化輸出，顯示各個時間段的值。
