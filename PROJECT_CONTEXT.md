# Project Context: my-eportfolio

## Overview

`my-eportfolio` is a Laravel + Inertia + React application for building and publishing student portfolios.

Core flow:
- Student manages profile data
- Student adds education, skills, and projects
- Student selects a portfolio template
- Student previews the portfolio
- Student publishes the portfolio
- Public visitors view the published portfolio at `/portfolio/{slug}`
- The system tracks basic public view analytics

Primary user roles:
- `student`
- `admin`
- `public visitor`

## Current Source of Truth

This file is based on:
- the PDF handoff imported from ChatGPT
- the current repository contents

When the PDF and the repository disagree, the repository is the source of truth.

Important mismatch already confirmed:
- The PDF says the admin module is not implemented yet.
- The repository already contains admin routes, an admin controller, and admin pages.

Current admin-related files:
- [routes/web.php](/C:/laragon/www/my-eportfolio/routes/web.php:55)
- [app/Http/Controllers/Admin/AdminController.php](/C:/laragon/www/my-eportfolio/app/Http/Controllers/Admin/AdminController.php:12)
- [resources/js/Pages/Admin/Dashboard.jsx](/C:/laragon/www/my-eportfolio/resources/js/Pages/Admin/Dashboard.jsx:1)
- [resources/js/Pages/Admin/Users.jsx](/C:/laragon/www/my-eportfolio/resources/js/Pages/Admin/Users.jsx:1)
- [resources/js/Pages/Admin/Templates.jsx](/C:/laragon/www/my-eportfolio/resources/js/Pages/Admin/Templates.jsx:1)

## Stack

- Laravel 13
- PHP 8.3+ intended by project dependencies
- Inertia.js
- React
- Vite
- Tailwind CSS
- Laravel Sanctum
- SQLite for local development was part of the original plan

## Current Architecture

### Backend

Main web controllers live in `app/Http/Controllers`.

Key controllers:
- `DashboardController`
- `ProfileController`
- `EducationController`
- `SkillController`
- `ProjectController`
- `TemplateController`
- `PortfolioController`
- `Admin/AdminController`

API auth controller:
- `app/Http/Controllers/Api/AuthController.php`

### Frontend

Inertia pages live in `resources/js/Pages`.

Important pages:
- `Dashboard.jsx`
- `Profile.jsx`
- `Templates.jsx`
- `Portfolio.jsx`
- `PublicPortfolio.jsx`
- `PortfolioContent.jsx`
- `Admin/Dashboard.jsx`
- `Admin/Users.jsx`
- `Admin/Templates.jsx`

Reusable components:
- `FormSection.jsx`
- `FormInput.jsx`
- `FormTextarea.jsx`
- `PrimaryButton.jsx`

### Routing

`routes/web.php` handles Inertia pages and web actions.

Important routes:
- `/`
- `/profile`
- `/educations`
- `/skills`
- `/projects`
- `/templates`
- `/templates/{template}/select`
- `/portfolio`
- `/portfolio/publish`
- `/portfolio/{slug}`
- `/admin`
- `/admin/users`
- `/admin/templates`

Important route rule:
- `/portfolio` must stay above `/portfolio/{slug}`.

`routes/api.php` currently exposes auth endpoints and resource routes. It should be treated carefully because it may not match the actual controller method surface.

## Data Model Summary

Main entities:
- `User`
- `Profile`
- `Education`
- `Skill`
- `Project`
- `Template`
- `Portfolio`
- `EngagementStatistic`

Relationships:
- User has one Profile
- User has many Portfolios
- Profile has many Educations
- Profile has many Skills
- Profile has many Projects
- Template has many Portfolios
- Portfolio belongs to User
- Portfolio belongs to Template
- Portfolio has one EngagementStatistic

Important fields:

`profiles`
- `user_id`
- `bio`
- `phone`
- `location`
- `linkedin_url`
- `github_url`
- `website_url`

`educations`
- `profile_id`
- `institution`
- `degree`
- `field_of_study`
- `start_date`
- `end_date`

`skills`
- `profile_id`
- `skill_name`
- `skill_level`

`projects`
- `profile_id`
- `title`
- `description`
- `project_url`

`templates`
- `name`
- `description`
- `is_active`

`portfolios`
- `user_id`
- `template_id`
- `slug`
- `is_published`
- `published_at`

`engagement_statistics`
- `portfolio_id`
- `total_views`
- `most_viewed_section`
- `last_viewed_at`

Business rules:
- Academic data belongs in `educations`, not duplicated in `profiles`
- A user must select a template before publishing
- Public portfolio pages should only show published portfolios
- Public portfolio pages are loaded by slug
- Opening a public portfolio increments `total_views`
- Opening a public portfolio updates `last_viewed_at`

## Intentional Temporary Shortcuts

These are intentional and should not be mistaken for finished architecture:

- Web controllers currently use `User::first()` as a temporary stand-in for authenticated user access
- Frontend auth is intentionally not fully connected yet
- Admin route protection is not fully implemented yet
- Public analytics are currently page-level only
- `most_viewed_section` is intentionally kept in the schema for later expansion

Do not partially replace `User::first()` unless the auth migration is being done consistently across the app.

## Current Functional Status

Based on the repository, these areas exist in some form:

- Student dashboard
- Profile editing
- Education add/delete
- Skill add/delete
- Project add/delete
- Template listing and selection
- Portfolio preview
- Portfolio publishing
- Public portfolio page
- Basic analytics display
- Admin dashboard page
- Admin users page
- Admin templates page

Still unfinished or needing verification:
- Real frontend authentication flow
- Role-based route protection
- Full admin workflow hardening
- Automated feature tests
- Consistent API surface

## Known Risks and Debt

### Authentication

- `User::first()` is used widely in web flows
- Admin routes are present before proper auth/role protection
- API auth exists, but the Inertia frontend is not fully wired to it

### Route and controller alignment

- `routes/api.php` declares `apiResource` routes for controllers that do not appear to implement the full REST method set
- This should be cleaned up before treating the API layer as stable

### Environment

- Project dependencies target newer PHP than the PHP available in the current local runtime used during inspection
- In this workspace, `php artisan test` failed because Composer dependencies require PHP `>= 8.4.0` while the active runtime was PHP `8.0.30`
- Node/Vite version assumptions should be verified on the actual machine before frontend debugging

### Testing

- Test coverage is still close to default scaffold level
- No meaningful feature protection yet for student flow, admin flow, or publish flow

## UI/UX Direction

Preserve this direction unless explicitly changed:

- Clean professional academic style
- White backgrounds
- Dark blue primary color
- Rounded cards
- Light borders and soft shadows
- Public portfolio pages should stay cleaner than internal dashboard pages

Implementation notes:
- `PortfolioContent.jsx` is shared by preview and public pages
- `Portfolio.jsx` should keep preview/publish controls
- `PublicPortfolio.jsx` should remain free of dashboard chrome
- Template differences should affect presentation, not user data shape

## Files to Inspect First

- `routes/web.php`
- `routes/api.php`
- `app/Http/Controllers/DashboardController.php`
- `app/Http/Controllers/ProfileController.php`
- `app/Http/Controllers/TemplateController.php`
- `app/Http/Controllers/PortfolioController.php`
- `app/Http/Controllers/Admin/AdminController.php`
- `app/Models/User.php`
- `app/Models/Profile.php`
- `app/Models/Portfolio.php`
- `app/Models/EngagementStatistic.php`
- `resources/js/Layouts/AppLayout.jsx`
- `resources/js/Pages/Dashboard.jsx`
- `resources/js/Pages/Profile.jsx`
- `resources/js/Pages/Templates.jsx`
- `resources/js/Pages/Portfolio.jsx`
- `resources/js/Pages/PublicPortfolio.jsx`
- `resources/js/Pages/PortfolioContent.jsx`

Files that need extra care:
- `resources/js/Pages/PortfolioContent.jsx`
- `app/Http/Controllers/PortfolioController.php`
- `resources/js/Pages/Profile.jsx`
- `routes/web.php`
- `routes/api.php`
- migrations touching `profiles`

## Do Not Change Yet

- Do not remove `most_viewed_section`
- Do not re-add removed academic fields into `profiles`
- Do not duplicate template rendering logic between preview and public pages
- Do not move controller logic into route closures
- Do not partially wire auth unless replacing all relevant temporary user access consistently
- Do not redesign away the existing portfolio template set without explicit approval
- Do not remove API auth routes unless there is a deliberate replacement plan

## Recommended Next Steps

1. Reconcile the current admin implementation with the original project plan.
2. Audit `routes/api.php` and remove or narrow routes that are not backed by controller methods.
3. Decide whether admin template management is activation-only or full create/edit/delete.
4. Finish missing admin actions and page behavior.
5. Add admin role protection.
6. Choose the final frontend authentication approach.
7. Replace `User::first()` with real authenticated user access in one complete pass.
8. Add feature tests for student flow, admin access, and publishing.
9. Run regression testing across dashboard, profile, templates, preview, publish, and public portfolio.

