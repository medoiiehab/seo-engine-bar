export interface SEOInput {
  title?: string;
  description?: string;
  slug?: string;
  focusKeyword?: string;
  bodyText?: string;
}

export interface SEOIssue {
  type: "critical" | "warning" | "good";
  message: string;
}

export interface SEOResult {
  score: number;
  details: SEOIssue[];
}

export function analyzeSEO(input: SEOInput): SEOResult {
  const { title = "", description = "", slug = "", focusKeyword = "", bodyText = "" } = input;
  let score = 0;
  const details: SEOIssue[] = [];
  const keyword = focusKeyword.trim().toLowerCase();

  // 1. Title Analysis (Max 25 pts)
  if (!title) {
    details.push({ type: "critical", message: "Add a title to your content." });
  } else {
    if (title.length >= 30 && title.length <= 60) {
      score += 20;
      details.push({ type: "good", message: "Title length is optimal (30–60 chars)." });
    } else if (title.length < 30) {
      score += 10;
      details.push({ type: "warning", message: "Title is too short (min 30 chars)." });
    } else {
      score += 10;
      details.push({ type: "warning", message: "Title is too long (max 60 chars)." });
    }

    if (keyword) {
      if (title.toLowerCase().includes(keyword)) {
        score += 5;
        details.push({ type: "good", message: "Focus keyword appears in title." });
      } else {
        details.push({ type: "warning", message: "Focus keyword should appear in title." });
      }
    }
  }

  // 2. Description Analysis (Max 25 pts)
  if (!description) {
    details.push({ type: "critical", message: "Add a meta description." });
  } else {
    if (description.length >= 120 && description.length <= 160) {
      score += 20;
      details.push({ type: "good", message: "Meta description length is optimal (120–160 chars)." });
    } else if (description.length < 120) {
      score += 10;
      details.push({ type: "warning", message: "Meta description is too short (min 120 chars)." });
    } else {
      score += 10;
      details.push({ type: "warning", message: "Meta description is too long (max 160 chars)." });
    }

    if (keyword) {
      if (description.toLowerCase().includes(keyword)) {
        score += 5;
        details.push({ type: "good", message: "Focus keyword appears in meta description." });
      } else {
        details.push({ type: "warning", message: "Focus keyword should appear in meta description." });
      }
    }
  }

  // 3. Slug Analysis (Max 25 pts)
  if (!slug) {
    details.push({ type: "critical", message: "Add a URL slug." });
  } else {
    if (/^[a-z0-9-]+$/.test(slug)) {
      score += 15;
      details.push({ type: "good", message: "URL slug format is valid." });
    } else {
      details.push({ type: "warning", message: "Slug must contain only lowercase letters, numbers, and hyphens." });
    }

    if (keyword && slug.toLowerCase().includes(keyword.replace(/\s+/g, "-"))) {
      score += 10;
      details.push({ type: "good", message: "Focus keyword is included in the URL slug." });
    }
  }

  // 4. Content Density Analysis (Max 25 pts - Enhancement)
  if (bodyText) {
    const wordCount = bodyText.trim().split(/\s+/).length;
    if (wordCount >= 300) {
      score += 15;
      details.push({ type: "good", message: `Word count is good (${wordCount} words).` });
    } else {
      details.push({ type: "warning", message: `Content is thin (${wordCount} words). Aim for at least 300 words.` });
    }

    if (keyword) {
      const matches = (bodyText.toLowerCase().match(new RegExp(keyword, "g")) || []).length;
      const density = (matches / wordCount) * 100;
      if (density >= 0.5 && density <= 2.5) {
        score += 10;
        details.push({ type: "good", message: `Keyword density is optimal (${density.toFixed(1)}%).` });
      } else if (density > 2.5) {
        details.push({ type: "warning", message: `Keyword density is high (${density.toFixed(1)}%). Avoid keyword stuffing.` });
      }
    }
  } else if (!keyword) {
    details.push({ type: "warning", message: "Set a focus keyword to evaluate keyword placement." });
  }

  return { score: Math.min(score, 100), details };
}