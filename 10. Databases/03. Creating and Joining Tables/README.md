# Creating and Joining Tables — Databases

![SQL](https://img.shields.io/badge/SQL-Database%20Design-blue?style=flat-square\&logo=postgresql)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Relationships-336791?style=flat-square\&logo=postgresql)
![Database](https://img.shields.io/badge/Database-Table%20Design-green?style=flat-square)
![Joins](https://img.shields.io/badge/SQL-JOINS-orange?style=flat-square)
![Constraints](https://img.shields.io/badge/Constraints-Primary%20%26%20Foreign%20Keys-red?style=flat-square)
![Status](https://img.shields.io/badge/Status-Completed-brightgreen?style=flat-square)
![Course](https://img.shields.io/badge/Scrimba-Fullstack%20Path-purple?style=flat-square)

The **Creating and Joining Tables** section is the third part of the **Databases module** from **Scrimba's Fullstack Web Development Path**.

This README is written as a **complete concept revision guide**. Reading it from top to bottom will revise every table design, relationship, and JOIN concept introduced in this section while building directly upon the SQL querying concepts covered in **Writing SQL Queries**.

---

# Table of Contents

1. [Project Overview](#1-project-overview)
2. [Project Structure](#2-project-structure)
3. [What is Database Design?](#3-what-is-database-design)
4. [What's New vs Writing SQL Queries](#4-whats-new-vs-writing-sql-queries)
5. [Creating Tables](#5-creating-tables)

   * [CREATE TABLE](#51-create-table)
   * [Column Definitions](#52-column-definitions)
   * [Data Types](#53-data-types)
6. [Database Constraints](#6-database-constraints)

   * [PRIMARY KEY](#61-primary-key)
   * [NOT NULL](#62-not-null)
   * [UNIQUE](#63-unique)
   * [DEFAULT](#64-default)
7. [Foreign Keys](#7-foreign-keys)

   * [What is a Foreign Key?](#71-what-is-a-foreign-key)
   * [Referential Integrity](#72-referential-integrity)
8. [Populating Tables](#8-populating-tables)
9. [ALTER TABLE](#9-alter-table)
10. [Database Relationships](#10-database-relationships)

    * [One-to-One](#101-one-to-one)
    * [One-to-Many](#102-one-to-many)
    * [Many-to-Many](#103-many-to-many)
11. [JOIN Fundamentals](#11-join-fundamentals)
12. [INNER JOIN](#12-inner-join)
13. [LEFT JOIN](#13-left-join)
14. [RIGHT JOIN](#14-right-join)
15. [FULL JOIN](#15-full-join)
16. [Joining Multiple Tables](#16-joining-multiple-tables)
17. [Aggregate Queries Across Tables](#17-aggregate-queries-across-tables)
18. [SQL Injection Introduction](#18-sql-injection-introduction)
19. [Parameterized Queries](#19-parameterized-queries)
20. [Database Design Best Practices](#20-database-design-best-practices)
21. [HTML Structure Recap](#21-html-structure-recap)
22. [How to Run](#22-how-to-run)
23. [Course Reference](#23-course-reference)

---

# 1. Project Overview

The **Creating and Joining Tables** section is where databases become interconnected systems rather than isolated tables.

In previous sections:

* We learned what databases are.
* We learned how tables store information.
* We learned how SQL retrieves and modifies data.

This section introduces:

* Table creation
* Database constraints
* Foreign keys
* Relationships
* JOIN operations
* Multi-table queries
* Data integrity
* Database security fundamentals

The goal of this section is not just to create tables—it is to understand how real-world applications organize data across multiple related tables.

---

# 2. Project Structure

```text
10. Databases/
│
└── 03. Creating and Joining Tables/
    │
    ├── Table Creation
    │   → CREATE TABLE and schema design
    │
    ├── Constraints
    │   → PRIMARY KEY, UNIQUE, NOT NULL
    │
    ├── Relationships
    │   → One-to-One, One-to-Many, Many-to-Many
    │
    ├── JOIN Operations
    │   → INNER, LEFT, RIGHT, FULL
    │
    ├── Multi-Table Queries
    │   → Aggregates and reporting
    │
    └── SQL Injection
        → Security fundamentals
```

Unlike the previous README, which focused on querying data, this section focuses on how data is structured and connected.

---

# 3. What is Database Design?

Before data can be queried, tables must be designed.

Database design is the process of deciding:

* What tables exist
* What columns they contain
* How tables relate to each other
* How data integrity is maintained

Example:

Bad design:

```text
UsersAndOrders
├── user_name
├── user_email
├── order_id
├── product_name
├── product_price
```

Everything is stored together.

Better design:

```text
Users
Orders
Products
```

Each table has a specific responsibility.

### Benefits of Good Design

| Benefit            | Description                     |
| ------------------ | ------------------------------- |
| Less Duplication   | Store data once                 |
| Easier Updates     | Modify information in one place |
| Better Performance | Smaller tables                  |
| Improved Integrity | Fewer inconsistencies           |
| Scalability        | Supports growth                 |

> Database design determines how easy it will be to work with data in the future.

---

# 4. What's New vs Writing SQL Queries

The previous section focused on interacting with existing tables.

This section focuses on building those tables.

## New Concepts

| Concept        | Where Used      | Purpose                         |
| -------------- | --------------- | ------------------------------- |
| `CREATE TABLE` | Schema creation | Build tables                    |
| Data Types     | Columns         | Define allowed values           |
| `PRIMARY KEY`  | Identification  | Unique records                  |
| `FOREIGN KEY`  | Relationships   | Connect tables                  |
| `NOT NULL`     | Validation      | Prevent empty values            |
| `UNIQUE`       | Validation      | Prevent duplicates              |
| `ALTER TABLE`  | Schema updates  | Modify existing tables          |
| `INNER JOIN`   | Queries         | Match records                   |
| `LEFT JOIN`    | Queries         | Include unmatched left records  |
| `RIGHT JOIN`   | Queries         | Include unmatched right records |
| `FULL JOIN`    | Queries         | Include all records             |
| SQL Injection  | Security        | Prevent attacks                 |

### Learning Progression

```text
Tables
   ↓
Constraints
   ↓
Relationships
   ↓
Foreign Keys
   ↓
JOINS
   ↓
Multi-Table Queries
   ↓
Security
```

> This section transforms isolated tables into connected database systems.

---

# 5. Creating Tables

Before storing data, a table must exist.

This is done with `CREATE TABLE`.

---

## 5.1 CREATE TABLE

```sql
CREATE TABLE users (
    id INTEGER,
    name TEXT,
    email TEXT
);
```

This creates a table named `users`.

Visual representation:

```text
Users Table
├── id
├── name
└── email
```

The database now understands:

* Table name
* Column names
* Column order

### Query Breakdown

| Part           | Purpose       |
| -------------- | ------------- |
| `CREATE TABLE` | Creates table |
| `users`        | Table name    |
| `id`           | Column        |
| `INTEGER`      | Data type     |
| `TEXT`         | Data type     |

> Every database begins with table creation.

---

## 5.2 Column Definitions

```sql
CREATE TABLE users (
    id INTEGER,
    name TEXT,
    age INTEGER,
    created_at DATE
);
```

Each column defines:

* Column name
* Data type
* Rules (later via constraints)

### Example Structure

| Column     | Data Type |
| ---------- | --------- |
| id         | INTEGER   |
| name       | TEXT      |
| age        | INTEGER   |
| created_at | DATE      |

Each row must follow this structure.

> Columns define the shape of the data that can be stored.

---

## 5.3 Data Types

Data types define what kind of information can be stored.

```sql
CREATE TABLE products (
    id INTEGER,
    name TEXT,
    price DECIMAL,
    created_at DATE
);
```

### Common SQL Data Types

| Type        | Purpose         |
| ----------- | --------------- |
| `INTEGER`   | Whole numbers   |
| `TEXT`      | Strings         |
| `DECIMAL`   | Decimal numbers |
| `BOOLEAN`   | True / False    |
| `DATE`      | Calendar dates  |
| `TIMESTAMP` | Date and time   |

Examples:

```sql
42
```

INTEGER

```sql
'Laptop'
```

TEXT

```sql
999.99
```

DECIMAL

```sql
TRUE
```

BOOLEAN

### Why Data Types Matter

Without data types:

```text
Age = "Banana"
```

could be stored.

With data types:

```text
Age = 25
```

is required.

> Data types help databases reject invalid data before it causes problems.

---

---

# 6. Database Constraints

A database should not accept every piece of data it receives.

Constraints are rules that protect data quality and enforce consistency.

Without constraints:

```text id="rf9x7e"
User Name = NULL
Email = NULL
ID = NULL
```

might be stored.

With constraints:

```text id="mzlc5f"
Database Rejects Invalid Data
```

This prevents bad records from entering the system.

---

## 6.1 PRIMARY KEY

```sql id="79z8vr"
CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    name TEXT
);
```

A primary key uniquely identifies every row.

Example:

| id | name    |
| -- | ------- |
| 1  | Alice   |
| 2  | Bob     |
| 3  | Charlie |

The `id` column guarantees uniqueness.

### Primary Key Rules

| Rule          | Description               |
| ------------- | ------------------------- |
| Unique        | No duplicates             |
| Not Null      | Must always exist         |
| One Per Table | Single primary identifier |
| Stable        | Should rarely change      |

### Invalid Example

```text id="4r8lyw"
id | name
--------------
1  | Alice
1  | Bob
```

Duplicate IDs create ambiguity.

### Valid Example

```text id="2z4ktv"
id | name
--------------
1  | Alice
2  | Bob
```

Every record has a unique identity.

### Visual Representation

```text id="l7es5x"
Users
│
├── ID 1
├── ID 2
├── ID 3
└── ID 4
```

No duplicates allowed.

> A primary key guarantees that every row can be uniquely identified.

---

## 6.2 NOT NULL

```sql id="efk04y"
CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL
);
```

`NOT NULL` prevents empty values.

Without it:

```text id="g99g4x"
id | name
---------
1  | NULL
```

might exist.

With `NOT NULL`:

```text id="jkrjtp"
Database Error
```

The row cannot be inserted.

### Why NOT NULL Matters

Imagine:

| Field    | Can Be Empty? |
| -------- | ------------- |
| User ID  | No            |
| Email    | Usually No    |
| Password | No            |
| Name     | Usually No    |

### Example

```sql id="rcj2io"
INSERT INTO users (
    id,
    name
)
VALUES (
    1,
    NULL
);
```

Result:

```text id="1v2egv"
ERROR
```

because the constraint is violated.

> Use `NOT NULL` for data that must always exist.

---

## 6.3 UNIQUE

```sql id="7jl46k"
CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    email TEXT UNIQUE
);
```

`UNIQUE` prevents duplicate values.

Example:

```text id="c4k6m0"
alice@email.com
alice@email.com
```

Not allowed.

### Why UNIQUE Matters

Emails are often used for:

* Login
* Password recovery
* Account identification

Allowing duplicates would create confusion.

### Example

Valid:

```text id="v4hgvf"
alice@email.com
bob@email.com
```

Invalid:

```text id="cmrqq4"
alice@email.com
alice@email.com
```

### Common UNIQUE Fields

| Column          | Reason                       |
| --------------- | ---------------------------- |
| Email           | One account per email        |
| Username        | Prevent duplicates           |
| Employee Number | Unique employee IDs          |
| Product SKU     | Unique inventory identifiers |

> `UNIQUE` protects fields that should never contain duplicate values.

---

## 6.4 DEFAULT

```sql id="4k6k7j"
CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    active BOOLEAN DEFAULT TRUE
);
```

`DEFAULT` provides a value when none is supplied.

Example:

```sql id="9a6yzf"
INSERT INTO users (
    id
)
VALUES (
    1
);
```

Result:

| id | active |
| -- | ------ |
| 1  | TRUE   |

The database automatically supplies the default.

### Benefits

| Benefit         | Explanation           |
| --------------- | --------------------- |
| Less Code       | Fewer values required |
| Consistency     | Predictable behavior  |
| Cleaner Inserts | Simpler queries       |

### Common Defaults

| Column     | Default           |
| ---------- | ----------------- |
| active     | TRUE              |
| created_at | Current timestamp |
| stock      | 0                 |
| role       | 'user'            |

> Defaults reduce repetitive data entry and improve consistency.

---

# 7. Foreign Keys

Primary keys identify records.

Foreign keys connect records.

Together they create relationships.

---

## 7.1 What is a Foreign Key?

Consider two tables.

Users:

| id | name  |
| -- | ----- |
| 1  | Alice |
| 2  | Bob   |

Orders:

| id  | user_id | product  |
| --- | ------- | -------- |
| 101 | 1       | Laptop   |
| 102 | 2       | Mouse    |
| 103 | 1       | Keyboard |

Notice:

```text id="uq9f95"
Orders.user_id
        ↓
Users.id
```

The `user_id` column references the Users table.

This reference is a foreign key.

### SQL Example

```sql id="j8kv6g"
CREATE TABLE orders (
    id INTEGER PRIMARY KEY,
    user_id INTEGER,
    FOREIGN KEY (user_id)
        REFERENCES users(id)
);
```

### Relationship Diagram

```text id="zb6jcv"
Users
┌─────────┐
│ id (PK) │
└────┬────┘
     │
     │
     ▼
Orders
┌─────────────┐
│ user_id(FK) │
└─────────────┘
```

PK = Primary Key

FK = Foreign Key

> Foreign keys establish relationships between tables.

---

## 7.2 Referential Integrity

One of the most important benefits of foreign keys is **referential integrity**.

Consider:

```text id="ewhhwg"
Users
------
1 | Alice
2 | Bob
```

Valid order:

```text id="jh39ci"
101 | 1 | Laptop
```

because user 1 exists.

Invalid order:

```text id="8tndcl"
102 | 99 | Laptop
```

because user 99 does not exist.

Without a foreign key:

```text id="j0a2mj"
Invalid Data Allowed
```

With a foreign key:

```text id="pwld6w"
Database Rejects Insert
```

### Benefits

| Benefit            | Description                   |
| ------------------ | ----------------------------- |
| Valid References   | Only existing records allowed |
| Data Consistency   | Prevents orphan records       |
| Easier Maintenance | Relationships stay accurate   |
| Better Queries     | Reliable joins                |

### Before vs After

Without foreign key:

```text id="pcz5ru"
Orders
│
├── User 1
├── User 2
└── User 999 ❌
```

With foreign key:

```text id="99gjzj"
Orders
│
├── User 1
└── User 2
```

Only valid references remain.

> Referential integrity is one of the biggest reasons relational databases are trusted.

---

# 8. Populating Tables

After tables are created, they need data.

This process is called populating a table.

---

## 8.1 Inserting Initial Data

```sql id="6ctvob"
INSERT INTO users (
    id,
    name
)
VALUES
(
    1,
    'Alice'
),
(
    2,
    'Bob'
);
```

Result:

| id | name  |
| -- | ----- |
| 1  | Alice |
| 2  | Bob   |

The table now contains data.

### Workflow

```text id="4wgx7u"
Create Table
      ↓
Insert Rows
      ↓
Query Data
```

This sequence is common in development.

> Tables are usually populated immediately after creation.

---

## 8.2 Creating Related Data

Users:

```text id="m6fhf8"
1 | Alice
2 | Bob
```

Orders:

```text id="qvd0z0"
101 | 1 | Laptop
102 | 2 | Mouse
```

The foreign key relationship connects them.

Visual:

```text id="0wzjlwm"
Alice
   │
   ▼
Laptop

Bob
  │
  ▼
Mouse
```

These relationships become useful once JOINs are introduced.

> Populating related tables prepares data for relationship queries.

---

# 9. ALTER TABLE

Databases evolve over time.

New requirements appear.

New columns are needed.

The `ALTER TABLE` statement modifies existing tables.

---

## 9.1 Adding Columns

```sql id="0y9i0v"
ALTER TABLE users
ADD COLUMN age INTEGER;
```

Before:

| id | name  |
| -- | ----- |
| 1  | Alice |

After:

| id | name  | age  |
| -- | ----- | ---- |
| 1  | Alice | NULL |

The structure changes without recreating the table.

### Why ALTER TABLE Exists

Applications evolve:

```text id="3kbgq5"
Version 1
 └── name

Version 2
 └── name
 └── email

Version 3
 └── name
 └── email
 └── age
```

Tables must evolve too.

> `ALTER TABLE` allows schema changes without losing existing data.

---

## 9.2 Renaming Columns

```sql id="hnzhx7"
ALTER TABLE users
RENAME COLUMN name
TO full_name;
```

Before:

```text id="2hslmy"
name
```

After:

```text id="mlcr4x"
full_name
```

The data remains unchanged.

Only the column name changes.

### Common Reasons

| Reason        | Example                  |
| ------------- | ------------------------ |
| Better Naming | `name` → `full_name`     |
| Clarification | `date` → `created_date`  |
| Consistency   | Align naming conventions |

> Renaming columns improves schema clarity without affecting stored data.

---

## 9.3 Removing Columns

```sql id="bxglwz"
ALTER TABLE users
DROP COLUMN age;
```

Before:

```text id="o3s1j2"
id
name
age
```

After:

```text id="7wy5ea"
id
name
```

The column and its data are permanently removed.

### Caution

```text id="wriz3l"
DROP COLUMN
     ↓
Data Lost
```

Unlike renaming, dropping deletes information.

> Schema changes should always be planned carefully before execution.

---

---

# 10. Database Relationships

Relationships are what make relational databases powerful.

Without relationships:

```text id="z4x52h"
Users Table
Products Table
Orders Table
```

would exist independently.

With relationships:

```text id="2k22oe"
Users
   │
   ▼
Orders
   │
   ▼
Products
```

tables become connected.

This allows databases to represent real-world systems efficiently.

---

## 10.1 One-to-One Relationships

A **one-to-one relationship** means:

```text id="xmykgw"
One Record
     ↓
Related To
     ↓
One Record
```

Example:

```text id="91g2ht"
User
  ↔
Profile
```

Each user has exactly one profile.

Each profile belongs to exactly one user.

### Example Tables

Users:

| id | name  |
| -- | ----- |
| 1  | Alice |
| 2  | Bob   |

Profiles:

| id | user_id | bio       |
| -- | ------- | --------- |
| 1  | 1       | Developer |
| 2  | 2       | Designer  |

Relationship:

```text id="jv3y1o"
User 1
   ↓
Profile 1

User 2
   ↓
Profile 2
```

### Why Use One-to-One?

Sometimes information should be separated.

Instead of:

```text id="p5r8jk"
Users
├── name
├── email
├── bio
├── avatar
├── preferences
├── settings
```

we can create:

```text id="y08w8p"
Users
Profiles
```

This improves organization.

### Common Examples

| Table A  | Table B        |
| -------- | -------------- |
| User     | Profile        |
| Person   | Passport       |
| Employee | Employee Badge |
| Account  | Settings       |

> One-to-one relationships separate closely related information into dedicated tables.

---

## 10.2 One-to-Many Relationships

This is the most common relationship type.

One record can relate to many records.

Example:

```text id="j8n8mk"
One User
     ↓
Many Orders
```

### Example Tables

Users:

| id | name  |
| -- | ----- |
| 1  | Alice |

Orders:

| id  | user_id |
| --- | ------- |
| 101 | 1       |
| 102 | 1       |
| 103 | 1       |

Relationship:

```text id="2cvaxk"
Alice
 │
 ├── Order 101
 ├── Order 102
 └── Order 103
```

One user.

Many orders.

### SQL Definition

```sql id="74c2m9"
CREATE TABLE orders (
    id INTEGER PRIMARY KEY,
    user_id INTEGER,
    FOREIGN KEY (user_id)
        REFERENCES users(id)
);
```

The foreign key creates the relationship.

### Real-World Examples

| One      | Many     |
| -------- | -------- |
| Customer | Orders   |
| Author   | Books    |
| Teacher  | Students |
| Category | Products |

### Why It Matters

Without relationships:

```text id="4g2ezg"
Customer Data
Repeated
Repeated
Repeated
```

With one-to-many:

```text id="r7q8p9"
Customer Stored Once
Orders Reference Customer
```

Less duplication.

Cleaner design.

> Most business databases are dominated by one-to-many relationships.

---

## 10.3 Many-to-Many Relationships

A many-to-many relationship means:

```text id="m30z5q"
Many Records
       ↔
Many Records
```

Example:

```text id="ec2g4r"
Students
      ↔
Courses
```

A student can enroll in many courses.

A course can contain many students.

### Problem

Direct relationships do not work well.

Bad approach:

```text id="2bwkri"
Students
├── course1
├── course2
├── course3
```

Not scalable.

### Solution: Junction Table

Students:

| id | name  |
| -- | ----- |
| 1  | Alice |
| 2  | Bob   |

Courses:

| id | title      |
| -- | ---------- |
| 1  | SQL        |
| 2  | JavaScript |

Enrollments:

| student_id | course_id |
| ---------- | --------- |
| 1          | 1         |
| 1          | 2         |
| 2          | 1         |

Visual:

```text id="e9w2z3"
Students
     │
     ▼
Enrollments
     ▲
     │
Courses
```

### Benefits

| Benefit    | Explanation             |
| ---------- | ----------------------- |
| Flexible   | Unlimited relationships |
| Scalable   | Handles large datasets  |
| Normalized | Avoids duplication      |

### Examples

| Entity A | Entity B   |
| -------- | ---------- |
| Students | Courses    |
| Users    | Roles      |
| Products | Categories |
| Actors   | Movies     |

> Many-to-many relationships require an intermediate table called a junction table.

---

# 11. JOIN Fundamentals

Relationships are useful only if we can query across tables.

This is where JOINs come in.

A JOIN combines rows from multiple tables.

---

## 11.1 Why JOINs Exist

Consider:

Users:

| id | name  |
| -- | ----- |
| 1  | Alice |
| 2  | Bob   |

Orders:

| id  | user_id | product |
| --- | ------- | ------- |
| 101 | 1       | Laptop  |
| 102 | 2       | Mouse   |

Question:

```text id="ztrslc"
Which user purchased which product?
```

The information is split across tables.

JOINs combine them.

Result:

| User  | Product |
| ----- | ------- |
| Alice | Laptop  |
| Bob   | Mouse   |

### Visual Representation

```text id="xh11l0"
Users Table
      │
      │
      ▼
   JOIN
      ▲
      │
Orders Table
```

### JOIN Goal

```text id="t54k8i"
Multiple Tables
       ↓
Single Result Set
```

> JOINs allow databases to answer questions that involve multiple tables.

---

## 11.2 JOIN Syntax Structure

Basic pattern:

```sql id="mkv8z9"
SELECT *
FROM table_a
JOIN table_b
ON table_a.id = table_b.id;
```

Components:

| Part   | Purpose                |
| ------ | ---------------------- |
| SELECT | Columns to return      |
| FROM   | First table            |
| JOIN   | Second table           |
| ON     | Relationship condition |

### Example

```sql id="evd3mw"
SELECT *
FROM users
JOIN orders
ON users.id = orders.user_id;
```

The ON clause tells SQL how records are connected.

Without ON:

```text id="xxdz2f"
No Relationship Defined
```

SQL cannot determine how rows should be matched.

> The ON clause is the bridge connecting tables.

---

# 12. INNER JOIN

The most common JOIN type is `INNER JOIN`.

It returns only matching rows.

---

## 12.1 What is INNER JOIN?

```sql id="f6mtm3"
SELECT *
FROM users
INNER JOIN orders
ON users.id = orders.user_id;
```

Only records that exist in both tables are returned.

### Example Data

Users:

| id | name    |
| -- | ------- |
| 1  | Alice   |
| 2  | Bob     |
| 3  | Charlie |

Orders:

| id  | user_id | product |
| --- | ------- | ------- |
| 101 | 1       | Laptop  |
| 102 | 2       | Mouse   |

Notice:

```text id="n93nh8"
Charlie
     ↓
No Orders
```

### Result

| name  | product |
| ----- | ------- |
| Alice | Laptop  |
| Bob   | Mouse   |

Charlie does not appear.

### Why?

Because no matching order exists.

Visual:

```text id="cuj5ow"
Users
  ● Alice
  ● Bob
  ● Charlie

Orders
  ● Alice
  ● Bob

Intersection
     ↓
Alice
Bob
```

Only the overlap is returned.

> INNER JOIN returns rows that exist in both tables.

---

## 12.2 INNER JOIN Diagram

Think of INNER JOIN as an intersection.

```text id="tbm6nl"
      Users
    ╭────────╮
   ╱          ╲
  │  Alice    │
  │    ╭──╮   │
  │    │AB│   │
   ╲   ╰──╯  ╱
    ╰────────╯
         Orders
```

Returned:

```text id="xj56ij"
AB
```

Only records appearing in both tables survive.

### Summary

| JOIN Type  | Returns            |
| ---------- | ------------------ |
| INNER JOIN | Matching rows only |

### Common Uses

| Scenario                   | Example            |
| -------------------------- | ------------------ |
| Users with Orders          | Customer purchases |
| Students with Courses      | Enrollment data    |
| Products with Categories   | Product catalog    |
| Employees with Departments | Company directory  |

> INNER JOIN is the default choice when only matching records matter.

---

## 12.3 Real-World INNER JOIN Query

```sql id="4t8sqh"
SELECT
    users.name,
    orders.product
FROM users
INNER JOIN orders
ON users.id = orders.user_id;
```

Result:

| Name  | Product |
| ----- | ------- |
| Alice | Laptop  |
| Bob   | Mouse   |

This transforms two separate tables into meaningful business information.

### Query Flow

```text id="a8lq6o"
Users
   +
Orders
      ↓
INNER JOIN
      ↓
Matched Records
      ↓
Final Result
```

This pattern appears constantly in production databases.

Examples:

* Orders and customers
* Posts and authors
* Products and categories
* Employees and departments

> Most reporting systems rely heavily on INNER JOIN operations.

---

---

# 13. LEFT JOIN

`INNER JOIN` only returns matching records.

Sometimes we want all records from one table, even if no matching record exists in the other table.

This is the purpose of `LEFT JOIN`.

---

## 13.1 What is LEFT JOIN?

```sql id="1twq2t"
SELECT *
FROM users
LEFT JOIN orders
ON users.id = orders.user_id;
```

A LEFT JOIN returns:

```text id="rmd7xr"
All Rows From Left Table
          +
Matching Rows From Right Table
```

The left table is:

```sql id="wmb8l6"
FROM users
```

Therefore:

```text id="3y92w4"
Every User Appears
```

even if they have no orders.

---

## Example Data

Users:

| id | name    |
| -- | ------- |
| 1  | Alice   |
| 2  | Bob     |
| 3  | Charlie |

Orders:

| id  | user_id | product |
| --- | ------- | ------- |
| 101 | 1       | Laptop  |
| 102 | 2       | Mouse   |

Notice:

```text id="olh2g0"
Charlie
   ↓
No Order
```

---

## LEFT JOIN Result

```sql id="dq7h6e"
SELECT
    users.name,
    orders.product
FROM users
LEFT JOIN orders
ON users.id = orders.user_id;
```

Result:

| name    | product |
| ------- | ------- |
| Alice   | Laptop  |
| Bob     | Mouse   |
| Charlie | NULL    |

Charlie appears even though no matching order exists.

### Why NULL?

```text id="1ft3b6"
User Exists
Order Does Not Exist
```

SQL fills missing values with:

```text id="ntjsgn"
NULL
```

---

## Visual Representation

```text id="6e2lqv"
Users
  ● Alice
  ● Bob
  ● Charlie

Orders
  ● Alice
  ● Bob

LEFT JOIN
     ↓

Alice
Bob
Charlie
```

Every user survives.

> LEFT JOIN keeps all rows from the left table regardless of matches.

---

## 13.2 Common Uses

Find users with no orders:

```sql id="0uqkwe"
SELECT *
FROM users
LEFT JOIN orders
ON users.id = orders.user_id
WHERE orders.id IS NULL;
```

Result:

```text id="aj0kz5"
Charlie
```

This query identifies users who have never purchased anything.

### Business Examples

| Question                      | JOIN Type |
| ----------------------------- | --------- |
| Customers with no orders      | LEFT JOIN |
| Products never purchased      | LEFT JOIN |
| Students without courses      | LEFT JOIN |
| Employees without departments | LEFT JOIN |

### Pattern

```text id="zuwxtj"
LEFT JOIN
     +
IS NULL
     ↓
Find Missing Relationships
```

> LEFT JOIN is often used to find records that do not have related data.

---

# 14. RIGHT JOIN

RIGHT JOIN is the opposite of LEFT JOIN.

Instead of keeping every row from the left table:

```text id="ptnh4i"
Keep Every Row
From Right Table
```

---

## 14.1 What is RIGHT JOIN?

```sql id="fblzrw"
SELECT *
FROM users
RIGHT JOIN orders
ON users.id = orders.user_id;
```

Returns:

```text id="f7u17x"
All Rows From Right Table
         +
Matching Rows From Left Table
```

The right table is:

```sql id="ltodmp"
orders
```

Therefore every order appears.

---

## Example Data

Users:

| id | name  |
| -- | ----- |
| 1  | Alice |
| 2  | Bob   |

Orders:

| id  | user_id | product  |
| --- | ------- | -------- |
| 101 | 1       | Laptop   |
| 102 | 2       | Mouse    |
| 103 | 99      | Keyboard |

Notice:

```text id="23xux7"
User 99
   ↓
Missing
```

---

## RIGHT JOIN Result

| name  | product  |
| ----- | -------- |
| Alice | Laptop   |
| Bob   | Mouse    |
| NULL  | Keyboard |

The order still appears.

Missing user information becomes:

```text id="wawzyv"
NULL
```

---

## Visual Representation

```text id="4izl9h"
Users
  ● Alice
  ● Bob

Orders
  ● Laptop
  ● Mouse
  ● Keyboard

RIGHT JOIN
      ↓

Laptop
Mouse
Keyboard
```

Every order survives.

> RIGHT JOIN preserves every row from the right table.

---

## 14.2 Why RIGHT JOIN Is Less Common

Everything a RIGHT JOIN can do can usually be rewritten as a LEFT JOIN.

Example:

```sql id="nv1lzu"
SELECT *
FROM users
RIGHT JOIN orders
ON users.id = orders.user_id;
```

Equivalent:

```sql id="c8t42w"
SELECT *
FROM orders
LEFT JOIN users
ON orders.user_id = users.id;
```

Many developers prefer LEFT JOIN because it reads more naturally.

### Industry Practice

| JOIN Type  | Usage       |
| ---------- | ----------- |
| INNER JOIN | Very Common |
| LEFT JOIN  | Very Common |
| RIGHT JOIN | Less Common |
| FULL JOIN  | Occasional  |

> Most production SQL code favors LEFT JOIN over RIGHT JOIN.

---

# 15. FULL JOIN

Sometimes we want:

```text id="lzjlwm"
Everything
From Both Tables
```

regardless of whether matches exist.

This is the purpose of `FULL JOIN`.

---

## 15.1 What is FULL JOIN?

```sql id="z7iv4y"
SELECT *
FROM users
FULL JOIN orders
ON users.id = orders.user_id;
```

Returns:

```text id="r5m79g"
All Users
      +
All Orders
```

Matched rows combine.

Unmatched rows remain.

---

## Example Data

Users:

| id | name    |
| -- | ------- |
| 1  | Alice   |
| 2  | Bob     |
| 3  | Charlie |

Orders:

| id  | user_id | product  |
| --- | ------- | -------- |
| 101 | 1       | Laptop   |
| 102 | 2       | Mouse    |
| 103 | 99      | Keyboard |

---

## FULL JOIN Result

| name    | product  |
| ------- | -------- |
| Alice   | Laptop   |
| Bob     | Mouse    |
| Charlie | NULL     |
| NULL    | Keyboard |

Notice:

```text id="06z2h8"
Unmatched User
     ↓
Charlie

Unmatched Order
     ↓
Keyboard
```

Both survive.

---

## Visual Representation

```text id="skcw0s"
Users
 ● Alice
 ● Bob
 ● Charlie

Orders
 ● Laptop
 ● Mouse
 ● Keyboard

FULL JOIN
      ↓

Alice
Bob
Charlie
Keyboard
```

Everything is included.

> FULL JOIN returns matching and non-matching rows from both tables.

---

## 15.2 JOIN Comparison

### INNER JOIN

```text id="8e4d6e"
Only Matches
```

### LEFT JOIN

```text id="zj5htr"
All Left
+
Matches
```

### RIGHT JOIN

```text id="xf6ffr"
All Right
+
Matches
```

### FULL JOIN

```text id="ytwe0j"
Everything
```

---

## Visual JOIN Diagram

```text id="mjlwmr"
INNER JOIN

      A
    ╭────╮
   ╱  AB ╲
   ╲      ╱
    ╰────╯
       B

Result:
AB
```

---

```text id="f2d6al"
LEFT JOIN

      A
    ╭────╮
   ╱AAAA╲
   ╲ABBB╱
    ╰────╯
       B

Result:
A + AB
```

---

```text id="1wx1qa"
RIGHT JOIN

      A
    ╭────╮
   ╱AAAA╲
   ╲BBBB╱
    ╰────╯
       B

Result:
AB + B
```

---

```text id="x0ckm8"
FULL JOIN

      A
    ╭────╮
   ╱AAAA╲
   ╲BBBB╱
    ╰────╯
       B

Result:
A + AB + B
```

---

## 15.3 Choosing the Correct JOIN

| Goal                             | JOIN       |
| -------------------------------- | ---------- |
| Matching records only            | INNER JOIN |
| Keep everything from left table  | LEFT JOIN  |
| Keep everything from right table | RIGHT JOIN |
| Keep everything from both tables | FULL JOIN  |

### Decision Tree

```text id="1l7i66"
Need Matches Only?
      │
      ├── Yes → INNER JOIN
      │
      └── No
           │
           ├── Keep Left Side?
           │       ↓
           │    LEFT JOIN
           │
           ├── Keep Right Side?
           │       ↓
           │    RIGHT JOIN
           │
           └── Keep Everything?
                   ↓
               FULL JOIN
```

> Choosing the correct JOIN depends entirely on which rows you want preserved.

---

# 16. Joining Multiple Tables

Real applications rarely stop at two tables.

A typical database might contain:

```text id="0t4j5h"
Users
Orders
Products
Categories
Payments
```

Queries often combine several tables simultaneously.

---

## 16.1 Three-Table JOIN Example

Tables:

```text id="m3tmgb"
Users
   │
   ▼
Orders
   │
   ▼
Products
```

Query:

```sql id="zy3x2x"
SELECT
    users.name,
    products.title
FROM users
INNER JOIN orders
    ON users.id = orders.user_id
INNER JOIN products
    ON orders.product_id = products.id;
```

Result:

| User  | Product |
| ----- | ------- |
| Alice | Laptop  |
| Bob   | Mouse   |

The query connects three tables into one result.

### Multi-Table Flow

```text id="5m75p7"
Users
   +
Orders
   +
Products
      ↓
JOIN
      ↓
Single Result Set
```

> Multi-table joins are common in reporting, dashboards, and analytics systems.

---

---

# 17. Aggregate Queries Across Tables

JOINs become even more powerful when combined with aggregate functions.

Instead of simply connecting tables, we can generate summaries, reports, and business insights.

This is how most analytics dashboards are built.

---

## 17.1 Counting Related Records

Suppose we want to know how many orders each user has placed.

Tables:

Users:

| id | name  |
| -- | ----- |
| 1  | Alice |
| 2  | Bob   |

Orders:

| id  | user_id |
| --- | ------- |
| 101 | 1       |
| 102 | 1       |
| 103 | 2       |

Query:

```sql id="78lygw"
SELECT
    users.name,
    COUNT(orders.id)
FROM users
INNER JOIN orders
ON users.id = orders.user_id
GROUP BY users.name;
```

Result:

| name  | orders |
| ----- | ------ |
| Alice | 2      |
| Bob   | 1      |

### Query Flow

```text id="2gv7ec"
Users
   +
Orders
     ↓
INNER JOIN
     ↓
GROUP BY User
     ↓
COUNT Orders
```

### Business Uses

| Question                 | Query |
| ------------------------ | ----- |
| Orders per Customer      | COUNT |
| Products per Category    | COUNT |
| Students per Course      | COUNT |
| Employees per Department | COUNT |

> Aggregate queries turn raw data into useful summaries.

---

## 17.2 Revenue by Customer

Example:

Users:

| id | name  |
| -- | ----- |
| 1  | Alice |
| 2  | Bob   |

Orders:

| user_id | total |
| ------- | ----- |
| 1       | 100   |
| 1       | 200   |
| 2       | 50    |

Query:

```sql id="vdcuwt"
SELECT
    users.name,
    SUM(orders.total)
FROM users
INNER JOIN orders
ON users.id = orders.user_id
GROUP BY users.name;
```

Result:

| name  | revenue |
| ----- | ------- |
| Alice | 300     |
| Bob   | 50      |

### Visualization

```text id="sb8pxi"
Alice
100 + 200
     ↓
300

Bob
50
↓
50
```

### Why This Matters

Businesses often ask:

* Who spends the most?
* Which customer generates the most revenue?
* Which department has the highest budget?

All of these questions require:

```text id="6lx2ui"
JOIN
  +
SUM
  +
GROUP BY
```

> Business reporting is often built from JOINs combined with aggregate functions.

---

## 17.3 Top Performing Categories

Query:

```sql id="85zh1e"
SELECT
    categories.name,
    SUM(products.sales)
FROM categories
INNER JOIN products
ON categories.id = products.category_id
GROUP BY categories.name
ORDER BY SUM(products.sales) DESC;
```

Result:

| Category    | Revenue |
| ----------- | ------- |
| Electronics | 50000   |
| Furniture   | 20000   |
| Books       | 5000    |

### Query Components

| Component | Purpose           |
| --------- | ----------------- |
| JOIN      | Connect tables    |
| SUM       | Calculate totals  |
| GROUP BY  | Create categories |
| ORDER BY  | Rank results      |

### Typical Dashboard Workflow

```text id="vvf1hr"
Tables
  ↓
JOIN
  ↓
Aggregate
  ↓
Group
  ↓
Sort
  ↓
Report
```

> Most dashboard metrics are built using JOINs and aggregate functions together.

---

# 18. SQL Injection Introduction

Security becomes increasingly important as applications interact with databases.

One of the most common database attacks is SQL Injection.

---

## 18.1 What is SQL Injection?

SQL Injection occurs when user input is interpreted as SQL code.

Imagine a login form:

```text id="4gcyqb"
Username
Password
```

Backend code:

```javascript id="6j3m3d"
const query =
  `SELECT *
   FROM users
   WHERE username = '${username}'`;
```

If a user enters:

```text id="smohx4"
' OR 1=1 --
```

The query becomes:

```sql id="bhb9iv"
SELECT *
FROM users
WHERE username = ''
OR 1=1;
```

Since:

```text id="o92wqh"
1 = 1
```

is always true, the database may return every user.

This is SQL Injection.

> SQL Injection happens when user input changes the meaning of a query.

---

## 18.2 Why SQL Injection Is Dangerous

Potential consequences:

| Risk                | Impact                       |
| ------------------- | ---------------------------- |
| Unauthorized Access | Login bypass                 |
| Data Theft          | Customer information exposed |
| Data Modification   | Records changed              |
| Data Deletion       | Entire tables removed        |
| System Compromise   | Severe security breach       |

Example attack:

```sql id="u6lntg"
DROP TABLE users;
```

If injected successfully:

```text id="j3qzzj"
Users Table
      ↓
Deleted
```

### Security Importance

Modern applications may store:

* Passwords
* Payment information
* Personal data
* Business records

Protecting database access is critical.

> SQL Injection remains one of the most important security topics in backend development.

---

## 18.3 Vulnerable Query Pattern

Bad example:

```javascript id="olpmgf"
const query =
  `SELECT *
   FROM users
   WHERE email = '${email}'`;
```

Why dangerous?

Because user input becomes part of SQL.

### Problem Flow

```text id="j7w6th"
User Input
      ↓
SQL String
      ↓
Database
```

The database cannot distinguish:

```text id="75i1l7"
Data
```

from

```text id="1ab52m"
SQL Commands
```

### Vulnerable Architecture

```text id="ppxkt2"
User
 ↓
Input
 ↓
String Concatenation
 ↓
SQL Query
 ↓
Database
```

This creates risk.

> Building SQL using string concatenation is one of the most common security mistakes.

---

# 19. Parameterized Queries

The safest solution is parameterized queries.

Instead of inserting values directly into SQL strings, values are passed separately.

---

## 19.1 What Are Parameterized Queries?

Unsafe:

```javascript id="85w86o"
const query =
  `SELECT *
   FROM users
   WHERE email = '${email}'`;
```

Safe:

```javascript id="yvb0o7"
const query =
  `SELECT *
   FROM users
   WHERE email = $1`;
```

Parameters:

```javascript id="k9ixxe"
[email]
```

The database treats the value as data only.

### Architecture

```text id="xvxw6n"
User Input
      ↓
Parameter
      ↓
Database Driver
      ↓
Safe SQL Execution
```

The user can no longer inject SQL commands.

> Parameterized queries separate data from SQL instructions.

---

## 19.2 Why Parameterized Queries Work

Consider malicious input:

```text id="s8t8ya"
' OR 1=1 --
```

With string concatenation:

```text id="v4i3vw"
Input Changes Query
```

With parameters:

```text id="dn8ksw"
Input Treated As Text
```

The attack fails.

### Comparison

| Approach             | Safe? |
| -------------------- | ----- |
| String Concatenation | ❌     |
| Parameterized Query  | ✅     |

### Example

PostgreSQL:

```javascript id="h4px5u"
const result =
await pool.query(
  `
  SELECT *
  FROM users
  WHERE email = $1
  `,
  [email]
)
```

The driver handles escaping and validation.

> Parameterized queries are the standard defense against SQL Injection.

---

## 19.3 Security Best Practices

### Always Use Parameters

```text id="v8mjlwm"
Never Build SQL
With User Strings
```

### Validate Input

Check:

* Length
* Format
* Type

Example:

```text id="1mqg74"
Email
 ↓
Validate
 ↓
Query Database
```

### Principle of Least Privilege

Database accounts should have only the permissions they need.

Example:

```text id="5lcrli"
Read Only User
      ↓
Cannot Delete Tables
```

### Security Checklist

```text id="uv8kxr"
✓ Parameterized Queries
✓ Input Validation
✓ Least Privilege
✓ Strong Authentication
✓ Backups
```

> Security should be considered during database design, not added later.

---

# 20. Database Design Best Practices

Good database design makes applications easier to build, maintain, and scale.

---

## 20.1 Avoid Data Duplication

Bad:

```text id="ecr0af"
Orders

Alice
alice@email.com

Alice
alice@email.com

Alice
alice@email.com
```

Same information repeated.

Better:

```text id="zzvt9i"
Users
  ↓
Orders
```

Store customer information once.

Reference it using foreign keys.

### Benefits

| Benefit          | Explanation           |
| ---------------- | --------------------- |
| Less Storage     | Smaller tables        |
| Easier Updates   | Change data once      |
| Better Integrity | Fewer inconsistencies |

> Duplicate data eventually becomes inconsistent data.

---

## 20.2 Use Meaningful Table Names

Bad:

```text id="l6gvpi"
tbl1
tbl2
tbl3
```

Good:

```text id="apfpkc"
users
orders
products
categories
```

Developers should immediately understand table purpose.

### Naming Guidelines

| Good     | Bad     |
| -------- | ------- |
| users    | data1   |
| orders   | table2  |
| products | records |

> Database schemas should be self-documenting whenever possible.

---

## 20.3 Keep Tables Focused

Bad:

```text id="thvnsw"
Users
├── Name
├── Product
├── Price
├── Order Date
├── Shipping Status
```

One table handling everything.

Better:

```text id="g8v6l4"
Users
Orders
Products
Shipments
```

Each table has one responsibility.

### Design Principle

```text id="5b24g8"
One Table
      ↓
One Purpose
```

This improves maintainability and scalability.

> Well-designed databases separate concerns into dedicated tables.

---

## 20.4 Think About Relationships First

Before creating tables ask:

```text id="nmh4f5"
What entities exist?
How are they connected?
```

Example:

```text id="n2o3my"
Users
  ↓
Orders
  ↓
Products
```

Relationship planning often determines whether a database will be easy or difficult to maintain later.

### Design Workflow

```text id="jlwmqv"
Identify Entities
        ↓
Define Relationships
        ↓
Create Tables
        ↓
Add Constraints
        ↓
Insert Data
```

> Good database design starts with relationships rather than queries.

---

---

# 21. HTML Structure Recap

Unlike frontend modules where HTML defines the structure of a webpage, database design defines the structure of application data.

You can think of tables as the database equivalent of HTML elements.

### Frontend Perspective

```html
<div class="user">
    <h2>Alice</h2>
    <p>alice@email.com</p>
</div>
```

Represents:

```text
One User
```

### Database Perspective

```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    name TEXT,
    email TEXT
);
```

Represents:

```text
Many Users
```

stored in a structured format.

---

## Full-Stack Architecture Recap

Everything learned throughout the Fullstack Path now connects together.

```text id="jz0xv9"
Frontend
(HTML/CSS/JavaScript)
          │
          ▼
Backend
(Node.js / Express)
          │
          ▼
SQL Queries
          │
          ▼
PostgreSQL Database
```

### Complete Request Lifecycle

```text id="cqsr3w"
User Clicks Button
         ↓
Frontend Event
         ↓
Fetch Request
         ↓
Express Route
         ↓
SQL Query
         ↓
Database
         ↓
Result Returned
         ↓
JSON Response
         ↓
UI Update
```

### Example

Frontend:

```javascript
fetch("/orders")
```

Backend:

```javascript
app.get("/orders")
```

Database:

```sql
SELECT *
FROM orders;
```

Result:

```json
[
  {
    "id": 101,
    "product": "Laptop"
  }
]
```

This architecture powers most modern web applications.

> Databases are the foundation that connects frontend experiences to persistent backend data.

---

# 22. JOIN Cheat Sheet

JOINs are one of the most important topics in SQL.

This section serves as a quick-reference guide.

---

## INNER JOIN

Returns only matching rows.

```sql
SELECT *
FROM users
INNER JOIN orders
ON users.id = orders.user_id;
```

Visual:

```text id="zh6p2p"
Users
  ● Alice
  ● Bob
  ● Charlie

Orders
  ● Alice
  ● Bob

Result

Alice
Bob
```

### Rule

```text id="v0pkvz"
Matching Records Only
```

---

## LEFT JOIN

Returns all rows from the left table.

```sql
SELECT *
FROM users
LEFT JOIN orders
ON users.id = orders.user_id;
```

Visual:

```text id="90j6l1"
Users
  ● Alice
  ● Bob
  ● Charlie

Orders
  ● Alice
  ● Bob

Result

Alice
Bob
Charlie
```

### Rule

```text id="m6e1hb"
Everything On The Left
```

---

## RIGHT JOIN

Returns all rows from the right table.

```sql
SELECT *
FROM users
RIGHT JOIN orders
ON users.id = orders.user_id;
```

Visual:

```text id="z1e4oe"
Users
  ● Alice
  ● Bob

Orders
  ● Laptop
  ● Mouse
  ● Keyboard

Result

Laptop
Mouse
Keyboard
```

### Rule

```text id="vvapya"
Everything On The Right
```

---

## FULL JOIN

Returns everything from both tables.

```sql
SELECT *
FROM users
FULL JOIN orders
ON users.id = orders.user_id;
```

Visual:

```text id="dtsx4v"
Users
 ● Alice
 ● Bob
 ● Charlie

Orders
 ● Laptop
 ● Mouse
 ● Keyboard

Result

Alice
Bob
Charlie
Keyboard
```

### Rule

```text id="zjlwm7"
Everything
```

---

## JOIN Comparison Table

| JOIN Type  | Matching Rows | Unmatched Left Rows | Unmatched Right Rows |
| ---------- | ------------- | ------------------- | -------------------- |
| INNER JOIN | ✅             | ❌                   | ❌                    |
| LEFT JOIN  | ✅             | ✅                   | ❌                    |
| RIGHT JOIN | ✅             | ❌                   | ✅                    |
| FULL JOIN  | ✅             | ✅                   | ✅                    |

---

## JOIN Decision Guide

```text id="m0r2uh"
Need Matching Records Only?
        │
        ├── YES
        │      ↓
        │   INNER JOIN
        │
        └── NO
             │
             ├── Keep Left Side?
             │       ↓
             │    LEFT JOIN
             │
             ├── Keep Right Side?
             │       ↓
             │    RIGHT JOIN
             │
             └── Keep Everything?
                     ↓
                 FULL JOIN
```

> Understanding JOIN selection is one of the most important SQL skills.

---

# 23. Database Design Cheat Sheet

---

## Creating Tables

```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    name TEXT
);
```

Creates a new table.

---

## Adding Columns

```sql
ALTER TABLE users
ADD COLUMN email TEXT;
```

Adds a new column.

---

## Renaming Columns

```sql
ALTER TABLE users
RENAME COLUMN email
TO user_email;
```

Renames a column.

---

## Removing Columns

```sql
ALTER TABLE users
DROP COLUMN email;
```

Removes a column permanently.

---

## Primary Key

```sql
id INTEGER PRIMARY KEY
```

Ensures uniqueness.

---

## Foreign Key

```sql
FOREIGN KEY (user_id)
REFERENCES users(id)
```

Creates relationships.

---

## Unique Values

```sql
email TEXT UNIQUE
```

Prevents duplicates.

---

## Required Values

```sql
name TEXT NOT NULL
```

Prevents empty values.

---

## Default Values

```sql
active BOOLEAN DEFAULT TRUE
```

Automatically supplies a value.

---

## Design Principles

```text id="0s8gf8"
One Table
      ↓
One Purpose
```

```text id="h9uxhl"
Store Data Once
```

```text id="cxmh87"
Use Relationships
Instead Of Duplication
```

```text id="h1x5rj"
Protect Data
With Constraints
```

> Good database design is about preventing problems before they occur.

---

# 24. How to Run

To practice the concepts from this README:

### Step 1 — Create a Database

```sql
CREATE DATABASE school;
```

---

### Step 2 — Create Tables

```sql
CREATE TABLE students (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL
);
```

```sql
CREATE TABLE courses (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL
);
```

---

### Step 3 — Create Relationships

```sql
CREATE TABLE enrollments (
    student_id INTEGER,
    course_id INTEGER,
    FOREIGN KEY (student_id)
        REFERENCES students(id),
    FOREIGN KEY (course_id)
        REFERENCES courses(id)
);
```

---

### Step 4 — Insert Data

```sql
INSERT INTO students
VALUES
(1, 'Alice'),
(2, 'Bob');
```

---

### Step 5 — Practice JOINs

```sql
SELECT *
FROM students
INNER JOIN enrollments
ON students.id = enrollments.student_id;
```

---

### Recommended Learning Workflow

```text id="ibw7eg"
Create Tables
      ↓
Add Constraints
      ↓
Create Relationships
      ↓
Insert Data
      ↓
Run JOIN Queries
      ↓
Create Reports
```

This mirrors the progression used throughout the Scrimba module.

---

# 25. Course Reference

**Course:** Scrimba Fullstack Web Development Path

**Module:** 10. Databases

**Section:** 03. Creating and Joining Tables

---

## Primary Concepts

### Table Design

* CREATE TABLE
* Data Types
* Constraints
* ALTER TABLE

### Data Integrity

* PRIMARY KEY
* FOREIGN KEY
* UNIQUE
* NOT NULL
* DEFAULT

### Relationships

* One-to-One
* One-to-Many
* Many-to-Many

### JOIN Operations

* INNER JOIN
* LEFT JOIN
* RIGHT JOIN
* FULL JOIN

### Security

* SQL Injection
* Parameterized Queries
* Input Validation

---

## Builds On

```text id="hjlwm4"
Intro to Databases
        ↓
Writing SQL Queries
        ↓
Creating and Joining Tables
```

---

## Leads Into

```text id="jlwmz5"
Database Design
        ↓
Backend Integration
        ↓
Authentication
        ↓
Production Applications
```

This section bridges the gap between learning SQL syntax and building real database-driven systems.

---

# Key Takeaways

```text id="6qj2ki"
Tables Store Data
       ↓
Constraints Protect Data
       ↓
Foreign Keys Connect Data
       ↓
Relationships Organize Data
       ↓
JOINs Combine Data
       ↓
Aggregates Summarize Data
       ↓
Parameterized Queries Secure Data
       ↓
Good Design Scales Applications
```

---

# Final Revision Summary

## Database Design

```text id="y7sn9g"
CREATE TABLE
      ↓
Data Types
      ↓
Constraints
      ↓
Reliable Data
```

---

## Relationships

```text id="6zwm53"
PRIMARY KEY
      ↓
FOREIGN KEY
      ↓
Connected Tables
```

---

## JOINs

```text id="blfhh6"
INNER JOIN
     ↓
Matches Only

LEFT JOIN
     ↓
Keep Left Side

RIGHT JOIN
      ↓
Keep Right Side

FULL JOIN
     ↓
Keep Everything
```

---

## Security

```text id="qzc2p0"
User Input
      ↓
Parameterized Queries
      ↓
Safe SQL Execution
```

---

## Big Picture

```text id="jlwmx8"
Design Tables
       ↓
Create Relationships
       ↓
Protect Data
       ↓
Join Tables
       ↓
Generate Reports
       ↓
Build Applications
```

> This section completes the foundation of relational database development. By understanding table creation, constraints, relationships, JOINs, and database security, you now possess the core database concepts used in modern full-stack applications. Together with the previous two README files, these topics form the complete SQL and database foundation taught in Scrimba's Databases module.

