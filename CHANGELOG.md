# Changelog

All notable changes to this project are recorded in this file. The format
follows Keep a Changelog, and the project uses semantic versioning.

## [Unreleased]

### Added

- team.html: first team squad table plus coaching and club official cards.
- history.html: club milestone timeline and club values.
- Home page cards linking to every section of the site.
- Skip-to-content links, a shared footer and a mobile-first responsive layout.
- CHANGELOG.md so that changes are documented for configuration management.

### Changed

- style.css: rewritten with CSS custom properties, responsive navigation,
  card, table, timeline and form styles.
- All pages: consistent header, navigation and footer; viewport meta tag and
  page description added to every page.
- membership.html: form controls now use explicit for/id labels and
  autocomplete hints; the same fields, options and prices are kept.
- schedule.html: fixture and result lists presented as tables; the same
  dates, opponents and scores are kept.
- README.md: project structure, local preview and branch conventions.

### Fixed

- Removed the fixed-position footer that overlapped page content on short pages.
- Added the missing viewport meta tag to the sub-pages so they scale on mobile.

## [1.0.0] - 2026-10-04

### Added

- Initial static site: index.html, membership.html, schedule.html,
  donate.html and style.css.
