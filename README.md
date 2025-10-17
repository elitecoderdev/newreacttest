# Advanced Articles App

## Stack

React 18, Vite, TypeScript, React Router 6, Redux Toolkit, React Query, MSW, Zod, Vitest, Cypress.

## Run

npm i
npm run dev

## Architecture

Domain models and ports in src/domain. Infrastructure adapters in src/infra implementing ports through HTTP backed by MSW. Features are vertical slices under src/features, each holding UI, hooks, and state. Global UI and favorites in Redux. Server interactions in React Query only.

## State Split

Redux holds theme, global loading, and favorites persisted to localStorage. React Query manages remote cache for list, detail, create, update, and rate.

## Routing

/articles list with pagination and filters
/articles/categories category and subcategory browser
/articles/:id detail with rating and favorites
/articles/new create
/articles/:id/edit edit

## Error Handling

Global loading derives from React Query active fetch count. Error views for not-found and failed requests. MSW simulates the API and supports filtering, pagination, and mutations.

## Testing

Vitest unit and integration tests. Cypress happy path and not-found error path.

### Unit & Integration (Vitest)

* Run all tests (headless):

  ```bash
  npm run test
  ```
* Watch mode:

  ```bash
  npm run test:watch
  ```

> Notes
> • Tests run in a `jsdom` environment.
> • Path aliases work in tests via `vitest.config.ts` + `vite-tsconfig-paths`.
> • Integration tests mock the repository with `vi.mock(...)` so they don’t depend on the server.

---

### End-to-End (Cypress)

#### 1) Start the app (Terminal 1)

```bash
npm run dev
# app at http://localhost:5173
```

#### 2) Run Cypress (Terminal 2)

Open the interactive runner:

```bash
npm run cypress:open
```

Then pick a browser (Chrome/Firefox) and run the specs.

Headless run:

```bash
npm run cypress:run
# Firefox headless:
# npx cypress run --browser firefox --e2e
```

#### How E2E tests work here

* During Cypress runs, **MSW is disabled** in the app (we detect `window.Cypress` in `src/main.tsx`).
* Tests **stub all network** using `cy.intercept(...)` (e.g., `GET /api/categories`, `POST /api/articles`, `POST /rate`, etc.).
* React Query **retries are disabled** under Cypress in `src/app/queryClient.ts` so error UIs render immediately without flicker.


## MSW (Mock Service Worker)

The app uses MSW in **development** (not in Cypress) to simulate the backend.

* If you see `[MSW] Failed to register the Service Worker: The operation is insecure` or a 404 for `/mockServiceWorker.js`, generate the worker file:

  ```bash
  npx msw init public --save
  ```

  This creates `public/mockServiceWorker.js`. Restart `npm run dev` afterward.

* Make sure you’re visiting the app via **[http://localhost](http://localhost)** (not `file://`) and that `public/mockServiceWorker.js` is served.

* MSW is started in `src/main.tsx` only in dev and when not under Cypress:

  * Dev: the worker starts and serves `/api/*` endpoints.
  * Cypress: the worker is **not** started; tests control the network with `cy.intercept`.
