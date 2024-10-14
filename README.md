# みんなの掲示板

このプロジェクトは、コーディングテストの一環として作成されたシンプルな掲示板アプリケーションです。Next.js、Firebase、TypeScriptを使用して、基本的なCRUD操作、認証、リアルタイム更新の実装を示しています。

## 機能

- ユーザー認証（サインアップ、ログイン、ログアウト）
- 投稿の作成、読み取り、更新、削除
- 新規投稿のリアルタイム更新
- 編集可能な情報を含むユーザープロフィール
- モバイルとデスクトップに対応したレスポンシブデザイン

## 使用技術

- Next.js 14 (App Router)
- Firebase (認証、Firestore、ストレージ)
- TypeScript
- React Hook Form
- データフェッチング用のSWR
- 認証用のnext-auth

## 前提条件

開始する前に、以下がインストールされていることを確認してください：
- Node.js (v18以降)
- pnpm (v8以降)
- Firebase CLI

## セットアップ

1. リポジトリをクローンします：
   ```sh
   git clone https://github.com/your-username/minna-no-keijiban.git
   cd minna-no-keijiban
   ```

2. 依存関係をインストールします：
   ```sh
   pnpm install
   ```

3. Firebaseをセットアップします：
   - Firebase Consoleで新しいFirebaseプロジェクトを作成します
   - 認証、Firestore、ストレージサービスを有効にします
   - Firebaseプロジェクトにウェブアプリを追加し、設定をコピーします

4. 環境変数を設定します：
   - `.env.local.sample` ファイルを `.env.local` にコピーします
   - `.env.local` ファイルにFirebaseの設定情報を追加します

5. Firebaseエミュレーターを起動します：
   ```sh
   firebase emulators:start
   ```

6. テストデータをセットアップします：
   ```sh
   node scripts/setup-emulator.js
   ```

7. 開発サーバーを起動します：
   ```sh
   pnpm dev
   ```

8. ブラウザで `http://localhost:3000` を開いてアプリケーションにアクセスします。

## テストアカウント

セットアップスクリプトによって、以下のテストアカウントが作成されます：

1. ユーザー1
   - メール: abc123@test.com
   - パスワード: abcABC123

2. ユーザー2
   - メール: xyz789@test.com
   - パスワード: xyzXYZ789

3. ユーザー3
   - メール: user3@test.com
   - パスワード: abcABC123

4. ユーザー4
   - メール: user4@test.com
   - パスワード: abcABC123

## 開発者向け注意事項

- このアプリケーションは、Firebaseエミュレーターを使用してローカル環境で動作するように設定されています。
- 実際の開発やデプロイ時には、適切なセキュリティルールとデータ構造を設定してください。
- TypeScriptの厳格な型チェックを有効にしているため、型の一貫性を維持してください。
- コードの品質を維持するために、ESLintとPrettierを使用しています。コミット前に `pnpm lint` を実行してください。

## 改善点とさらなる開発

- ユーザー間のフォロー機能の実装
- 投稿に対するコメント機能の追加
- 画像アップロード機能の強化
- パフォーマンスの最適化（特に大量のデータを扱う場合）
- ユニットテストとインテグレーションテストの追加

