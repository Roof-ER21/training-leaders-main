#!/usr/bin/env node

/**
 * Content Sanitization Utility
 *
 * Automatically sanitizes text content by replacing curly/smart quotes
 * and other problematic Unicode characters with standard ASCII equivalents.
 *
 * This prevents Babel parser errors when using template literals in TypeScript.
 *
 * Usage:
 *   node scripts/sanitizeContent.js <input-file> [output-file]
 *
 * If output-file is not specified, it will overwrite the input file.
 */

const fs = require('fs');
const path = require('path');

// Map of problematic Unicode characters to ASCII replacements
const REPLACEMENTS = {
  // Single quotes
  '\u2018': "'",  // ' LEFT SINGLE QUOTATION MARK
  '\u2019': "'",  // ' RIGHT SINGLE QUOTATION MARK
  '\u201A': "'",  // ‚ SINGLE LOW-9 QUOTATION MARK
  '\u201B': "'",  // ‛ SINGLE HIGH-REVERSED-9 QUOTATION MARK
  '\u2032': "'",  // ′ PRIME

  // Double quotes
  '\u201C': '"',  // " LEFT DOUBLE QUOTATION MARK
  '\u201D': '"',  // " RIGHT DOUBLE QUOTATION MARK
  '\u201E': '"',  // „ DOUBLE LOW-9 QUOTATION MARK
  '\u201F': '"',  // ‟ DOUBLE HIGH-REVERSED-9 QUOTATION MARK
  '\u2033': '"',  // ″ DOUBLE PRIME

  // Dashes
  '\u2013': '-',  // – EN DASH
  '\u2014': '-',  // — EM DASH
  '\u2015': '-',  // ― HORIZONTAL BAR

  // Other common problematic characters
  '\u2026': '...', // … HORIZONTAL ELLIPSIS
};

/**
 * Sanitizes a string by replacing Unicode characters with ASCII equivalents
 * @param {string} content - The content to sanitize
 * @returns {string} Sanitized content
 */
function sanitizeContent(content) {
  let sanitized = content;
  let replacementCount = 0;

  for (const [oldChar, newChar] of Object.entries(REPLACEMENTS)) {
    const regex = new RegExp(oldChar, 'g');
    const matches = (sanitized.match(regex) || []).length;
    if (matches > 0) {
      replacementCount += matches;
      sanitized = sanitized.replace(regex, newChar);
    }
  }

  return { sanitized, replacementCount };
}

/**
 * Sanitizes a JSON object recursively
 * @param {any} obj - The object to sanitize
 * @returns {object} { sanitized: object, replacementCount: number }
 */
function sanitizeJSON(obj) {
  let totalReplacements = 0;

  function sanitizeRecursive(item) {
    if (typeof item === 'string') {
      const { sanitized, replacementCount } = sanitizeContent(item);
      totalReplacements += replacementCount;
      return sanitized;
    } else if (Array.isArray(item)) {
      return item.map(sanitizeRecursive);
    } else if (typeof item === 'object' && item !== null) {
      const sanitized = {};
      for (const [key, value] of Object.entries(item)) {
        sanitized[key] = sanitizeRecursive(value);
      }
      return sanitized;
    }
    return item;
  }

  const sanitized = sanitizeRecursive(obj);
  return { sanitized, replacementCount: totalReplacements };
}

// CLI execution
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error('Usage: node sanitizeContent.js <input-file> [output-file]');
    process.exit(1);
  }

  const inputPath = path.resolve(args[0]);
  const outputPath = args[1] ? path.resolve(args[1]) : inputPath;

  if (!fs.existsSync(inputPath)) {
    console.error(`Error: Input file not found: ${inputPath}`);
    process.exit(1);
  }

  try {
    const content = fs.readFileSync(inputPath, 'utf-8');
    const ext = path.extname(inputPath).toLowerCase();

    if (ext === '.json') {
      // Handle JSON files
      const json = JSON.parse(content);
      const { sanitized, replacementCount } = sanitizeJSON(json);

      fs.writeFileSync(outputPath, JSON.stringify(sanitized, null, 2), 'utf-8');

      console.log(`✅ Successfully sanitized JSON file: ${inputPath}`);
      console.log(`   Replaced ${replacementCount} problematic characters`);
      if (outputPath !== inputPath) {
        console.log(`   Output written to: ${outputPath}`);
      }
    } else {
      // Handle text files
      const { sanitized, replacementCount } = sanitizeContent(content);

      fs.writeFileSync(outputPath, sanitized, 'utf-8');

      console.log(`✅ Successfully sanitized file: ${inputPath}`);
      console.log(`   Replaced ${replacementCount} problematic characters`);
      if (outputPath !== inputPath) {
        console.log(`   Output written to: ${outputPath}`);
      }
    }
  } catch (error) {
    console.error(`Error processing file: ${error.message}`);
    process.exit(1);
  }
}

// Export for programmatic use
module.exports = { sanitizeContent, sanitizeJSON, REPLACEMENTS };
