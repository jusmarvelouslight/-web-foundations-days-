# Day 6: School Database Design

## 1. Overview

This project uses SQLite to manage students, courses, and enrolments in a school.

The database stores student details, course details, and the relationship between students and the courses they take.

The database contains three tables:

- `students`
- `courses`
- `enrolments`

## 2. Table Design

### Students Table

The `students` table stores information about each student.

| Column | Data type | Purpose |
|---|---|---|
| `student_id` | INTEGER | Primary key that uniquely identifies each student |
| `full_name` | TEXT | Student's full name; required |
| `email` | TEXT | Student's email address; required and unique |

The primary key ensures that every student has a unique identifier. The unique constraint prevents two students from registering with the same email address.

### Courses Table

The `courses` table stores information about courses offered by the school.

| Column | Data type | Purpose |
|---|---|---|
| `course_id` | INTEGER | Primary key that uniquely identifies each course |
| `course_name` | TEXT | Course name; required and unique |
| `instructor` | TEXT | Name of the course instructor; required |

The primary key uniquely identifies each course. The unique constraint prevents duplicate course names.

### Enrolments Table

The `enrolments` table records which students take which courses.

| Column | Data type | Purpose |
|---|---|---|
| `student_id` | INTEGER | Foreign key referencing `students` |
| `course_id` | INTEGER | Foreign key referencing `courses` |
| `enrolment_date` | TEXT | Date of enrolment, defaulting to the current date |
| `grade` | TEXT | Grade awarded to the student; optional until assigned |

The combination of `student_id` and `course_id` forms a composite primary key. This prevents the same student from being enrolled in the same course more than once.

Foreign keys maintain referential integrity by requiring enrolments to reference existing students and courses.

## 3. Relationships Between Tables

### Students and Enrolments: One-to-Many

One student can have several enrolment records because a student can take multiple courses.

Each enrolment record belongs to one student.

The relationship is implemented using `student_id` in the `enrolments` table.

### Courses and Enrolments: One-to-Many

One course can have several enrolment records because multiple students can take the same course.

Each enrolment record refers to one course.

The relationship is implemented using `course_id` in the `enrolments` table.

### Students and Courses: Many-to-Many

The relationship between students and courses is many-to-many:

- A student can take several courses.
- A course can have several students.

A many-to-many relationship is implemented through the `enrolments` join table. This avoids storing several course IDs in one student record or repeating student details for every course.

The join table also stores additional information about the relationship, such as the enrolment date and grade.

## 4. Database Index

The database includes the following index:

`idx_enrolments_course_id`

It is created on the `course_id` column in the `enrolments` table.

This index can improve queries that find all students enrolled in a particular course because SQLite can use it to locate matching enrolment records more efficiently.

The index adds some storage and write overhead, so it is included for a specific query requirement rather than indexing every column.

## 5. Why SQLite Instead of NoSQL?

SQLite is suitable for this project because the data is structured and contains clear relationships between students, courses, and enrolments.

The database benefits from:

- Relational tables with defined columns and data types.
- Primary and foreign keys to maintain data integrity.
- Unique constraints to prevent duplicate email addresses and enrolments.
- SQL joins to retrieve related information across tables.
- Aggregate functions such as `COUNT()` to calculate enrolment totals.

A NoSQL database can be useful for flexible or document-oriented data, but its data model is not necessary for this relatively small relational school database.

SQLite is also lightweight and does not require a separate database server, making it practical for learning SQL and developing a small project.

## 6. Required SQL Operations

The `school.sql` file demonstrates five required operations:

1. List all courses taken by a particular student, using the student's name.
2. List all students enrolled in a particular course.
3. Count the number of students enrolled in each course.
4. Find students who are not enrolled in any course.
5. Update an enrolment grade and retrieve the updated value to verify the change.

The sample data includes four students, three courses, and six enrolment records. One student intentionally has no enrolments so that the fourth query can be tested.

## 7. Conclusion

The database demonstrates the use of relational database design, primary keys, foreign keys, unique constraints, a composite primary key, an index, joins, aggregation, and an update operation.

The three-table structure avoids unnecessary duplication while preserving the relationships between students and courses.