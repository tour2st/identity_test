import os
import shutil

wav_root = "wav/"
METHOD = ["spoken", "written", "slide"]
SPK = ["f"]
N_SET = 2
N_DATA_PER_SPK = 2

for n_set in range(N_SET):
    file_paths = []
    for method in METHOD:
        os.makedirs(f"wav/set{n_set + 1}/{method}", exist_ok=True)
        if method != "slide":
            files = []
            for spk in SPK:
                for n_data in range(N_DATA_PER_SPK):
                    data_number = n_set * N_DATA_PER_SPK + n_data
                    file_path = f"{method}/{spk}_{data_number:0>4}.wav"
                    new_file_path = shutil.copyfile(
                        wav_root + file_path, f"wav/set{n_set + 1}/" + file_path
                    )
                    files += [new_file_path]
            with open(f"wav/set{n_set + 1}/{method}.list", mode="w") as f:
                for file_path in sorted(files):
                    f.write(file_path + "\n")
        else:
            files = []
            for n_data in range(N_DATA_PER_SPK):
                data_number = n_set * N_DATA_PER_SPK + n_data
                file_path = f"{method}/slide_{data_number:0>4}.jpg"
                new_file_path = shutil.copyfile(
                    wav_root + file_path, f"wav/set{n_set + 1}/" + file_path
                )
                files += [new_file_path]
            with open(f"wav/set{n_set + 1}/{method}.list", mode="w") as f:
                for file_path in sorted(files):
                    f.write(file_path + "\n")
