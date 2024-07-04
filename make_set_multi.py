import itertools
from random import shuffle

# 文字列形式でテキストと方法の組み合わせを生成
texts = [
    "A01M0906_0094625_0098470",
    "A05F0756_0200498_0210897",
    "A05M0058_1965542_1972876",
    "S00F0063_0239050_0247330",
    "S08M0639_0440306_0446946",
]  # 5種類のテキスト
methods = ["Plain", "Auto", "Gen", "Ctrl"]  # 4種類の方法
combinations = list(itertools.permutations(methods, 2))  # 順序を考慮した組み合わせ

set = [[], []]
set[0] = {"a": [], "b": [], "c": []}
set[1] = {"a": [], "b": [], "c": []}

# 各テキストに対して異なる順序でAB、AC、BCのペアを作成
for text, i in zip(texts, range(len(texts))):
    pairs = [
        ["Plain", "Auto"],
        ["Plain", "Gen"],
        ["Plain", "Ctrl"],
        ["Auto", "Gen"],
        ["Auto", "Ctrl"],
        ["Gen", "Ctrl"],
    ]
    shuffle(pairs)

    # シャッフルされたペアをセット1に追加
    for pair in pairs:
        shuffle(pair)
        if i % 2:
            set[0]["a"].append(f"wav/set1/{pair[0]}/{text}.wav")
            set[0]["b"].append(f"wav/set1/{pair[1]}/{text}.wav")
            set[0]["c"].append(f"wav/set1/Ref/{text.split('_')[0]}.wav")

            set[1]["a"].append(f"wav/set2/{pair[1]}/{text}.wav")  # 順番を逆にして追加
            set[1]["b"].append(f"wav/set2/{pair[0]}/{text}.wav")
            set[1]["c"].append(f"wav/set2/Ref/{text.split('_')[0]}.wav")
        else:
            set[0]["a"].append(f"wav/set1/{pair[1]}/{text}.wav")
            set[0]["b"].append(f"wav/set1/{pair[0]}/{text}.wav")
            set[0]["c"].append(f"wav/set1/Ref/{text.split('_')[0]}.wav")

            set[1]["a"].append(f"wav/set2/{pair[0]}/{text}.wav")  # 順番を逆にして追加
            set[1]["b"].append(f"wav/set2/{pair[1]}/{text}.wav")
            set[1]["c"].append(f"wav/set2/Ref/{text.split('_')[0]}.wav")


for i in [1, 2]:
    for x in ["a", "b", "c"]:
        with open(f"wav/set{i}/{x}.list", mode="w") as f:
            for file_path in set[i - 1][f"{x}"]:
                f.write(file_path + "\n")
