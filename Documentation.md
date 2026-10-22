# seo-engine-bar documentation

`seo-engine-bar` provides a small SEO scoring function and a React component for displaying the results alongside an editing interface.

## Installation

Install the package and its peer dependencies:

```bash
npm install seo-engine-bar react react-dom @phosphor-icons/react
```

The `SEOBar` component is built with React and uses icons from `@phosphor-icons/react`. It uses Tailwind CSS utility classes for its appearance; configure Tailwind in your application if you want those classes to be styled.

## Choose an API

- Use `analyzeSEO` to get a score and a list of findings in your own interface or application logic.
- Use `SEOBar` to show an interactive keyword input, the score and findings, and a search-result preview in a React application.

Both exports are available from the package root:

```ts
import { analyzeSEO, SEOBar } from "seo-engine-bar";
```

## Analyze content

Pass the page information to `analyzeSEO`. Each input property is optional and defaults to an empty string.

```ts
import { analyzeSEO } from "seo-engine-bar";

const result = analyzeSEO({
  title: "A practical guide to website SEO",
  description: "Learn how to improve your website's search visibility with clear, useful content.",
  slug: "website-seo-guide",
  focusKeyword: "website SEO",
  bodyText: "Add the plain-text content of your page here.",
});

console.log(result.score);   // A score from 0 to 100
console.log(result.details); // Findings with a type and message
```

The function evaluates title and description length, focus keyword placement, slug format, and (when body text is supplied) content length and keyword density. It is a rule-based guide, not a substitute for a search engine or a guarantee of search rankings.

## Use the React component

The component is useful alongside a form or editor. Pass the current values as props to keep its preview and analysis up to date.

```tsx
import { useState } from "react";
import { SEOBar } from "seo-engine-bar";

export function ContentEditor() {
  const [focusKeyword, setFocusKeyword] = useState("website SEO");

  return (
    <SEOBar
      title="A practical guide to website SEO"
      description="Learn how to improve your website's search visibility with clear, useful content."
      slug="website-seo-guide"
      focusKeyword={focusKeyword}
      bodyText="Add the plain-text content of your page here."
      domain="example.com"
      onChange={setFocusKeyword}
    />
  );
}
```

`onChange` is called when the visitor edits the focus keyword in the component. If the parent later changes `focusKeyword`, the component updates its input to match.

### Styling

`SEOBar` uses Tailwind CSS class names and does not provide a separate stylesheet. Make sure your Tailwind setup scans the package's compiled files if it removes unused classes during production builds. You can also use `analyzeSEO` to build a custom interface without using `SEOBar`.

## API reference

### `analyzeSEO(input)`

Accepts an `SEOInput` object and returns an `SEOResult`.

```ts
interface SEOInput {
  title?: string;
  description?: string;
  slug?: string;
  focusKeyword?: string;
  bodyText?: string;
}

interface SEOResult {
  score: number;
  details: SEOIssue[];
}

interface SEOIssue {
  type: "critical" | "warning" | "good";
  message: string;
}
```

The score is capped at 100. Findings describe the checks that were evaluated; some checks, such as content length and keyword density, depend on providing `bodyText` and a focus keyword.

### `SEOBar` props

`SEOBar` accepts the `SEOInput` properties and these additional props:

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `domain` | `string` | `"example.com"` | Domain displayed in the search-result preview. |
| `onChange` | `(keyword: string) => void` | Not set | Called when the focus keyword input changes. |

The `SEOInput` properties are:

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` | `""` | Page or article title to analyze and preview. |
| `description` | `string` | `""` | Meta description to analyze and preview. |
| `slug` | `string` | `""` | URL slug to analyze and preview. |
| `focusKeyword` | `string` | `""` | Keyword checked against the title, description, slug, and content. |
| `bodyText` | `string` | `""` | Plain-text page content used for content checks. |

## Scoring checks

The engine checks the following areas, with up to 25 points available for each:

- **Title:** length (30–60 characters) and focus keyword placement.
- **Meta description:** length (120–160 characters) and focus keyword placement.
- **Slug:** lowercase letters, numbers, and hyphens, plus focus keyword placement.
- **Content:** at least 300 words and, when a focus keyword is set, keyword density between 0.5% and 2.5%.

These thresholds are simple editorial signals and may not reflect every search engine's recommendations or the needs of every page.

## Links

- [Author: medoiiehab (Medo Ehab || Lin)](https://github.com/medoiiehab)
- [MIT License](https://opensource.org/license/mit/)
