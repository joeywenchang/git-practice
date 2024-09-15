### **Git 基本概念說明**

**Blob (Binary Large Object)**  
Git 中 blob 是用來存儲文件的內容。每個文件的內容都會被存為一個 blob，blob 本身不會存儲檔案名稱或其他資訊，只儲存內容。blob 是文件快照的基礎。

**Tree**  
Tree 是 Git 中的一種物件，用來表現檔案夾結構。它包含 blob 或其他 tree 的指標，並包含檔案名稱以及 blob 對應的內容（blob ID）。實際上，tree 表示一個目錄及其下的檔案和子目錄。

**Commit**  
Commit 是 Git 中最基本的變更單元。它記錄了某一時間點的工作區狀態，包括某個 tree 的快照、作者信息、提交時間等。每個 commit 也包含一個或多個父 commit（除了第一次 commit 沒有父 commit）。

**Branch**  
Branch 是指向某一 commit 的一個可移動指標。當你在 Git 中創建 branch 時，它最初會指向當前的最新 commit，並隨著新的 commit 自動移動。

**HEAD**  
HEAD 是一個特殊指標，指向當前檢出的 branch。通常情況下，HEAD 會指向某個 branch（例如 `main` 或 `feature-xyz`），但也可以直接指向某個 commit（稱為「分離的 HEAD」狀態）。

---

### **Git 操作中的 .git 資料夾變化觀察**

以下內容是先問`chatgpt`所得到的結果：

1. **初始化儲存庫 (`git init`)**
   - 執行 `git init` 後，會在 `.git` 資料夾中生成基本結構，包含 `HEAD`, `config`, `objects`, `refs` 等檔案。

2. **暫存文件 (`git add`)**
   - 新增檔案並執行 `git add` 後，`objects` 資料夾會新增 blob 檔案，用來存儲文件內容快照。
   - `index` 文件會出現，記錄已暫存的檔案狀態和文件的 blob ID。

3. **提交變更 (`git commit`)**
   - 提交後，`objects` 會生成 commit 物件，`refs/heads` 會指向最新的 commit。
   
4. **創建或切換分支 (`git branch`, `git checkout`)**
   - 分支操作會影響 `.git/refs/heads` 和 `.git/HEAD`，反映當前的分支狀態。

5. **查詢提交歷史 (`git log`)**
   - 可以看到 HEAD 隨著 branch 的變動而移動，代表當前指向的 commit。

---

### **手動驗證 Git 操作變化：觀察 `.git` 資料夾**

1. **建立資料夾並初始化 Git 儲存庫**
   ```bash
   mkdir test-repo && cd test-repo
   git init
   ```

2. **新增檔案並查看 `.git` 資料夾狀態**
   ```bash
   vim 123.txt  # 創建文件
   ls -laR .git > git_snapshot.txt  # 儲存當前 .git 資料夾的狀態
   git add .
   ls -laR .git > git_snapshot_add.txt  # 暫存後的 .git 狀態
   ```

3. **對比變化**
   ```bash
   diff git_snapshot.txt git_snapshot_add.txt  # 查看變化
   2,3c2,3
   < total 40
   < drwxr-xr-x 7 root root 4096 Sep 15 12:38 .
   ---
   > total 44
   > drwxr-xr-x 7 root root 4096 Sep 15 12:40 .
   9a10
   > -rw-r--r-- 1 root root  104 Sep 15 12:40 index
   11c12
   < drwxr-xr-x 4 root root 4096 Sep 15 12:38 objects
   ---
   > drwxr-xr-x 5 root root 4096 Sep 15 12:40 objects
   17c18
   < drwxr-xr-x 7 root root 4096 Sep 15 12:38 ..
   ---
   > drwxr-xr-x 7 root root 4096 Sep 15 12:40 ..
   22c23
   < drwxr-xr-x 7 root root 4096 Sep 15 12:38 ..
   ---
   > drwxr-xr-x 7 root root 4096 Sep 15 12:40 ..
   41c42
   < drwxr-xr-x 7 root root 4096 Sep 15 12:38 ..
   ---
   > drwxr-xr-x 7 root root 4096 Sep 15 12:40 ..
   45,47c46,49
   < total 16
   < drwxr-xr-x 4 root root 4096 Sep 15 12:38 .
   < drwxr-xr-x 7 root root 4096 Sep 15 12:38 ..
   ---
   > total 20
   > drwxr-xr-x 5 root root 4096 Sep 15 12:40 .
   > drwxr-xr-x 7 root root 4096 Sep 15 12:40 ..
   > drwxr-xr-x 2 root root 4096 Sep 15 12:40 19
   50a53,58
   > .git/objects/19:
   > total 12
   > drwxr-xr-x 2 root root 4096 Sep 15 12:40 .
   > drwxr-xr-x 5 root root 4096 Sep 15 12:40 ..
   > -r--r--r-- 1 root root   19 Sep 15 12:40 0a18037c64c43e6b11489df4bf0b9eb6d2c9bf
   > 
   54c62
   < drwxr-xr-x 4 root root 4096 Sep 15 12:38 ..
   ---
   > drwxr-xr-x 5 root root 4096 Sep 15 12:40 ..
   59c67
   < drwxr-xr-x 4 root root 4096 Sep 15 12:38 ..
   ---
   > drwxr-xr-x 5 root root 4096 Sep 15 12:40 ..
   64c72
   < drwxr-xr-x 7 root root 4096 Sep 15 12:38 ..
   ---
   > drwxr-xr-x 7 root root 4096 Sep 15 12:40 ..
   ```

### **觀察結果與解釋**


1. **總覽 (`total`) 和時間戳 (`timestamp`)**

* 在多個行中，`total` 的大小從 40 增加到 44，這表示文件或資料夾的總大小增加了。
* 修改時間從 12:38 變為 12:40，顯示這些檔案是在 `git add` 操作後更新的。

2. **新增了 `index` 文件**

* `index` 文件在 `git add` 操作後出現（在第 9 行）。這個 `index` 文件負責記錄已經暫存的檔案狀態。Git 會使用這個文件來跟蹤暫存區的變化。它儲存了檔案的路徑、權限、Blob ID 等資訊，作為暫存區的快照。

3. **`objects` 資料夾的變化**

* `objects` 資料夾中新增了一個名為 `19` 的子資料夾（第 45 行和第 50 行），這表示 Git 在 `git add` 操作時為新內容生成了對應的 blob。
* 進一步觀察到，這個資料夾內新增了一個名為 `0a18037c64c43e6b11489df4bf0b9eb6d2c9bf` 的 blob 文件（第 50 行），這是 Git 為暫存的檔案內容生成的 blob。該文件名是這個 blob 的哈希值，內容的哈希用來唯一標識文件內容。

4. **`objects` 資料夾結構的更新**

* `objects` 資料夾本身的結構從 4 個子目錄變為 5 個（第 45 行和第 50 行），這是因為一個新的目錄 `19` 被添加進來，並且其中包含了新的 blob。

5. **`.git` 資料夾中的整體變化**

* 其他多處改變顯示資料夾的修改時間（`..`、`objects` 等）隨著 `git add` 操作而更新，但其實這些變化只是反映了檔案系統的更新而已，並不涉及其他具體的內容變化。

---

### **良好 Commit Message 寫法**

**撰寫風格建議：**
1. **標題行（50 字內）**：簡明扼要地描述變更內容。
2. **詳細描述（可選，72 字元換行）**：提供更多細節，說明變更的原因或背景。
3. **使用祈使句**：例如 "Fix bug with login" 或 "Add caching for user data"，清晰表達目標。
4. **說明「為什麼」而非僅「做了什麼」**：描述變更的目的，例如 "Clarify installation instructions to fix user confusion"。

**範例：**
```git
feat: add user login API

This commit introduces a new API for user login. It accepts email and password,
validates them, and returns a JWT token for authentication.

BREAKING CHANGE: the old login method is removed in favor of the new one.
```

---

### **常見的 Commit 標籤**

- **feat**：新功能（feature）。
- **fix**：修復 bug。
- **docs**：文檔變更。
- **style**：格式修正（例如空格、格式調整，不影響程式邏輯）。
- **refactor**：程式碼重構（不新增功能、不修復 bug）。
- **test**：新增或修改測試。
- **chore**：更新依賴或工具設定。 
