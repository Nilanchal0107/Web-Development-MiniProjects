# Intro to Databases — Databases

![SQL](https://img.shields.io/badge/SQL-Fundamentals-blue?style=flat-square\&logo=postgresql)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Relational%20Database-336791?style=flat-square\&logo=postgresql)
![Database](https://img.shields.io/badge/Database-Design-green?style=flat-square)
![Backend](https://img.shields.io/badge/Backend-Data%20Storage-orange?style=flat-square)
![Status](https://img.shields.io/badge/Status-Completed-brightgreen?style=flat-square)
![Course](https://img.shields.io/badge/Scrimba-Fullstack%20Path-purple?style=flat-square)

The **Intro to Databases** section is the first part of the **Databases module** from **Scrimba's Fullstack Web Development Path**.

This README is written as a **complete concept revision guide**. Reading it from top to bottom will revise every database concept introduced in this section while connecting them to the backend development concepts learned in previous modules.

---

# Table of Contents

1. [Project Overview](#1-project-overview)
2. [Project Structure](#2-project-structure)
3. [What is a Database?](#3-what-is-a-database)
4. [What's New vs Previous Modules](#4-whats-new-vs-previous-modules)
5. [Why Databases Exist](#5-why-databases-exist)

   * [Problems with Files](#51-problems-with-files)
   * [Data Persistence](#52-data-persistence)
6. [Database Fundamentals](#6-database-fundamentals)

   * [Tables](#61-tables)
   * [Rows](#62-rows)
   * [Columns](#63-columns)
   * [Records](#64-records)
7. [Relational Databases](#7-relational-databases)

   * [Relationships Between Tables](#71-relationships-between-tables)
   * [Why Relational Databases Matter](#72-why-relational-databases-matter)
8. [SQL vs NoSQL](#8-sql-vs-nosql)

   * [SQL Databases](#81-sql-databases)
   * [NoSQL Databases](#82-nosql-databases)
   * [Comparison Table](#83-comparison-table)
9. [Primary Keys](#9-primary-keys)
10. [Foreign Keys Introduction](#10-foreign-keys-introduction)
11. [Developing with Databases](#11-developing-with-databases)
12. [Managed vs Self-Hosted Databases](#12-managed-vs-self-hosted-databases)
13. [PostgreSQL Overview](#13-postgresql-overview)
14. [How Backend Applications Use Databases](#14-how-backend-applications-use-databases)
15. [Database Architecture Basics](#15-database-architecture-basics)
16. [HTML Structure Recap](#16-html-structure-recap)
17. [How to Run](#17-how-to-run)
18. [Course Reference](#18-course-reference)

---

# 1. Project Overview

The **Intro to Databases** section serves as the foundation of the entire Databases module. Before writing SQL queries or creating relationships between tables, developers must understand what databases are, why they exist, and how modern applications use them.

This section introduces:

* **Data persistence** and why applications need storage
* **Tables, rows, and columns**
* **Relational databases**
* **SQL vs NoSQL**
* **Primary and foreign keys**
* **Database hosting options**
* **PostgreSQL**
* **Backend-to-database communication**

The goal of this module is not just to learn SQL syntax—it is to understand how applications store, organize, retrieve, and manage data in production systems.

---

# 2. Project Structure

```text
10. Databases/
│
└── 01. Intro to Databases/
    │
    ├── README.md
    │   → Complete revision guide for database fundamentals
    │
    ├── Introduction
    │   → What databases are and why they exist
    │
    ├── SQL vs NoSQL
    │   → Comparison of database paradigms
    │
    ├── Developing with Databases
    │   → How applications interact with databases
    │
    └── Managed vs Self Hosted
        → Deployment and hosting approaches
```

Unlike previous modules where the focus was HTML, CSS, JavaScript, Node.js, or Express, this section is largely conceptual. The purpose is to build a strong mental model before writing actual SQL queries.

---

# 3. What is a Database?

A **database** is an organized system for storing, managing, and retrieving data.

Instead of saving information inside random files, databases provide structured storage with powerful tools for searching, updating, and maintaining data efficiently.

## Core Database Characteristics

| Characteristic | Description                              |
| -------------- | ---------------------------------------- |
| Storage        | Holds application data permanently       |
| Organization   | Structures data into predictable formats |
| Retrieval      | Allows fast searching and querying       |
| Security       | Controls who can access data             |
| Reliability    | Prevents accidental data loss            |
| Scalability    | Supports growing amounts of information  |

Consider an e-commerce application:

| Data Type | Examples                  |
| --------- | ------------------------- |
| Users     | Names, emails, passwords  |
| Products  | Titles, prices, inventory |
| Orders    | Purchases, dates, status  |
| Reviews   | Ratings and comments      |

Without a database, managing this information would quickly become impossible.

> Always think of a database as the application's long-term memory.

---

# 4. What's New vs Previous Modules

In previous modules, most data was temporary.

For example:

| Module     | Data Source            |
| ---------- | ---------------------- |
| JavaScript | Variables and arrays   |
| APIs       | Remote API responses   |
| Express    | Request/response cycle |
| Node.js    | Runtime memory         |

The problem is that runtime memory disappears when the application stops.

```javascript
let users = []

users.push({
    name: "Alice"
})
```

When the server restarts:

```javascript
users
// []
```

All data is gone.

Databases solve this problem.

## New Database Concepts

| Concept         | Where Used                | Purpose                             |
| --------------- | ------------------------- | ----------------------------------- |
| Database        | Entire module             | Persistent data storage             |
| Table           | Data organization         | Stores related records              |
| Row             | Individual record         | Represents one item                 |
| Column          | Data category             | Defines attributes                  |
| Primary Key     | Record identification     | Uniquely identifies rows            |
| Foreign Key     | Relationships             | Connects tables                     |
| SQL             | Query language            | Interacts with relational databases |
| PostgreSQL      | Database system           | Production-grade SQL database       |
| Managed Hosting | Cloud deployment          | Database managed by provider        |
| Self Hosting    | Infrastructure management | Database managed by developer       |

## Learning Progression

```text
JavaScript Variables
        ↓
Application State
        ↓
Backend Servers
        ↓
Persistent Storage
        ↓
Databases
        ↓
SQL Queries
        ↓
Table Relationships
        ↓
Production Applications
```

> This module introduces permanent data storage for the first time. Everything learned previously eventually connects to a database.

---

# 5. Why Databases Exist

Before databases existed, many applications stored data in simple text files, spreadsheets, or hardcoded program structures.

While this works for small amounts of information, it quickly becomes problematic as applications grow.

## 5.1 Problems with Files

Imagine an online store storing users inside a text file:

```text
John,john@email.com
Alice,alice@email.com
Bob,bob@email.com
```

Initially this seems simple, but several problems appear:

| Problem            | Description                                            |
| ------------------ | ------------------------------------------------------ |
| Slow Searching     | Must scan the entire file                              |
| Duplicate Data     | Same information may appear multiple times             |
| Data Corruption    | One mistake can break the file                         |
| Concurrency Issues | Multiple users editing simultaneously causes conflicts |
| Poor Scalability   | Large files become difficult to manage                 |
| Security Risks     | Limited access control                                 |

As applications grow from hundreds of users to millions of users, file-based storage becomes impractical.

### File-Based Storage Workflow

```text
Application
      ↓
Open File
      ↓
Read Entire File
      ↓
Search Data
      ↓
Modify Data
      ↓
Rewrite File
```

Now compare that with a database:

```text
Application
      ↓
Database Query
      ↓
Database Engine
      ↓
Requested Data Only
```

The database performs the heavy work automatically.

> Databases exist because file-based storage becomes inefficient, unreliable, and difficult to maintain at scale.

---

## 5.2 Data Persistence

```javascript
let users = []
```

Variables only exist while the application is running.

When the server stops:

```javascript
users = []
```

Everything disappears.

This is called **volatile storage**.

Databases provide **persistent storage**, meaning data remains available even after:

* Application restarts
* Server crashes
* System updates
* User logouts

| Storage Type | Survives Restart? |
| ------------ | ----------------- |
| Variable     | ❌ No              |
| Array        | ❌ No              |
| Object       | ❌ No              |
| Database     | ✅ Yes             |

Consider:

```javascript
users.push({
    name: "Alice"
})
```

Without a database:

```text
Server Restart
      ↓
Data Lost
```

With a database:

```text
Server Restart
      ↓
Database Still Exists
      ↓
Data Retrieved Again
```

> Persistent storage is the primary reason databases exist.

---

# 6. Database Fundamentals

A database organizes information into structures that are easy to store, retrieve, and manage.

The most common structure in relational databases is the **table**.

---

## 6.1 Tables

```sql
CREATE TABLE users (
    id INTEGER,
    name TEXT,
    email TEXT
);
```

A **table** is a collection of related data.

Think of a table as a spreadsheet.

Example:

| id | name    | email                                         |
| -- | ------- | --------------------------------------------- |
| 1  | Alice   | [alice@email.com](mailto:alice@email.com)     |
| 2  | Bob     | [bob@email.com](mailto:bob@email.com)         |
| 3  | Charlie | [charlie@email.com](mailto:charlie@email.com) |

The entire structure above is a table named `users`.

### Real World Examples

| Table Name | Stores               |
| ---------- | -------------------- |
| users      | User accounts        |
| products   | Store inventory      |
| orders     | Customer purchases   |
| reviews    | Product ratings      |
| employees  | Employee information |

### Why Tables?

Tables provide:

* Structure
* Consistency
* Fast searching
* Easy relationships

Without tables:

```text
Data
Data
Data
Data
Data
```

With tables:

```text
Users Table
Products Table
Orders Table
Reviews Table
```

Everything becomes organized.

> Tables are the foundation of relational databases.

---

## 6.2 Rows

```sql
SELECT * FROM users;
```

Result:

| id | name  | email                                     |
| -- | ----- | ----------------------------------------- |
| 1  | Alice | [alice@email.com](mailto:alice@email.com) |

A **row** represents a single record.

In the example above:

```text
1 | Alice | alice@email.com
```

is one row.

### Examples

| Table    | Row Represents |
| -------- | -------------- |
| Users    | One user       |
| Products | One product    |
| Orders   | One order      |
| Reviews  | One review     |

Visual representation:

```text
Users Table

┌────┬─────────┬─────────────────┐
│ id │ name    │ email           │
├────┼─────────┼─────────────────┤
│ 1  │ Alice   │ alice@email.com │
├────┼─────────┼─────────────────┤
│ 2  │ Bob     │ bob@email.com   │
└────┴─────────┴─────────────────┘
```

Each horizontal entry is a row.

> A row represents one individual entity in the database.

---

## 6.3 Columns

```sql
CREATE TABLE users (
    id INTEGER,
    name TEXT,
    email TEXT
);
```

Columns define what information is stored.

In this example:

| Column | Meaning         |
| ------ | --------------- |
| id     | User identifier |
| name   | User name       |
| email  | User email      |

Visual:

```text
Users Table

        Columns
           ↓
┌────┬─────────┬─────────────────┐
│ id │ name    │ email           │
└────┴─────────┴─────────────────┘
```

Columns are similar to object properties:

```javascript
const user = {
    id: 1,
    name: "Alice",
    email: "alice@email.com"
}
```

Comparison:

| JavaScript       | Database |
| ---------------- | -------- |
| Property         | Column   |
| Object           | Row      |
| Array of Objects | Table    |

This analogy helps backend developers transition from JavaScript data structures to relational databases.

> Columns define the attributes every record must contain.

---

## 6.4 Records

A **record** is another term for a row.

Example:

```text
1 | Alice | alice@email.com
```

This entire entry is one record.

Different terminology:

| Term   | Meaning              |
| ------ | -------------------- |
| Record | One row of data      |
| Row    | One record of data   |
| Entry  | One record           |
| Tuple  | Formal database term |

All refer to the same concept.

### Example Database

```text
Users Table

Record #1
1 | Alice | alice@email.com

Record #2
2 | Bob | bob@email.com

Record #3
3 | Charlie | charlie@email.com
```

> In database discussions, "row" and "record" are usually interchangeable.

---

# 7. Relational Databases

Relational databases organize information into multiple tables and connect them through relationships.

Instead of storing everything in one giant table, data is separated into logical groups.

---

## 7.1 Relationships Between Tables

Consider an online store.

Bad approach:

```text
Orders Table

Order ID
Customer Name
Customer Email
Product Name
Product Price
```

Customer information gets repeated repeatedly.

Better approach:

```text
Users Table
Orders Table
Products Table
```

Each table has a specific responsibility.

Relationships connect them.

```text
Users
   │
   │
   ▼
Orders
   │
   │
   ▼
Products
```

Benefits:

| Benefit              | Explanation            |
| -------------------- | ---------------------- |
| Less duplication     | Data stored once       |
| Easier updates       | Change in one place    |
| Better organization  | Logical separation     |
| Improved performance | Smaller tables         |
| Data integrity       | Consistent information |

> Relationships eliminate duplication and improve data quality.

---

## 7.2 Why Relational Databases Matter

Relational databases power:

* Banking systems
* E-commerce stores
* Social media platforms
* Healthcare systems
* Airline reservation systems

Examples:

| Company | Database Usage         |
| ------- | ---------------------- |
| Amazon  | Orders, inventory      |
| Netflix | Users, subscriptions   |
| Uber    | Riders, drivers, trips |
| Spotify | Songs, playlists       |
| Airbnb  | Listings, bookings     |

Relational databases are trusted because they provide:

```text
Consistency
    +
Reliability
    +
Structured Data
    +
Powerful Queries
```

These characteristics make SQL databases the dominant choice for business applications.

> Most backend applications eventually depend on relational databases.

---

# 8. SQL vs NoSQL

Databases generally fall into two major categories:

1. SQL Databases
2. NoSQL Databases

Understanding the difference is essential before learning SQL.

---

## 8.1 SQL Databases

SQL databases store data in tables.

Example:

```sql
CREATE TABLE users (
    id INTEGER,
    name TEXT,
    email TEXT
);
```

Popular SQL databases:

| Database        | Popularity |
| --------------- | ---------- |
| PostgreSQL      | Very High  |
| MySQL           | Very High  |
| SQLite          | High       |
| SQL Server      | High       |
| Oracle Database | Enterprise |

Characteristics:

* Structured schema
* Tables
* Rows
* Columns
* Relationships
* SQL language

Example structure:

```text
Users Table
Orders Table
Products Table
```

Connected through relationships.

> SQL databases prioritize structure and consistency.

---

## 8.2 NoSQL Databases

Unlike SQL databases, **NoSQL databases** do not primarily organize data into related tables.

Instead, they use alternative storage models such as:

* Documents
* Key-Value pairs
* Graphs
* Wide-column stores

Example document:

```json
{
    "id": 1,
    "name": "Alice",
    "email": "alice@email.com",
    "orders": [
        {
            "id": 101,
            "product": "Laptop"
        }
    ]
}
```

Notice how related information can be nested directly inside the document.

Popular NoSQL databases:

| Database  | Type                 |
| --------- | -------------------- |
| MongoDB   | Document             |
| Redis     | Key-Value            |
| Cassandra | Wide Column          |
| Neo4j     | Graph                |
| DynamoDB  | Key-Value / Document |

### Characteristics of NoSQL

| Characteristic     | Description                                     |
| ------------------ | ----------------------------------------------- |
| Flexible Schema    | Fields can vary between documents               |
| High Scalability   | Designed for large-scale systems                |
| Fast Reads/Writes  | Optimized for specific workloads                |
| Horizontal Scaling | Easy distribution across servers                |
| Less Structured    | Relationships often handled by application code |

Example:

User #1

```json
{
    "name": "Alice",
    "email": "alice@email.com"
}
```

User #2

```json
{
    "name": "Bob",
    "email": "bob@email.com",
    "phone": "123456789"
}
```

Unlike SQL databases, both documents can exist even though they contain different fields.

> NoSQL databases trade strict structure for flexibility and scalability.

---

## 8.3 SQL vs NoSQL Comparison Table

### Structural Differences

| Feature          | SQL                   | NoSQL                         |
| ---------------- | --------------------- | ----------------------------- |
| Storage Model    | Tables                | Documents / Key-Value / Graph |
| Schema           | Fixed                 | Flexible                      |
| Relationships    | Built-in              | Usually handled manually      |
| Query Language   | SQL                   | Database-specific             |
| Data Consistency | Strong                | Often configurable            |
| Learning Curve   | Moderate              | Moderate                      |
| Scalability      | Vertical + Horizontal | Primarily Horizontal          |

### Example Comparison

SQL:

```text
Users Table
│
├── id
├── name
└── email
```

NoSQL:

```json
{
    "id": 1,
    "name": "Alice",
    "email": "alice@email.com"
}
```

### When to Use Each

| Use SQL When...                | Use NoSQL When...                    |
| ------------------------------ | ------------------------------------ |
| Data has clear relationships   | Data structure changes frequently    |
| Consistency is critical        | Massive scalability is required      |
| Financial transactions exist   | Flexible document storage is needed  |
| Complex joins are required     | Relationships are minimal            |
| Reporting and analytics matter | Performance at scale is the priority |

### Why Scrimba Teaches SQL First

Most business applications depend heavily on:

* Structured data
* Relationships
* Reporting
* Transactions

Examples:

```text
Banking
Inventory
Payments
Orders
Healthcare
Education
```

All benefit greatly from relational databases.

This is why PostgreSQL is the primary database taught in the Fullstack Path.

> Learning SQL first builds a stronger foundation because relational thinking applies to almost every backend system.

---

# 9. Primary Keys

A database table needs a way to uniquely identify each row.

This is the purpose of a **Primary Key**.

---

## 9.1 What is a Primary Key?

```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    name TEXT,
    email TEXT
);
```

A primary key is a column whose value uniquely identifies each record.

Example:

| id | name    |
| -- | ------- |
| 1  | Alice   |
| 2  | Bob     |
| 3  | Charlie |

The `id` column is the primary key.

Even if two users have the same name:

| id | name |
| -- | ---- |
| 1  | John |
| 2  | John |

The rows remain unique because their IDs differ.

### Primary Key Rules

| Rule           | Description                 |
| -------------- | --------------------------- |
| Must Be Unique | No duplicate values         |
| Cannot Be NULL | Every row requires a value  |
| One Per Table  | A table has one primary key |
| Stable         | Should rarely change        |

### Why Names Are Bad Primary Keys

```text
John Smith
John Smith
John Smith
```

Not unique.

Email addresses are better:

```text
john@email.com
alice@email.com
```

But users can change emails.

IDs are ideal:

```text
1
2
3
4
5
```

Stable and unique.

> Every table should have a primary key because every record must be uniquely identifiable.

---

## 9.2 Visualizing Primary Keys

Without a primary key:

```text
Users

Alice
Bob
Alice
Charlie
```

Ambiguous.

With a primary key:

```text
Users

1 | Alice
2 | Bob
3 | Alice
4 | Charlie
```

Every record can now be referenced precisely.

### Real World Examples

| Table     | Primary Key |
| --------- | ----------- |
| Users     | user_id     |
| Products  | product_id  |
| Orders    | order_id    |
| Reviews   | review_id   |
| Employees | employee_id |

Most modern systems use auto-generated numeric IDs.

> Primary keys are the identity cards of database records.

---

# 10. Foreign Keys Introduction

Primary keys identify records.

Foreign keys connect records.

Together they create relationships.

---

## 10.1 What is a Foreign Key?

Consider two tables:

Users

| id | name  |
| -- | ----- |
| 1  | Alice |
| 2  | Bob   |

Orders

| id  | user_id | product  |
| --- | ------- | -------- |
| 101 | 1       | Laptop   |
| 102 | 2       | Keyboard |
| 103 | 1       | Mouse    |

Notice:

```text
Orders.user_id
        ↓
Users.id
```

The `user_id` column references the `id` column in the Users table.

This is a foreign key relationship.

### Relationship Diagram

```text
Users
┌───────────┐
│ id (PK)   │
│ name      │
└─────┬─────┘
      │
      │
      ▼
Orders
┌─────────────┐
│ id          │
│ user_id(FK) │
│ product     │
└─────────────┘
```

PK = Primary Key

FK = Foreign Key

---

## 10.2 Why Foreign Keys Matter

Without relationships:

```text
Orders

Alice
Laptop

Alice
Mouse

Alice
Keyboard
```

Customer information gets duplicated repeatedly.

With foreign keys:

```text
Users
1 | Alice

Orders
101 | 1 | Laptop
102 | 1 | Mouse
103 | 1 | Keyboard
```

Data becomes:

* Smaller
* Cleaner
* Easier to update
* More reliable

### Benefits

| Benefit             | Explanation                    |
| ------------------- | ------------------------------ |
| Reduced Duplication | Store data once                |
| Better Integrity    | Prevent invalid references     |
| Easier Maintenance  | Update in one place            |
| Improved Design     | Logical separation of concerns |

> Foreign keys are what make relational databases relational.

---

# 11. Developing with Databases

Databases rarely interact directly with users.

Instead, applications act as intermediaries.

---

## 11.1 Typical Application Flow

```text
User
  ↓
Frontend
  ↓
Backend Server
  ↓
Database
```

Example:

```text
User signs up
        ↓
Frontend sends request
        ↓
Backend validates input
        ↓
Database stores user
        ↓
Success response returned
```

The database remains hidden behind the backend.

### Responsibilities

| Component | Responsibility |
| --------- | -------------- |
| Frontend  | User interface |
| Backend   | Business logic |
| Database  | Data storage   |

This separation keeps systems organized and secure.

> Users interact with applications, not directly with databases.

---

## 11.2 Example Backend Query Flow

Imagine:

```text
GET /users/1
```

The backend receives:

```javascript
app.get("/users/:id")
```

Then queries the database:

```sql
SELECT *
FROM users
WHERE id = 1;
```

Database returns:

```json
{
    "id": 1,
    "name": "Alice"
}
```

Backend returns:

```json
{
    "id": 1,
    "name": "Alice"
}
```

to the client.

### Complete Flow

```text
Browser
   ↓
Express Route
   ↓
SQL Query
   ↓
Database
   ↓
Results
   ↓
JSON Response
   ↓
Browser
```

This architecture is the foundation of modern full-stack development.

> A backend server acts as the translator between users and the database.

---

# 12. Managed vs Self-Hosted Databases

Once a database has been designed, it must be deployed somewhere so applications can access it.

There are two primary approaches:

1. Managed Databases
2. Self-Hosted Databases

Understanding the difference is important because every production application eventually needs a database server.

---

## 12.1 Managed Databases

A **managed database** is hosted and maintained by a third-party provider.

Examples:

| Provider        | Database Services |
| --------------- | ----------------- |
| AWS             | RDS, Aurora       |
| Google Cloud    | Cloud SQL         |
| Microsoft Azure | Azure Database    |
| Supabase        | PostgreSQL        |
| Railway         | PostgreSQL        |
| Neon            | PostgreSQL        |
| Render          | PostgreSQL        |

Typical architecture:

```text
Application
      │
      ▼
Managed Database
      │
      ▼
Cloud Provider
```

The provider handles:

* Installation
* Updates
* Backups
* Monitoring
* Security patches
* Scaling infrastructure

### Advantages

| Advantage         | Explanation                   |
| ----------------- | ----------------------------- |
| Easy Setup        | Database available in minutes |
| Automated Backups | Reduced risk of data loss     |
| Monitoring        | Built-in performance tracking |
| Security Updates  | Provider handles patching     |
| Scalability       | Easier growth                 |

### Disadvantages

| Disadvantage      | Explanation                  |
| ----------------- | ---------------------------- |
| Cost              | More expensive at scale      |
| Less Control      | Limited server customization |
| Vendor Dependency | Tied to provider ecosystem   |

Example workflow:

```text
Create Project
      ↓
Provision PostgreSQL
      ↓
Receive Connection String
      ↓
Connect Application
```

No server administration required.

> Managed databases allow developers to focus on application development rather than infrastructure management.

---

## 12.2 Self-Hosted Databases

A **self-hosted database** runs on infrastructure managed by the developer or organization.

Architecture:

```text
Application
      │
      ▼
Database Server
      │
      ▼
Developer Managed Infrastructure
```

The team is responsible for:

* Installation
* Backups
* Updates
* Monitoring
* Security
* Recovery procedures

### Advantages

| Advantage              | Explanation                            |
| ---------------------- | -------------------------------------- |
| Full Control           | Complete configuration freedom         |
| Potential Cost Savings | Large-scale deployments may be cheaper |
| Custom Infrastructure  | Tailored to business requirements      |
| Independence           | No vendor lock-in                      |

### Disadvantages

| Disadvantage          | Explanation                     |
| --------------------- | ------------------------------- |
| Maintenance Burden    | Requires database expertise     |
| Backup Responsibility | Must design recovery strategy   |
| Security Management   | Patching and hardening required |
| Higher Complexity     | More moving parts               |

Example:

```text
Purchase Server
       ↓
Install Linux
       ↓
Install PostgreSQL
       ↓
Configure Security
       ↓
Manage Backups
```

This provides flexibility but increases operational responsibility.

> Self-hosting provides maximum control but requires significantly more expertise.

---

## 12.3 Managed vs Self-Hosted

| Feature                           | Managed   | Self-Hosted |
| --------------------------------- | --------- | ----------- |
| Setup Speed                       | Fast      | Slower      |
| Maintenance                       | Provider  | Developer   |
| Backups                           | Automatic | Manual      |
| Security Updates                  | Automatic | Manual      |
| Flexibility                       | Moderate  | High        |
| Infrastructure Knowledge Required | Low       | High        |
| Control                           | Limited   | Complete    |

For most modern web applications:

```text
Learning Projects
       ↓
Small Startups
       ↓
Managed Database
```

is the preferred path.

> Beginners should learn database concepts first and infrastructure management later.

---

# 13. PostgreSQL Overview

PostgreSQL is the primary database taught throughout the Fullstack Path.

It is one of the most widely used relational databases in the world.

---

## 13.1 What is PostgreSQL?

**PostgreSQL** is an open-source relational database management system (RDBMS).

It stores data in tables and uses SQL for communication.

Example:

```sql
SELECT *
FROM users;
```

PostgreSQL executes the query and returns matching rows.

### Key Characteristics

| Characteristic   | Description                   |
| ---------------- | ----------------------------- |
| Open Source      | Free to use                   |
| Relational       | Uses tables and relationships |
| SQL Based        | Standard query language       |
| ACID Compliant   | Reliable transactions         |
| Extensible       | Supports advanced features    |
| Production Ready | Used by large companies       |

Popular users include:

| Company     |
| ----------- |
| Instagram   |
| Reddit      |
| Spotify     |
| Twitch      |
| TripAdvisor |

---

## 13.2 Why PostgreSQL?

Many SQL databases exist:

| Database   | Type        |
| ---------- | ----------- |
| PostgreSQL | Open Source |
| MySQL      | Open Source |
| SQL Server | Microsoft   |
| Oracle     | Enterprise  |
| SQLite     | Embedded    |

Scrimba teaches PostgreSQL because it balances:

```text
Ease of Use
      +
Reliability
      +
Industry Adoption
      +
Advanced Features
```

### PostgreSQL Strengths

| Feature               | Benefit                    |
| --------------------- | -------------------------- |
| Strong SQL Support    | Standards-compliant        |
| Excellent Performance | Handles large workloads    |
| Advanced Indexing     | Faster queries             |
| JSON Support          | Hybrid SQL/NoSQL workflows |
| Reliability           | Trusted in production      |

> PostgreSQL is one of the safest long-term investments for backend developers.

---

## 13.3 PostgreSQL in the Fullstack Path

Future modules will use PostgreSQL for:

* Storing users
* Managing products
* Recording orders
* Authentication
* Application data

Current progression:

```text
JavaScript Arrays
       ↓
API Responses
       ↓
Backend Servers
       ↓
PostgreSQL Database
```

Instead of:

```javascript
const users = []
```

you will eventually use:

```sql
SELECT *
FROM users;
```

to retrieve real persisted data.

> PostgreSQL becomes the application's permanent source of truth.

---

# 14. How Backend Applications Use Databases

Databases rarely operate in isolation.

Most applications follow a layered architecture.

---

## 14.1 The Request Lifecycle

Example:

User opens:

```text
/profile
```

Workflow:

```text
Browser
   ↓
HTTP Request
   ↓
Backend Route
   ↓
Database Query
   ↓
Database Result
   ↓
JSON Response
   ↓
Browser Update
```

Every major web application follows this pattern.

---

## 14.2 Example User Lookup

Backend code:

```javascript
app.get("/users/:id", async (req, res) => {
    // query database
})
```

Database query:

```sql
SELECT *
FROM users
WHERE id = 1;
```

Database result:

```json
{
    "id": 1,
    "name": "Alice"
}
```

Response returned to frontend:

```json
{
    "id": 1,
    "name": "Alice"
}
```

The browser never communicates directly with the database.

### Layer Responsibilities

| Layer    | Purpose            |
| -------- | ------------------ |
| Browser  | User interaction   |
| Backend  | Business logic     |
| Database | Persistent storage |

This separation improves:

* Security
* Maintainability
* Scalability

> Databases store data, but backend applications decide how data is used.

---

## 14.3 CRUD Operations

Most database interactions fall into four categories.

### Create

```sql
INSERT INTO users
(name)
VALUES
('Alice');
```

Adds data.

---

### Read

```sql
SELECT *
FROM users;
```

Retrieves data.

---

### Update

```sql
UPDATE users
SET name = 'Bob'
WHERE id = 1;
```

Modifies data.

---

### Delete

```sql
DELETE FROM users
WHERE id = 1;
```

Removes data.

### CRUD Summary

| Operation | SQL Command |
| --------- | ----------- |
| Create    | INSERT      |
| Read      | SELECT      |
| Update    | UPDATE      |
| Delete    | DELETE      |

Future sections of the Databases module focus heavily on these operations.

> Nearly every database interaction can be described as CRUD.

---

# 15. Database Architecture Basics

Applications are often built using a three-layer architecture.

---

## 15.1 Three-Tier Architecture

```text
┌──────────────────┐
│   Frontend UI    │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Backend Server   │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│   Database       │
└──────────────────┘
```

Each layer has a specific responsibility.

### Frontend

Responsible for:

* User interface
* Forms
* Buttons
* Visual feedback

Examples:

* HTML
* CSS
* JavaScript
* React

---

### Backend

Responsible for:

* Authentication
* Validation
* Business rules
* Database communication

Examples:

* Node.js
* Express

---

### Database

Responsible for:

* Storage
* Retrieval
* Relationships
* Data integrity

Examples:

* PostgreSQL
* MySQL

> Keeping responsibilities separated makes applications easier to maintain and scale.

---

## 15.2 Data Flow Through the System

Example login:

```text
User Enters Email
        ↓
Frontend Form
        ↓
POST Request
        ↓
Backend Validation
        ↓
Database Query
        ↓
User Record Found
        ↓
Response Returned
        ↓
Login Successful
```

This pattern repeats throughout modern software systems.

### Real-World Examples

| Application | Data Stored                         |
| ----------- | ----------------------------------- |
| Netflix     | Users, subscriptions, watch history |
| Amazon      | Products, orders, customers         |
| Spotify     | Songs, playlists                    |
| Uber        | Drivers, riders, trips              |
| Airbnb      | Listings, bookings                  |

Every application ultimately depends on a database layer.

> Databases sit at the heart of almost every modern software system.

---

# 16. HTML Structure Recap

Although this section is conceptual rather than project-based, the learning flow can be represented as:

```html
Learning Structure

Databases
├── Why Databases Exist
│
├── Database Fundamentals
│   ├── Tables
│   ├── Rows
│   ├── Columns
│   └── Records
│
├── Relational Databases
│   ├── Primary Keys
│   └── Foreign Keys
│
├── SQL vs NoSQL
│
├── Database Hosting
│   ├── Managed
│   └── Self Hosted
│
├── PostgreSQL
│
└── Backend Integration
    ├── CRUD
    ├── Queries
    └── Architecture
```

---

# 17. How to Run

This section is primarily theoretical and does not contain a runnable project.

To reinforce concepts:

1. Install PostgreSQL locally.
2. Explore a hosted PostgreSQL provider such as Neon or Supabase.
3. Create sample tables.
4. Practice basic SQL queries.
5. Continue to the **Writing SQL Queries** section.

Future sections of the Databases module will build upon the concepts introduced here.

---

# 18. Course Reference

* **Course:** https://scrimba.com/learn/fullstack
* **Module:** 10. Databases
* **Section:** 01. Intro to Databases
* **Primary Concepts:**

  * Databases
  * Data Persistence
  * Tables
  * Rows
  * Columns
  * Records
  * Relational Databases
  * SQL vs NoSQL
  * Primary Keys
  * Foreign Keys
  * PostgreSQL
  * Managed Databases
  * Self-Hosted Databases
  * CRUD
  * Backend Architecture

---

# Key Takeaways

```text
Files Store Data
        ↓
Databases Store Data Better
        ↓
Tables Organize Information
        ↓
Rows Represent Records
        ↓
Columns Define Attributes
        ↓
Primary Keys Identify Records
        ↓
Foreign Keys Create Relationships
        ↓
SQL Manipulates Data
        ↓
PostgreSQL Powers Applications
        ↓
Backend Servers Communicate With Databases
```

> This section introduces the language, concepts, and mental models required for everything that follows in the Databases module. Understanding these fundamentals makes SQL queries, table design, joins, and backend data management significantly easier to learn.
