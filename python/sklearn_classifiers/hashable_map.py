class HashableMap:
    def __init__(self, dict):
        self._hash = hash((HashableMap, tuple(dict.items())))
        self._dict = dict

    def __getitem__(self, item):
        return self._dict[item]

    def __len__(self):
        return len(self._dict)

    def __hash__(self):
        return self._hash
