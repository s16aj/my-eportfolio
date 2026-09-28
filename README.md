# MyE-Portfolio

*Smart E-Portfolio Builder and Hosting Platform*

MyE-Portfolio is a Laravel and React application for creating and publishing a professional portfolio. Users can manage profile details, education, skills, projects, and portfolio content through a streamlined interface.

## Overview

This project supports a complete portfolio workflow for students and graduates: create an account, build a personal profile, select a portfolio template, and publish a shareable public page. The application also includes admin access for managing users and template content.

## Key Features

### User Features

- User registration and login with Laravel authentication
- Profile management with bio, contact details, links, and image upload
- Education, skill, and project records tied to the user profile
- Portfolio template selection and publishing workflow
- Public portfolio page with a unique slug for sharing
- Portfolio engagement tracking for views and recent activity

### Admin Features

- Admin-only access control and dashboard views
- User management for reviewing application accounts
- Template management for portfolio layouts

## Technology Stack

- PHP 8.4
- Laravel 13.8
- React 19
- Inertia.js
- Tailwind CSS
- Vite
- Laravel Sanctum
- SQLite for the default local development configuration in this repository

## Application Architecture

The application uses a Laravel backend with a React front end connected through Inertia.js. Laravel handles authentication, routing, models, middleware, and data persistence, while the React UI manages the dashboard, profile editor, portfolio management screens, and public portfolio presentation.

## Core Data Model

The main entities in the application are:

- User
- Profile
- Education
- Skill
- Project
- Template
- Portfolio
- EngagementStatistic

These models support the portfolio lifecycle: a user owns a profile, profile content feeds the portfolio, and published portfolio records store the public-facing presentation and engagement data.

## Getting Started

Clone the repository and install the PHP and Node dependencies:

```bash
git clone <repository-url>
cd my-eportfolio
composer install
npm install
```

For a fresh local setup, the repository also includes a setup script that performs the bootstrap steps automatically:

```bash
composer run setup
```

This script does the following:

- installs Composer dependencies
- copies `.env.example` to `.env` if the file is missing
- generates the Laravel application key
- runs `php artisan migrate --force`
- installs Node dependencies
- runs `npm run build`

## Environment Setup

This repository includes an `.env.example` file as the base for local environment configuration. Create a local environment file before running the app:

```bash
cp .env.example .env
php artisan key:generate
```

The repository defaults to SQLite for local development, as shown in `.env.example`:

```env
DB_CONNECTION=sqlite
```

A fresh clone does not require `php artisan db:seed` for normal app startup. The required database setup is `php artisan migrate`.

## Running the Application

From the project root:

```bash
php artisan serve
npm run dev
```

If you want to use the repository's bundled bootstrap command instead, run:

```bash
composer run setup
```
