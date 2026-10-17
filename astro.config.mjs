// @ts-check
import { defineConfig, envField } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://furrow.cam',
  env: {
    schema: {
      // GoatCounter endpoint, e.g. https://<code>.goatcounter.com/count. Unset: no analytics.
      PUBLIC_GOATCOUNTER_URL: envField.string({ context: 'client', access: 'public', optional: true, url: true })
    }
  },
  vite: {
    plugins: [tailwindcss()]
  }
});
