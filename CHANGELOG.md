# Changelog

## v1.0.0 - 2026-03-01
### Added
- `/rag/top` for smart defaults and fast discovery.
- `/rag/install` for actionable install/config output (supports `streamable-http` and `sse` remotes).
- `/rag/stats` with freshness and reachability coverage metrics.
- Reachability probing for both `streamable-http` and `sse`.
- `reachableMaxAgeHours` filter for "reachable recently" queries.
- Reachability-aware ranking preferences (when `reachable=true`):
  - prefer `streamable-http` over `sse`
  - prefer more recently checked endpoints
- Scheduled reachability refresh runs 4x/day.
- Public watchdog workflow `monitor-freshness` (retries/timeouts + seconds-based thresholds).

### Breaking changes
- None (freshness filtering is opt-in via query param).
