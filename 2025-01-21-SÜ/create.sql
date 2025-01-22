CREATE TABLE persons (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      firstname TEXT,
      lastname TEXT,
      displayname TEXT,
      email TEXT NOT NULL,
      sex TEXT NOT NULL,
      birthdate TEXT,
      zodiacsign TEXT
    );