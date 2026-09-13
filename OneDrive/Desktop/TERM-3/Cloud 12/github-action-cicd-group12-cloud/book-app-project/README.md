# Book Collection App

> This README is intentionally rough so you can improve it as part of the lab.

A Python app for managing books you have or want to read.
It can add, remove, and list books. Also mark them as read.

---

## Current Features

* Reads books from a JSON file (our database)
* Input checking is weak in some areas
* Some tests exist but probably not enough

---

## Files

* `book_app.py` - Main CLI entry point
* `books.py` - BookCollection class with data logic
* `utils.py` - Helper functions for UI and input
* `data.json` - Sample book data
* `tests/test_books.py` - Starter pytest tests

---

## Running the App

```bash
python book_app.py list
python book_app.py add
python book_app.py find
python book_app.py remove
python book_app.py help
```

## Running Tests

```bash
python -m pytest tests/
```

## Improvements

Main improvements needed:

* Fix data.json handling in `books.py`: use a path relative to the app,
  not the current working directory.
* Make saves safer: write atomically to avoid corrupting the JSON file.
* Add stronger I/O handling for read/write failures, not just
  missing/corrupt JSON.
* Validate book data before saving: reject blank title/author and bad years.
* Align CLI with docs: README says "mark as read," but `book_app.py`
  has no such command.
* Improve UX in `handle_remove()`: report whether a book was actually removed.
* Remove global collection state; create it in `main()` for cleaner
  structure/testing.
* Expand tests for persistence, invalid input, corrupt data, and CLI behavior.

---

## Notes

* Not production-ready (obviously)
* Some code could be improved
* Could add more commands later

## Acknowledgments

The core Python application used in this lab is adapted from the
[GitHub Copilot for Beginners](https://github.com/microsoft/github-copilot-for-beginners)
repository, modified to include CI/CD configurations and lab-specific
instructions.

Original work Copyright (c) Microsoft Corporation.
