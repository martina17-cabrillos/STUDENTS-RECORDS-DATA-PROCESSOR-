const students = [
  { id: 1, name: "Mar Tin", year: 3, course: "BS Information Technology", grades: [88, 92, 90, 94], enrolled: true },
  { id: 2, name: "Tin Mar", year: 2, course: "BS Computer Science", grades: [85, 80, 83, 81], enrolled: true },
  { id: 3, name: "Ka Ren", year: 4, course: "BS Information Technology", grades: [91, 95, 93, 96], enrolled: true },
  { id: 4, name: "Ren Ka", year: 1, course: "BS Business Administration", grades: [87, 89, 90, 88], enrolled: true },
  { id: 5, name: "Gen Knee", year: 3, course: "BS Computer Science", grades: [92, 94, 91, 95], enrolled: false },
  { id: 6, name: "Knee Gen", year: 2, course: "BS Information Technology", grades: [78, 82, 80, 79], enrolled: true },
  { id: 7, name: "Sha Nnon", year: 4, course: "BS Business Administration", grades: [90, 93, 92, 91], enrolled: true },
  { id: 8, name: "Nnon Sha", year: 1, course: "BS Computer Science", grades: [83, 85, 84, 86], enrolled: true },
  { id: 9, name: "Ngek Ngok", year: 3, course: "BS Information Technology", grades: [95, 97, 94, 96], enrolled: true },
  { id: 10, name: "Ivana Alawi", year: 2, course: "BS Business Administration", grades: [80, 79, 82, 81], enrolled: false },
  { id: 11, name: "Okay Fine", year: 4, course: "BS Computer Science", grades: [89, 91, 90, 92], enrolled: true },
  { id: 12, name: "Rene Baterbonia", year: 1, course: "BS Information Technology", grades: [84, 86, 85, 87], enrolled: true },
  { id: 13, name: "Yes Man", year: 3, course: "BS Business Administration", grades: [93, 95, 94, 96], enrolled: true },
  { id: 14, name: "Hello World", year: 2, course: "BS Computer Science", grades: [76, 78, 75, 77], enrolled: true },
  { id: 15, name: "Eddie Wao", year: 4, course: "BS Information Technology", grades: [98, 96, 97, 99], enrolled: true },
  { id: 16, name: "Sana Whole", year: 1, course: "BS Business Administration", grades: [88, 87, 89, 90], enrolled: false },
  { id: 17, name: "Mamah Moblue", year: 3, course: "BS Computer Science", grades: [91, 93, 92, 94], enrolled: true },
  { id: 18, name: "Bato Dela Rosa", year: 2, course: "BS Information Technology", grades: [82, 84, 83, 85], enrolled: true },
  { id: 19, name: "Andrea Brillantes", year: 4, course: "BS Business Administration", grades: [94, 96, 95, 97], enrolled: true },
  { id: 20, name: "Dito Angtingin", year: 1, course: "BS Computer Science", grades: [79, 81, 80, 82], enrolled: true },
  { id: 21, name: "Okii Poe", year: 3, course: "BS Information Technology", grades: [90, 92, 91, 93], enrolled: false },
  { id: 22, name: "Wie Knott", year: 2, course: "BS Business Administration", grades: [85, 83, 84, 86], enrolled: true },
  { id: 23, name: "Segundo Siguro", year: 4, course: "BS Computer Science", grades: [96, 98, 97, 95], enrolled: true },
  { id: 24, name: "Vicc Soto", year: 1, course: "BS Information Technology", grades: [81, 79, 80, 78], enrolled: true },
  { id: 25, name: "Jennifer Wodyuinfer", year: 3, course: "BS Business Administration", grades: [92, 90, 91, 93], enrolled: true },
  { id: 26, name: "Done Kin", year: 2, course: "BS Computer Science", grades: [86, 88, 87, 89], enrolled: false },
  { id: 27, name: "Robin Padilla", year: 4, course: "BS Information Technology", grades: [97, 99, 98, 96], enrolled: true },
  { id: 28, name: "Sara Duterte", year: 1, course: "BS Business Administration", grades: [77, 79, 78, 80], enrolled: true },
  { id: 29, name: "Bongbong Marcos", year: 3, course: "BS Computer Science", grades: [93, 95, 94, 96], enrolled: true },
  { id: 30, name: "Vice Ganda", year: 2, course: "BS Information Technology", grades: [83, 81, 82, 84], enrolled: true },
  { id: 31, name: "Ahtisa Manalo", year: 4, course: "BS Business Administration", grades: [], enrolled: true } // Edge case: no grades
];

function getAverageGrade(student) {
  if (!student.grades || student.grades.length === 0) return 0;
  const sum = student.grades.reduce((total, g) => total + g, 0);
  return Math.round((sum / student.grades.length) * 100) / 100;
}

function getTopStudents(students, n) {
  if (typeof n !== "number" || n < 0) {
    throw new Error("Invalid input: n must be a non-negative number.");
  }
  if (!Array.isArray(students)) return [];
  return [...students]
    .sort((a, b) => getAverageGrade(b) - getAverageGrade(a))
    .slice(0, n)
    .map(s => ({
      id: s.id,
      name: s.name,
      course: s.course,
      averageGrade: getAverageGrade(s)
    }));
}

function groupByCourse(students) {
  if (!Array.isArray(students)) return {};
  return students.reduce((groups, student) => {
    const course = student.course;
    if (!groups[course]) groups[course] = [];
    groups[course].push(student);
    return groups;
  }, {});
}

function getEnrolledCount(students) {
  if (!Array.isArray(students)) return { enrolled: 0, notEnrolled: 0 };
  const enrolled = students.filter(s => s.enrolled).length;
  return {
    enrolled,
    notEnrolled: students.length - enrolled
  };
}

function findStudent(students, name) {
  if (!Array.isArray(students) || !name) return null;
  const search = name.trim().toLowerCase();
  return students.find(s => s.name.toLowerCase().includes(search)) || null;
}

function getCourseAverages(students) {
  if (!Array.isArray(students) || students.length === 0) return [];
  const grouped = groupByCourse(students);
  return Object.entries(grouped)
    .map(([course, members]) => {
      const avgTotal = members.reduce((sum, s) => sum + getAverageGrade(s), 0);
      const avg = Math.round((avgTotal / members.length) * 100) / 100;
      return { course, averageGrade: avg };
    })
    .sort((x, y) => y.averageGrade - x.averageGrade);
}

function exportSummary(students) {
  if (!Array.isArray(students) || students.length === 0) {
    return { totalStudents: 0, overallAverage: 0, topStudent: null, courseBreakdown: [] };
  }
  const totalStudents = students.length;
  const overallSum = students.reduce((sum, s) => sum + getAverageGrade(s), 0);
  const overallAverage = Math.round((overallSum / totalStudents) * 100) / 100;
  const topStudent = getTopStudents(students, 1)[0] || null;
  return {
    totalStudents,
    overallAverage,
    topStudent,
    courseBreakdown: getCourseAverages(students)
  };
}

function filterByYear(students, year) {
  if (!Array.isArray(students)) return [];
  return students.filter(s => s.year === year);
}

function sortByName(students) {
  if (!Array.isArray(students)) return [];
  return [...students].sort((a, b) => a.name.localeCompare(b.name));
}

function main() {
  console.log("=".repeat(55));
  console.log("       📊 STUDENT RECORDS ANALYSIS REPORT");
  console.log("=".repeat(55) + "\n");
  
  const summary = exportSummary(students);
  console.log("📌 OVERALL SUMMARY");
  console.log(`   Total Students:   ${summary.totalStudents}`);
  console.log(`   Overall Average:   ${summary.overallAverage}%\n`);
  
  const enrollment = getEnrolledCount(students);
  console.log("📌 ENROLLMENT STATUS");
  console.log(`   Currently Enrolled:   ${enrollment.enrolled}`);
  console.log(`   Not Enrolled:         ${enrollment.notEnrolled}\n`);
  
  console.log("📌 TOP 5 STUDENTS BY AVERAGE GRADE");
  try {
    getTopStudents(students, 5).forEach((s, i) => {
      console.log(`   ${i + 1}. ${s.name} — ${s.course}`);
      console.log(`      Avg: ${s.averageGrade}%`);
    });
  } catch (err) {
    console.log("   Error:", err.message);
  }
  console.log("");
  
  console.log("📌 AVERAGE GRADE BY COURSE (Highest → Lowest)");
  getCourseAverages(students).forEach(c => {
    console.log(`   ${c.course}: ${c.averageGrade}%`);
  });
  console.log("");
  
  console.log("📌 STUDENTS GROUPED BY COURSE");
  const groups = groupByCourse(students);
  Object.entries(groups).forEach(([course, list]) => {
    console.log(`\n   [${course}] — ${list.length} student(s)`);
    list.forEach(s => console.log(`      • ${s.name} (Yr${s.year}) | Avg: ${getAverageGrade(s)}%`));
  });
  console.log("");
  
  console.log("📌 STUDENT SEARCH EXAMPLE");
  const found = findStudent(students, "catalina ruiz");
  console.log(found
    ? `   Found: ${found.name} — ${found.course} | Avg: ${getAverageGrade(found)}%`
    : "   No matching student found.");

  const notFound = findStudent(students, "noname person");
  console.log(notFound
    ? `   Found: ${notFound.name}`
    : "   Search for 'noname person': No match ✅\n");
  
  console.log("📌 STRETCH — FILTER BY YEAR 3");
  filterByYear(students, 3).forEach(s => console.log(`   • ${s.name}`));
  console.log("");
  
  console.log("📌 STRETCH — ALL STUDENTS SORTED ALPHABETICALLY");
  sortByName(students).forEach(s => console.log(`   • ${s.name}`));

  console.log("\n" + "=".repeat(55));
  console.log("              ✅ REPORT COMPLETE");
  console.log("=".repeat(55));
}

main();


  
