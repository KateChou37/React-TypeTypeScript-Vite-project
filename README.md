# SoundNest 耳機選品商城

這是一個使用 React + Vite + TypeScript 建立的耳機電商 side project，包含商品瀏覽、商品詳情、購物車、結帳、會員登入與已購買紀錄等流程。專案資料目前使用前端 mock API 模擬，不需要額外啟動後端服務。

## 使用技術

- React 19：建立元件化 UI 與頁面互動。
- Vite 8：提供開發伺服器、HMR 與 production build。
- TypeScript 6：提供商品、購物車、訂單、會員等資料型別。
- Bootstrap 5：作為基礎 CSS 與部分排版輔助。
- Bootstrap Icons：提供導覽列、按鈕與 fallback icon。
- Sass / SCSS：管理設計 token、mixin 與系統化 UI 樣式。
- React Router DOM 7：處理前端路由、商品詳情頁、會員頁與登入保護。
- Redux Toolkit：管理 products、cart、auth、orders 等全域狀態。
- React Redux：讓 React 元件讀取與更新 Redux store。
- Axios：統一 API 呼叫介面。
- 自製 Axios mock adapter：模擬商品、登入、註冊與送出訂單 API。
- React Hook Form：處理結帳表單欄位與驗證。
- Zod 與 @hookform/resolvers：保留可擴充的表單 schema 驗證工具。
- Framer Motion：提供頁面轉場動畫。
- Sharp：將產品 PNG 圖片批次轉成 WebP，以降低圖片體積。
- ESLint / typescript-eslint：維持 TypeScript 與 React 程式碼品質。

## 主要功能

- 首頁展示品牌、主打內容與商品導流。
- 商品列表頁：
  - 商品卡片列表。
  - 分類篩選。
  - 關鍵字搜尋。
  - 價格與評分排序。
  - 分頁顯示。
  - 自製下拉選單，避免原生 select 樣式限制。
- 商品詳情頁：
  - 商品圖片 gallery。
  - 商品規格、特色與常見問題。
  - 加入購物車。
- 購物車頁：
  - 等待結帳商品清單。
  - 商品圖片、名稱、分類、數量與小計。
  - 數量加減與移除商品。
  - 訂單摘要與前往結帳。
- 結帳頁：
  - 收件資料表單。
  - 表單驗證。
  - 送出 mock 訂單。
  - 結帳成功後清空購物車。
- 會員系統：
  - 註冊。
  - 登入。
  - 登出。
  - Protected Route 保護會員中心。
- 會員中心：
  - 顯示會員資料。
  - 顯示已購買列表。
  - 已購買訂單會保存商品快照、訂單編號、金額與購買時間。

## 資料與狀態管理

專案使用 Redux Toolkit 管理主要狀態：

- `productSlice`：商品列表、商品詳情、載入狀態與錯誤訊息。
- `cartSlice`：購物車商品、數量調整、移除商品與送出訂單狀態。
- `authSlice`：登入狀態、會員資料與 token。
- `orderSlice`：已購買訂單列表。

已購買訂單會存入 `localStorage`，重新整理頁面後仍可在會員中心看到歷史紀錄。

## Mock API

API 呼叫集中在 `src/api`：

- `axios.ts`：建立 Axios client。
- `mockAdapter.ts`：攔截 Axios request 並回傳 mock response。
- `mockData.ts`：商品資料。
- `authApi.ts`：登入與註冊 API。
- `cartApi.ts`：送出購物車訂單 API。
- `authStorage.ts`：使用 `localStorage` 模擬會員資料與登入 session。

目前支援的 mock endpoint：

- `GET /products`
- `GET /products/:id`
- `POST /cart`
- `POST /login`
- `POST /register`

## 圖片最佳化

產品圖片放在：

```txt
public/images/products
```

原始 PNG 圖片已保留，並另外產生同名 WebP 檔案。商品資料目前使用 WebP 路徑，例如：

```ts
image: '/images/products/AirPulsePro.webp'
```

圖片最佳化策略：

- 使用 WebP 降低圖片體積。
- 商品卡片、購物車、會員中心訂單圖片加入 `loading="lazy"`。
- 圖片加入 `decoding="async"`，減少同步解碼造成的畫面卡頓。

## 專案目錄

```txt
src/
  api/                Mock API、Axios client、商品資料與 auth storage
  components/         共用元件與 UI 元件
  hooks/              自訂 React hooks
  pages/              頁面元件
  routes/             AppRouter 與路由設定
  slices/             Redux Toolkit slices
  store/              Redux store 與 typed hooks
  styles/             SCSS design tokens、mixins、system styles
  types/              TypeScript 型別定義
public/
  images/             靜態圖片資源
```

## 安裝與啟動

安裝依賴：

```bash
npm install
```

啟動開發伺服器：

```bash
npm run dev
```

建置 production 版本：

```bash
npm run build
```

預覽 production build：

```bash
npm run preview
```

執行 lint：

```bash
npm run lint
```

## 測試帳號

專案沒有內建固定密碼的測試帳號。請先在註冊頁建立帳號，再使用該帳號登入。帳號資料會儲存在瀏覽器 `localStorage`。

## 注意事項

- 此專案為 side project，後端 API 目前以 Axios mock adapter 模擬。
- 購買紀錄、會員 session 與註冊資料儲存在瀏覽器 `localStorage`。
- 若清除瀏覽器資料，會員 session 與已購買訂單也會被清除。
- `public/images/products` 內同時保留 PNG 與 WebP；目前商品資料使用 WebP。
