
# Library Books REST API

## Overview

This document describes a REST API for managing books in a library.

Example book object:

```json
{
  "id": 1,
  "title": "Things Fall Apart",
  "author": "Chinua Achebe",
  "publishedYear": 1958
}
```

Base URL:

`https://api.example.com`

## 1. List All Books

- **Method:** GET
- **Endpoint:** `/books`
- **Description:** Retrieves a list of all books in the library.
- **Request body:** Not required.
- **Success status:** `200 OK`

## 2. Retrieve a Single Book

- **Method:** GET
- **Endpoint:** `/books/{id}`
- **Description:** Retrieves a single book using its ID.
- **Request body:** Not required.
- **Success status:** `200 OK`

Example endpoint:

`GET /books/1`

## 3. Create a New Book

- **Method:** POST
- **Endpoint:** `/books`
- **Description:** Creates a new book in the library.
- **Request body:**

```json
{
  "title": "The River Between",
  "author": "Ngugi wa Thiong'o",
  "publishedYear": 1965
}
```

- **Success status:** `201 Created`

The server assigns an ID to the newly created book.

## 4. Update an Existing Book

- **Method:** PUT
- **Endpoint:** `/books/{id}`
- **Description:** Updates an existing book using its ID.
- **Request body:**

```json
{
  "title": "The River Between",
  "author": "Ngugi wa Thiong'o",
  "publishedYear": 1965
}
```

- **Success status:** `200 OK`

## 5. Delete a Book

- **Method:** DELETE
- **Endpoint:** `/books/{id}`
- **Description:** Deletes a book using its ID.
- **Request body:** Not required.
- **Success status:** `204 No Content`

A successful deletion returns no response body.

## 6. List Books by Author

- **Method:** GET
- **Endpoint:** `/books?author={author}`
- **Description:** Retrieves books written by the specified author.
- **Request body:** Not required.
- **Success status:** `200 OK`

Example endpoint:

`GET /books?author=Chinua%20Achebe`

The `author` query parameter specifies which author's books should be returned.

## Error Codes

### 400 Bad Request

The request contains invalid data or is missing required fields.

Example: Creating a book without the required title or author.

### 404 Not Found

The requested resource does not exist.

Example: Requesting `GET /books/999` when no book has ID `999`.
