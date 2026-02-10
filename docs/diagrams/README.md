# Diagrams

This folder contains Mermaid diagrams and their rendered screenshots for use in READMEs.

## Render Mermaid to PNG (no local browser required)

```bash
curl -fsSL -X POST -H 'Content-Type: text/plain' \
  --data-binary @docs/diagrams/ragmap-architecture.mmd \
  https://kroki.io/mermaid/png \
  -o docs/diagrams/ragmap-architecture.png
```

