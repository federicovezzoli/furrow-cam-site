# furrow.cam

The landing page of [Furrow CAM](https://github.com/federicovezzoli/furrow-cam), an open source, web-based 2.5D CAM for CNC routers. The app itself lives at [app.furrow.cam](https://app.furrow.cam) and in its own repository; this repository only holds the marketing site at [furrow.cam](https://furrow.cam).

Built with [Astro](https://astro.build) and Tailwind CSS: static HTML and no JavaScript beyond a cookieless [GoatCounter](https://www.goatcounter.com) page-view beacon and a small inline script that points the hero's desktop download at the visitor's system. It uses the app's visual language (JetBrains Mono, greys, square corners) and follows the system's light or dark theme.

## Development

Requirements: Node.js 24 (see `.nvmrc`) and pnpm 11 (`corepack enable`).

```sh
pnpm install
pnpm dev       # http://localhost:4321
pnpm build     # type-check (astro check) and build to dist/
pnpm preview   # serve the built site
```

## Layout

```
src/pages/index.astro     the page, assembled from the sections below
src/components/           Header, Hero, Features, Machines, Download, OpenSource, Footer
src/layouts/Layout.astro  <head>: title, description, Open Graph
src/lib/links.ts          every outbound URL (app, GitHub, desktop downloads and releases, privacy policy)
src/components/Analytics.astro  GoatCounter page-view beacon
src/styles/global.css     Tailwind theme: font, colours, dark mode
```

The desktop download links point at `download.furrow.cam/<platform>`, which redirects to the newest `@furrow/desktop` installer: a new desktop release needs no change here.

Facts on the page (features, machine presets, supported controllers) must match what the app actually ships; check the app's README and releases when updating them.

## Deployment

Deployed on Vercel as its own project, separate from the app, on `furrow.cam` (DNS on Cloudflare). Vercel detects Astro and builds `dist/` with no configuration. Set `PUBLIC_GOATCOUNTER_URL` (e.g. `https://<code>.goatcounter.com/count`, see `.env.example`) to count page views; when it is unset, as in development, nothing is counted.

The hero shows the newest `@furrow/web` version, fetched from GitHub's releases at build time. The app's release workflow rebuilds the site after each web release through a Vercel deploy hook, stored in the app repository as the `SITE_DEPLOY_HOOK` secret.

## License

[MIT](LICENSE) © 2026 Federico Vezzoli
