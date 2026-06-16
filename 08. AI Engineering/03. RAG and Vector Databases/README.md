# ReelRecs — RAG and Vector Databases
![HTML](https://img.shields.io/badge/HTML-Structure-orange?style=flat-square&logo=html5)
![CSS](https://img.shields.io/badge/CSS-Styling-blue?style=flat-square&logo=css3)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow?style=flat-square&logo=javascript)
![OpenAI](https://img.shields.io/badge/OpenAI-Embeddings%20%2B%20GPT--4-412991?style=flat-square&logo=openai)
![Supabase](https://img.shields.io/badge/Supabase-Vector%20Database-3ECF8E?style=flat-square&logo=supabase)
![RAG](https://img.shields.io/badge/RAG-Retrieval--Augmented%20Generation-blueviolet?style=flat-square)
![Embeddings](https://img.shields.io/badge/Embeddings-text--embedding--ada--002-lightgrey?style=flat-square)
![Google Fonts](https://img.shields.io/badge/Google%20Fonts-Signika%20Negative-red?style=flat-square&logo=googlefonts)
![Status](https://img.shields.io/badge/Status-Completed-brightgreen?style=flat-square)
![Course](https://img.shields.io/badge/Scrimba-Fullstack%20Path-purple?style=flat-square)

A semantic movie recommendation chatbot powered by **Retrieval-Augmented Generation** — the **RAG and Vector Databases** project from **Scrimba's Fullstack Web Development Path**.

This README is written as a **complete concept revision guide**. Reading it top to bottom will revise every AI engineering concept introduced in this module — embeddings, vector databases, semantic search, text chunking, and the full RAG pipeline — comparing what is new here against the AI Engineering Fundamentals project covered in the previous folder.

---

# Table of Contents

1. [Project Overview](#1-project-overview)
2. [Project Structure](#2-project-structure)
3. [What is RAG?](#3-what-is-rag)
4. [What's New vs AI Engineering Fundamentals](#4-whats-new-vs-ai-engineering-fundamentals)
5. [Embeddings — Turning Text into Numbers](#5-embeddings--turning-text-into-numbers)
   - [What is an embedding?](#51-what-is-an-embedding)
   - [openai.embeddings.create()](#52-openaiembeddingscreate)
   - [The text-embedding-ada-002 model](#53-the-text-embedding-ada-002-model)
   - [Why embeddings enable semantic search](#54-why-embeddings-enable-semantic-search)
6. [Vector Databases — Storing Embeddings at Scale](#6-vector-databases--storing-embeddings-at-scale)
   - [What is a vector database?](#61-what-is-a-vector-database)
   - [Supabase as a vector store](#62-supabase-as-a-vector-store)
   - [Cosine similarity — how nearest-match works](#63-cosine-similarity--how-nearest-match-works)
7. [Text Chunking — Preparing Documents for RAG](#7-text-chunking--preparing-documents-for-rag)
   - [Why chunk text?](#71-why-chunk-text)
   - [Chunking strategies](#72-chunking-strategies)
   - [The embed-and-store pipeline](#73-the-embed-and-store-pipeline)
8. [The Supabase Client](#8-the-supabase-client)
   - [Initialising the client](#81-initialising-the-client)
   - [supabase.rpc() — calling a database function](#82-supabaser-pc--calling-a-database-function)
   - [The match_movies function parameters](#83-the-match_movies-function-parameters)
9. [Semantic Search — findNearestMatch()](#9-semantic-search--findnearestmatch)
   - [What is semantic search vs keyword search?](#91-what-is-semantic-search-vs-keyword-search)
   - [Processing multiple matches](#92-processing-multiple-matches)
10. [The RAG Pipeline — Putting It All Together](#10-the-rag-pipeline--putting-it-all-together)
    - [Why RAG solves the hallucination problem](#101-why-rag-solves-the-hallucination-problem)
    - [Context injection into the prompt](#102-context-injection-into-the-prompt)
    - [getChatCompletion() — the grounded response](#103-getchatcompletion--the-grounded-response)
11. [Chat History and Conversational Memory](#11-chat-history-and-conversational-memory)
    - [The chatMessages array](#111-the-chatmessages-array)
    - [Appending assistant replies](#112-appending-assistant-replies)
12. [OpenAI Parameters — temperature and frequency_penalty](#12-openai-parameters--temperature-and-frequency_penalty)
    - [temperature](#121-temperature)
    - [frequency_penalty](#122-frequency_penalty)
13. [The config.js Module — Shared Clients](#13-the-configjs-module--shared-clients)
    - [dangerouslyAllowBrowser](#131-dangerouslyallowbrowser)
    - [Environment variable validation at module load](#132-environment-variable-validation-at-module-load)
14. [The main() Orchestrator Function](#14-the-main-orchestrator-function)
15. [How the Full App Flow Works](#15-how-the-full-app-flow-works)
16. [HTML Structure Recap](#16-html-structure-recap)
17. [How to Run](#17-how-to-run)
18. [Course Reference](#18-course-reference)

---

# 1. Project Overview

**ReelRecs** is a semantic movie recommendation chatbot. The user types a natural-language question — "What's a good sci-fi film about AI?", "Something like Inception but darker?" — and the app returns a contextually accurate, conversational answer grounded in a real movie database. The app includes:

* A **minimal chat UI** with a single text input and a send button using a Material Symbols icon
* A **reply paragraph** where the AI's response is rendered after each query
* A **`createEmbedding` function** that converts the user's question into a 1536-dimension numerical vector using OpenAI's `text-embedding-ada-002` model
* A **`findNearestMatch` function** that queries Supabase's vector store to retrieve the most semantically similar movie chunks from the database
* A **`getChatCompletion` function** that injects the retrieved movie context into a GPT-4 prompt and generates a friendly, grounded response
* A **`config.js` module** that initialises and exports both the OpenAI and Supabase clients, with environment variable validation at load time

The real goals of this module are not just to build a chatbot — they are to understand the full **RAG (Retrieval-Augmented Generation) pipeline**: what embeddings are, how vector similarity search works, why chunking matters, how to inject retrieved context into an LLM prompt, and why RAG produces more accurate answers than raw prompting.

---

# 2. Project Structure

```
08. AI Engineering/
│
└── 03. RAG and Vector Databases/
    ├── index.html   → Minimal chat UI: title, form with text input, reply paragraph
    ├── index.css    → Simple styling: teal colour theme, flex form, reply typography
    ├── index.js     → Full RAG pipeline: createEmbedding → findNearestMatch → getChatCompletion
    └── config.js    → Shared module: OpenAI client + Supabase client, env var validation
```

> **Note:** There is no `server.js` in this project. The AI and database calls happen directly in the browser via the OpenAI SDK's `dangerouslyAllowBrowser: true` option — a pattern acceptable for learning environments but not for production. The movie data (text chunks + their embeddings) lives in a Supabase database that was populated in a prior lesson using a separate ingestion script.

---

# 3. What is RAG?

**RAG — Retrieval-Augmented Generation** is an AI architecture pattern that improves LLM accuracy by providing relevant, retrieved facts as context alongside the user's question — rather than relying on the model's training data alone.

```
Standard LLM prompting (without RAG):
  User question → LLM → Answer
  ↑ LLM generates from training data — can hallucinate or give outdated facts

RAG architecture:
  User question
      ↓
  [Retrieve]  Search a knowledge base for relevant documents
      ↓
  [Augment]   Inject retrieved documents into the LLM prompt as context
      ↓
  [Generate]  LLM generates an answer grounded in the retrieved facts
```

| Component | What it does | Technology used |
|-----------|-------------|-----------------|
| **Retrieval** | Finds semantically relevant text chunks from the knowledge base | Supabase + `match_movies` RPC |
| **Augmentation** | Inserts the retrieved chunks into the LLM prompt as "Context" | Template literal: `` `Context: ${text} Question: ${query}` `` |
| **Generation** | Produces a grounded, conversational response using the context | OpenAI `gpt-4` chat completions |

> RAG is the dominant pattern for building AI apps that need to answer questions about **specific, private, or up-to-date information** that is not in the model's training data — company documents, product catalogues, research papers, or in this case: a curated movie database.

---

# 4. What's New vs AI Engineering Fundamentals

This project introduces concepts that were **not present in the Gift Genie project** (01. AI Engineering Fundamentals). The architecture shifts from a simple prompt-response loop to a full retrieval pipeline.

## Architectural Differences

| Feature | Gift Genie (01) | ReelRecs (03) |
|---------|----------------|---------------|
| Architecture | Frontend + Express server | Frontend only (browser SDK) |
| AI call location | `server.js` (Node.js) | `index.js` (browser) |
| AI models used | One model (chat completions) | **Two models**: embedding + chat |
| Knowledge base | None — model uses training data | **Supabase vector database** |
| Answer grounding | Prompt engineering only | **Retrieved context injection (RAG)** |
| Database | None | **Supabase** (`supabase.rpc()`) |
| Output rendering | `marked` + `DOMPurify` | Plain `innerHTML` |

## New JavaScript / AI Concepts

| Concept | Where Used | Purpose |
|---------|------------|---------|
| `openai.embeddings.create()` | `createEmbedding()` | Converts a text string into a numerical vector |
| `model: "text-embedding-ada-002"` | `createEmbedding()` | Specifies the embedding model |
| `embeddingResponse.data[0].embedding` | `createEmbedding()` | Extracts the 1536-float vector from the response |
| `createClient(url, key)` | `config.js` | Initialises the Supabase JavaScript client |
| `supabase.rpc('match_movies', {...})` | `findNearestMatch()` | Calls a Postgres function that performs vector similarity search |
| `query_embedding` | `supabase.rpc()` params | The user's question vector sent to Supabase for comparison |
| `match_threshold: 0.50` | `supabase.rpc()` params | Minimum cosine similarity score to qualify as a match |
| `match_count: 4` | `supabase.rpc()` params | Maximum number of similar chunks to return |
| `data.map(obj => obj.content).join('\n')` | `findNearestMatch()` | Combines multiple retrieved chunks into a single context string |
| `` `Context: ${text} Question: ${query}` `` | `getChatCompletion()` | Context injection — the core of the RAG augmentation step |
| `temperature: 0.65` | `getChatCompletion()` | Controls output randomness — lower than default for accuracy |
| `frequency_penalty: 0.5` | `getChatCompletion()` | Discourages the model from repeating words and phrases |
| `chatMessages.push(choices[0].message)` | `getChatCompletion()` | Appends the AI's reply to conversation history for multi-turn memory |
| `dangerouslyAllowBrowser: true` | `config.js` | Allows the OpenAI SDK to run in the browser (learning only) |

## New CSS Concepts

| Concept | Where Used | Purpose |
|---------|------------|---------|
| `overflow: hidden` on `form` | `form` | Clips child borders so the border-radius applies cleanly to the whole form |
| `flex: 1` on `input` | `input` | Makes the input expand to fill all space left after the button |
| `line-height: 0` on `button` | `button` | Removes extra space around the inline Material Symbol icon |
| Material Symbols via Google Fonts | `<link>` in HTML | Icon font system — icons rendered as text via `<span class="icon material-symbols-outlined">` |

---

# 5. Embeddings — Turning Text into Numbers

## 5.1 What is an Embedding?

An **embedding** is a list of floating-point numbers (a vector) that represents the **semantic meaning** of a piece of text in a high-dimensional space. Two pieces of text with similar meaning will produce vectors that are mathematically close together — even if they use completely different words.

```
"A film about robots becoming conscious"
    → [0.021, -0.143, 0.876, ..., 0.032]   ← 1536 numbers

"AI gaining self-awareness in a movie"
    → [0.019, -0.141, 0.881, ..., 0.028]   ← 1536 numbers
                                               ↑ very close!

"A recipe for chocolate cake"
    → [-0.412, 0.203, -0.671, ..., 0.541]  ← very different
```

This mathematical closeness is what makes **semantic search** possible — you can find the most relevant passages in a database by finding the vectors closest to the query vector, regardless of exact word matches.

## 5.2 `openai.embeddings.create()`

```javascript
async function createEmbedding(input) {
  const embeddingResponse = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input
  });
  return embeddingResponse.data[0].embedding;
}
```

`openai.embeddings.create()` sends a string to OpenAI's embedding endpoint and returns a vector. The response has this structure:

```
embeddingResponse
└── data                     ← array of embedding objects (one per input)
    └── [0]
        └── embedding        ← the actual vector: an array of 1536 floats
```

`embeddingResponse.data[0].embedding` is the array of 1536 numbers that represents the user's query in vector space.

## 5.3 The `text-embedding-ada-002` Model

```javascript
model: "text-embedding-ada-002"
```

`text-embedding-ada-002` is OpenAI's dedicated embedding model — it is **not** the same as GPT-4. It is a separate model optimised specifically for converting text to vectors.

| Property | Value |
|----------|-------|
| Model name | `text-embedding-ada-002` |
| Vector dimensions | **1536** (each embedding is 1536 floats) |
| Max input tokens | 8,191 tokens (~6,000 words) |
| Output | An array of 1536 floating-point numbers between −1 and 1 |
| Use case | Semantic search, clustering, classification, RAG retrieval |

> `text-embedding-ada-002` is used for **both** the ingestion step (embedding the movie documents before storing them in Supabase) **and** the query step (embedding the user's question). Both must use the same model — you cannot compare vectors from different embedding models.

## 5.4 Why Embeddings Enable Semantic Search

Traditional keyword search matches exact words:

```
Query: "films about artificial intelligence"
Keyword match: finds only documents containing the exact words "artificial intelligence"
Misses: "movies about sentient machines", "stories where robots think for themselves"
```

Embedding-based semantic search matches *meaning*:

```
Query vector for "films about artificial intelligence"
Semantically close to vectors for:
  ✅ "movies about sentient machines"        ← same concept, different words
  ✅ "AI gaining consciousness"              ← related topic
  ✅ "story where a computer becomes human"  ← semantically similar
  ❌ "chocolate cake recipe"                 ← far away in vector space
```

---

# 6. Vector Databases — Storing Embeddings at Scale

## 6.1 What is a Vector Database?

A **vector database** is a database optimised for storing and querying high-dimensional vectors (embeddings). Standard databases like PostgreSQL use B-tree indexes designed for exact matches and range queries — they cannot efficiently answer "which of these million vectors is closest to this query vector?" Vector databases solve this with specialised **Approximate Nearest Neighbour (ANN)** index structures.

| Database type | Find exact value | Find nearest vector |
|--------------|-----------------|---------------------|
| Regular SQL (`WHERE id = 5`) | ✅ Fast | ❌ Impractical at scale |
| Vector DB (`match_movies()`) | ❌ Not designed for this | ✅ Fast |

## 6.2 Supabase as a Vector Store

```javascript
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(url, privateKey);
```

**Supabase** is an open-source Firebase alternative built on PostgreSQL. It supports vector storage and similarity search through the **pgvector** PostgreSQL extension — meaning you get a full relational database *and* vector search in one service.

In this project, the Supabase database has a table with:
- A `content` column storing text chunks (movie descriptions, plot summaries)
- An `embedding` column storing the 1536-float vector for each chunk
- A `match_movies` PostgreSQL function that performs vector similarity search

The database was populated in a prior ingestion lesson (not in this project's files) by:
1. Fetching movie document text
2. Splitting it into chunks
3. Embedding each chunk with `text-embedding-ada-002`
4. Inserting each `{ content, embedding }` pair into Supabase

## 6.3 Cosine Similarity — How Nearest-Match Works

The `match_movies` function finds the closest vectors using **cosine similarity** — a measure of the angle between two vectors in high-dimensional space.

```
Cosine similarity score:
  1.0   → Identical meaning (same vector direction)
  0.9   → Very closely related
  0.7   → Related topic
  0.5   → Somewhat related (this project's match_threshold)
  0.0   → No relationship
 -1.0   → Opposite meaning
```

```javascript
match_threshold: 0.50   // ← only return chunks with similarity ≥ 0.50
match_count: 4          // ← return at most 4 matching chunks
```

Setting `match_threshold: 0.50` means chunks with less than 50% similarity are discarded. `match_count: 4` caps the result at four chunks — enough context for the LLM without exceeding the prompt token limit.

> Cosine similarity measures the **angle** between two vectors, not their magnitude. This makes it robust to text length — a short sentence and a long paragraph about the same topic will still have high cosine similarity, even though their raw vector values differ in scale.

---

# 7. Text Chunking — Preparing Documents for RAG

## 7.1 Why Chunk Text?

Before any RAG system can work, the source documents (in this case, movie descriptions) must be **split into smaller pieces** (chunks) and each chunk must be individually embedded and stored.

```
Problem with embedding entire documents:
  ❌ Embedding models have token limits (~8,191 for ada-002)
  ❌ A single vector for 10 pages of text loses granularity —
     the vector averages everything and becomes less specific
  ❌ At retrieval time, an entire 10-page document is returned
     as context, wasting prompt tokens

Solution — chunking:
  ✅ Split the document into, say, 200-word paragraphs
  ✅ Each chunk gets its own precise embedding
  ✅ Only the 3–5 most relevant chunks are retrieved — focused, efficient
```

## 7.2 Chunking Strategies

| Strategy | How | Best for |
|----------|-----|---------|
| **Fixed-size** | Split every N characters or tokens | Simple, predictable — good starting point |
| **Paragraph-based** | Split on newlines / paragraph breaks | Preserves natural thought units |
| **Sentence-based** | Split on sentence boundaries | High precision, many small chunks |
| **Semantic chunking** | Split when topic changes (AI-assisted) | Best quality, most complex |

This project uses paragraphs/sections of movie data. The lesson "Chunking text from documents" covered how to split a document and the lesson "Split text, get vectors, insert into Supabase" covered the ingestion pipeline.

## 7.3 The Embed-and-Store Pipeline

The ingestion pipeline (run once, before the app is used) follows this sequence:

```
1. Load raw text document
        ↓
2. Split into chunks (e.g., by paragraph)
        ↓
3. For each chunk:
        └── openai.embeddings.create({ model: "text-embedding-ada-002", input: chunk })
                → embedding vector (1536 floats)
        ↓
4. Insert { content: chunk, embedding: vector } into Supabase table
        ↓
5. pgvector index built automatically for fast future queries
```

At query time (what this project's code does), the flow reverses:

```
User query → embed query → find nearest stored vectors → retrieve content → inject into prompt
```

---

# 8. The Supabase Client

## 8.1 Initialising the Client

```javascript
import { createClient } from "@supabase/supabase-js";

const privateKey = process.env.SUPABASE_API_KEY;
if (!privateKey) throw new Error(`Expected env var SUPABASE_API_KEY`);

const url = process.env.SUPABASE_URL;
if (!url) throw new Error(`Expected env var SUPABASE_URL`);

export const supabase = createClient(url, privateKey);
```

`createClient(url, key)` creates a Supabase client instance that can query your database. Two values are required:

| Parameter | Where to find it | Description |
|-----------|-----------------|-------------|
| `url` | Supabase project dashboard → Settings → API | Your project's unique URL |
| `privateKey` | Supabase project dashboard → Settings → API → `service_role` key | Secret key — full database access |

> The `service_role` key bypasses Supabase's Row Level Security (RLS) policies. It should **never** be exposed in a public browser app in production. This project uses `dangerouslyAllowBrowser: true` and is intended for a learning environment only.

## 8.2 `supabase.rpc()` — Calling a Database Function

```javascript
const { data } = await supabase.rpc('match_movies', {
  query_embedding: embedding,
  match_threshold: 0.50,
  match_count: 4
});
```

`supabase.rpc(functionName, params)` calls a **PostgreSQL stored function** (Remote Procedure Call). Instead of building a raw SQL query string, you call it by name and pass parameters as a JavaScript object.

The `match_movies` function is a custom Postgres function written in SQL/PLpgSQL that performs the vector similarity search using pgvector's `<=>` cosine distance operator. It lives in the database, not in the JavaScript files.

## 8.3 The `match_movies` Function Parameters

```javascript
{
  query_embedding: embedding,   // the user's question as a vector
  match_threshold: 0.50,        // minimum similarity to qualify
  match_count: 4                // maximum results to return
}
```

| Parameter | Type | Effect |
|-----------|------|--------|
| `query_embedding` | `float[]` (1536 values) | The vector to search against — must be from the same model |
| `match_threshold` | `float` (0.0–1.0) | Acts as a relevance filter — `0.50` is moderate; raise it for stricter matching |
| `match_count` | `integer` | Upper bound on results — limits context size in the prompt |

### Tuning `match_threshold`

```
match_threshold: 0.90  → Very strict — only near-identical matches returned
                          Risk: No results returned for valid but loosely-worded queries

match_threshold: 0.50  → Moderate — relevant and somewhat related chunks returned
                          Good balance for conversational queries ← this project

match_threshold: 0.20  → Very loose — many weakly-related chunks returned
                          Risk: Noisy context that confuses the LLM
```

---

# 9. Semantic Search — `findNearestMatch()`

## 9.1 What is Semantic Search vs Keyword Search?

```javascript
async function findNearestMatch(embedding) {
  const { data } = await supabase.rpc('match_movies', {
    query_embedding: embedding,
    match_threshold: 0.50,
    match_count: 4
  });

  const match = data.map(obj => obj.content).join('\n');
  return match;
}
```

`findNearestMatch` takes the query embedding (a 1536-float array) and returns the combined text of the most similar movie chunks stored in the database.

| Aspect | Keyword Search (`LIKE '%term%'`) | Semantic Search (embeddings + `match_movies`) |
|--------|----------------------------------|-----------------------------------------------|
| Matches | Exact word occurrences | Meaning and concept proximity |
| Query: "robots thinking" | Finds only "robots thinking" | Also finds "AI consciousness", "sentient machines" |
| Typo tolerance | ❌ None | ✅ Partial (similar words have similar embeddings) |
| Synonym handling | ❌ None | ✅ Built-in |
| Speed | Fast (B-tree index) | Fast with ANN index (pgvector) |
| Setup | SQL `LIKE` clause | Embedding model + vector DB |

## 9.2 Processing Multiple Matches

```javascript
const match = data.map(obj => obj.content).join('\n');
```

`supabase.rpc('match_movies', ...)` returns an array of objects (up to `match_count: 4`). Each object has a `content` property — the original text chunk that was embedded and stored.

```
data = [
  { content: "Blade Runner (1982) is a neo-noir sci-fi about a cop hunting androids..." },
  { content: "Ex Machina explores AI consciousness through a Turing test scenario..." },
  { content: "2001: A Space Odyssey features HAL 9000, an AI that becomes dangerous..." },
  { content: "Her follows a man who falls in love with an operating system named Samantha..." }
]
```

`.map(obj => obj.content)` extracts just the text strings. `.join('\n')` concatenates them with newlines into a single context block — ready to be injected into the LLM prompt.

```
match = "Blade Runner (1982) is a neo-noir sci-fi...
         Ex Machina explores AI consciousness...
         2001: A Space Odyssey features HAL 9000...
         Her follows a man who falls in love..."
```

---

# 10. The RAG Pipeline — Putting It All Together

## 10.1 Why RAG Solves the Hallucination Problem

LLMs **hallucinate** — they generate plausible-sounding but factually incorrect information — when asked about specific facts they are uncertain about. Without RAG:

```
User: "What are some good sci-fi movies about AI?"
LLM (no context): "I recommend 'Neural Dreams' (2019) starring James Chen and..."
                   ↑ This movie does not exist. The LLM invented it.
```

With RAG, the LLM is given real, retrieved text as context and instructed to use it:

```
User: "What are some good sci-fi movies about AI?"

Context retrieved from Supabase:
  "Blade Runner (1982)..."
  "Ex Machina (2014)..."
  "Her (2013)..."

LLM (with context): "You'd love Blade Runner! It's a neo-noir classic about..."
                     ↑ Grounded in real retrieved data — no hallucination
```

## 10.2 Context Injection into the Prompt

```javascript
chatMessages.push({
  role: 'user',
  content: `Context: ${text} Question: ${query}`
});
```

This is the **augmentation** step of RAG. The user's question alone is not sent to the LLM — instead, a combined message is constructed:

```
"Context: Blade Runner (1982) is a neo-noir sci-fi about a cop hunting androids...
           Ex Machina explores AI consciousness...
           Her follows a man who falls in love with an OS...
 Question: What's a good movie about AI?"
```

The system prompt instructs the model to prioritise the context and admit uncertainty if the answer is not there:

```javascript
content: `You are an enthusiastic movie expert...
          Your main job is to formulate a short answer to the question 
          using the provided context. 
          If the answer is not given in the context, find the answer in 
          the conversation history if possible. 
          If you are unsure and cannot find the answer, say, 
          "Sorry, I don't know the answer."
          Please do not make up the answer.`
```

> The instruction **"Please do not make up the answer"** is a critical RAG system prompt pattern. Without it, the LLM may ignore the context and generate an answer from training data — defeating the purpose of retrieval.

## 10.3 `getChatCompletion()` — The Grounded Response

```javascript
async function getChatCompletion(text, query) {
  chatMessages.push({
    role: 'user',
    content: `Context: ${text} Question: ${query}`
  });

  const { choices } = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: chatMessages,
    temperature: 0.65,
    frequency_penalty: 0.5
  });

  chatMessages.push(choices[0].message);
  reply.innerHTML = choices[0].message.content;
}
```

`getChatCompletion` is the **generation** step. Notice the destructuring: `const { choices }` extracts `choices` directly from the response — equivalent to `const choices = response.choices` from the Gift Genie project, just more concise.

After receiving the response, `chatMessages.push(choices[0].message)` appends the **full message object** (with `role: 'assistant'` and `content`) back into the conversation history — enabling follow-up questions in the same session.

---

# 11. Chat History and Conversational Memory

## 11.1 The `chatMessages` Array

```javascript
const chatMessages = [{
  role: 'system',
  content: `You are an enthusiastic movie expert who loves recommending movies...`
}];
```

`chatMessages` is defined at **module scope** — outside all functions — so it persists across multiple user queries in the same browser session. This is the same messages array pattern from the Gift Genie project, but here it is initialised in the frontend module rather than on a server.

Unlike Gift Genie where the messages array was reset if the server restarted, here the array lives in the browser's JavaScript memory. It resets only when the page is refreshed.

## 11.2 Appending Assistant Replies

```javascript
chatMessages.push(choices[0].message);
```

`choices[0].message` is the full message object from the API response:

```javascript
{
  role: "assistant",
  content: "You'd love Blade Runner! It's a neo-noir classic about..."
}
```

Pushing the full object (not just the `content` string) is correct — the messages array must contain the `role` field for the API to understand the conversation structure. On the next query, the full conversation history (system + previous user questions + previous assistant answers + new user question) is sent, giving the LLM context to handle follow-up questions like "What year was that released?" without the user needing to restate the movie name.

---

# 12. OpenAI Parameters — `temperature` and `frequency_penalty`

## 12.1 `temperature`

```javascript
temperature: 0.65
```

`temperature` controls how **random/creative** vs **deterministic/focused** the model's output is.

```
temperature: 0.0   → Always picks the highest-probability next token
                     Deterministic — same input gives same output every time
                     Good for: fact retrieval, structured outputs

temperature: 0.65  → Slightly creative, mostly focused
                     Good for: conversational answers that are accurate but natural ← this project

temperature: 1.0   → Default — balanced creativity
                     Good for: general-purpose chat

temperature: 2.0   → Very random — output becomes incoherent
```

For a RAG chatbot, a lower-than-default temperature (`0.65`) is appropriate — you want accurate, grounded answers, not creative embellishment. The Gift Genie project used the default temperature because creative gift suggestions benefit from more variety.

## 12.2 `frequency_penalty`

```javascript
frequency_penalty: 0.5
```

`frequency_penalty` discourages the model from **repeating the same words and phrases** it has already used in the response.

```
frequency_penalty: 0.0  → No penalty — model may repeat words naturally
frequency_penalty: 0.5  → Moderate — reduces repetition ← this project
frequency_penalty: 2.0  → Strong — model avoids any repeated word
```

| Parameter | Range | Effect |
|-----------|-------|--------|
| `temperature` | 0.0 – 2.0 | Randomness of token selection |
| `frequency_penalty` | -2.0 – 2.0 | Penalty for repeating already-used tokens |
| `presence_penalty` | -2.0 – 2.0 | Penalty for any previously-used token (broader than frequency) |
| `max_tokens` | integer | Hard cap on response length |

> Both `temperature` and `frequency_penalty` are not used in the Gift Genie project — they default to `1.0` and `0.0` respectively. Using non-default values here for the first time shows how to tune model behaviour for a specific use case.

---

# 13. The `config.js` Module — Shared Clients

## 13.1 `dangerouslyAllowBrowser`

```javascript
export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});
```

By default, the OpenAI JavaScript SDK **refuses to run in browser environments** and throws an error:

```
Error: It looks like you're running in a browser-like environment.
This is disabled by default, as it risks exposing your secret API key
to end-users. Set `dangerouslyAllowBrowser: true` to allow this.
```

Setting `dangerouslyAllowBrowser: true` bypasses this safety check. This is acceptable in a **Scrimba learning environment** (where the API key is injected by the platform, not visible to students) but is not safe for production apps where real users can open DevTools and extract the key from network requests.

```
✅ Safe for: Scrimba-hosted scrims, local development with `.env` not committed to git
❌ Not safe for: Any public-facing deployed app
✅ Production solution: Move AI calls to a server (as in Gift Genie's server.js)
```

## 13.2 Environment Variable Validation at Module Load

```javascript
if (!process.env.OPENAI_API_KEY) throw new Error("OpenAI API key is missing or invalid.");
if (!privateKey) throw new Error(`Expected env var SUPABASE_API_KEY`);
if (!url) throw new Error(`Expected env var SUPABASE_URL`);
```

These checks run **when the module is first imported** — before any function is called. This is the fail-fast pattern from `utils.js` in the Gift Genie project. If any variable is missing, the app crashes immediately with a clear message rather than failing silently on the first real API call.

The required environment variables for this project:

| Variable | Purpose |
|----------|---------|
| `OPENAI_API_KEY` | OpenAI API key for both `embeddings.create()` and `chat.completions.create()` |
| `SUPABASE_API_KEY` | Supabase `service_role` key for authenticated database access |
| `SUPABASE_URL` | Your Supabase project URL (e.g., `https://xxxx.supabase.co`) |

---

# 14. The `main()` Orchestrator Function

```javascript
async function main(input) {
  try {
    reply.innerHTML = "Thinking...";
    const embedding = await createEmbedding(input);
    const match = await findNearestMatch(embedding);
    await getChatCompletion(match, input);
  } catch (error) {
    console.error('Error in main function.', error.message);
    reply.innerHTML = "Sorry, something went wrong. Please try again.";
  }
}
```

`main()` is the **orchestrator** — it sequences the three async operations of the RAG pipeline in order and wraps them in a single `try/catch`. This is an important design pattern:

```
Without an orchestrator — scattered try/catches:
  createEmbedding() → try/catch
  findNearestMatch() → try/catch
  getChatCompletion() → try/catch
  → Duplicated error handling, hard to follow the flow

With an orchestrator — one try/catch:
  main() → try {
              createEmbedding()     ← step 1
              findNearestMatch()    ← step 2
              getChatCompletion()   ← step 3
           } catch { single handler }
  → Clean, readable, one place to handle all failures
```

`reply.innerHTML = "Thinking..."` gives immediate feedback to the user — the reply area updates before any API call starts, so the user knows the app is working.

Note the use of `await` on each function call in sequence — `findNearestMatch` cannot run until `createEmbedding` returns the vector, and `getChatCompletion` cannot run until `findNearestMatch` returns the context. These are **dependent async operations** — they must be sequential, not parallel.

---

# 15. How the Full App Flow Works

```
Page loads
    └── config.js imported:
            ├── env vars validated → crash early if missing
            ├── OpenAI client exported
            └── Supabase client exported

    └── index.js executes:
            ├── DOM elements selected (form, input, reply)
            └── form 'submit' event listener registered

User types a question and clicks Send (or presses Enter)
    └── 'submit' fires
            ├── e.preventDefault() → no page reload
            ├── main(input.value) called
            └── input.value = '' → input field cleared

main('What sci-fi movies involve AI?')
    ├── reply.innerHTML = "Thinking..."  ← immediate user feedback
    │
    ├── STEP 1: createEmbedding(input)
    │       └── openai.embeddings.create({
    │                 model: "text-embedding-ada-002",
    │                 input: "What sci-fi movies involve AI?"
    │           })
    │       └── returns: [0.021, -0.143, 0.876, ...] (1536 floats)
    │
    ├── STEP 2: findNearestMatch(embedding)
    │       └── supabase.rpc('match_movies', {
    │                 query_embedding: [0.021, -0.143, ...],
    │                 match_threshold: 0.50,
    │                 match_count: 4
    │           })
    │       └── Supabase runs pgvector cosine similarity in PostgreSQL
    │       └── returns: data = [{content: "Blade Runner..."}, {content: "Ex Machina..."}, ...]
    │       └── data.map(obj => obj.content).join('\n')
    │       └── returns: "Blade Runner...\nEx Machina...\n2001..."
    │
    └── STEP 3: getChatCompletion(match, input)
            ├── chatMessages.push({
            │       role: 'user',
            │       content: `Context: Blade Runner...\nEx Machina...
            │                 Question: What sci-fi movies involve AI?`
            │   })
            │
            ├── openai.chat.completions.create({
            │       model: 'gpt-4',
            │       messages: chatMessages,  ← system + context + question
            │       temperature: 0.65,
            │       frequency_penalty: 0.5
            │   })
            │
            ├── chatMessages.push(choices[0].message)  ← save assistant reply for multi-turn
            └── reply.innerHTML = choices[0].message.content
                    → "You'd love Blade Runner! It's a neo-noir classic from 1982..."

If any step throws:
    └── catch(error):
            ├── console.error(error.message)
            └── reply.innerHTML = "Sorry, something went wrong. Please try again."
```

---

# 16. HTML Structure Recap

```
<!doctype html>
<html>
├── <head>
│   ├── <title>Embeddings</title>
│   ├── <link rel="preconnect" href="https://fonts.googleapis.com">        → font performance
│   ├── <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin> → font performance
│   ├── <link rel="stylesheet" href="https://fonts.googleapis.com/css2?..."> → Signika Negative font
│   │                                                                          + Material Symbols icon font
│   └── <link rel="stylesheet" href="index.css">                           → local styles
│
└── <body>
    ├── <h1>
    │   ├── "ReelRecs"
    │   └── <span class="icon material-symbols-outlined">chat_bubble</span> ← chat bubble icon
    │
    ├── <form>                                               ← submit triggers main()
    │   ├── <input type="text" placeholder="How can I help?"> ← user question input
    │   └── <button>
    │       └── <span class="icon material-symbols-outlined">send</span>    ← send icon
    │
    ├── <p class="reply"></p>                               ← AI response rendered here
    │                                                          starts empty; "Thinking..." during load
    │
    └── <script src="index.js" type="module">              ← ES module; imports config.js
```

### Material Symbols — Icon Font Pattern

```html
<!-- In <head>: load the icon font as part of the Google Fonts import -->
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?
  family=Signika+Negative:wght@500
  &family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0
  &display=swap">

<!-- In <body>: render an icon by writing its name as text content -->
<span class="icon material-symbols-outlined">chat_bubble</span>
<span class="icon material-symbols-outlined">send</span>
```

Material Symbols is Google's icon system. Unlike image or SVG icons, these icons are rendered as **text characters** using a font — the text `"chat_bubble"` inside the styled span becomes the chat bubble icon glyph. This is the same concept as Font Awesome icon fonts (used in the X Clone project), but Google's newer system.

---

# 17. How to Run

This project runs **entirely in the browser** using ES Modules. There is no `server.js` or `npm start` — but you still need a local server because ES Modules cannot be loaded via `file://` protocol.

### Step 1 — Set environment variables

On Scrimba, environment variables are injected via the platform. For local development, create a `.env` file:

```
OPENAI_API_KEY=sk-...
SUPABASE_API_KEY=eyJ...
SUPABASE_URL=https://xxxx.supabase.co
```

### Step 2 — Ensure the Supabase database is populated

The movie data (text chunks + embeddings) must already be in your Supabase database, inserted during the ingestion lessons. If the database is empty, `findNearestMatch` will return no results and the AI will have no context to work with.

### Step 3 — Serve the files locally

Use VS Code's **Live Server** extension, or run:

```bash
npx serve .
```

Then open `http://localhost:3000` (or whatever port Live Server uses) in your browser.

### Step 4 — Ask a movie question

Type any natural-language question into the input — "Recommend a thriller with a twist ending", "What movies are similar to Interstellar?", "Best horror films from the 80s?" — and press Send. The app will embed the question, search the database, and generate a grounded response.

> Because this project calls the OpenAI API and Supabase from the browser with `dangerouslyAllowBrowser: true`, it is not suitable for public deployment. Move the API calls to a server (following the Gift Genie pattern) before deploying to production.

---

# 18. Course Reference

* **Course:** [Scrimba Fullstack Web Development Path](https://scrimba.com/learn/fullstack)
* **Module:** 08 — AI Engineering
* **Project:** 03 — RAG and Vector Databases (ReelRecs)
* **Key Libraries:** `openai` (embeddings + chat completions), `@supabase/supabase-js` (vector store client)
* **Models Used:** `text-embedding-ada-002` (embeddings) · `gpt-4` (chat completions)
* **Database:** Supabase (PostgreSQL + pgvector extension)
* **Key concepts:** Embeddings · Vector databases · Cosine similarity · Text chunking · RAG pipeline · Context injection · Semantic search
