CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE
);

INSERT INTO
    users (name, email)
VALUES (
        'John Doe',
        'john.doe@example.com'
    );

INSERT INTO
    users (name, email)
VALUES (
        'Jane Smith',
        'jane.smith@example.com'
    );