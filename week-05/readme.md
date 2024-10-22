1. 我的網址：https://www.wenchang.dev 和 https://wenchang.dev

更新 nginx.conf 的 server block
```nginx
server {
    listen 443 ssl;
    server_name wenchang.dev www.wenchang.dev;

    # SSL 憑證來自 ZeroSSL
    ssl_certificate /etc/nginx/ssl/certificate.crt;
    ssl_certificate_key /etc/nginx/ssl/private.key;
    ssl_trusted_certificate /etc/nginx/ssl/ca_bundle.crt;

    # 推薦的 SSL 協議和加密套件
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;
    ssl_ciphers "ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384";

    # 可選的安全功能
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

    # 反向代理到 Express 伺服器
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

# HTTP 到 HTTPS 的重定向
server {
    listen 80;
    server_name wenchang.dev www.wenchang.dev;

    location / {
        return 301 https://$host$request_uri;
    }
}
```

2. cloudflare，之前就先買好的。
3. **A 記錄是什麼？**

A 記錄（A Record）是 DNS 中的一種記錄類型，用來將域名（如 `example.com`）映射到對應的 IPv4 地址。客戶端通過查詢 A 記錄來獲取伺服器的 IP 地址，以便與之進行通信。A 記錄將域名轉換為機器可讀的 IP 地址，便於互聯網訪問。

4. **NS 記錄是什麼？**

NS 記錄（Name Server Record）是 DNS 中的一種記錄類型，用於指定管理某個域名的 DNS 伺服器。它告訴查詢者應該向哪個 DNS 伺服器發送查詢請求來獲取該域名的其他記錄（如 A 記錄或 MX 記錄）。NS 記錄通常用於將域名指向特定的 DNS 提供商或自建的 DNS 伺服器。

5. **Domain Name vs FQDN vs URL 這三者分別為何？**

- **Domain Name（域名）：** 域名是互聯網中的唯一名稱，代表某個網站或服務，例如 `example.com`。它是由頂級域名（TLD）和子域名構成的，並由 DNS 系統解析為 IP 地址。

- **FQDN（完全限定域名）：** 完全限定域名（Fully Qualified Domain Name）是域名的完整形式，包括所有層級的子域和頂級域名。例如，`www.example.com.` 是一個 FQDN，其中末尾的點是根域（root domain）的標誌，表示 FQDN 的結尾。FQDN 唯一標識互聯網上的特定伺服器。

- **URL（統一資源定位符）：** URL 是一種更完整的網絡資源地址，它不僅包括域名，還可能包含協議（如 `http://`、`https://`）、路徑、端口號、查詢參數等。例如，`https://www.example.com/path?query=123` 是一個 URL，完整描述了如何訪問特定的資源。

6. **為什麼應該要為網站加上憑證？而不是直接用 HTTP 就好？**

為網站加上 SSL/TLS 憑證（即使用 HTTPS 而不是 HTTP）有多個重要原因：

- **數據加密：** HTTPS 使用 SSL/TLS 對通信進行加密，確保在客戶端和伺服器之間傳輸的數據不會被第三方截獲和讀取。這對保護用戶隱私和敏感信息（如登錄憑證、支付信息等）至關重要。

- **身份驗證：** SSL/TLS 憑證通過驗證伺服器的身份，防止用戶訪問虛假的、惡意的網站。它可以幫助建立信任，確保用戶訪問的是合法的網站，而不是中間人攻擊（MITM）中的偽裝網站。

- **數據完整性：** HTTPS 確保數據在傳輸過程中不會被篡改。任何對數據的修改（無論是惡意的還是無意的）都會被檢測到，確保傳輸的數據保持原樣。

- **SEO 優化：** 搜索引擎（如 Google）優先排名使用 HTTPS 的網站，因此加上憑證有助於提高網站在搜索引擎中的可見性和排名。

- **瀏覽器標識：** 現代瀏覽器通常會對未使用 HTTPS 的網站發出警告，標明“不安全”或直接阻止用戶訪問。這會影響用戶對網站的信任感。使用 HTTPS 可以避免這些負面影響。
