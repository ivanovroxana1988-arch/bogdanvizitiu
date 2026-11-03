CREATE TABLE IF NOT EXISTS chat_reservations (
  id TEXT PRIMARY KEY,
  month TEXT NOT NULL,
  day TEXT NOT NULL,
  client_window TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS chat_month ON chat_reservations(month);
CREATE INDEX IF NOT EXISTS chat_day ON chat_reservations(day);
CREATE INDEX IF NOT EXISTS chat_client_window ON chat_reservations(client_window);
