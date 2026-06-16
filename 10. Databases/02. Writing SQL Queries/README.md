# Writing SQL Queries — Databases

![SQL](https://img.shields.io/badge/SQL-Queries-blue?style=flat-square\&logo=postgresql)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791?style=flat-square\&logo=postgresql)
![Database](https://img.shields.io/badge/Database-Querying-green?style=flat-square)
![CRUD](https://img.shields.io/badge/CRUD-Operations-orange?style=flat-square)
![Status](https://img.shields.io/badge/Status-Completed-brightgreen?style=flat-square)
![Course](https://img.shields.io/badge/Scrimba-Fullstack%20Path-purple?style=flat-square)

The **Writing SQL Queries** section is the second part of the **Databases module** from **Scrimba's Fullstack Web Development Path**.

This README is written as a **complete concept revision guide**. Reading it from top to bottom will revise every SQL querying concept introduced in this section while building directly upon the database fundamentals introduced in **Intro to Databases**.

---

# Table of Contents

1. [Project Overview](#1-project-overview)
2. [Project Structure](#2-project-structure)
3. [What is SQL?](#3-what-is-sql)
4. [What's New vs Intro to Databases](#4-whats-new-vs-intro-to-databases)
5. [SELECT Statements](#5-select-statements)

   * [Basic SELECT](#51-basic-select)
   * [Selecting Specific Columns](#52-selecting-specific-columns)
   * [SELECT *](#53-select-star)
6. [Filtering Data with WHERE](#6-filtering-data-with-where)

   * [Comparison Operators](#61-comparison-operators)
   * [Combining Conditions](#62-combining-conditions)
7. [AND and OR](#7-and-and-or)
8. [BETWEEN](#8-between)
9. [IN](#9-in)
10. [ORDER BY](#10-order-by)
11. [LIMIT](#11-limit)
12. [Aggregate Functions](#12-aggregate-functions)

    * [COUNT](#121-count)
    * [SUM](#122-sum)
    * [AVG](#123-avg)
    * [MIN](#124-min)
    * [MAX](#125-max)
13. [GROUP BY](#13-group-by)
14. [HAVING](#14-having)
15. [INSERT](#15-insert)
16. [UPDATE](#16-update)
17. [DELETE](#17-delete)
18. [SQL Query Execution Flow](#18-sql-query-execution-flow)
19. [Common SQL Mistakes](#19-common-sql-mistakes)
20. [HTML Structure Recap](#20-html-structure-recap)
21. [How to Run](#21-how-to-run)
22. [Course Reference](#22-course-reference)

---

# 1. Project Overview

The **Writing SQL Queries** section is where databases become interactive. In the previous section, we learned what databases are, why they exist, and how tables organize information. In this section, we learn how to communicate with a database using SQL.

This section introduces:

* Retrieving data with `SELECT`
* Filtering data with `WHERE`
* Combining conditions using `AND` and `OR`
* Sorting data with `ORDER BY`
* Limiting results with `LIMIT`
* Aggregating data with `COUNT`, `SUM`, `AVG`, `MIN`, and `MAX`
* Grouping records with `GROUP BY`
* Filtering groups with `HAVING`
* Creating records with `INSERT`
* Updating records with `UPDATE`
* Removing records with `DELETE`

The goal of this section is not just to memorize SQL syntax—it is to learn how to ask meaningful questions about data and retrieve exactly the information an application needs.

---

# 2. Project Structure

```text
10. Databases/
│
└── 02. Writing SQL Queries/
    │
    ├── README.md
    │   → Complete SQL querying revision guide
    │
    ├── SELECT
    │   → Retrieving data from tables
    │
    ├── Filtering
    │   → WHERE, AND, OR, IN, BETWEEN
    │
    ├── Sorting
    │   → ORDER BY and LIMIT
    │
    ├── Aggregation
    │   → COUNT, SUM, AVG, MIN, MAX
    │
    └── Data Modification
        → INSERT, UPDATE, DELETE
```

Unlike the Intro to Databases section, this part is heavily practical. Every lesson introduces SQL statements that developers use daily in real applications.

---

# 3. What is SQL?

```sql
SELECT *
FROM users;
```

SQL stands for **Structured Query Language**.

It is the standard language used to communicate with relational databases such as PostgreSQL, MySQL, SQL Server, and SQLite.

SQL allows developers to:

| Action   | Description                           |
| -------- | ------------------------------------- |
| Retrieve | Read data from tables                 |
| Insert   | Add new records                       |
| Update   | Modify existing records               |
| Delete   | Remove records                        |
| Create   | Build tables and databases            |
| Manage   | Control relationships and permissions |

Think of SQL as the language a developer speaks to a database.

Example:

```text
Developer
      ↓
SQL Query
      ↓
Database
      ↓
Results
```

Without SQL:

```text
Database Exists
       ↓
No Communication
```

With SQL:

```text
Database Exists
       ↓
SQL Queries
       ↓
Useful Information
```

> SQL is the bridge between applications and stored data.

---

# 4. What's New vs Intro to Databases

The previous section focused on concepts:

| Intro to Databases | Purpose            |
| ------------------ | ------------------ |
| Tables             | Store data         |
| Rows               | Individual records |
| Columns            | Data categories    |
| Primary Keys       | Unique identifiers |
| Foreign Keys       | Relationships      |
| PostgreSQL         | Database system    |

This section introduces interaction.

## New SQL Concepts

| Concept    | Where Used       | Purpose                     |
| ---------- | ---------------- | --------------------------- |
| `SELECT`   | Reading data     | Retrieve records            |
| `WHERE`    | Filtering        | Return matching rows        |
| `AND`      | Conditions       | Require multiple matches    |
| `OR`       | Conditions       | Allow alternative matches   |
| `BETWEEN`  | Ranges           | Filter values within limits |
| `IN`       | Lists            | Match multiple values       |
| `ORDER BY` | Sorting          | Arrange results             |
| `LIMIT`    | Pagination       | Restrict result count       |
| `COUNT()`  | Aggregation      | Count rows                  |
| `SUM()`    | Aggregation      | Add values                  |
| `AVG()`    | Aggregation      | Calculate averages          |
| `GROUP BY` | Aggregation      | Create groups               |
| `HAVING`   | Filtering Groups | Filter aggregated results   |
| `INSERT`   | CRUD             | Create records              |
| `UPDATE`   | CRUD             | Modify records              |
| `DELETE`   | CRUD             | Remove records              |

## CRUD Mapping

| Operation | SQL Statement |
| --------- | ------------- |
| Create    | `INSERT`      |
| Read      | `SELECT`      |
| Update    | `UPDATE`      |
| Delete    | `DELETE`      |

This section introduces the language developers use every day to interact with production databases.

> Intro to Databases explained what data storage is. Writing SQL Queries teaches how to work with that data.

---

# 5. SELECT Statements

## 5.1 Basic SELECT

```sql
SELECT name
FROM users;
```

`SELECT` is the most frequently used SQL statement.

It retrieves data from a table.

In this example:

```sql
SELECT name
FROM users;
```

SQL reads:

```text
Get the "name" column
from the "users" table
```

Result:

| name    |
| ------- |
| Alice   |
| Bob     |
| Charlie |

### Query Anatomy

| Part     | Purpose                         |
| -------- | ------------------------------- |
| `SELECT` | Specifies what data to retrieve |
| `name`   | Column to return                |
| `FROM`   | Indicates table source          |
| `users`  | Table name                      |

> Every SQL query begins by deciding what information you want and where that information lives.

---

## 5.2 Selecting Specific Columns

```sql
SELECT name, email
FROM users;
```

Multiple columns can be selected by separating them with commas.

Result:

| name  | email                                     |
| ----- | ----------------------------------------- |
| Alice | [alice@email.com](mailto:alice@email.com) |
| Bob   | [bob@email.com](mailto:bob@email.com)     |

Only the requested columns are returned.

### Benefits

| Benefit            | Explanation               |
| ------------------ | ------------------------- |
| Faster Queries     | Less data transferred     |
| Cleaner Results    | Only needed fields shown  |
| Better Performance | Reduced database workload |

> Select only the columns you need rather than retrieving unnecessary data.

---

## 5.3 SELECT *

```sql
SELECT *
FROM users;
```

The `*` character means:

```text
All Columns
```

Result:

| id | name  | email                                     |
| -- | ----- | ----------------------------------------- |
| 1  | Alice | [alice@email.com](mailto:alice@email.com) |

Equivalent to:

```sql
SELECT id, name, email
FROM users;
```

### When to Use

| Use `SELECT *` When... | Avoid `SELECT *` When...         |
| ---------------------- | -------------------------------- |
| Exploring data         | Building production applications |
| Learning SQL           | Working with large tables        |
| Quick testing          | Performance matters              |

> `SELECT *` is convenient for learning and debugging but explicit column selection is usually better in production.

---

# 6. Filtering Data with WHERE

Retrieving every row from a table is rarely useful in real applications.

Most of the time we only want records that match specific conditions.

This is the purpose of the `WHERE` clause.

---

## 6.1 Basic WHERE

```sql
SELECT *
FROM users
WHERE id = 1;
```

Result:

| id | name  | email                                     |
| -- | ----- | ----------------------------------------- |
| 1  | Alice | [alice@email.com](mailto:alice@email.com) |

The `WHERE` clause filters rows before they are returned.

SQL reads this query as:

```text
Get all columns
from users
where id equals 1
```

### Query Breakdown

| Part           | Purpose                    |
| -------------- | -------------------------- |
| `SELECT *`     | Return all columns         |
| `FROM users`   | Read from users table      |
| `WHERE id = 1` | Only include matching rows |

Without filtering:

```sql
SELECT *
FROM users;
```

Result:

```text
Alice
Bob
Charlie
David
Emma
```

With filtering:

```sql
SELECT *
FROM users
WHERE id = 1;
```

Result:

```text
Alice
```

> `WHERE` is the most important filtering tool in SQL because it determines which rows are included in the result.

---

## 6.2 Comparison Operators

```sql
SELECT *
FROM products
WHERE price > 100;
```

Comparison operators allow SQL to evaluate conditions.

### Comparison Operator Table

| Operator | Meaning               |
| -------- | --------------------- |
| `=`      | Equal to              |
| `!=`     | Not equal to          |
| `<>`     | Not equal to          |
| `>`      | Greater than          |
| `<`      | Less than             |
| `>=`     | Greater than or equal |
| `<=`     | Less than or equal    |

### Examples

```sql
SELECT *
FROM users
WHERE age > 18;
```

Returns:

```text
All users older than 18
```

---

```sql
SELECT *
FROM products
WHERE price <= 50;
```

Returns:

```text
Products costing 50 or less
```

---

```sql
SELECT *
FROM users
WHERE country = 'India';
```

Returns:

```text
Only users from India
```

### Numeric vs Text Comparisons

Numbers:

```sql
WHERE age > 25
```

Text:

```sql
WHERE country = 'India'
```

Notice that strings are enclosed in quotes.

> Numbers are written directly. Text values must be enclosed in quotes.

---

## 6.3 Multiple Conditions in WHERE

```sql
SELECT *
FROM users
WHERE country = 'India'
AND age > 18;
```

The `WHERE` clause can contain multiple conditions.

SQL evaluates each row and only returns rows that satisfy all required conditions.

Example table:

| name    | country | age |
| ------- | ------- | --- |
| Alice   | India   | 25  |
| Bob     | India   | 16  |
| Charlie | USA     | 30  |

Query:

```sql
SELECT *
FROM users
WHERE country = 'India'
AND age > 18;
```

Result:

| name  |
| ----- |
| Alice |

Bob is removed because age is less than 18.

Charlie is removed because country is not India.

> Complex filtering begins with combining multiple conditions inside a `WHERE` clause.

---

# 7. AND and OR

SQL allows conditions to be combined using logical operators.

The two most common are:

* `AND`
* `OR`

---

## 7.1 AND

```sql
SELECT *
FROM products
WHERE category = 'Laptop'
AND price < 1000;
```

`AND` requires every condition to be true.

Visual representation:

```text
Condition A
      +
Condition B
      =
Match
```

Example:

| Product | Category  | Price |
| ------- | --------- | ----- |
| MacBook | Laptop    | 1500  |
| Dell    | Laptop    | 800   |
| Mouse   | Accessory | 50    |

Query:

```sql
SELECT *
FROM products
WHERE category = 'Laptop'
AND price < 1000;
```

Result:

```text
Dell
```

### AND Truth Table

| Condition A | Condition B | Result |
| ----------- | ----------- | ------ |
| True        | True        | True   |
| True        | False       | False  |
| False       | True        | False  |
| False       | False       | False  |

> `AND` narrows results because every condition must be satisfied.

---

## 7.2 OR

```sql
SELECT *
FROM users
WHERE country = 'India'
OR country = 'USA';
```

`OR` requires only one condition to be true.

Visual representation:

```text
Condition A
      OR
Condition B
      =
Match
```

Example:

| Name    | Country |
| ------- | ------- |
| Alice   | India   |
| Bob     | USA     |
| Charlie | Canada  |

Query:

```sql
SELECT *
FROM users
WHERE country = 'India'
OR country = 'USA';
```

Result:

```text
Alice
Bob
```

### OR Truth Table

| Condition A | Condition B | Result |
| ----------- | ----------- | ------ |
| True        | True        | True   |
| True        | False       | True   |
| False       | True        | True   |
| False       | False       | False  |

> `OR` broadens results because any matching condition is sufficient.

---

## 7.3 AND vs OR

```sql
SELECT *
FROM users
WHERE country = 'India'
AND age > 18;
```

vs

```sql
SELECT *
FROM users
WHERE country = 'India'
OR age > 18;
```

### Comparison

| Use `AND` When...         | Use `OR` When...        |
| ------------------------- | ----------------------- |
| All conditions must match | Any condition may match |
| Narrowing results         | Broadening results      |
| Precise filtering         | Flexible filtering      |

### Example

Table:

| Name    | Country | Age |
| ------- | ------- | --- |
| Alice   | India   | 25  |
| Bob     | India   | 16  |
| Charlie | USA     | 30  |

Using `AND`:

```text
Alice
```

Using `OR`:

```text
Alice
Bob
Charlie
```

The result set becomes much larger.

> Choosing between `AND` and `OR` dramatically changes query behavior.

---

# 8. BETWEEN

Sometimes we need values within a range.

The `BETWEEN` operator simplifies this process.

---

## 8.1 Numeric Ranges

Without `BETWEEN`:

```sql
SELECT *
FROM products
WHERE price >= 100
AND price <= 500;
```

With `BETWEEN`:

```sql
SELECT *
FROM products
WHERE price BETWEEN 100 AND 500;
```

Both queries produce the same result.

### Example

| Product  | Price |
| -------- | ----- |
| Mouse    | 50    |
| Keyboard | 120   |
| Monitor  | 300   |
| Laptop   | 1200  |

Query:

```sql
SELECT *
FROM products
WHERE price BETWEEN 100 AND 500;
```

Result:

```text
Keyboard
Monitor
```

### BETWEEN Is Inclusive

```sql
WHERE price BETWEEN 100 AND 500
```

means:

```sql
price >= 100
AND
price <= 500
```

Both boundaries are included.

> `BETWEEN` is cleaner and easier to read than writing two comparison conditions.

---

## 8.2 Date Ranges

```sql
SELECT *
FROM orders
WHERE order_date
BETWEEN '2024-01-01'
AND '2024-12-31';
```

Returns all orders placed during 2024.

### Common Uses

| Use Case | Example          |
| -------- | ---------------- |
| Prices   | 100–500          |
| Ages     | 18–65            |
| Dates    | January–December |
| Scores   | 80–100           |

> Date filtering is one of the most common uses of `BETWEEN` in production databases.

---

# 9. IN

When checking multiple possible values, writing repeated `OR` conditions becomes messy.

The `IN` operator solves this problem.

---

## 9.1 Replacing Multiple OR Conditions

Without `IN`:

```sql
SELECT *
FROM users
WHERE country = 'India'
OR country = 'USA'
OR country = 'Canada';
```

With `IN`:

```sql
SELECT *
FROM users
WHERE country IN (
    'India',
    'USA',
    'Canada'
);
```

The result is identical.

### Benefits

| Benefit            | Explanation                |
| ------------------ | -------------------------- |
| Cleaner Syntax     | Easier to read             |
| Easier Maintenance | Add/remove values quickly  |
| Less Repetition    | Avoid repeated comparisons |

> `IN` is essentially a shortcut for multiple `OR` conditions.

---

## 9.2 Numeric Examples

```sql
SELECT *
FROM products
WHERE id IN (1, 5, 9);
```

Equivalent to:

```sql
WHERE id = 1
OR id = 5
OR id = 9
```

Result:

```text
Product #1
Product #5
Product #9
```

### Typical Uses

| Scenario   | Example                |
| ---------- | ---------------------- |
| User IDs   | `IN (1,2,3)`           |
| Categories | `IN ('Books','Games')` |
| Countries  | `IN ('India','USA')`   |

> Use `IN` whenever a column should match one value from a list.

---

# 10. ORDER BY

Databases do not guarantee row order unless explicitly instructed.

The `ORDER BY` clause sorts results.

---

## 10.1 Ascending Order

```sql
SELECT *
FROM products
ORDER BY price ASC;
```

`ASC` means ascending order.

Result:

```text
50
100
250
500
1000
```

### Ascending Behavior

| Data Type | Order           |
| --------- | --------------- |
| Numbers   | Small → Large   |
| Text      | A → Z           |
| Dates     | Oldest → Newest |

> Ascending order is the default sort direction in SQL.

---

## 10.2 Descending Order

```sql
SELECT *
FROM products
ORDER BY price DESC;
```

`DESC` means descending order.

Result:

```text
1000
500
250
100
50
```

Instead of sorting from smallest to largest, SQL sorts from largest to smallest.

### Descending Behavior

| Data Type | Order           |
| --------- | --------------- |
| Numbers   | Large → Small   |
| Text      | Z → A           |
| Dates     | Newest → Oldest |

Example:

```sql
SELECT *
FROM orders
ORDER BY order_date DESC;
```

Result:

```text
Newest Orders First
```

This is extremely common in applications.

Examples:

* Social media feeds
* Recent orders
* Latest blog posts
* Recent transactions

Most applications show newest information first.

> When displaying recent activity, `ORDER BY ... DESC` is usually the preferred choice.

---

## 10.3 Sorting by Multiple Columns

```sql
SELECT *
FROM users
ORDER BY country ASC,
         age DESC;
```

SQL can sort by more than one column.

### Sorting Process

```text
Sort by Country
        ↓
Within each Country
        ↓
Sort by Age
```

Example data:

| Name    | Country | Age |
| ------- | ------- | --- |
| Alice   | India   | 25  |
| Bob     | India   | 30  |
| Charlie | USA     | 22  |
| David   | USA     | 40  |

Query:

```sql
SELECT *
FROM users
ORDER BY country ASC,
         age DESC;
```

Result:

| Name    | Country | Age |
| ------- | ------- | --- |
| Bob     | India   | 30  |
| Alice   | India   | 25  |
| David   | USA     | 40  |
| Charlie | USA     | 22  |

### Why Multiple Sorts Matter

| Scenario  | Sorting                 |
| --------- | ----------------------- |
| Students  | Grade, then Name        |
| Products  | Category, then Price    |
| Employees | Department, then Salary |
| Orders    | Customer, then Date     |

> SQL processes multiple sort columns from left to right.

---

# 11. LIMIT

Sometimes a query returns too many rows.

The `LIMIT` clause restricts how many rows are returned.

---

## 11.1 Basic LIMIT

```sql
SELECT *
FROM users
LIMIT 5;
```

Result:

```text
First 5 Rows Only
```

Without limit:

```text
1
2
3
4
5
6
7
8
9
10
...
```

With:

```sql
LIMIT 5
```

Result:

```text
1
2
3
4
5
```

### Why LIMIT Matters

| Reason         | Benefit               |
| -------------- | --------------------- |
| Faster Queries | Less data returned    |
| Pagination     | Show pages of results |
| Testing        | Quickly inspect data  |
| Dashboards     | Display top records   |

> `LIMIT` prevents unnecessarily large result sets.

---

## 11.2 LIMIT with ORDER BY

One of the most powerful SQL patterns combines sorting and limiting.

Example:

```sql
SELECT *
FROM products
ORDER BY price DESC
LIMIT 5;
```

SQL performs:

```text
Sort Products
       ↓
Highest Price First
       ↓
Return Top 5
```

Result:

```text
Top 5 Most Expensive Products
```

### Common Patterns

Most recent users:

```sql
SELECT *
FROM users
ORDER BY created_at DESC
LIMIT 10;
```

Highest salaries:

```sql
SELECT *
FROM employees
ORDER BY salary DESC
LIMIT 5;
```

Top scoring students:

```sql
SELECT *
FROM students
ORDER BY score DESC
LIMIT 3;
```

### Query Flow

```text
Database Table
      ↓
ORDER BY
      ↓
LIMIT
      ↓
Final Result
```

> `ORDER BY` and `LIMIT` together are among the most frequently used SQL combinations.

---

# 12. Aggregate Functions

Until now, queries have returned individual rows.

Aggregate functions summarize data.

Instead of returning every record, they return calculated values.

---

## 12.1 COUNT

```sql
SELECT COUNT(*)
FROM users;
```

`COUNT()` returns the number of rows.

Example table:

| id | name    |
| -- | ------- |
| 1  | Alice   |
| 2  | Bob     |
| 3  | Charlie |

Query:

```sql
SELECT COUNT(*)
FROM users;
```

Result:

```text
3
```

### COUNT Variants

Count all rows:

```sql
SELECT COUNT(*)
FROM users;
```

Count specific column values:

```sql
SELECT COUNT(email)
FROM users;
```

### Common Uses

| Use Case      | Example        |
| ------------- | -------------- |
| User Count    | Total users    |
| Order Count   | Total orders   |
| Product Count | Inventory size |
| Review Count  | Total reviews  |

> `COUNT()` answers the question: "How many?"

---

## 12.2 SUM

```sql
SELECT SUM(price)
FROM products;
```

`SUM()` adds numeric values together.

Example:

| Product  | Price |
| -------- | ----- |
| Mouse    | 50    |
| Keyboard | 100   |
| Monitor  | 300   |

Query:

```sql
SELECT SUM(price)
FROM products;
```

Result:

```text
450
```

Calculation:

```text
50
+
100
+
300
=
450
```

### Common Uses

| Scenario  | Example           |
| --------- | ----------------- |
| Revenue   | Total sales       |
| Expenses  | Total spending    |
| Inventory | Total stock value |
| Scores    | Total points      |

> `SUM()` answers the question: "What is the total?"

---

## 12.3 AVG

```sql
SELECT AVG(price)
FROM products;
```

`AVG()` calculates the average value.

Example:

| Product | Price |
| ------- | ----- |
| A       | 100   |
| B       | 200   |
| C       | 300   |

Query:

```sql
SELECT AVG(price)
FROM products;
```

Result:

```text
200
```

Calculation:

```text
(100 + 200 + 300)
         ÷
         3
         =
        200
```

### Typical Uses

| Scenario       | Example              |
| -------------- | -------------------- |
| Product Prices | Average price        |
| Salaries       | Average salary       |
| Grades         | Average score        |
| Ratings        | Average review score |

> `AVG()` answers the question: "What is the typical value?"

---

## 12.4 MIN

```sql
SELECT MIN(price)
FROM products;
```

`MIN()` returns the smallest value.

Example:

| Price |
| ----- |
| 50    |
| 100   |
| 300   |

Result:

```text
50
```

### Use Cases

| Scenario         | Example       |
| ---------------- | ------------- |
| Cheapest Product | Minimum price |
| Youngest User    | Minimum age   |
| Earliest Order   | Oldest date   |
| Lowest Score     | Minimum grade |

> `MIN()` identifies the smallest value in a dataset.

---

## 12.5 MAX

```sql
SELECT MAX(price)
FROM products;
```

`MAX()` returns the largest value.

Example:

| Price |
| ----- |
| 50    |
| 100   |
| 300   |

Result:

```text
300
```

### Use Cases

| Scenario               | Example          |
| ---------------------- | ---------------- |
| Most Expensive Product | Maximum price    |
| Highest Salary         | Maximum salary   |
| Latest Order           | Most recent date |
| Highest Score          | Maximum grade    |

### MIN vs MAX

| Function | Returns        |
| -------- | -------------- |
| `MIN()`  | Smallest value |
| `MAX()`  | Largest value  |

> `MAX()` identifies the largest value in a dataset.

---

## 12.6 Aggregate Function Comparison

| Function  | Purpose        |
| --------- | -------------- |
| `COUNT()` | Number of rows |
| `SUM()`   | Total value    |
| `AVG()`   | Average value  |
| `MIN()`   | Smallest value |
| `MAX()`   | Largest value  |

Visual representation:

```text
Dataset
    │
    ▼
┌─────────────┐
│ Aggregates  │
└──────┬──────┘
       │
       ├── COUNT()
       ├── SUM()
       ├── AVG()
       ├── MIN()
       └── MAX()
```

These functions transform large datasets into meaningful summaries.

### Example Dashboard Query

```sql
SELECT
    COUNT(*) AS total_orders,
    SUM(total) AS revenue,
    AVG(total) AS average_order,
    MIN(total) AS smallest_order,
    MAX(total) AS largest_order
FROM orders;
```

Result:

```text
Orders: 1,500
Revenue: $75,000
Average: $50
Minimum: $5
Maximum: $2,000
```

This single query provides a complete business summary.

> Aggregate functions are essential for reporting, analytics, dashboards, and business intelligence systems.

---

---

# 13. GROUP BY

Aggregate functions become much more powerful when combined with `GROUP BY`.

Without grouping, aggregate functions summarize an entire table.

With grouping, aggregate functions summarize subsets of rows.

---

## 13.1 What is GROUP BY?

```sql
SELECT country,
       COUNT(*)
FROM users
GROUP BY country;
```

Instead of counting every user:

```sql
SELECT COUNT(*)
FROM users;
```

Result:

```text
150
```

We can count users per country:

| country | users |
| ------- | ----- |
| India   | 75    |
| USA     | 50    |
| Canada  | 25    |

This is what `GROUP BY` does.

### Visual Representation

Without grouping:

```text
Users
│
├── Alice
├── Bob
├── Charlie
├── David
└── Emma

COUNT(*)
    ↓
5
```

With grouping:

```text
Users
│
├── India
│   ├── Alice
│   └── Bob
│
├── USA
│   ├── Charlie
│   └── David
│
└── Canada
    └── Emma

COUNT(*)
    ↓
India  → 2
USA    → 2
Canada → 1
```

> `GROUP BY` divides rows into groups before aggregate functions are applied.

---

## 13.2 GROUP BY with COUNT

```sql
SELECT country,
       COUNT(*)
FROM users
GROUP BY country;
```

Example table:

| id | name    | country |
| -- | ------- | ------- |
| 1  | Alice   | India   |
| 2  | Bob     | India   |
| 3  | Charlie | USA     |
| 4  | David   | USA     |
| 5  | Emma    | Canada  |

Result:

| country | count |
| ------- | ----- |
| India   | 2     |
| USA     | 2     |
| Canada  | 1     |

### Query Flow

```text
Users Table
      ↓
Group by Country
      ↓
Count Rows
      ↓
Return Summary
```

This pattern is extremely common in analytics systems.

Examples:

| Question                 | Query Type       |
| ------------------------ | ---------------- |
| Users per Country        | COUNT + GROUP BY |
| Orders per Customer      | COUNT + GROUP BY |
| Products per Category    | COUNT + GROUP BY |
| Employees per Department | COUNT + GROUP BY |

> `COUNT()` and `GROUP BY` are frequently used together for reporting.

---

## 13.3 GROUP BY with SUM

```sql
SELECT category,
       SUM(price)
FROM products
GROUP BY category;
```

Example data:

| Product  | Category    | Price |
| -------- | ----------- | ----- |
| Mouse    | Electronics | 50    |
| Keyboard | Electronics | 100   |
| Chair    | Furniture   | 200   |
| Desk     | Furniture   | 400   |

Result:

| Category    | Total |
| ----------- | ----- |
| Electronics | 150   |
| Furniture   | 600   |

### Calculation

```text
Electronics
50 + 100
   ↓
150

Furniture
200 + 400
   ↓
600
```

### Business Applications

| Metric                | Query          |
| --------------------- | -------------- |
| Revenue by Category   | SUM + GROUP BY |
| Sales by Region       | SUM + GROUP BY |
| Payroll by Department | SUM + GROUP BY |

> `SUM()` with `GROUP BY` helps businesses understand where money is being generated.

---

## 13.4 GROUP BY with AVG

```sql
SELECT department,
       AVG(salary)
FROM employees
GROUP BY department;
```

Example:

| Department  | Salary |
| ----------- | ------ |
| Engineering | 90000  |
| Engineering | 100000 |
| Marketing   | 60000  |
| Marketing   | 70000  |

Result:

| Department  | Average Salary |
| ----------- | -------------- |
| Engineering | 95000          |
| Marketing   | 65000          |

### Why This Matters

Managers often care more about averages than individual values.

Examples:

* Average order value
* Average salary
* Average review score
* Average exam result

> Aggregates combined with grouping reveal patterns hidden inside large datasets.

---

## 13.5 Multiple Column GROUP BY

```sql
SELECT country,
       department,
       COUNT(*)
FROM employees
GROUP BY country, department;
```

Grouping can occur on multiple columns.

Example:

```text
Country
    ↓
Department
    ↓
Count
```

Result:

| Country | Department  | Count |
| ------- | ----------- | ----- |
| India   | Engineering | 15    |
| India   | Marketing   | 8     |
| USA     | Engineering | 12    |
| USA     | Marketing   | 5     |

### Grouping Hierarchy

```text
Country
   │
   ├── Department
   │      │
   │      └── Count
   │
   └── Department
          │
          └── Count
```

> SQL groups rows using every column listed in the `GROUP BY` clause.

---

# 14. HAVING

After learning `WHERE`, many developers assume it can filter aggregate results.

It cannot.

This is where `HAVING` comes in.

---

## 14.1 Why HAVING Exists

Suppose we want countries with more than 10 users.

This does NOT work:

```sql
SELECT country,
       COUNT(*)
FROM users
WHERE COUNT(*) > 10
GROUP BY country;
```

SQL error.

Why?

Because `WHERE` executes before aggregation.

The correct solution:

```sql
SELECT country,
       COUNT(*)
FROM users
GROUP BY country
HAVING COUNT(*) > 10;
```

### Key Difference

| Clause   | Filters         |
| -------- | --------------- |
| `WHERE`  | Individual rows |
| `HAVING` | Groups          |

> `WHERE` filters rows before grouping. `HAVING` filters groups after grouping.

---

## 14.2 Example HAVING Query

```sql
SELECT country,
       COUNT(*)
FROM users
GROUP BY country
HAVING COUNT(*) > 50;
```

Result:

| Country | Users |
| ------- | ----- |
| India   | 75    |
| USA     | 60    |

Canada might be excluded if it only has 20 users.

### Query Flow

```text
Users Table
      ↓
GROUP BY Country
      ↓
COUNT Users
      ↓
HAVING COUNT > 50
      ↓
Return Matching Groups
```

Notice:

```text
Grouping First
      ↓
Filtering Second
```

This is the opposite of `WHERE`.

> `HAVING` exists specifically for aggregate filtering.

---

## 14.3 HAVING with SUM

```sql
SELECT category,
       SUM(price)
FROM products
GROUP BY category
HAVING SUM(price) > 1000;
```

Result:

| Category    | Revenue |
| ----------- | ------- |
| Electronics | 5000    |
| Furniture   | 3000    |

Categories below 1000 are excluded.

### Common Business Queries

| Question                      | Query          |
| ----------------------------- | -------------- |
| Categories generating > $1000 | HAVING SUM()   |
| Countries with > 100 users    | HAVING COUNT() |
| Departments averaging > $50k  | HAVING AVG()   |

> Many business reports depend on filtering aggregate results with `HAVING`.

---

## 14.4 WHERE vs HAVING

Consider:

```sql
SELECT country,
       COUNT(*)
FROM users
WHERE age > 18
GROUP BY country
HAVING COUNT(*) > 10;
```

### Execution

Step 1:

```text
Remove Users Under 18
```

Step 2:

```text
Group Remaining Users
```

Step 3:

```text
Count Users Per Country
```

Step 4:

```text
Keep Countries With > 10 Users
```

### Comparison Table

| WHERE                           | HAVING                            |
| ------------------------------- | --------------------------------- |
| Filters rows                    | Filters groups                    |
| Executes before GROUP BY        | Executes after GROUP BY           |
| Cannot use aggregate functions  | Commonly uses aggregate functions |
| Reduces dataset before grouping | Reduces grouped results           |

### Visual Diagram

```text
Rows
 │
 ▼
WHERE
 │
 ▼
GROUP BY
 │
 ▼
Aggregates
 │
 ▼
HAVING
 │
 ▼
Final Result
```

> Understanding the difference between `WHERE` and `HAVING` is one of the most important SQL concepts.

---

# 15. Real-World Reporting Queries

The true power of SQL appears when multiple concepts are combined.

---

## 15.1 Sales Report Example

```sql
SELECT category,
       COUNT(*)      AS products,
       AVG(price)    AS avg_price,
       SUM(price)    AS total_value
FROM products
GROUP BY category;
```

Result:

| Category    | Products | Avg Price | Total Value |
| ----------- | -------- | --------- | ----------- |
| Electronics | 50       | 200       | 10000       |
| Furniture   | 30       | 300       | 9000        |

Single query.

Multiple business insights.

### Concepts Used

| Concept  | Purpose            |
| -------- | ------------------ |
| SELECT   | Choose columns     |
| COUNT()  | Count products     |
| AVG()    | Average price      |
| SUM()    | Total value        |
| GROUP BY | Category breakdown |

> Real-world SQL often combines multiple concepts in a single query.

---

## 15.2 Top Performing Categories

```sql
SELECT category,
       SUM(price) AS revenue
FROM products
GROUP BY category
HAVING SUM(price) > 5000
ORDER BY revenue DESC
LIMIT 5;
```

This query combines:

```text
GROUP BY
    ↓
SUM
    ↓
HAVING
    ↓
ORDER BY
    ↓
LIMIT
```

Result:

```text
Top 5 Revenue Generating Categories
```

This is the type of query executives use for decision-making.

> Advanced SQL is often just multiple simple concepts working together.

---

# 16. SQL Query Execution Flow

Understanding execution order helps explain why some queries work and others fail.

Developers often write queries in this order:

```sql
SELECT
FROM
WHERE
GROUP BY
HAVING
ORDER BY
LIMIT
```

But SQL executes them differently.

### Actual Execution Order

```text
FROM
  ↓
WHERE
  ↓
GROUP BY
  ↓
HAVING
  ↓
SELECT
  ↓
ORDER BY
  ↓
LIMIT
```

This explains why:

```sql
WHERE COUNT(*) > 10
```

fails.

At the time `WHERE` executes:

```text
COUNT()
does not exist yet
```

Aggregation happens later.

> Understanding execution order makes SQL much easier to reason about.

---

---

# 17. INSERT

So far, every query has focused on retrieving information.

The first CRUD operation that modifies data is `INSERT`.

`INSERT` adds new records to a table.

---

## 17.1 Basic INSERT

```sql
INSERT INTO users (
    name,
    email
)
VALUES (
    'Alice',
    'alice@email.com'
);
```

This query creates a new row.

Before:

| id | name |
| -- | ---- |
| 1  | Bob  |

After:

| id | name  |
| -- | ----- |
| 1  | Bob   |
| 2  | Alice |

### Query Breakdown

| Part            | Purpose                  |
| --------------- | ------------------------ |
| `INSERT INTO`   | Specifies target table   |
| `(name, email)` | Columns receiving values |
| `VALUES (...)`  | Data to insert           |

### Visual Flow

```text
New Data
    ↓
INSERT
    ↓
Database Table
    ↓
New Row Created
```

> `INSERT` creates records. Every application eventually uses it to store user-generated data.

---

## 17.2 Inserting Multiple Rows

```sql
INSERT INTO users (
    name,
    email
)
VALUES
(
    'Alice',
    'alice@email.com'
),
(
    'Bob',
    'bob@email.com'
),
(
    'Charlie',
    'charlie@email.com'
);
```

Instead of running three separate queries:

```sql
INSERT ...
INSERT ...
INSERT ...
```

SQL can insert multiple rows simultaneously.

### Benefits

| Benefit   | Explanation               |
| --------- | ------------------------- |
| Faster    | Fewer database operations |
| Cleaner   | Less repetitive code      |
| Efficient | Reduced network overhead  |

Result:

| id | name    |
| -- | ------- |
| 1  | Alice   |
| 2  | Bob     |
| 3  | Charlie |

> Bulk inserts are generally more efficient than many individual inserts.

---

## 17.3 Omitting Auto-Increment IDs

Most databases generate IDs automatically.

Table:

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT
);
```

Insert:

```sql
INSERT INTO users (
    name
)
VALUES (
    'Alice'
);
```

Result:

| id | name  |
| -- | ----- |
| 1  | Alice |

SQL automatically generates the ID.

### Why This Matters

Without automatic IDs:

```sql
INSERT INTO users (
    id,
    name
)
VALUES (
    1,
    'Alice'
);
```

Developers would have to manually manage uniqueness.

This quickly becomes impossible in large applications.

> Primary keys are usually generated automatically rather than manually assigned.

---

# 18. UPDATE

Once data exists, it often needs to change.

The `UPDATE` statement modifies existing rows.

---

## 18.1 Basic UPDATE

```sql
UPDATE users
SET name = 'Alice Smith'
WHERE id = 1;
```

Before:

| id | name  |
| -- | ----- |
| 1  | Alice |

After:

| id | name        |
| -- | ----------- |
| 1  | Alice Smith |

### Query Breakdown

| Part           | Purpose        |
| -------------- | -------------- |
| `UPDATE users` | Target table   |
| `SET`          | New values     |
| `WHERE`        | Rows to modify |

Visual:

```text
Existing Row
      ↓
UPDATE
      ↓
Modified Row
```

> `UPDATE` changes existing data rather than creating new data.

---

## 18.2 Updating Multiple Columns

```sql
UPDATE users
SET
    name = 'Alice Smith',
    email = 'alice.smith@email.com'
WHERE id = 1;
```

Multiple columns can be updated simultaneously.

Before:

| name  | email                                     |
| ----- | ----------------------------------------- |
| Alice | [alice@email.com](mailto:alice@email.com) |

After:

| name        | email                                                 |
| ----------- | ----------------------------------------------------- |
| Alice Smith | [alice.smith@email.com](mailto:alice.smith@email.com) |

### Common Uses

| Scenario          | Example               |
| ----------------- | --------------------- |
| Profile Updates   | Name, email           |
| Inventory Updates | Stock levels          |
| Salary Changes    | Employee compensation |
| Status Changes    | Active, inactive      |

> Multiple columns can be updated within a single statement.

---

## 18.3 The Importance of WHERE

Consider:

```sql
UPDATE users
SET role = 'Admin';
```

Notice:

```text
No WHERE Clause
```

Result:

| User    | Role  |
| ------- | ----- |
| Alice   | Admin |
| Bob     | Admin |
| Charlie | Admin |

Every row changes.

This is rarely intended.

Correct:

```sql
UPDATE users
SET role = 'Admin'
WHERE id = 1;
```

Result:

| User    | Role  |
| ------- | ----- |
| Alice   | Admin |
| Bob     | User  |
| Charlie | User  |

### Bad vs Good

```sql
-- ❌ Bad
UPDATE users
SET role = 'Admin';

-- ✅ Good
UPDATE users
SET role = 'Admin'
WHERE id = 1;
```

> Always verify your `WHERE` clause before running an `UPDATE`.

---

# 19. DELETE

The final CRUD operation removes data.

This is done using `DELETE`.

---

## 19.1 Basic DELETE

```sql
DELETE FROM users
WHERE id = 1;
```

Before:

| id | name  |
| -- | ----- |
| 1  | Alice |
| 2  | Bob   |

After:

| id | name |
| -- | ---- |
| 2  | Bob  |

The matching row is removed.

### Query Breakdown

| Part          | Purpose        |
| ------------- | -------------- |
| `DELETE FROM` | Target table   |
| `WHERE`       | Rows to remove |

### Flow

```text
Row Exists
     ↓
DELETE
     ↓
Row Removed
```

> `DELETE` permanently removes rows from a table.

---

## 19.2 Deleting Multiple Rows

```sql
DELETE FROM users
WHERE country = 'Canada';
```

Before:

| Name    | Country |
| ------- | ------- |
| Alice   | India   |
| Bob     | Canada  |
| Charlie | Canada  |

After:

| Name  | Country |
| ----- | ------- |
| Alice | India   |

Every matching row is removed.

### Typical Uses

| Scenario                   | Example         |
| -------------------------- | --------------- |
| Removing inactive accounts | Delete users    |
| Cleaning test data         | Delete records  |
| Archiving data             | Remove old rows |
| Compliance requests        | User deletion   |

> A single `DELETE` query can remove multiple rows.

---

## 19.3 The Most Dangerous SQL Query

```sql
DELETE FROM users;
```

Notice:

```text
No WHERE Clause
```

Result:

```text
Every Row Deleted
```

Before:

```text
1000 Users
```

After:

```text
0 Users
```

### Bad vs Good

```sql
-- ❌ Bad
DELETE FROM users;

-- ✅ Good
DELETE FROM users
WHERE id = 1;
```

### Safety Checklist

Before running `DELETE`:

```text
✓ Correct table?
✓ Correct WHERE clause?
✓ Correct environment?
✓ Backup available?
```

> Missing a `WHERE` clause is one of the most common and dangerous SQL mistakes.

---

# 20. Common SQL Mistakes

Every SQL beginner makes similar mistakes.

Learning them early saves significant debugging time.

---

## 20.1 Forgetting Quotes Around Text

```sql
-- ❌ Bad
SELECT *
FROM users
WHERE country = India;
```

Correct:

```sql
-- ✅ Good
SELECT *
FROM users
WHERE country = 'India';
```

### Rule

| Data Type | Example        |
| --------- | -------------- |
| Number    | `25`           |
| String    | `'India'`      |
| Date      | `'2024-01-01'` |

> Text values should almost always be enclosed in quotes.

---

## 20.2 Missing WHERE Clause

```sql
-- ❌ Bad
UPDATE users
SET role = 'Admin';
```

Every row changes.

Correct:

```sql
-- ✅ Good
UPDATE users
SET role = 'Admin'
WHERE id = 1;
```

The same applies to:

```sql
DELETE
```

queries.

> Most destructive SQL mistakes happen because a `WHERE` clause was forgotten.

---

## 20.3 Using WHERE Instead of HAVING

Incorrect:

```sql
SELECT country,
       COUNT(*)
FROM users
WHERE COUNT(*) > 10
GROUP BY country;
```

Correct:

```sql
SELECT country,
       COUNT(*)
FROM users
GROUP BY country
HAVING COUNT(*) > 10;
```

### Why?

```text
WHERE
   ↓
Rows

HAVING
   ↓
Groups
```

> Aggregate functions belong in `HAVING`, not `WHERE`.

---

## 20.4 Selecting More Data Than Necessary

```sql
-- ❌ Bad
SELECT *
FROM users;
```

When only a name is needed:

```sql
-- ✅ Good
SELECT name
FROM users;
```

### Benefits

| Benefit            | Explanation        |
| ------------------ | ------------------ |
| Faster Queries     | Less data returned |
| Better Readability | Intent is clearer  |
| Reduced Bandwidth  | Smaller responses  |

> Query only the data your application actually needs.

---

# 21. How SQL Fits Into Full-Stack Development

Everything learned in this section eventually connects to backend code.

Example:

Frontend:

```text
User clicks "View Profile"
```

Backend:

```javascript
app.get("/users/:id")
```

Database:

```sql
SELECT *
FROM users
WHERE id = 1;
```

Response:

```json
{
  "id": 1,
  "name": "Alice"
}
```

### Full Flow

```text
User
  ↓
Frontend
  ↓
Backend Route
  ↓
SQL Query
  ↓
Database
  ↓
Results
  ↓
Frontend Update
```

The SQL statements learned in this section form the foundation of nearly every database-driven application.

> SQL is not separate from backend development—it is one of the core tools backend developers use daily.

---

---

# 22. HTML Structure Recap

Unlike previous modules, SQL queries do not live directly inside HTML documents.

Instead, SQL exists as a separate layer within a full-stack application.

The architecture looks like:

```text
<!DOCTYPE html>
<html>
├── Frontend (HTML/CSS/JavaScript)
│   ├── Forms
│   ├── Buttons
│   ├── Tables
│   └── User Interactions
│
├── Backend (Node.js / Express)
│   ├── Routes
│   ├── Controllers
│   ├── Validation
│   └── SQL Queries
│
└── Database (PostgreSQL)
    ├── Tables
    ├── Rows
    ├── Columns
    ├── Relationships
    └── Stored Data
```

### Example Request Flow

```text
User Clicks Button
        ↓
Frontend JavaScript
        ↓
HTTP Request
        ↓
Express Route
        ↓
SQL Query
        ↓
PostgreSQL
        ↓
Results Returned
        ↓
JSON Response
        ↓
Frontend Update
```

### Example Route

```javascript
app.get("/users", async (req, res) => {
    // SQL query runs here
})
```

Example query:

```sql
SELECT *
FROM users;
```

This separation of responsibilities is one of the most important concepts in full-stack development.

> Frontend displays data, backend processes data, and databases store data.

---

# 23. SQL Query Cheat Sheet

This section acts as a quick-reference guide for the entire module.

---

## 23.1 Reading Data

Retrieve all rows:

```sql
SELECT *
FROM users;
```

Retrieve specific columns:

```sql
SELECT name, email
FROM users;
```

Filter rows:

```sql
SELECT *
FROM users
WHERE age > 18;
```

Sort rows:

```sql
SELECT *
FROM users
ORDER BY age DESC;
```

Limit results:

```sql
SELECT *
FROM users
LIMIT 10;
```

### Read Operations Summary

| Query        | Purpose                   |
| ------------ | ------------------------- |
| `SELECT *`   | Retrieve all columns      |
| `SELECT col` | Retrieve specific columns |
| `WHERE`      | Filter rows               |
| `ORDER BY`   | Sort rows                 |
| `LIMIT`      | Restrict result count     |

---

## 23.2 Filtering Data

### AND

```sql
SELECT *
FROM users
WHERE country = 'India'
AND age > 18;
```

### OR

```sql
SELECT *
FROM users
WHERE country = 'India'
OR country = 'USA';
```

### BETWEEN

```sql
SELECT *
FROM products
WHERE price BETWEEN 100 AND 500;
```

### IN

```sql
SELECT *
FROM users
WHERE country IN (
    'India',
    'USA',
    'Canada'
);
```

### Filtering Summary

| Operator  | Purpose                   |
| --------- | ------------------------- |
| `=`       | Equal                     |
| `!=`      | Not Equal                 |
| `>`       | Greater Than              |
| `<`       | Less Than                 |
| `AND`     | All conditions must match |
| `OR`      | Any condition may match   |
| `BETWEEN` | Range filtering           |
| `IN`      | Match values from a list  |

---

## 23.3 Aggregate Functions

Count rows:

```sql
SELECT COUNT(*)
FROM users;
```

Calculate total:

```sql
SELECT SUM(price)
FROM products;
```

Calculate average:

```sql
SELECT AVG(price)
FROM products;
```

Smallest value:

```sql
SELECT MIN(price)
FROM products;
```

Largest value:

```sql
SELECT MAX(price)
FROM products;
```

### Aggregate Summary

| Function  | Returns        |
| --------- | -------------- |
| `COUNT()` | Number of rows |
| `SUM()`   | Total          |
| `AVG()`   | Average        |
| `MIN()`   | Smallest value |
| `MAX()`   | Largest value  |

---

## 23.4 Grouping and Reporting

Group records:

```sql
SELECT country,
       COUNT(*)
FROM users
GROUP BY country;
```

Filter grouped results:

```sql
SELECT country,
       COUNT(*)
FROM users
GROUP BY country
HAVING COUNT(*) > 10;
```

### Reporting Workflow

```text
Rows
  ↓
WHERE
  ↓
GROUP BY
  ↓
Aggregates
  ↓
HAVING
  ↓
ORDER BY
  ↓
LIMIT
```

> Understanding this flow explains most SQL behavior.

---

## 23.5 CRUD Summary

### Create

```sql
INSERT INTO users (
    name
)
VALUES (
    'Alice'
);
```

### Read

```sql
SELECT *
FROM users;
```

### Update

```sql
UPDATE users
SET name = 'Alice Smith'
WHERE id = 1;
```

### Delete

```sql
DELETE FROM users
WHERE id = 1;
```

### CRUD Table

| Operation | SQL    |
| --------- | ------ |
| Create    | INSERT |
| Read      | SELECT |
| Update    | UPDATE |
| Delete    | DELETE |

> CRUD operations represent the foundation of nearly every database application.

---

# 24. SQL Learning Progression

The concepts in this README build upon one another.

Understanding the progression makes advanced SQL much easier.

```text
Tables
   ↓
Rows & Columns
   ↓
SELECT
   ↓
WHERE
   ↓
AND / OR
   ↓
BETWEEN / IN
   ↓
ORDER BY
   ↓
LIMIT
   ↓
COUNT / SUM / AVG
   ↓
GROUP BY
   ↓
HAVING
   ↓
INSERT
   ↓
UPDATE
   ↓
DELETE
```

Notice how each concept depends on the previous ones.

For example:

```text
GROUP BY
     ↓
requires
     ↓
Aggregate Functions
```

and

```text
HAVING
     ↓
requires
     ↓
GROUP BY
```

SQL becomes easier when viewed as a sequence of connected concepts rather than isolated commands.

> Every advanced SQL query is built from a small set of foundational operations.

---

# 25. How to Run

To practice these queries, create a PostgreSQL database and experiment with sample tables.

Example:

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT,
    age INTEGER,
    country TEXT
);
```

Insert sample data:

```sql
INSERT INTO users (
    name,
    age,
    country
)
VALUES
(
    'Alice',
    25,
    'India'
),
(
    'Bob',
    30,
    'USA'
);
```

Then run the queries from this README.

### Recommended Practice Workflow

```text
Create Table
      ↓
Insert Data
      ↓
Run SELECT Queries
      ↓
Add Filtering
      ↓
Add Aggregates
      ↓
Use GROUP BY
      ↓
Modify Data
```

This mirrors the learning path used throughout the Scrimba module.

---

# 26. Course Reference

* **Course:** Scrimba Fullstack Web Development Path
* **Module:** 10. Databases
* **Section:** 02. Writing SQL Queries

### Primary Concepts

* `SELECT`
* `WHERE`
* `AND`
* `OR`
* `BETWEEN`
* `IN`
* `ORDER BY`
* `LIMIT`
* `COUNT()`
* `SUM()`
* `AVG()`
* `MIN()`
* `MAX()`
* `GROUP BY`
* `HAVING`
* `INSERT`
* `UPDATE`
* `DELETE`

### Builds On

* Tables
* Rows
* Columns
* Primary Keys
* Relational Databases
* PostgreSQL

### Leads Into

```text
Writing SQL Queries
          ↓
Creating Tables
          ↓
Relationships
          ↓
Joins
          ↓
Database Design
```

The next section of the Databases module expands beyond querying data and focuses on how tables are designed, connected, and structured.

---

# Key Takeaways

```text
Database Exists
      ↓
SQL Communicates With Database
      ↓
SELECT Retrieves Data
      ↓
WHERE Filters Data
      ↓
ORDER BY Sorts Data
      ↓
LIMIT Restricts Data
      ↓
Aggregates Summarize Data
      ↓
GROUP BY Organizes Data
      ↓
HAVING Filters Groups
      ↓
INSERT Creates Data
      ↓
UPDATE Modifies Data
      ↓
DELETE Removes Data
```

### The Big Picture

```text
CRUD
 │
 ├── Create → INSERT
 ├── Read   → SELECT
 ├── Update → UPDATE
 └── Delete → DELETE
```

Everything learned in this README revolves around these four operations.

> This section transforms databases from passive storage systems into interactive tools. Once you can retrieve, filter, aggregate, and modify data with SQL, you have the core skills required to build database-driven applications.


