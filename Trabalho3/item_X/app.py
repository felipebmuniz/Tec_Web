#!/usr/bin/env python
# encoding: utf-8

from flask import Flask, jsonify

from x.config.init import load_config

config = load_config("PRODUCTION")

app = Flask(__name__)

app.config.from_object(config)


@app.route('/', methods=['GET'])
def query_records():

    return jsonify({"ok": True})


if __name__ == "__main__":
    app.run(debug=True)
