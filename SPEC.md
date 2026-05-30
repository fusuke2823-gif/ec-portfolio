# 汎用ECサイト ひな型 仕様書

> **用途**: フリーランス案件受注用ポートフォリオ  
> **作成日**: 2026-05-30

---

## 1. 技術スタック

| 項目 | 選定 |
|---|---|
| フレームワーク | React 18（Vite） |
| スタイリング | Tailwind CSS v3 |
| ルーティング | React Router v6 |
| 状態管理 | React Context + useReducer |
| データ永続化 | LocalStorage |
| データソース | ダミーJSON（バックエンドなし） |
| デプロイ先 | Vercel または GitHub Pages |

---

## 2. デザイン方針

- トーン：ライトコールド（白・グレー系）
- フォント：Inter（Google Fonts）
- カラーパレット：
  - Primary: `#111827`（ほぼ黒）
  - Accent: `#2563EB`（青）
  - Background: `#F9FAFB`（薄グレー）
  - Surface: `#FFFFFF`
  - Border: `#E5E7EB`
- レスポンシブ：モバイルファースト（sm / md / lg ブレークポイント）
- ダークモード：対応しない

---

## 3. 画面構成・ルーティング

| ページ名 | パス | 概要 |
|---|---|---|
| 商品一覧（トップ） | `/` | 商品カード一覧、検索・フィルター・ソート |
| 商品詳細 | `/product/:id` | 画像複数枚、説明、在庫、レビュー、おすすめ |
| カート | `/cart` | 商品リスト、数量変更、合計金額 |
| 注文確認 | `/checkout` | 配送先入力フォーム（ダミー）、注文内容確認 |
| 注文完了 | `/complete` | サンクスメッセージ、注文番号（ランダム生成） |
| お気に入り | `/favorites` | お気に入り一覧 |

---

## 4. 機能一覧

### Phase 1（コア）

#### 商品一覧
- ダミーJSON（20件以上）から商品カードを描画
- カード表示項目：商品画像、商品名、価格、カテゴリ、在庫ラベル、お気に入りボタン
- 在庫ラベル：「残りわずか（3個以下）」「在庫あり」「売り切れ」を色分け表示
- 限定感バッジ：「SALE」「NEW」「期間限定」をオーバーレイ表示

#### 商品詳細
- メイン画像 + サムネイル一覧（クリックで切り替え）
- 商品名、価格（税込表示）、カテゴリ、在庫数
- カートに追加ボタン（売り切れ時はdisabled）
- Xシェアボタン（`https://twitter.com/intent/tweet?text=...`）
- おすすめ商品（同カテゴリからランダム4件）
- レビューセクション（ダミーデータ、星評価・コメント・写真有無フラグ）

#### カート
- 商品追加・削除・数量変更
- 小計・送料（3,000円以上で無料）・合計金額
- LocalStorageで永続化（ページリロード後も保持）
- 空カート時のメッセージ表示

#### 注文確認・完了
- 配送先フォーム（名前・住所・電話番号）※バリデーションあり・送信はダミー
- 注文内容の最終確認
- 完了画面でランダム注文番号を表示

### Phase 2（追加機能）

#### 検索・フィルター・ソート
- キーワード検索（商品名・説明文対象）
- カテゴリフィルター（複数選択可）
- 価格帯フィルター（〜3,000円 / 3,001〜8,000円 / 8,001円〜）
- ソート：おすすめ順 / 価格が安い順 / 価格が高い順 / 新着順 / レビュー評価順

#### お気に入り・閲覧履歴
- 商品カード・詳細のハートボタンでトグル
- LocalStorageに保存、`/favorites`ページで一覧表示
- 閲覧履歴：商品詳細を開くたびに記録（直近10件）、トップページ下部に表示

#### ランキング
- トップページに「今週の人気ランキング TOP5」セクション
- ダミーデータにrankスコアを持たせて降順表示

---

## 5. データ構造

### 商品（Product）

```json
{
  "id": "001",
  "name": "商品名",
  "description": "商品説明文",
  "price": 3980,
  "category": "トップス",
  "images": ["image1.jpg", "image2.jpg"],
  "stock": 12,
  "badge": "NEW",
  "rankScore": 85,
  "isNew": true,
  "reviews": [
    {
      "user": "ユーザー名",
      "rating": 5,
      "comment": "とても良かったです",
      "hasPhoto": true,
      "date": "2026-04-10"
    }
  ]
}
```

### カートアイテム（CartItem）

```json
{
  "productId": "001",
  "quantity": 2
}
```

---

## 6. コンポーネント設計

```
src/
├── main.jsx
├── App.jsx                  # ルーティング定義
├── data/
│   └── products.json        # ダミーデータ
├── context/
│   ├── CartContext.jsx      # カート状態管理
│   └── FavoriteContext.jsx  # お気に入り状態管理
├── hooks/
│   ├── useLocalStorage.js
│   └── useHistory.js        # 閲覧履歴
├── components/
│   ├── layout/
│   │   ├── Header.jsx       # ロゴ、検索バー、カートアイコン
│   │   └── Footer.jsx
│   ├── product/
│   │   ├── ProductCard.jsx  # 一覧用カード
│   │   ├── ProductGrid.jsx  # カードのグリッド
│   │   ├── ProductImage.jsx # 詳細用画像スライダー
│   │   └── ReviewList.jsx   # レビュー一覧
│   ├── cart/
│   │   └── CartItem.jsx
│   ├── common/
│   │   ├── Badge.jsx        # SALE / NEW バッジ
│   │   ├── StockLabel.jsx   # 在庫ラベル
│   │   ├── StarRating.jsx   # 星評価
│   │   └── ShareButton.jsx  # Xシェア
│   └── filter/
│       ├── SearchBar.jsx
│       ├── FilterPanel.jsx
│       └── SortSelect.jsx
└── pages/
    ├── HomePage.jsx
    ├── ProductDetailPage.jsx
    ├── CartPage.jsx
    ├── CheckoutPage.jsx
    ├── CompletePage.jsx
    └── FavoritesPage.jsx
```

---

## 7. 非機能要件

- レスポンシブ対応（320px〜）
- 認証・決済・バックエンドなし
- 外部APIなし（全てダミーデータ）
- GitHub Pages / Vercel でそのままデプロイ可能な構成

---

## 8. Claude Code への指示メモ

このドキュメントをそのまま渡して以下のように依頼してください。

```
この仕様書に基づいてReact（Vite）+ Tailwind CSSでECサイトのひな型を実装してください。
まずプロジェクトのセットアップとフォルダ構成を作り、
次にダミーデータ・Context・共通コンポーネントの順で実装してください。
```

