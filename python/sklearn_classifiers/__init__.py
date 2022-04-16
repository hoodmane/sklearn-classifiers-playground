from pyodide import to_js
from .sklearn_classifiers import SklearnClassifiers


def init_app():
    import json

    global applet
    applet = SklearnClassifiers()
    return to_js(applet.front_matter())
