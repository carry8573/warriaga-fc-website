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
| membership.html | Membership registration form and fee summary | When fees or form fields change |
| donate.html | Payment page for donations and membership fees | When the payment options change |
| thank-you.html | Confirmation page shown after a payment | Rarely; wording only |
| contact.html | Club contact details and message form | When contact details change |
| style.css | Shared stylesheet for all pages | When the look of the site changes |
| config.js | Site settings: fees, payment provider, bank details | When a setting or fee changes |
| payment.js | Checkout behaviour: amounts, summary, validation | When the payment flow changes |
| README.md | How to run, preview and deploy the site | When the workflow changes |
| CHANGELOG.md | Record of every change to the site | On every release |

## 2. Settings and where they are held

| Setting | Where it is set | Value in this deployment |
| --- | --- | --- |
| Published site address | GitHub Pages settings | https://carry8573.github.io/warriaga-fc-website/ |
| Publishing branch | GitHub Pages settings | main |
| Membership fees | config.js (membershipFees) and the option labels in membership.html | Adult R200, Junior R100, Family R350 per year |
| Season year | index.html, membership.html, team.html | 2026 |
| Membership form destination | Not connected yet | To be pointed at the club's form service before go-live |
| Payment provider | config.js (payment.provider, payment.mode) | PayFast, sandbox |
| Checkout endpoint | config.js (payment.checkoutEndpoint) | Empty: card payments are disabled and the page offers bank transfer |
| Bank transfer details | config.js (bank) | Not published yet; shown only when the treasurer confirms them |
| Club contact details | Not published yet | To be added when the club confirms them |

## 3. Rules for configuration

1. Credentials, passwords, API keys and merchant secrets are never committed
   to this repository, including config.js.
2. The payment provider signature cannot be created in the browser. It is
   produced by the checkout service behind `payment.checkoutEndpoint`, which
   holds the merchant key in its own environment settings.
3. Bank account details are only added to config.js after the club treasurer
   confirms them.
4. Membership fees, the payment settings and club contact details are only
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
