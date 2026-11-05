CREATE TABLE IF NOT EXISTS chat_reservations (
  id TEXT PRIMARY KEY,
  month TEXT NOT NULL,
  day TEXT NOT NULL,
  client_window TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS chat_month ON chat_reservations(month);
CREATE INDEX IF NOT EXISTS chat_day ON chat_reservations(day);
CREATE INDEX IF NOT EXISTS chat_client_window ON chat_reservations(client_window);

-- Only daily aggregate categories and salted deduplication keys; never question text.
CREATE TABLE IF NOT EXISTS chat_metrics (
 day TEXT NOT NULL, kind TEXT NOT NULL, dimension TEXT NOT NULL,
 is_test INTEGER NOT NULL DEFAULT 0, value INTEGER NOT NULL DEFAULT 0,
 PRIMARY KEY(day,kind,dimension,is_test)
);
CREATE TABLE IF NOT EXISTS chat_metric_events (
 event_key TEXT PRIMARY KEY, day TEXT NOT NULL, is_test INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS chat_metric_events_day ON chat_metric_events(day);
