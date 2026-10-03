let notes = [
  { id: 1, text: "Buy milk and bread", category: "personal" },
  { id: 2, text: "Finish the Day 3 assignment", category: "study" },
  { id: 3, text: "Email the project report to Grace", category: "work" },
  { id: 4, text: "Revise JavaScript arrays", category: "study" },
  { id: 5, text: "Call mum", category: "personal" },
];


// 1. searchNotes(word)

function searchNotes(word) {
  const searchWord = word.toLowerCase();

  return notes.filter(function (note) {
    return note.text.toLowerCase().includes(searchWord);
  });
}


// 2. longestNote()

function longestNote() {
  if (notes.length === 0) {
    return null;
  }

  let longest = notes[0];

  for (let i = 1; i < notes.length; i++) {
    if (notes[i].text.length > longest.text.length) {
      longest = notes[i];
    }
  }

  return longest;
}


// 3. countByCategory()

function countByCategory() {
  const counts = {};

  for (let i = 0; i < notes.length; i++) {
    const category = notes[i].category;

    if (counts[category] === undefined) {
      counts[category] = 1;
    } else {
      counts[category]++;
    }
  }

  return counts;
}


// 4. getSummary()

function getSummary() {
  const counts = countByCategory();
  const total = notes.length;

  const noteWord = total === 1 ? "note" : "notes";

  return `${total} ${noteWord}: ${counts.personal || 0} personal, ${counts.work || 0} work, ${counts.study || 0} study.`;
}


// 5. isDuplicate(text)

function isDuplicate(text) {
  const newText = text.trim().toLowerCase();

  return notes.some(function (note) {
    return note.text.trim().toLowerCase() === newText;
  });
}


// 6. addNote(text, category)

function addNote(text, category) {
  const cleanedText = text.trim();

  // Validate text length
  if (cleanedText.length < 1) {
    console.log("Note rejected: text cannot be empty.");
    return false;
  }

  if (cleanedText.length > 200) {
    console.log("Note rejected: text cannot be longer than 200 characters.");
    return false;
  }

  // Validate duplicate
  if (isDuplicate(cleanedText)) {
    console.log("Note rejected: duplicate note.");
    return false;
  }

  // Validate category
  const validCategories = ["personal", "work", "study"];

  if (!validCategories.includes(category)) {
    console.log("Note rejected: invalid category.");
    return false;
  }

  // Generate a unique ID
  let newId = 1;

  for (let i = 0; i < notes.length; i++) {
    if (notes[i].id >= newId) {
      newId = notes[i].id + 1;
    }
  }

  // Create and add the new note
  const newNote = {
    id: newId,
    text: cleanedText,
    category: category
  };

  notes.push(newNote);

  return true;
}


// =====================================================
// TESTS
// =====================================================


// 1. searchNotes() tests

console.log(searchNotes("milk"));
// Expected: [{ id: 1, text: "Buy milk and bread", category: "personal" }]

console.log(searchNotes("JAVASCRIPT"));
// Expected: [{ id: 4, text: "Revise JavaScript arrays", category: "study" }]

console.log(searchNotes("pizza"));
// Expected: []

console.log(searchNotes("DAY 3"));
// Expected: [{ id: 2, text: "Finish the Day 3 assignment", category: "study" }]


// 2. longestNote() tests

console.log(longestNote());
// Expected: { id: 2, text: "Finish the Day 3 assignment", category: "study" }

const savedNotesForEmptyTest = notes;

notes = [];
console.log(longestNote());
// Expected: null

notes = savedNotesForEmptyTest;


// 3. countByCategory() tests

console.log(countByCategory());
// Expected: { personal: 2, study: 2, work: 1 }

const savedNotesForCategoryTest = notes;

notes = [
  { id: 10, text: "Read a book", category: "personal" },
  { id: 11, text: "Complete homework", category: "study" },
  { id: 12, text: "Go for a walk", category: "personal" }
];

console.log(countByCategory());
// Expected: { personal: 2, study: 1 }

notes = savedNotesForCategoryTest;


// 4. getSummary() tests

console.log(getSummary());
// Expected: 5 notes: 2 personal, 1 work, 2 study.

const savedNotesForSummaryTest = notes;

notes = [
  { id: 20, text: "Study JavaScript", category: "study" }
];

console.log(getSummary());
// Expected: 1 note: 0 personal, 0 work, 1 study.

notes = savedNotesForSummaryTest;


// 5. isDuplicate() tests

console.log(isDuplicate("Call mum"));
// Expected: true

console.log(isDuplicate("  CALL MUM  "));
// Expected: true

console.log(isDuplicate("Call dad"));
// Expected: false

console.log(isDuplicate("  BUY MILK AND BREAD  "));
// Expected: true


// 6. addNote() tests

console.log(addNote("Finish JavaScript practice", "study"));
// Expected: true

console.log(notes);
// Expected: The original 5 notes plus the new note { id: 6, text: "Finish JavaScript practice", category: "study" }

console.log(addNote("Call mum", "personal"));
// Expected: false, with "Note rejected: duplicate note." logged.

console.log(addNote("This category does not exist", "random"));
// Expected: false, with "Note rejected: invalid category." logged.

console.log(addNote("", "personal"));
// Expected: false, with "Note rejected: text cannot be empty." logged.

const longText = "a".repeat(201);

console.log(addNote(longText, "study"));
// Expected: false, with "Note rejected: text cannot be longer than 200 characters." logged.

console.log(notes);
// Expected: The valid note was added, while all rejected notes were not added.