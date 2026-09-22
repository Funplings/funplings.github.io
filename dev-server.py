#!/usr/bin/env python3
"""Serve this static site locally and reload browsers when its files change."""

import io
import json
import os
from pathlib import Path
import threading
import time
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import urlsplit


ROOT = Path(__file__).resolve().parent
SKIP = {".git", "node_modules", "__pycache__", ".venv", ".idea", ".vscode", ".claude"}
ASSETS = {".html", ".css", ".js", ".json", ".svg", ".png", ".jpg", ".jpeg",
          ".webp", ".gif", ".avif", ".ico", ".woff", ".woff2", ".ttf", ".mp4", ".webm"}
revision = str(time.time_ns())
CLIENT = b"""(() => {
  let revision;
  async function check() {
    try {
      const response = await fetch('/__dev_revision', {cache: 'no-store'});
      if (response.ok) {
        const next = await response.json();
        if (revision !== undefined && next !== revision) {
          location.reload();
          return;
        }
        revision = next;
      }
    } catch (_) { /* Retry while the local server restarts. */ }
    setTimeout(check, 700);
  }
  check();
})();"""


def snapshot():
    files = {}
    for folder, dirs, names in os.walk(ROOT):
        dirs[:] = [name for name in dirs if name not in SKIP and not name.startswith(".")]
        for name in names:
            path = Path(folder) / name
            if path.suffix.lower() in ASSETS:
                try:
                    stat = path.stat()
                    files[str(path)] = (stat.st_mtime_ns, stat.st_size)
                except FileNotFoundError:
                    pass
    return files


def watch():
    global revision
    previous = snapshot()
    while True:
        time.sleep(0.5)
        current = snapshot()
        if current != previous:
            revision = str(time.time_ns())
            previous = current


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def payload(self, data, content_type):
        self.send_response(200)
        self.send_header("Content-Type", content_type)
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        return io.BytesIO(data)

    def send_head(self):
        route = urlsplit(self.path).path
        if route == "/__dev_revision":
            return self.payload(json.dumps(revision).encode(), "application/json")
        if route == "/__dev_reload.js":
            return self.payload(CLIENT, "text/javascript; charset=utf-8")
        path = Path(self.translate_path(self.path))
        if path.is_dir() and route.endswith("/"):
            path = path / "index.html"
        if path.is_file() and path.suffix.lower() == ".html":
            data = path.read_bytes()
            script = b'<script src="/__dev_reload.js"></script>'
            offset = data.lower().rfind(b"</body>")
            data = data[:offset] + script + data[offset:] if offset >= 0 else data + script
            return self.payload(data, "text/html; charset=utf-8")
        return super().send_head()

    def log_message(self, format, *args):
        if urlsplit(self.path).path != "/__dev_revision":
            super().log_message(format, *args)


if __name__ == "__main__":
    server = ThreadingHTTPServer(("127.0.0.1", 8000), Handler)
    threading.Thread(target=watch, daemon=True).start()
    print("Live preview: http://127.0.0.1:8000/", flush=True)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()
