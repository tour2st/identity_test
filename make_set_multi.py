import itertools
from random import shuffle

# 文字列形式でテキストと方法の組み合わせを生成
texts = [f"000{i+1}" for i in range(7)]  # 8種類のテキスト
methods = ["A", "B", "C"]  # 3種類の方法
combinations = list(itertools.permutations(methods, 2))  # 順序を考慮した組み合わせ

set = [[], []]
set[0] = {"a": [], "b": []}
set[1] = {"a": [], "b": []}

set1_a, set1_b, set2_a, set2_b = [], [], [], []

# 各テキストに対して異なる順序でAB、AC、BCのペアを作成
for text, i in zip(texts, range(len(texts))):
    pairs = [["A", "B"], ["A", "C"], ["B", "C"]]
    shuffle(pairs)

    # シャッフルされたペアをセット1に追加
    for pair in pairs:
        shuffle(pair)
        if i % 2:
            set[0]["a"].append(f"wav/set1/{pair[0]}/csj_{text}.wav")
            set[0]["b"].append(f"wav/set1/{pair[1]}/csj_{text}.wav")

            set[1]["a"].append(f"wav/set2/{pair[1]}/csj_{text}.wav")  # 順番を逆にして追加
            set[1]["b"].append(f"wav/set2/{pair[0]}/csj_{text}.wav")
        else:
            set[0]["a"].append(f"wav/set1/{pair[1]}/csj_{text}.wav")
            set[0]["b"].append(f"wav/set1/{pair[0]}/csj_{text}.wav")

            set[1]["a"].append(f"wav/set2/{pair[0]}/csj_{text}.wav")  # 順番を逆にして追加
            set[1]["b"].append(f"wav/set2/{pair[1]}/csj_{text}.wav")


for i in [1, 2]:
    for x in ["a", "b"]:
        with open(f"wav/set{i}/{x}.list", mode="w") as f:
            for file_path in set[i - 1][f"{x}"]:
                f.write(file_path + "\n")
