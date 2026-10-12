-- Day 6: School Database
-- Database engine: SQLite
-- Purpose: Manage students, courses, and student enrolments.

-- Enable foreign-key enforcement for this SQLite connection.
PRAGMA foreign_keys = ON;

-- =====================================================
-- 1. CREATE TABLES
-- =====================================================

CREATE TABLE students (
    student_id INTEGER PRIMARY KEY,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE
);

CREATE TABLE courses (
    course_id INTEGER PRIMARY KEY,
    course_name TEXT NOT NULL UNIQUE,
    instructor TEXT NOT NULL
);

CREATE TABLE enrolments (
    student_id INTEGER NOT NULL,
    course_id INTEGER NOT NULL,
    enrolment_date TEXT NOT NULL DEFAULT (date('now')),
    grade TEXT,

    -- A student can enrol in a course only once.
    PRIMARY KEY (student_id, course_id),

    -- Connect enrolments to existing students and courses.
    FOREIGN KEY (student_id)
        REFERENCES students(student_id),

    FOREIGN KEY (course_id)
        REFERENCES courses(course_id)
);

-- =====================================================
-- 2. CREATE AN INDEX
-- =====================================================

-- Helps queries that search enrolments by course_id.
CREATE INDEX idx_enrolments_course_id
ON enrolments(course_id);

-- =====================================================
-- 3. INSERT SAMPLE STUDENTS
-- =====================================================

INSERT INTO students (student_id, full_name, email)
VALUES
    (1, 'Alice Wanjiku', 'alice@example.com'),
    (2, 'Brian Kiptoo', 'brian@example.com'),
    (3, 'Carol Achieng', 'carol@example.com'),
    (4, 'David Mwangi', 'david@example.com');

-- =====================================================
-- 4. INSERT SAMPLE COURSES
-- =====================================================

INSERT INTO courses (course_id, course_name, instructor)
VALUES
    (1, 'Database Systems', 'Mr. Otieno'),
    (2, 'Web Development', 'Ms. Njeri'),
    (3, 'Computer Networks', 'Mr. Kamau');

-- =====================================================
-- 5. INSERT SAMPLE ENROLMENTS
-- =====================================================

INSERT INTO enrolments
    (student_id, course_id, enrolment_date, grade)
VALUES
    (1, 1, '2026-10-01', 'A'),
    (1, 2, '2026-10-02', 'B'),
    (2, 1, '2026-10-01', 'B'),
    (2, 3, '2026-10-03', 'A'),
    (3, 2, '2026-10-02', 'C'),
    (3, 3, '2026-10-03', 'B');

-- David Mwangi is intentionally not enrolled in any course.
-- This allows us to test the query for students with no enrolments.

-- =====================================================
-- 6. REQUIRED QUERY 1
-- List all courses taken by one student, using their name.
-- Example: Alice Wanjiku
-- =====================================================

SELECT
    s.full_name,
    c.course_name,
    e.enrolment_date,
    e.grade
FROM students AS s
JOIN enrolments AS e
    ON s.student_id = e.student_id
JOIN courses AS c
    ON e.course_id = c.course_id
WHERE s.full_name = 'Alice Wanjiku'
ORDER BY c.course_name;

-- =====================================================
-- 7. REQUIRED QUERY 2
-- List all students enrolled in one course.
-- Example: Database Systems
-- =====================================================

SELECT
    c.course_name,
    s.full_name,
    s.email,
    e.grade
FROM courses AS c
JOIN enrolments AS e
    ON c.course_id = e.course_id
JOIN students AS s
    ON e.student_id = s.student_id
WHERE c.course_name = 'Database Systems'
ORDER BY s.full_name;

-- =====================================================
-- 8. REQUIRED QUERY 3
-- Count the number of students enrolled in each course.
-- LEFT JOIN also includes courses with zero enrolments.
-- =====================================================

SELECT
    c.course_name,
    COUNT(e.student_id) AS student_count
FROM courses AS c
LEFT JOIN enrolments AS e
    ON c.course_id = e.course_id
GROUP BY c.course_id, c.course_name
ORDER BY c.course_name;

-- =====================================================
-- 9. REQUIRED QUERY 4
-- Find students who are not enrolled in any course.
-- =====================================================

SELECT
    s.student_id,
    s.full_name,
    s.email
FROM students AS s
LEFT JOIN enrolments AS e
    ON s.student_id = e.student_id
WHERE e.student_id IS NULL
ORDER BY s.full_name;

-- =====================================================
-- 10. REQUIRED QUERY 5
-- Update one student's grade for one course.
-- Example: Change Alice's Database Systems grade to A+.
-- =====================================================

UPDATE enrolments
SET grade = 'A+'
WHERE student_id = (
    SELECT student_id
    FROM students
    WHERE full_name = 'Alice Wanjiku'
)
AND course_id = (
    SELECT course_id
    FROM courses
    WHERE course_name = 'Database Systems'
);

-- Verify the grade update.
SELECT
    s.full_name,
    c.course_name,
    e.grade
FROM enrolments AS e
JOIN students AS s
    ON e.student_id = s.student_id
JOIN courses AS c
    ON e.course_id = c.course_id
WHERE s.full_name = 'Alice Wanjiku'
  AND c.course_name = 'Database Systems';