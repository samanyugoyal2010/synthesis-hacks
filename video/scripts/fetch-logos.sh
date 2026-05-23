#!/usr/bin/env bash
set -euo pipefail
DIR="$(cd "$(dirname "$0")/.." && pwd)/public/integrations"
mkdir -p "$DIR"
curl -fsSL -o "$DIR/github.svg" "https://cdn.simpleicons.org/github/1A1612"
curl -fsSL -o "$DIR/gmail.svg" "https://cdn.simpleicons.org/gmail/EA4335"
curl -fsSL -o "$DIR/google-docs.svg" "https://cdn.simpleicons.org/googledocs/4285F4"
curl -fsSL -o "$DIR/google-slides.svg" "https://cdn.simpleicons.org/googleslides/FBBC04"
echo "Logos saved to $DIR"
