import React, { useState, useEffect } from "react";
import { CheckCircle, TrendUp, WarningCircle } from "@phosphor-icons/react";
import { analyzeSEO, SEOInput } from "./core";

export interface SEOBarProps extends SEOInput {
  domain?: string;
  onChange?: (keyword: string) => void;
}

export const SEOBar: React.FC<SEOBarProps> = ({
  title = "",
  description = "",
  slug = "",
  focusKeyword: initialKeyword = "",
  bodyText = "",
  domain = "example.com",
  onChange,
}) => {
  const [keyword, setKeyword] = useState(initialKeyword);

  // Keep state synced if parent updates focusKeyword prop externally
  useEffect(() => {
    setKeyword(initialKeyword);
  }, [initialKeyword]);

  const result = analyzeSEO({ title, description, slug, focusKeyword: keyword, bodyText });

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setKeyword(val);
    if (onChange) onChange(val);
  };

  const getScoreColor = () => {
    if (result.score >= 80) return "border-green-500 bg-green-50/20";
    if (result.score >= 60) return "border-yellow-500 bg-yellow-50/20";
    return "border-red-500 bg-red-50/20";
  };

  return (
    <div className={`border-l-4 p-4 rounded-lg shadow-sm ${getScoreColor()}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {result.score >= 80 ? (
            <CheckCircle size={20} className="text-green-600" />
          ) : result.score >= 60 ? (
            <TrendUp size={20} className="text-yellow-600" />
          ) : (
            <WarningCircle size={20} className="text-red-600" />
          )}
          <h3 className="font-semibold text-sm">SEO Preview & Score</h3>
        </div>
        <span className="text-lg font-bold">{result.score}/100</span>
      </div>

      {/* Focus Keyword Input */}
      <div className="mb-4">
        <label className="block text-xs font-medium mb-1">Focus Keyword</label>
        <input
          type="text"
          value={keyword}
          onChange={handleKeywordChange}
          placeholder="e.g. remote developer"
          className="w-full px-3 py-1.5 text-sm rounded border focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Issues Breakdown */}
      <div className="space-y-2 mb-4">
        {result.details.map((item, idx) => (
          <div
            key={idx}
            className={`text-xs p-2 rounded flex items-center gap-2 ${
              item.type === "critical"
                ? "bg-red-100 text-red-800"
                : item.type === "warning"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-green-100 text-green-800"
            }`}
          >
            • {item.message}
          </div>
        ))}
      </div>

      {/* Search Result Preview */}
      <div className="p-3 bg-white border rounded shadow-inner text-xs">
        <p className="text-gray-500 truncate">{domain} › {slug || "url-slug"}</p>
        <p className="text-blue-700 font-medium text-sm truncate">{title || "Page Title"}</p>
        <p className="text-gray-600 line-clamp-2">{description || "Meta description will appear here..."}</p>
      </div>
    </div>
  );
};