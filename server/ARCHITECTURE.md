# CHTTRIX SERVER ARCHITECTURE — BINDING

Status: ACTIVE  
Effective Date: 2026-01-31  

## Source of Truth
The directory `/server/src` is the **ONLY** authoritative backend architecture.

## Legacy Code
The following directories are **FROZEN** and READ-ONLY:

- /server/controllers
- /server/routes
- /server/models
- /server/socket.js

## Rules
- No new features in legacy code
- No bug fixes in legacy code
- Legacy code exists ONLY for migration reference

## Migration
All backend development MUST occur under:

/server/src/features  
/server/src/modules  
/server/src/socket  
/server/src/shared  

Violations are considered architectural regressions.
