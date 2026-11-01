# HomeFinder

A single-page property listings app for home buyers in India. Browse apartments, villas and plots across Bangalore, Pune, Hyderabad, Chennai and Mumbai, filter them by search text, type and price, and open any listing for full details.

Built as a practice project to show **React + TypeScript**, **Material UI**, **REST API integration** and **automated testing**.

![HomeFinder screenshot](docs/screenshot.png)

> _Screenshot placeholder: add a screenshot at `docs/screenshot.png`._

## Tech stack

| Area | Tools |
| --- | --- |
| Build | Vite 5 |
| UI | React 18, TypeScript (strict) |
| Components & styling | Material UI v6 (`@mui/material`, `@mui/icons-material`), Emotion |
| Data | `fetch()` against a mock REST endpoint (`/public/data/listings.json`) |
| State | Redux Toolkit + React-Redux for shared state (filters, saved listings); React hooks (`useState`, `useEffect`, `useMemo`) and one custom hook for local state and data fetching |
| Testing | Vitest, React Testing Library, `@testing-library/user-event`, jsdom |

## Features

- **App bar** with the app name, a "Saved (n)" count and a light/dark mode toggle (starts from your OS setting)
- **Filter bar**
  - Search by title or city
  - Property type select (All, Apartment, Villa, Plot)
  - Price range slider, from the cheapest to the most expensive listing
  - Reset filters button (disabled when nothing is filtered)
- **Sorting**: newest first, price low to high, or price high to low (MUI Select)
- **Saved listings**: a heart button on every card saves or unsaves it; saved listings are kept in `localStorage` so they survive a reload
- **Responsive listings grid**: 1 column on mobile, 2 on tablet, 3 on desktop
- **Listing cards** with image, price in INR (`₹75,00,000`), title, location, beds, baths, area and a type chip
- **Details dialog** with full facts, price per sq ft and a description (full screen on phones)
- **UI states**
  - Loading: skeleton cards that match the real card layout
  - Error: an Alert with a Retry button that refetches
  - Empty: a friendly message with a "Clear all filters" button
- **Accessibility**: labelled inputs, `aria-label`s on icon buttons, visible keyboard focus rings, a live result count for screen readers, semantic list/article markup

## Folder structure

```
public/
  data/listings.json        # mock REST endpoint (12 listings)
src/
  components/
    Header.tsx              # AppBar + dark mode toggle
    FilterBar.tsx           # search, type select, price slider, reset
    ListingGrid.tsx         # responsive grid of cards
    ListingCard.tsx         # one listing
    ListingDetailsDialog.tsx
    ListingSkeleton.tsx     # loading placeholders
    EmptyState.tsx
    ErrorState.tsx
    SortSelect.tsx          # "Sort by" dropdown
  store/
    index.ts                # configureStore, RootState/AppDispatch types, localStorage sync
    filtersSlice.ts         # search, type, price range, reset
    savedSlice.ts           # save / unsave a listing
    persistSaved.ts         # read/write saved ids in localStorage
    hooks.ts                # typed useAppSelector / useAppDispatch
  hooks/
    useListings.ts          # fetch + loading/error state + refetch
  services/
    listingsApi.ts          # the fetch() call
  types/
    listing.ts              # Listing and ListingFilters interfaces
  utils/
    formatPrice.ts          # INR formatting (pure)
    filterListings.ts       # filtering logic (pure)
    sortListings.ts         # sorting logic (pure)
    *.test.ts               # unit tests sit next to the code they test
  test/
    renderWithProviders.tsx # renders with a fresh Redux store per test
    setup.ts                # adds jest-dom matchers to Vitest
    fixtures.ts             # small test data set
  theme.ts                  # custom MUI theme (light + dark)
  App.tsx                   # wires data, filters and UI together
  App.test.tsx              # integration tests for the whole app
```

## Getting started

Requires Node.js 18 or newer.

```bash
npm install
npm run dev
```

Then open http://localhost:4130.

Other scripts:

```bash
npm run build      # type-check with tsc, then build for production into dist/
npm run preview    # serve the production build locally
```

## Running tests

```bash
npm test           # run all tests once
npm run test:watch # re-run tests when files change
```

What is covered:

- `filtersSlice.test.ts`: each filter action updates the state, and `resetFilters` restores the defaults
- `formatPrice.test.ts`: `7500000` becomes `₹75,00,000`, plus lakh/crore short forms
- `filterListings.test.ts`: filtering by search text, type and price range, and all three combined
- `App.test.tsx` (with `fetch` mocked by `vi.fn`):
  - skeletons show while loading, then the cards render
  - a failed request shows the error Alert, and Retry calls `fetch` again
  - typing in the search box filters the cards
  - the empty state appears when nothing matches
  - choosing a sort option reorders the cards
  - saving a listing updates the heart, the "Saved (n)" count, the store and localStorage
  - "View details" opens the dialog for the right listing

## Deploying to Vercel

The repo includes a [`vercel.json`](vercel.json), so deploying needs no extra settings:

1. Go to [vercel.com/new](https://vercel.com/new) and import this GitHub repository.
2. Keep the detected defaults and click **Deploy**.

What the config does:

- Installs with `npm ci` (exact versions from `package-lock.json`).
- Builds with `npm test && npm run build`, so **a failing test stops the deploy**.
- Serves the static `dist/` folder. Hashed JS/CSS files in `/assets` are cached for a year; `/data/listings.json` is always revalidated so data edits show up immediately.

Every push to `main` redeploys automatically, and pull requests get their own preview URL.

## Notes

- Images come from [picsum.photos](https://picsum.photos) with fixed seeds, so they are stable placeholders rather than real property photos.
- To connect a real backend, change `LISTINGS_URL` in `src/services/listingsApi.ts`. Nothing else needs to change.

## What I learned

- _Placeholder: what was new to you about moving from design to code?_
- _Placeholder: something you learned about Material UI theming._
- _Placeholder: how custom hooks changed the way you structure components._
- _Placeholder: what writing tests taught you about your own code._
- _Placeholder: what you would add next (pagination, sorting, favourites, URL-synced filters…)._
