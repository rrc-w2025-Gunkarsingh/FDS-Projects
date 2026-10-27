# Sprint 3 – Architecture Documentation

Name: Sania Parvej
Project: Study Planner
Feature: Courses

## 1. Custom Hook – useCourses.ts

I created useCourses to manage the course list and error messages.

It calls courseService to get, add, update, and remove courses.

I used this hook in:

* CoursesPage.tsx
* CourseSummary.tsx

The hook returns courses, error, loadCourses, addCourse, removeCourse, and updateCourse.

I used this hook so I don't have to repeat the same code in different components.

## 2. Service – courseService.ts

I created courseService to handle the course rules.

It checks if the course code and name are empty and prevents duplicate course codes.

The service has methods to get, add, update, and delete courses.

I kept the validation here instead of putting it inside CoursesPage.

## 3. Repository – courseRepository.ts

I created courseRepository to manage the course data.

It has five methods:

* getAllCourses()
* getCourseById()
* addCourse()
* updateCourse()
* deleteCourse()

The repository gets its starting data from courses.ts, which contains 10 sample courses.

This keeps data management separate from the page.

## 4. How They Work Together

The Courses page calls useCourses.

The hook calls courseService, and the service calls courseRepository.

The repository reads or updates the course data.

The flow is:

CoursesPage → useCourses → courseService → courseRepository → courses.ts

CourseSummary also uses useCourses to show the total number of courses on the Home page.

## 5. Testing

I tested the feature in the browser.

* The Courses page displayed 10 sample courses.
* I added and removed courses.
* I checked that the Home page displayed the updated course count.
* I tested that the course list updated when I returned to the Courses page.

The features worked during testing.
