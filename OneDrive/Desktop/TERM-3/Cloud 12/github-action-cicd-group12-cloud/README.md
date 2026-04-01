# CI/CD Demo Lab with Super Linter

A hands-on lab demonstrating CI/CD pipelines using
[GitHub Super Linter](https://github.com/super-linter/super-linter) and GitHub Actions.

## Project Structure

```text
.
├── .github/
│   ├── linters/              # Linter configuration files
│   │   ├── ruff.toml         # Ruff (Python linter/formatter) config
│   │   └── .mypy.ini         # Mypy (type checker) config
│   └── workflows/
│       ├── ci.yml            # CI: run pytest across Python 3.10–3.12
│       └── super-linter.yml  # Super Linter: lint Python, JSON, YAML, Markdown
├── book-app-project/         # Sample Python application
│   ├── book_app.py
│   ├── books.py
│   ├── utils.py
│   ├── data.json
│   ├── pyproject.toml
│   └── tests/
└── README.md
```

## CI/CD Pipelines

Both workflows trigger on every push to any branch and on pull requests
targeting `main`.

### Super Linter (`super-linter.yml`)

Uses [super-linter/super-linter@v7](https://github.com/super-linter/super-linter)
scoped to the `book-app-project/` directory to validate:

| Linter         | What it checks               |
|----------------|------------------------------|
| `ruff`         | Python style, imports, bugs  |
| `mypy`         | Python type annotations      |
| `jsonlint`     | JSON syntax                  |
| `yamllint`     | YAML syntax and style        |
| `markdownlint` | Markdown formatting          |

The workflow has `statuses: write` permission so it posts a pass/fail status
directly on commits and pull requests.

### CI Tests (`ci.yml`)

Runs `pytest` with coverage across a **matrix** of Python versions simultaneously:

- Python 3.10
- Python 3.11
- Python 3.12

This ensures the application stays compatible with current Python releases.

After each run, a `coverage-report-python-<version>` artifact is uploaded
(retained for 14 days). Download it from the Actions run summary and open
`index.html` for a line-by-line coverage breakdown.

## Code Quality Configuration

### Mypy (static type checking)

Configured in `.github/linters/.mypy.ini`:

- **`python_version = 3.10`** — targets Python 3.10 syntax and features.
- **`disallow_untyped_defs = true`** — every function must have full type hints.
- **`ignore_missing_imports = true`** — suppresses errors for third-party libs
  without type stubs.
- **`warn_return_any = true`** — warns when a typed function returns `Any`.
- **`warn_unused_ignores = true`** — flags stale `# type: ignore` comments.

### Ruff (linting and formatting)

Configured in `.github/linters/ruff.toml`:

- **`target-version = "py310"`** — enforces Python 3.10 standards.
- **Enabled rule families:**
  - `E` / `W` (pycodestyle) — formatting and style warnings.
  - `F` (pyflakes) — unused variables, undefined names, unused imports.
  - `I` (isort) — alphabetized and grouped import statements.
  - `UP` (pyupgrade) — modernizes syntax (e.g., old-style formatting to f-strings).
  - `B` (flake8-bugbear) — common design problems and subtle runtime bugs.
- **`known-first-party`** — marks `books` and `utils` as internal modules for
  correct import grouping.

## Running Locally

```bash
cd book-app-project
pip install pytest pytest-cov ruff mypy

# Run tests with coverage
pytest tests/ -v --cov=. --cov-report=term-missing

# Lint with ruff
ruff check .

# Type-check with mypy
mypy .
```

## How to Proceed with This Lab

### Goal

The goal of this lab is to experience a real CI/CD workflow end-to-end:
push code, watch the pipeline catch errors, fix them, and merge clean code
into the main branch.

The `main` branch contains a working Python app that has **intentional code
quality issues** — outdated imports and missing type annotations. Your job is
to fix them so the CI pipeline passes, then merge your changes.

---

### Why Do These Changes Matter?

Before diving in, here's the "why" behind each type of fix you'll make:

**1. Outdated imports (`typing` → `collections.abc` and built-in types)**

Older Python code used `from typing import List, Optional, Callable`. Since
Python 3.9+, these are no longer needed — you can use `list`, `X | None`,
and `collections.abc.Callable` directly. Our linter (`ruff` rule `UP035`)
enforces this modern style because it's simpler and faster.

**2. Type annotations (`-> None`, typed parameters)**

Python doesn't require type hints, but adding them makes your code easier to
read, catches bugs before runtime, and is enforced by `mypy`. For example:

```python
# Before — mypy has no idea what this returns
def print_menu():
    ...

# After — clear contract: this function returns nothing
def print_menu() -> None:
    ...
```

Our `.mypy.ini` sets `disallow_untyped_defs = true`, which means **every
function must have type hints** or the CI pipeline will fail.

---

### Step-by-Step Instructions

#### Step 1 — Set up branch protection on `main`

Before starting, protect the `main` branch so it can only be merged via a
passing PR. In your fork:

1. Go to **Settings → Branches → Add branch ruleset**
2. Target `main`
3. Enable **"Require status checks to pass"** and select:
   - `Lint Code Base`
   - `Run Tests`
4. Enable **"Require a pull request before merging"**
5. Save

#### Step 2 — Create your working branch

```bash
git checkout main
git pull
git checkout -b fix/code-quality
```

#### Step 3 — Fix the Ruff linting errors

Open the files below and make the following changes.

**`book-app-project/book_app.py`**

```python
# Before
from typing import Callable, Sequence

# After
from collections.abc import Callable, Sequence
```

**`book-app-project/books.py`**

```python
# Before
from dataclasses import dataclass, asdict
from typing import List, Optional

# After — remove the typing import entirely, sort the dataclasses import
from dataclasses import asdict, dataclass
```

Then update the type annotations inside the class:

```python
# Before
self.books: List[Book] = []
def list_books(self) -> List[Book]:
def find_book_by_title(self, title: str) -> Optional[Book]:
def find_by_author(self, author: str) -> List[Book]:
with open(DATA_FILE, "r") as f:

# After
self.books: list[Book] = []
def list_books(self) -> list[Book]:
def find_book_by_title(self, title: str) -> Book | None:
def find_by_author(self, author: str) -> list[Book]:
with open(DATA_FILE) as f:          # "r" is the default, so remove it
```

**`book-app-project/utils.py`**

Add a trailing newline at the end of the file (the last line must end with
`\n`). Most editors do this automatically when you save.

#### Step 4 — Fix the Mypy type annotation errors

Add missing return types and parameter types to all untyped functions.

**`book-app-project/books.py`** — add `-> None` to the three methods that
don't return a value:

```python
def __init__(self) -> None:
def load_books(self) -> None:
def save_books(self) -> None:
```

**`book-app-project/utils.py`** — add return types and a typed parameter:

```python
from books import Book          # add this import at the top

def print_menu() -> None:
def get_book_details() -> tuple[str, str, int]:
def print_books(books: list[Book]) -> None:
```

**`book-app-project/tests/test_books.py`** and
**`book-app-project/tests/test_utils.py`**

Add `-> None` to every test function, and type the pytest fixture parameters:

```python
from pathlib import Path        # add this import

# Fixture
def use_temp_data_file(tmp_path: Path, monkeypatch: pytest.MonkeyPatch) -> None:

# All test functions
def test_add_book() -> None:
def test_mark_book_as_read() -> None:
# ... and so on
```

Also add a `None` guard before accessing a book that might not exist:

```python
book = collection.find_book_by_title("Dune")
assert book is not None   # add this line
assert book.read is True
```

#### Step 5 — Push and watch the CI pipeline

```bash
git add .
git commit -m "Fix ruff and mypy linting errors"
git push -u origin fix/code-quality
```

Go to the **Actions** tab on GitHub and watch both workflows run:

- **Super Linter** — checks Ruff, Mypy, JSON, YAML, and Markdown
- **CI** — runs pytest across Python 3.10, 3.11, and 3.12

If anything fails, read the error output, fix it locally, and push again.

#### Step 6 — Open a Pull Request to `main`

Once all checks are green, open a PR from `fix/code-quality` → `main`.
Because of branch protection, GitHub will **block the merge** until all
required checks pass. Once they do, merge it — you've completed the lab! 🎉

---

### Verify Your Work Locally (Optional)

Run the same checks the CI pipeline runs, before pushing:

```bash
cd book-app-project
pip install pytest pytest-cov ruff mypy

# Check imports and style
ruff check --config ../.github/linters/ruff.toml .

# Check type annotations
mypy --config-file ../.github/linters/.mypy.ini .

# Run tests
pytest tests/ -v
```

---

### Reference Solution

If you get stuck, the complete solution is available on the
[`solution` branch](../../tree/solution). A
[reference pull request](../../pulls) is also open showing every change
with the CI checks passing — use it to compare your work, not to copy it.

## Acknowledgments

The core Python application used in this lab is adapted from the
[GitHub Copilot for Beginners](https://github.com/microsoft/github-copilot-for-beginners)
repository, modified to include CI/CD configurations and lab-specific instructions.

Original work Copyright (c) Microsoft Corporation.
