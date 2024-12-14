# Voz Local Website Doc


## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
pnpm run dev
```

## Building

To create a production version of your app:

```bash
pnpm run build
```

BEFORE merging on develop check if everything is ok
```bash
pnpm run preview
```


## Git Workflow 

Let's keep this repository clean guys, these are your git commandments, follow them!


---
## Branching Strategy

### Main Branches
- **`main`**: 
  - Always contains production-ready code.
  - All changes must be merged via Pull Requests (PRs) with proper review and testing.
  - Used for tagging releases.

- **`develop`**:
  - Contains the latest stable development code.
  - Feature branches are merged here after testing and review.

### Supporting Branches
- **Feature Branches**:
  - For new features or enhancements.
  - Branch from `develop` and merge back into `develop`.
  - Naming convention: `feature/short-description` (e.g., `feature/add-user-auth`).

- **Bugfix Branches**:
  - For fixing non-critical bugs.
  - Branch from `develop` and merge back into `develop`.
  - Naming convention: `bugfix/short-description` (e.g., `bugfix/fix-pagination`).

- **Hotfix Branches**:
  - For urgent fixes on production (`main`).
  - Branch from `main`, then merge into both `main` and `develop`.
  - Naming convention: `hotfix/short-description` (e.g., `hotfix/fix-critical-bug`).

---

