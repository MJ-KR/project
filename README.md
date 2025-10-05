## 📂 プロジェクト構造

```plaintext
project/
├─ assets/                                          # 初期データ
│  └─ json/
│     └─ estate_transactions.json                   # JSONデータ
│
├─ src/
│  ├─ main.ts                                       # アプリエントリポイント
│  ├─ app.module.ts                                 # モジュール定義
│  │
│  ├─ common/                                       # 共通処理
│  │  ├─ config/
│  │  │  ├─ all-exception-filter.ts                 # 全例外を統一フォーマットで返却
│  │  │  └─ tokens.ts                               # DI用トークン定義
│  │  └─ exceptions/                                # カスタム例外クラス
│  │     ├─ base-exception.ts                       # 例外基底クラス
│  │     ├─ json-file-read-exception.ts             # JSON読込失敗例外
│  │     ├─ data-not-found-exception.ts             # データ未取得例外
│  │     └─ invalid-query-parameter-exception.ts    # クエリ不正例外
│  │
│  ├─ controller/
│  │  └─ transaction-controller.controller.ts       # エンドポイント定義
│  │
│  ├─ domain/                                       # ドメイン層
│  │  ├─ constants/                                 # 定数
│  │  ├─ dto/                                       # DTO(リクエスト/レスポンス)
│  │  │  ├─ request/transaction-query-dto.ts
│  │  │  └─ response/{base,error}-response.ts
│  │  └─ entity/transaction.ts                      # Transaction / Years エンティティ
│  │
│  ├─ repository/                                   # データアクセス層
│  │  ├─ transaction-repository.interface.ts        # Repositoryインターフェース
│  │  └─ memory-transaction-repository.ts           # JSONを読み込む実装
│  │
│  └─ use-case/                                     # ビジネスロジック層
│     └─ transaction-use-case.service.ts            # Controllerから呼ばれるサービス
│
├─ test/                                            # e2eテスト用ディレクトリ
│
├─ README.md
├─ package.json
├─ tsconfig.json
└─ その他設定ファイル（ESLint/Prettier 等）
