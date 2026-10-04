# Configuration guide

This document lists the configuration items for the Warriaga Park FC website
and explains what has to be changed when the club updates the site or connects
new services.

## 1. Files that make up the site

| File | Purpose | When it changes |
| --- | --- | --- |
| index.html | Club home page and links to the main sections | When club news or the entry points change |
| team.html | First team squad, coach and club officials | When the squad or officials change |
| history.html | Club milestones and values | When the club records a new milestone |
| schedule.html | Upcoming fixtures and latest results | After every match |
| membership.html | Membership registration form | When fees or form fields change |
| donate.html | Donation call to action | When the donation link changes |
| style.css | Shared stylesheet for all pages | When the look of the site changes |
| README.md | How to run, preview and deploy the site | When the workflow changes |
| CHANGELOG.md | Record of every change to the site | On every release |

## 2. Settings and where they are held

| Setting | Where it is set | Value in this deployment |
| --- | --- | --- |
| Published site address | GitHub Pages settings | https://carry8573.github.io/warriaga-fc-website/ |
| Publishing branch | GitHub Pages settings | main |
| Membership fees | Option labels in membership.html | Adult R200, Junior R100, Family R350 per year |
| Season year | index.html, membership.html, team.html | 2026 |
| Membership form destination | Not connected yet | To be pointed at the club's form service before go-live |
| Donation payment link | Not connected yet | To be set when the club confirms the payment gateway |
| Club contact details | Not published yet | To be added when the club confirms them |

## 3. Rules for configuration

1. Credentials, passwords, API keys and bank details are never committed to
   this repository.
2. Form endpoints and payment keys are held in the settings of the form or
   payment provider, not in the site files.
3. Membership fees, the donation link and club contact details are only
   changed after the club committee approves the change.

## 4. How to change the site safely

1. Create a feature branch, for example `git switch -c feature/update-fixtures`.
2. Make and test the change locally.
3. Open a pull request describing the change.
4. Merge the pull request into `main`; GitHub Pages republishes the site
   automatically.
5. Record the change in `CHANGELOG.md`.

## 5. Previewing the site locally

Run `python -m http.server 8000` in the project folder and open
http://localhost:8000/ in a browser.
