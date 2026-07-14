"""greeting-service — a tiny HTTP service.

This is the "after" app in the python-only demo: the same service rewritten in Python, the language the
demo's guidance requires (arch-python-required) and consistent with the Node.js prohibition
(arch-no-nodejs). Running /standards-review here returns PASS — zero BLOCK findings — so the remediation
plan is empty. It is what a coding agent would produce from the "before" app's remediation task.
"""

import json
from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import parse_qs, urlparse


def greet(name):
    return {"message": f"Hello, {name or 'world'} — built by Python"}


class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        params = parse_qs(urlparse(self.path).query)
        name = params.get("name", [None])[0]
        body = json.dumps(greet(name)).encode()
        self.send_response(200)
        self.send_header("content-type", "application/json")
        self.end_headers()
        self.wfile.write(body)


def main():
    HTTPServer(("", 3000), Handler).serve_forever()


if __name__ == "__main__":
    main()
