#!/bin/bash
# Updates the version number in index.html from ODINv2 package.json
# Called during the build process

PACKAGE_JSON="ODINv2/package.json"
INDEX_HTML="index.html"

if [ ! -f "$PACKAGE_JSON" ]; then
  echo "Warning: $PACKAGE_JSON not found, skipping version update"
  exit 0
fi

# Extract version from package.json (strip quotes and trailing commas)
VERSION=$(grep '"version"' "$PACKAGE_JSON" | head -1 | sed 's/.*"version": *"//;s/".*//')

if [ -z "$VERSION" ]; then
  echo "Warning: Could not extract version from $PACKAGE_JSON"
  exit 0
fi

# Remove pre-release suffixes (e.g., 3.2.0-rc1 → 3.2.0)
CLEAN_VERSION=$(echo "$VERSION" | sed 's/-.*//')

echo "Updating version in $INDEX_HTML to $CLEAN_VERSION"
sed -i "s/Current version: <strong>[^<]*<\/strong>/Current version: <strong>$CLEAN_VERSION<\/strong>/" "$INDEX_HTML"
