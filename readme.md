# this project follows course https://authentic8.udemy.com/course/nextjs-by-example/learn/lecture/37953034#overview

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
