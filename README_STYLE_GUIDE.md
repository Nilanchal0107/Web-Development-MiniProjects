# README Style Guide — Scrimba Fullstack Path Projects
> **For AI use only.** Derived by analysing all README files in folders 03 through 07.
> Use this document to generate new READMEs without looking at previous ones.

---

## 1. Title and Badge Block

Every README opens with a **project name heading** followed immediately by a horizontal row of **shields.io badges**. No blank line between `# Title` and the badges.

### Title Format
```
# <ProjectName> — <ModuleName>
```
Examples:
- `# Skynet Eats — Accessible Development`
- `# FoolsGold — Essential CSS NFT Site`
- `# Cookie Consent — Essential JavaScript`
- `# Intro to APIs — APIs and Async JavaScript`

### Badge Pattern
Always include ALL of the following badge categories (in this order):

| Badge | Purpose |
|-------|---------|
| HTML | `![HTML](https://img.shields.io/badge/HTML-<label>-orange?style=flat-square&logo=html5)` |
| CSS | `![CSS](https://img.shields.io/badge/CSS-<label>-blue?style=flat-square&logo=css3)` |
| JavaScript | `![JavaScript](https://img.shields.io/badge/JavaScript-<label>-yellow?style=flat-square&logo=javascript)` *(if JS used)* |
| Google Font | `![Google Fonts](https://img.shields.io/badge/Google%20Fonts-<FontName>-red?style=flat-square&logo=googlefonts)` |
| Status | `![Status](https://img.shields.io/badge/Status-Completed-brightgreen?style=flat-square)` |
| Course | `![Course](https://img.shields.io/badge/Scrimba-Fullstack%20Path-purple?style=flat-square)` |

Add **extra technology badges** as needed (e.g., ES Modules, fetch, REST API, Media Queries, Font Awesome, UUID).

**Label values by module:**
- HTML/CSS modules → `HTML-Structure`, `CSS-Essential`, `CSS-Styling`
- JS modules → `JavaScript-Essential` or `JavaScript-ES6`
- A11y module → `HTML-Semantic`, `A11y-WCAG%202.1`
- Responsive → add `![Responsive](https://img.shields.io/badge/Responsive-Mobile%20First-green?style=flat-square)`
- APIs module → add fetch, JSON, REST API badges

---

## 2. Introductory Paragraph (always 2 sentences)

Right after the badges, write **exactly two sentences**:
1. Describe what the project IS (type of page/app, its name, the module it belongs to).
2. State what the README IS (always: `"This README is written as a complete concept revision guide. Reading it top to bottom will revise every <X> concept introduced in this module, comparing what is new here against <previous work>."`)

**Template:**
```
A <short project description> — the **<Project Name>** project from **Scrimba's Fullstack Web Development Path**.

This README is written as a **complete concept revision guide**. Reading it top to bottom will revise every <topic> concept introduced in this module, comparing what is new here against the <previous modules> covered in earlier folders.
```

---

## 3. Horizontal Rule

Always `---` after the intro paragraph (and between every major section).

---

## 4. Table of Contents

Always present. Format:
```markdown
# Table of Contents

1. [Project Overview](#1-project-overview)
2. [Project Structure](#2-project-structure)
3. [What is "<Module Name>"?](#3-what-is-module-name)   ← or "What's New vs Previous Projects"
4. [What's New vs Previous Projects](#4-whats-new-vs-previous-projects)
5. [<Core Topic A>](#5-core-topic-a)
   - [Sub-topic](#51-sub-topic)
   - [Sub-topic](#52-sub-topic)
6. [<Core Topic B>](#6-core-topic-b)
...
N-2. [HTML Structure Recap](#n-2-html-structure-recap)
N-1. [How to Run](#n-1-how-to-run)
N.   [Course Reference](#n-course-reference)
```

**Rules:**
- TOC is **always numbered**, starting at 1.
- Sub-sections use decimal notation: `5.1`, `5.2`, etc.
- Last 2 entries are always **How to Run** and **Course Reference**.
- There is always an entry for **Project Overview**, **Project Structure**, **What's New vs Previous Projects**, and **HTML Structure Recap**.

---

## 5. Section 1 — Project Overview

**Always `# 1. Project Overview`**

Structure:
- 1-2 sentences describing the fictional/satirical project theme.
- A **bullet list** of what the page/app contains (sections, components, interactive elements).
- A closing sentence starting with: *"The goal of this module is not just to build a page — it is to..."* OR *"The real goals are: ..."*

**Template:**
```
<ProjectName> is a <fictional/satirical description>. The page includes:

* A **<component>** with <description>
* A **<component>** with <description>
* A **<component>** with <description>

The goal of this module is not just to build a page — it is to <learn what skill/concept>.
```

---

## 6. Section 2 — Project Structure

**Always `# 2. Project Structure`**

Always rendered as a **fenced code block** (plain text, not markdown). Uses ASCII tree art.

**Template:**
```
```
<FolderNumber>. <Module Name>/
│
└── <ProjectSubfolder>/
    ├── index.html      → <short description of what HTML does>
    ├── index.css       → <short description of what CSS does>
    ├── index.js        → <short description of what JS does>  ← only if JS project
    └── images/
        ├── <filename>  → <purpose>
        └── <filename>  → <purpose>
```
```

**Rules:**
- Each file gets an inline `→` comment explaining its role.
- Sub-folders (like `css/`, `images/`) are shown with their contents.
- The path starts from the module folder number, not from the repo root.

---

## 7. Section 3 — "What is X?" OR Module Context

This section is titled either:
- `# 3. What is "<Module Name>"?` — when the module topic needs defining (e.g., "What is 'Essential CSS'?", "What is an API?")
- `# 3. How This Project Differs From Previous Ones` — for later projects in the same module

**Content format for "What is X?":**
- 1–2 sentences defining the concept.
- A **markdown table** listing the key categories/properties and their descriptions.
- A closing note (blockquote `>`) about the scope of the module.

---

## 8. Section 4 — "What's New vs Previous Projects"

**Always `# 4. What's New vs Previous Projects`** (exact title, or `# 3. What's New vs Cookie Consent` when comparing to the immediately preceding project in the same module).

**Always contains one or more tables:**

```markdown
## New <Technology> Concepts

| Concept/Property | Where Used | Purpose |
|-----------------|------------|---------|
| `code` | Location in project | What it does |
```

**Rules:**
- **Separate tables** for each technology (HTML, CSS, JavaScript).
- Table columns are always: **Concept** | **Where Used** | **Purpose**.
- Concepts are always in backtick code format.
- When comparing to the immediately previous project (not just "previous projects"), add a **comparison table** at the top:

```markdown
| Feature | <ProjectA> | <ProjectB> |
|---------|------------|------------|
| <feature> | <value A> | <value B> |
```

---

## 9. Core Content Sections (5 through N-3)

These sections cover the **specific concepts** taught in the module. They follow this consistent pattern:

### 9.1 Section Heading Pattern
```
# 5. <Topic Name>
## 5.1 <Sub-topic>
```
- Top-level sections use `#` (h1).
- Sub-sections use `##` (h2).
- Sub-sub-sections use `###` (h3).

### 9.2 Always Start With a Code Example
Every sub-section **immediately shows a code block** before any explanation.

```markdown
## 5.1 `<property-or-concept-name>`

```css
/* or js or html */
element {
    property: value;
}
```

<Explanation paragraph>
```

### 9.3 Explanation Format
After the code block:
1. **1–3 sentences** explaining what it is and what it does.
2. A **markdown table** if there are multiple values, variants, or comparisons.
3. A **blockquote** (`>`) for the key insight, rule, or "best practice" note.

### 9.4 Common Table Patterns

**Comparison table (variants of a property):**
```markdown
| Value | Effect |
|-------|--------|
| `value-a` | Description |
| `value-b` | Description |
```

**When to use X vs Y:**
```markdown
| Use `<X>` when... | Use `<Y>` when... |
|-------------------|-------------------|
| condition A | condition B |
| condition C | condition D |
```

**Properties introduced table:**
```markdown
| Property | Where Used | Purpose |
|----------|------------|---------|
```

### 9.5 Blockquote Rules
- Used for: **best practices**, **gotchas**, **rules of thumb**, **accessibility notes**, **important distinctions**.
- Format: `> <sentence starting with a strong verb or "Never/Always/Note/Rule">`.
- Placed at the **end** of a sub-section, never at the top.

### 9.6 "Before vs After" Diagrams
Used to explain positioning, layout, or visual effects. Always uses ASCII art:
```
Without <property>:
┌──────────────────┐
│  element         │
   ← gap here
┌──────────────────┐

With <property>:
┌──────────────────┐
│  element         │
┌──────────────────┐
```

### 9.7 "Bad vs Good" Code Patterns
For anti-patterns vs correct patterns:
```markdown
```html
<!-- ❌ Bad — reason -->
<bad-element>...</bad-element>

<!-- ✅ Good — reason -->
<good-element>...</good-element>
```
```

---

## 10. Section N-2 — HTML Structure Recap

**Always `# N-2. HTML Structure Recap`** (second-to-last content section, before How to Run).

Always shown as a **fenced ASCII tree inside a code block**, showing the complete HTML document structure with inline comments:

```
```
<!DOCTYPE html>
<html>
├── <head>
│   ├── <title>...</title>
│   ├── <link> → Google Fonts
│   └── <link> → stylesheet
│
└── <body>
    ├── <nav>
    │   └── ...
    ├── <main>
    │   ├── <section class="hero">
    │   │   └── ...
    │   └── <section class="about">
    └── <footer>
```
```

**Rules:**
- Uses `├──` and `└──` tree characters.
- Inline `←` comments explain the purpose of each element/section.
- Shows the full nesting depth.
- For JS projects, shows `<script src="index.js">` at the bottom of `<body>` with a `←` comment.

---

## 11. Section N-1 — How to Run

**Always `# N-1. How to Run`**

Short section, typically:
- If no JavaScript or simple HTML/CSS: `"Open \`index.html\` directly in your browser — no build step or server required."`
- If ES Modules are used: Explains the CORS restriction and recommends using VS Code Live Server or `npx serve`.
- If a CDN is required: Notes it needs internet access.

---

## 12. Section N — Course Reference

**Always the last section.**

```markdown
# N. Course Reference

* **Course:** [Scrimba Fullstack Web Development Path](https://scrimba.com/learn/fullstack)
* **Module:** <Module Number and Name>
* **Project:** <Project Name within the module>
```

---

## 13. Writing Style Rules

| Rule | Description |
|------|-------------|
| **Voice** | Active, instructional ("Setting X does Y", "This creates Z") |
| **Tone** | Educational but conversational; explains *why*, not just *what* |
| **Bolding** | Bold key terms on first use: **flexbox**, **event delegation**, **ARIA** |
| **Backticks** | All property names, values, HTML tags, method names in backticks: `display: flex`, `getElementById` |
| **No jargon without explanation** | Any new term is defined immediately after it is used |
| **Cross-references** | Use `[Section X](#N-section-name)` to link to related sections within the same document |
| **Comparisons** | Always compare new concepts against what was learned in previous projects |
| **No orphan facts** | Every code block has at least one sentence of explanation |
| **Emoji sparingly** | ✅ and ❌ used only in tables to signal correct/incorrect. No decorative emoji in prose |

---

## 14. Recurring Section Patterns by Module Type

### HTML/CSS/Accessibility Modules
Core sections always include:
- Semantic HTML (landmark elements with code examples)
- Box Model or Layout concept
- Selector(s) introduced
- Colour/typography topic
- Accessibility consideration (even in non-a11y modules)

### JavaScript Modules
Core sections always include:
- DOM selection method used (with comparison to previous method)
- Event listener(s) introduced
- DOM manipulation technique
- Data structure used (if any)
- "How the Full App Flow Works" section — a **flowchart in ASCII** or a nested bullet list tracing all user interactions

### Responsive Design Modules
Core sections always include:
- Viewport meta tag
- Relative units (`rem`, `em`, `%`)
- Container pattern (`width` + `max-width` + `margin: auto`)
- `flex-wrap` and `flex` shorthand
- Media queries (with `min-width` AND `max-width` variants shown)
- Mobile-first vs desktop-first discussion

### APIs / Async Modules
Core sections always include:
- What an API is (definition + table)
- Client–server model diagram
- The request–response cycle
- JSON explanation (with side-by-side comparison to JS object)
- Promise states table
- `fetch()` → `.then()` chain (line-by-line breakdown)
- App flow section

---

## 15. Standard Table Schemas (reuse these exact column sets)

### New Concepts Table
```markdown
| Concept | Where Used | Purpose |
```

### CSS Property Comparison
```markdown
| Property | Where Used | Purpose |
```

### Values Table
```markdown
| Value | Effect/Behaviour |
```

### When to Use Table
```markdown
| Use X when... | Use Y when... |
```

### HTML Element Comparison
```markdown
| Element | Display | Semantic meaning | Use case |
```

### Event Comparison
```markdown
| Event | Fires when... | Fires on child elements? |
```

### Position Values Table (always the same)
```markdown
| Value | In document flow? | Positioned relative to | Moves when scrolling? |
```

### Specificity Table (always the same)
```markdown
| Selector Type | Score |
```

---

## 16. Concept Progression Pattern

Each README explicitly acknowledges what was seen in PREVIOUS projects. The standard phrase is:

- **Introduced here**: `"This project introduces X — not seen in the <PreviousProject> folder."`
- **Carried over**: `"<ConceptX> was introduced in [<PreviousProject>] — this project deepens it with <NewAspect>."`
- **Compared to**: `"Compare to the NFT Site: ... / Compare to Cookie Consent: ..."`

This creates a **learning thread** across all READMEs where each one builds on the previous.

---

## 17. ASCII Art Conventions

| Element | Characters Used |
|---------|----------------|
| Tree branches | `├──` (not last child) and `└──` (last child) |
| Vertical connectors | `│` |
| Inline annotation | `← comment` or `→ comment` |
| Box diagrams | `┌─────┐`, `│ ... │`, `└─────┘` |
| Arrows between states | `→` (transform), `↑` (cross-axis), `↓` (flow direction) |
| Good/Bad | `✅` and `❌` |

---

## 18. Module → Key Concepts Cheatsheet

| Module (Folder) | Primary New Concepts |
|-----------------|---------------------|
| 03. Accessible Development | Semantic HTML landmarks, ARIA, skip link pattern, color contrast, alt text types, `rem` units |
| 04. Essential CSS | Box model, selectors & specificity, flexbox basics, container pattern, `position: relative/absolute/fixed`, `z-index`, `cursor`, `button` vs `a` |
| 05. Essential JavaScript | DOM selection, event listeners, `setTimeout`, `innerHTML`/`innerText`, `FormData`, template literals, ES Modules, array methods (`.filter`, `.includes`, `.push`), event delegation, data attributes, `render()` pattern |
| 06. Responsive Design | Viewport meta tag, `rem`/`em`/`%`, `max-width` container, `flex-wrap`, `flex` shorthand, `gap`, media queries, mobile-first approach, `:not()` pseudo-class |
| 07. APIs and Async JS | `fetch()`, Promises, `.then()` chaining, `async/await`, JSON, REST APIs, `URLSearchParams`, error handling with `.catch()`, `try/catch` |

---

## 19. Length Benchmarks

| Section | Typical Length |
|---------|---------------|
| Intro paragraph | 2 sentences |
| Project Overview | ~150–200 words |
| Project Structure | 10–20 lines (ASCII tree) |
| What's New table | 10–25 rows |
| Each core sub-section | 50–150 words + 1 code block + 1 table (optional) + 1 blockquote (optional) |
| HTML Structure Recap | 20–40 lines (ASCII tree) |
| How to Run | 3–8 lines |
| Total README length | ~800–1050 lines, ~30–45KB |

---

## 20. Quick-Start Checklist for Generating a New README

- [ ] Title: `# <ProjectName> — <ModuleName>`
- [ ] All shields.io badges (HTML, CSS, JS if needed, Google Font, Status=Completed, Course=Scrimba)
- [ ] 2-sentence intro (project description + "complete concept revision guide" phrase)
- [ ] `---` divider
- [ ] Numbered Table of Contents (sub-sections in decimal)
- [ ] Section 1: Project Overview (bullet list of components + goal statement)
- [ ] Section 2: Project Structure (fenced ASCII tree with `→` annotations)
- [ ] Section 3: Module definition OR comparison to previous projects
- [ ] Section 4: "What's New" table(s) (separate tables per technology)
- [ ] Core concept sections (always start with code block, then explanation, then table, then blockquote)
- [ ] "How the Full App Flow Works" section (JS projects only) — ASCII flowchart
- [ ] HTML Structure Recap (fenced ASCII tree)
- [ ] How to Run
- [ ] Course Reference (with link)
