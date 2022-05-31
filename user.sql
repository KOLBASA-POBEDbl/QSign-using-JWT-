/*
first_name (required, only letters),
last_name (only letters),
email (required, unique, correct format),
phone (correct format),
password (hash)
*/

create TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL DEFAULT NULL CHECK (first_name !~~ '%[0-9]%'),
    last_name VARCHAR(255) CHECK (last_name !~~ '%[0-9]%'),
    email VARCHAR(255) NOT NULL DEFAULT NULL UNIQUE CHECK (email ~~ '%@%.%'),
    phone VARCHAR(13) NOT NULL CHECK (phone ~ '^\d+?$'),
    password VARCHAR(1024) NOT NULL
);