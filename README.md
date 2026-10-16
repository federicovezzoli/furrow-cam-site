# furrow.cam

The landing page of [Furrow CAM](https://github.com/federicovezzoli/furrow-cam), an open source, web-based 2.5D CAM for CNC routers. The app itself lives at [app.furrow.cam](https://app.furrow.cam) and in its own repository; this repository only holds the marketing site at [furrow.cam](https://furrow.cam).

Built with [Astro](https://astro.build) and Tailwind CSS: static HTML, no JavaScript shipped, no tracking. It uses the app's visual language (JetBrains Mono, greys, square corners) and follows the system's light or dark theme.

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
src/components/           Header, Hero, Features, Machines, OpenSource, Footer
src/layouts/Layout.astro  <head>: title, description, Open Graph
src/lib/links.ts          every outbound URL (app, GitHub, privacy policy)
src/styles/global.css     Tailwind theme: font, colours, dark mode
```

Facts on the page (features, machine presets, supported controllers) must match what the app actually ships; check the app's README and releases when updating them.

## Deployment

Deployed on Vercel as its own project, separate from the app, on `furrow.cam` (DNS on Cloudflare). Vercel detects Astro and builds `dist/` with no configuration or environment variables.

## License

[MIT](LICENSE) © 2026 Federico Vezzoli
