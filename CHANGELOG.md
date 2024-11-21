All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased

## [0.2.1] - 2024-11-21
### Added
- Version header in the backend responses.

## [0.2.0] - 2024-11-15
## Added
- JSON5 support for the context input
- Keeping whitespace chars from the response on page.
- Small visual fixes
### Fixed
- Normalization of JSON values for strings for correct handling of `blank` operator

## [0.1.0] - 2024-11-14
### Added
- User-friendly error messages on template parsing errors.
- Copy button for output
- Source code and version number on the frontend
- MIT license text
### Fixed
- Context population with iterable values (renders of for loops)
### Security
- Dependencies bump

## [0.0.0] - 2024-09-09
Initial publication