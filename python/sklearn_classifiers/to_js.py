from pyodide import to_js as _to_js
from js import Object


def to_js(obj):
    return _to_js(obj, dict_converter=Object.fromEntries)
