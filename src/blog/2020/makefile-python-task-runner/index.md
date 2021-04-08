---json
{
  "title": "MakeをPythonのタスクランナーとして使う",
  "date": "2020-12-15T15:08:38.668Z",
  "description": "この記事は Kyoto University Advent Calendar 2020 - Adventar と CAMPHOR- Advent Calendar の16日目の記事です。  こんにちは、ほないです。今年も残り半月、アドベントカレンダーも後半に入っていますね。",
  "og_image_url": "https://images.ctfassets.net/7q1ibtbymdj9/7MlOuMNA6VvBBIzr4SJgEk/f49872f9d3c9b4d634c4469358ad32ae/makefile-vs.png",
  "large_card": true
}
---

この記事は [Kyoto University Advent Calendar 2020 - Adventar](https://adventar.org/calendars/5040) と [CAMPHOR- Advent Calendar](https://advent.camph.net/) の16日目の記事です。

こんにちは、ほないです。今年も残り半月、アドベントカレンダーも後半に入っていますね。
CAMPHOR-のアドベントカレンダーは6日目の [Comet.ml で機械学習のログをクラウドに保存する](https://blog.honai.me/post/comet-ml-logging) に続き2回目です。
CAMPHOR-のアドベントカレンダーが意外と埋まらなかったので、[#KUAC2020](https://twitter.com/hashtag/kuac2020) と兼ねさせていただきます 🙇

今回はMakeコマンドを（機械学習などの）Pythonのタスクランナーとして使うと便利という内容です。

# 機械学習のコードあるある

## 1. 中間ファイルといくつものパラメータ

```bash
python preprocess.py --length 128 --hoge fuga
// これで1つめの中間ファイル data.tsvができる
python pick_data.py --flag1 value1 --flag2 value2
// これで2つめの中間ファイル picked_data.tsv ができる
python create_dataset.py --size 10000
// これで train.tsv, dev.tsv, test.tsv ができる
```

生成した中間ファイルがどんなパラメータで生成されたものなのかも分からなくなりがちです。

## 2. フラグが多すぎるスクリプト

```bash
export TASK_NAME=hogetask
python run.py \
  --model_name_or_path bert-base-cased \
  --task_name $TASK_NAME \
  --do_train \
  --do_eval \
  --max_seq_length 128 \
  --per_device_train_batch_size 32 \
  --learning_rate 2e-5 \
  --num_train_epochs 3.0 \
  --output_dir /tmp/$TASK_NAME/
```

ありますよね。

## 3. 1と2なコードで、さらにいろんなパラメータで実験したいとき

コマンドコピペでもかなりしんどくなりますよね。

# Make

> GNU Make is a tool which controls the generation of executables and other non-source files of a program from the program's source files.

[GNU Makeのサイト](https://www.gnu.org/software/make/)

Makeは本来はソースコードから実行可能なバイナリやオブジェクトファイルなどを生成するためのツールで、C言語やC++のビルドなどによく使われます。
今回はCをビルドするためではなく、機械学習などでありがちなPythonの複雑なCLIコマンドを賢く実行してくれるタスクランナーとして活用します。

なぜタスクランナーとして使えるかというと、Makeには

- ターゲット（作りたいファイル）を生成するシェルコマンドと、ターゲットを生成するのに必要な依存ファイルを定義し、 `make XXXX` という短いコマンドでそれらを実行できる
- ファイルの更新日時に基づいて、依存関係を処理しながら、実行する必要のないシェルコマンドをスキップしてくれる

という機能があるからです（もちろんこれ以外にもたくさんの機能があります）。
つまり、入力ファイルからある出力ファイルを生成する複雑なコマンド（Pythonのコードでなくても良い）を連鎖的に使いたいとき、Makeがタスクランナーとして力を発揮するのです。

## Makefileの基本的なフォーマット

Makeを使うには、作業ディレクトリに `Makefile` という名前のファイルを置きます。
基本的な書き方としては、次のようなブロックをいくつか書いていきます:

```makefile
target: dependency1, dependency2, ...
  command1
  command2
  ...
```

- target: 作りたいファイル名（複数ファイルも可能）
- dependencyN: 依存ファイル
- commandN: targetを生成するために実行するコマンド

このように、あるターゲットに対して、依存しているファイルと、生成するためのコマンドを定義します。

### 例

入力ファイルを引数にとり、入力ファイルに何らかの処理をして標準出力に出力する `parse.py` があるとします。
そして、入力ファイルの名前を `in.txt` 、出力結果を `out.txt` に書き込みたいとします。

実行前のディレクトリ構造:

```
.
├── Makefile
├── in.txt
└── parse.py
```

普通にシェルでやると:

```bash
$ python parse.py in.txt > out.txt
```

です。これをMakefileで定義すると

```makefile
# Makefile
out.txt: in.txt
  python parse.py in.txt > out.txt
```

Makefileがあるディレクトリで `make hogehoge` (hogehoge はtarget名) とコマンドを実行することで、Makeを実行できます。

```
make out.txt
```

実行後のディレクトリ構造

```
.
├── Makefile
├── in.txt
├── parse.py
└── out.txt  // new!
```

簡単ですね。

## 依存関係をmakeがどう処理するか

### ファイルの存在と更新日時による実行のスキップ

makeでは、targetの更新日時がすべての依存ファイルの更新日時よりも新しい場合、 `make hoge` してもtargetを出力するためのコマンドは実行されません。前の例の場合、すでに `out.txt` が存在し、 `in.txt` の更新日時よりも新しい場合、このようなメッセージが出力されます:

```bash
$ make out.txt
make: 'out.txt' is up to date.
```

内容に変更があったかどうかではなく、**更新日時での比較**なので、 `touch` コマンドなどを使って、更新があった扱いにしたり内容は変えたけどMakeにはそう認識させないというようなことも簡単にできます。

### 複数の依存関係

次のように、 `raw.txt` から `all.txt` を生成し、さらに `all.txt` から `filtered.txt` を生成するとします。

```makefile
# Makefile
filtered.txt: all.txt
  python filter_data.py all.txt > filtered.txt

all.txt: raw.txt
  python preprocess.py raw.txt
```

この場合、もし `all.txt` が既にあると、 `preprocess.py` のコマンドはスキップされます。

```
.
├── Makefile
├── raw.txt
├── all.txt  // 既にある
├── preprocess.py
└── filter_data.py
```

```bash
$ make filtered.txt
python filter_data.py all.txt > filtered.txt # preprocess.py はスキップされている
```

### 依存のないターゲット

依存ファイルのないターゲットは、そのターゲットがあればコマンドは実行されませんし、なければ実行されます。

```makefile
# Makefile
fetched.txt:
  python fetch_data.py > fetched.txt
```

```
.
├── Makefile
├── original.txt
└── fetch_data.py
```

```bash
$ make fetched.txt
make: 'fetched.txt' is up to date.
```

## 変数

Makefile内で変数を定義するには、次のような書き方をします。

```makefile
max = 100

out.txt: in.txt
  python run.py in.txt --max ${max} > out.txt
```

これは、 `run.py` のオプショナル引数 `--max` に値を設定するために使っている例です。
`${変数名}` で変数を展開することができます。

### コマンドライン引数でオーバーライド

この変数は、 `make` コマンドを実行するときのコマンドライン引数として上書きすることができます。

```bash
$ make out.txt
python run.py in.txt --max 100 > out.txt

$ make out.txt max=200
python run.py in.txt --max 200 > out.txt
```

### targetや依存ファイルにも変数を含められる

例えば、`preprocess.py` というスクリプトで `in.txt` から `out.txt` を生成するとき、 `--max` というパラメータで出力を調整できるとしましょう。

その時、次のように書くと:

```makefile
# Makefile
max = 100

out.txt: in.txt
  python preprocess.py in.txt --max ${max} > out.txt
```

こう書いても良いですが、たとえば max が 200 で `out.txt` を生成しようとすると上書きされてしまいます。そこで:

```makefile
max = 100

out_max_${max}.txt: in.txt
  python preprocess.py in.txt --max ${max} > out_max_${max}.txt
```

このように記述することで、 maxの値によって動的に出力ファイル名を設定することができます。

しかし、これでは `make out.txt max=200` と実行してもエラーとなります。なぜなら、 `max=200` のときのターゲット名は `out_max_200.txt` であり、 `out.txt` というターゲットは存在しないからです。毎回、 `make out_max_200.txt max=200` という風に入力するのは面倒ですね。

そこで、makeの **疑似ターゲット** を使います。疑似ターゲットを使えば、直接はファイルを生成しないようなコマンドや依存ファイルを定義することができます。

```makefile
max = 100
OUT_FILENAME = out_max_${max}.txt

.PHONY: out

# 疑似ターゲット `out` は ${OUT_FILENAME} というファイルに依存している
out: ${OUT_FILENAME}
  # このブロックでは何もコマンドを実行しない（依存を定義しただけ）

${OUT_FILENAME}: in.txt
  python preprocess.py in.txt --max ${max} > ${OUT_FILENAME}
```

この例では、 `out` という疑似ターゲットを定義し、 `make out` とすれば、（`out` は `OUT_FILENAME` というターゲットに依存しているので）
`out_max_len_100.txt` というファイルを生成するためのコマンドを実行することができるようになっています。
さらに、変数 `max` の値を `make max=200 out` と引数で設定すれば、 `out_max_len_200.txt` を生成してくれます。

# 実例

makeの機能である「依存ファイルの存在と更新日時によるコマンドのスキップ」「変数」について紹介したところで、機械学習でよくある「中間ファイル問題」と「フラグ多すぎる問題」を解決できる例を見てみましょう。

## 想定するPythonのプロジェクト

- 元データファイル `input.txt` が最初からある
- `parse.py` で元データファイルを処理し、パースされたファイル `parsed.txt` を生成する
  - パラメータのフラグ `min, max` を渡す必要がある
- `dataset.py` で、パースされたファイルから `train.tsv, dev.tsv, test.tsv` を生成する
  - 2つめの位置引数で出力ディレクトリを指定する
- `run.py` で、作ったデータセットファイルを使ってモデルを学習し評価する
  - 位置引数でデータセットがあるディレクトリを指定する
  - `epochs, do_train, do_eval, do_test, lr` （lr: learning rate）というフラグを渡す必要がある
  - `log` フラグで出力するログファイルの場所を指定

これで、パースのパラメータ `min` と `max` を変え、それぞれでモデルを学習させたいとします。
minとmaxが何なのか、後からわかるようにしたいので、 `min_10_max_100` のような名前のディレクトリ内に各ファイルを出力しましょう。
ログファイルも、ハイパーパラメータを変えたときに上書きされないように、 `output` というディレクトリに `min_10_max_100_epoch_3_lr_1e-5.log` というような名前で出力しましょう。このログファイルが最終的な生成物です。

## ディレクトリ構造

```
.
├── Makefile
├── parse.py
├── dataset.py
├── run.py
├── min_10_max_100
│   ├── dataset
│   │   ├── dev.tsv
│   │   ├── test.tsv
│   │   └── train.tsv
│   └── parsed.txt
├── output
│   └── min_10_max_100_epoch_3_lr_1e-5.log
└── input.txt
```

## ふつうにコマンドで実行

Makeなしでコマンド実行すると

```bash
$ python parse.py input.txt --min 10 --max 100 > min_10_max_100/parsed.txt
$ python dataset.py min_10_max_100/parsed.txt min_10_max_100/dataset
$ python run.py min_10_max_100/dataset \
    --epochs 3 --do_train --do_eval --do_test --lr 1e-5 \
    --log output/min_10_max_100_epoch_3_lr_1e-5.log
```

これで min, max, epochs, lr を変えて何度か実験とかしようとするとかなり厳しいですね。

## Makefileを書いてみる

Makefileは次のようになります。疑似ターゲット `all` で学習まで全て実行します。

```makefile
min = 10
max = 100
epochs = 3
lr = 1e-5

OUT_DIR = min_${min}_max_${max}
PARSED_FILE = ${OUT_DIR}/parsed.txt
DATASET_DIR = ${OUT_DIR}/dataset
DATASET = ${DATASET_DIR}/train.tsv ${DATASET_DIR}/dev.tsv ${DATASET_DIR}/test.tsv
LOG_FILE = output/min_${min}_max_${max}.log

.PHONY: all

all: ${LOG_FILE}
  cat ${LOG_FILE}

${PARSED_FILE}: input.txt
  python parse.py input.txt --min ${min} --max ${max} > ${PARSED_FILE}

${DATASET}: ${PARSED_FILE}
  python dataset.py ${PARSED_FILE} ${DATASET_DIR}

${LOG_FILE}: ${DATASET}
  python run.py ${DATASET_DIR} \
    --epochs ${epochs} --lr ${lr} \
    --do_train --do_eval --do_test \
```

これで `make all lr=1e-3` とか `make all max=50` のようにデフォルトから変える部分だけを入力すれば、ディレクトリをいい感じに掘りながら最後まで実行してくれるようになります。
さらに、例えば `make all` が終了した後に `make epochs=10 all` を実行すると、**データセットを作るところまでは共通なのでスキップ**して、 `run.py` の部分だけを実行してくれます。
個人的にはこの自動スキップがとてもありがたいです。

# おわりに

今日は小ネタとして、「中間ファイルやフラグが多く管理が大変なPythonのプロジェクトをmakeで簡単に扱えるようにする」ということをやってみました。
難解になりがちなMakefileもきちんと変数名を付けながら書けば読みやすくできると思います。
機械学習をするみなさんは、大量のファイルとコマンドに頭がパンクする前に、Makefileを書いて頭とディレクトリ構造を整理しましょう！

明日の [Kyoto University Advent Calendar 2020 - Adventar](https://adventar.org/calendars/5040) の担当は、 [電タク](https://adventar.org/users/34396) さんです。

明日の [CAMPHOR- Advent Calendar](https://advent.camph.net/) の担当は、 [sanpo_shiho](https://twitter.com/sanpo_shiho) くんです。
