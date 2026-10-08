# this project follows course https://authentic8.udemy.com/course/nextjs-by-example/learn/lecture/37953034#overview

Instructor
Mirko Nasato
Software Developer and Mentor
Mirko has 20 years of experience developing software for a wide range of companies, from startups to large, high-profile organisations, more recently as Lead Developer and Architect.

He is familiar with a number of programming languages and the full application stack, from backend services to web and mobile apps. Mirko also holds a Postgraduate Diploma in Software Development from the Open University.

## Fonts

The Orbitron display font is **self-hosted** and wired up through Tailwind v4's
CSS-first configuration. There is no `next/font` import and no request to
Google's CDN at runtime.

Three files are involved, each with one job:

| File | Role |
|---|---|
| `public/fonts/orbitron-variable.woff2` | The font itself (11.7 KB, variable, weights 400–900) |
| `app/globals.css` | `@font-face` declares it; `@theme` exposes it to Tailwind |
| `app/layout.jsx` | Preloads it so the download starts early |

### 1. Declaring the font

In `app/globals.css`:

```css
@import 'tailwindcss';

@font-face {
  font-family: 'Orbitron';
  src: url('/fonts/orbitron-variable.woff2') format('woff2');
  font-weight: 400 900;
  font-style: normal;
  font-display: swap;
}

@theme {
  --font-orbitron: 'Orbitron', ui-sans-serif, system-ui, sans-serif;
}
```

`@theme` is Tailwind v4's CSS-first config. Any variable in the `--font-*`
namespace automatically generates a matching utility class — `--font-orbitron`
gives you `font-orbitron`. No `tailwind.config.js` needed.

Two details that are easy to get wrong:

- **`font-weight: 400 900`, not `normal`.** Orbitron is a *variable* font: that
  single file contains the whole 400–900 range. Declaring `normal` would tell
  the browser the file only holds weight 400, so `font-bold` and `font-semibold`
  would render synthesized fake-bold instead of the real designed weights.
- **No `unicode-range`.** Google's own CSS includes it because it splits fonts
  into one file per subset and needs to pick between them. We ship a single
  file, so a `unicode-range` would only cause silent fallback for characters
  outside it.

### 2. Preloading

In `app/layout.jsx`:

```jsx
<head>
  <link
    rel="preload"
    href="/fonts/orbitron-variable.woff2"
    as="font"
    type="font/woff2"
    crossOrigin="anonymous"
  />
</head>
```

Without this, the browser can't discover the font until it has downloaded *and
parsed* `globals.css` — a wasted round trip before the fetch even starts. The
preload scanner spots it while parsing the initial HTML instead, so the font
downloads in parallel with the CSS.

**`crossOrigin="anonymous"` is required even though the font is same-origin.**
Browsers always fetch fonts in CORS mode, so a preload without it counts as a
*different* request than the one `@font-face` later makes — the file gets
downloaded twice and the preload accomplishes nothing. Chrome warns about this
in the console.

### 3. Using it

Just a utility class, anywhere:

```jsx
<h1 className="font-orbitron font-bold text-2xl">Reviews</h1>
```

### Adding another font

1. Grab the `.woff2`. Fetch Google's CSS with a modern browser User-Agent to get
   the real file URL, then download it into `public/fonts/`:

   ```sh
   curl -s -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) \
     AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" \
     "https://fonts.googleapis.com/css2?family=FONT_NAME&display=swap"
   ```

   The UA matters — send a plain `curl` UA and Google hands back legacy `.ttf`
   instead of `.woff2`.

2. Add an `@font-face` block and a `--font-<name>` line under `@theme` in
   `app/globals.css`.
3. Add a preload `<link>` in `app/layout.jsx`.
4. Use `font-<name>` in your components.

## Gotcha: don't run `build` and `dev` at the same time

`npm run build` and `npm run dev` both write to `.next/`. Running a build while
the dev server is up overwrites its chunks mid-flight, and every route starts
returning 500 with `Cannot find module './NNN.js'`.

Recovery:

```sh
rm -rf .next && npm run dev
```

## Deployment

The app can be deployed in two configurations. Both read reviews from the
Strapi CMS (`CMS_URL` in `lib/reviews.js`, currently `http://localhost:1337`),
so the CMS must be reachable from wherever the data is fetched:

| Configuration | When data is fetched | Needs Node.js in production? | CMS must be reachable |
|---|---|---|---|
| Fully static | Once, at build time | No | From the build machine |
| Fully dynamic | On every request | Yes | From the server, at runtime |

### 1. Fully static site

Every page is rendered to plain HTML at build time and written to `out/`. The
result can be served by any static host (Nginx, S3 + CloudFront, GitHub/GitLab
Pages, Netlify, …). New or edited reviews only appear after a rebuild.

**Configure**

1. In `next.config.js`, enable static export and turn off the image optimizer
   (it needs a server, so `next build` fails with `next/image` otherwise):

   ```js
   const nextConfig = {
     output: 'export',
     images: {
       unoptimized: true,
       remotePatterns: [ /* unchanged */ ],
     },
   };
   ```

2. In `app/reviews/[slug]/page.jsx`, restore `generateStaticParams` so Next.js
   knows which review pages to pre-render, and remove the `dynamic` export:

   ```jsx
   export async function generateStaticParams() {
       const slugs = await getSlugs();
       return slugs.map(slug => ({ slug }));
   }
   ```

3. In `app/reviews/page.jsx`, remove the `dynamic` export as well.
   (`force-dynamic` is incompatible with `output: 'export'` and fails the build.)

**Build**

Start the CMS, then:

```sh
npm ci
npm run build        # writes the static site to out/
```

**Preview locally**

```sh
npx serve out
```

**Deploy**

Upload the contents of `out/` to your static host. Two things to know:

- Image URLs point at `CMS_URL`, so the CMS (or wherever its `/uploads` are
  served from) must be publicly reachable — `localhost:1337` will not work for
  real visitors.
- `app/not-found.jsx` is exported as `out/404.html`. Configure your host to
  serve it for unknown paths (most static hosts pick it up automatically; for
  Nginx use `error_page 404 /404.html;`).

### 2. Fully dynamic site (Node.js)

Every request is rendered on the server, so reviews published in the CMS appear
immediately without a rebuild. Requires a Node.js runtime (the same major
version you develop with) in production.

**Configure**

1. In `next.config.js`, keep `output: 'export'` commented out (the default).
   Image optimization works here, but add the production CMS host to
   `images.remotePatterns`.

2. Make the review pages render per request. The route segment config must be
   **exported** to take effect:

   ```jsx
   // app/reviews/page.jsx and app/reviews/[slug]/page.jsx
   export const dynamic = 'force-dynamic';
   ```

   Leave `generateStaticParams` commented out in `app/reviews/[slug]/page.jsx`.
   Unknown slugs are handled at request time: `getReview` returns `null` and
   the page calls `notFound()`, which renders `app/not-found.jsx`.

**Build and run**

With the CMS reachable from the server:

```sh
npm ci
npm run build
npm start            # serves on http://localhost:3000
```

Change the port or bind address with `npm start -- -p 8080 -H 0.0.0.0`
(or the `PORT` environment variable).

**Deploy**

- Copy the project (or build on the target machine), then run `npm ci` and
  `npm run build` there. `npm start` needs `.next/`, `public/`,
  `next.config.js`, `package.json` and `node_modules/`.
- Run `npm start` under a process manager (systemd, PM2, or a container
  orchestrator) so it restarts on crash and on reboot.
- Put a reverse proxy (Nginx, a load balancer) in front for TLS termination.
- The CMS is called on every request — if it is down, review pages return 500.
