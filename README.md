# Warriaga Park FC website

Static website for the Warriaga Park Football Club rebuild project
(ISYS3001, Assessment 2). It is a mobile-first club portal covering
membership registration, team and club information, fixtures and results,
and online donations.

## Pages

| File | Page | Purpose |
| --- | --- | --- |
| index.html | Home | Club welcome and links to the main sections |
| team.html | Team | First team squad and coaching / club officials |
| history.html | History | Club milestones and values |
| schedule.html | Schedule | Upcoming fixtures and latest results |
| membership.html | Membership | Membership registration form and fee summary |
| donate.html | Payments | Donation and membership checkout |
| thank-you.html | Thank you | Confirmation shown after a payment |
| contact.html | Contact | Club contact details and message form |
| style.css | - | Shared stylesheet for every page |
| config.js | - | Fees, payment provider and bank details |
| payment.js | - | Checkout behaviour and validation |

## Site structure

Every page shares the same layout blocks so the site stays consistent:

1. header.site-header - the club brand and the main navigation.
2. main#main - the page content.
3. footer.site-footer - the copyright line.

The stylesheet is mobile-first: the base rules target small screens and
min-width media queries add the multi-column layouts at 640px and 900px.

## Running the site locally

There is no build step and there are no dependencies - the pages are plain
HTML and CSS.

1. Download or clone this repository.
2. Open index.html in a browser.

To preview over a local web server instead (recommended, because the pages
use relative links), run `python -m http.server 8000` in the project folder
and open http://localhost:8000/.

## Deployment

The repository is published with GitHub Pages from the `main` branch. Any
push to `main` is published automatically, so changes should be made on a
feature branch and merged through a pull request.

## Branching and commit conventions

* `main` - always deployable; protected, changes arrive through pull requests.
* `feature/<topic>` - one branch per task, for example
  `feature/team-and-history-pages`.
* Commit messages follow `type: short description`, for example
  `feat: add team and history pages`.

## Payments

The payment page collects the amount, frequency, donor details and payment
method, and shows a live summary. It supports one-off and monthly donations
and membership fee payments (`donate.html?purpose=membership&type=adult`).

The site is static, so it cannot sign a PayFast request on its own. To switch
card payments on:

1. Deploy a small checkout function that receives the JSON payload from
   `payment.js`, adds the merchant credentials and signed fields, and returns
   `{ "redirectUrl": "..." }`.
2. Put its URL in `config.js` as `payment.checkoutEndpoint`.
3. Test it in sandbox mode first, then change `payment.mode` to `live`.

Until that endpoint is set, the page says that card payments are not switched
on and offers bank transfer instead. Bank details are read from
`config.js` and stay hidden until the club treasurer fills them in.

## Content ownership

Squad names, shirt numbers and the history timeline are placeholders. Replace
them with the club's verified records before the site goes live (see the HTML
comments in team.html and history.html).

## Accessibility and browser support

The pages use semantic HTML, a "skip to main content" link, labelled form
fields and visible focus outlines. Layouts have been checked at mobile
(375px) and desktop widths in current versions of Chrome and Edge.
