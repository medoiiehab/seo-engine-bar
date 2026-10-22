# seo-engine-bar

A lightweight SEO analysis function and React component for checking page titles, meta descriptions, URL slugs, and content against a focus keyword.

## Install

```bash
npm install seo-engine-bar react react-dom @phosphor-icons/react
```

The React component uses Tailwind CSS utility classes. Configure Tailwind in your application for its styling to appear.

## Quick start

```tsx
import { SEOBar, analyzeSEO } from "seo-engine-bar";

const result = analyzeSEO({
  title: "A guide to better SEO for your website",
  description: "Learn practical ways to improve search visibility and write useful content for your audience.",
  slug: "better-seo-guide",
  focusKeyword: "SEO",
  bodyText: "Your page content goes here.",
});

console.log(result.score, result.details);

function SeoPanel() {
  return (
    <SEOBar
      title="A guide to better SEO for your website"
      description="Learn practical ways to improve search visibility and write useful content for your audience."
      slug="better-seo-guide"
      focusKeyword="SEO"
      bodyText="Your page content goes here."
      domain="example.com"
    />
  );
}
```

## Links

- [Author: medoiiehab (Medo Ehab || Lin)](https://github.com/medoiiehab)
- [MIT License](https://opensource.org/license/mit/)
- **Live Demo:** [seo-engine-app.mehab.workers.dev](https://seo-engine-app.mehab.workers.dev) *(Deployed on Cloudflare Pages)*
- **Example Code:** [github.com/medoiiehab/Seo-Engine-App](https://github.com/medoiiehab/seo-tiptap-app)
