#!/usr/bin/env bash
set -euo pipefail
project_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$project_dir"
python_bin="${GRAPHIFY_PYTHON:-python3}"
"$python_bin" -m venv .venv-graphify
.venv-graphify/bin/python -m pip install -r requirements-graphify.txt
.venv-graphify/bin/graphify update . --no-cluster
.venv-graphify/bin/graphify cluster-only . --no-label
printf '%s\n' 'Graph ready: graphify-out/graph.html' 'Query: .venv-graphify/bin/graphify query "Sales Lab registration"'
