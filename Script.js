let notes = [
  { id: 1, text: "Buy milk and bread", category: "personal" },
  { id: 2, text: "Finish the Day 3 assignment", category: "study" },
  { id: 3, text: "Email the project report to Grace", category: "work" },
  { id: 4, text: "Revise JavaScript arrays", category: "study" },
  { id: 5, text: "Call mum", category: "personal" },
];

function searchNotes(word) {
  const searchTerm = word.toLowerCase();

  return notes.filter((note) =>
    note.text.toLowerCase().includes(searchTerm)
  );
}

function longestNote() {
  if (notes.length === 0) {
    return null;
  }

  return notes.reduce((longest, note) =>
    note.text.length > longest.text.length ? note : longest
  );
}

function countByCategory() {
  const counts = {};

  for (const note of notes) {
    counts[note.category] = (counts[note.category] || 0) + 1;
  }

  return counts;
}

function getSummary() {
  const counts = countByCategory();
  const total = notes.length;
  const noteWord = total === 1 ? "note" : "notes";

  const categories = ["personal", "work", "study"]
    .filter((category) => counts[category])
    .map((category) => `${counts[category]} ${category}`)
    .join(", ");

  return `${total} ${noteWord}: ${categories}.`;
}

function isDuplicate(text) {
  const normalizedText = text.trim().toLowerCase();

  return notes.some(
    (note) => note.text.trim().toLowerCase() === normalizedText
  );
}

function addNote(text, category) {
  const trimmedText = text.trim();
  const validCategories = ["personal", "work", "study"];

  if (trimmedText.length < 1 || trimmedText.length > 200) {
    console.log("Note must be between 1 and 200 characters.");
    return false;
  }

  if (isDuplicate(trimmedText)) {
    console.log("A note with this text already exists.");
    return false;
  }

  if (!validCategories.includes(category)) {
    console.log("Category must be personal, work, or study.");
    return false;
  }

  const nextId = notes.length
    ? Math.max(...notes.map((note) => note.id)) + 1
    : 1;

  notes.push({ id: nextId, text: trimmedText, category });
  return true;
}

// searchNotes tests
console.log(searchNotes("JAVASCRIPT")); // Expected: [{ id: 4, text: "Revise JavaScript arrays", category: "study" }]
console.log(searchNotes("pizza")); // Expected: []

// longestNote tests
console.log(longestNote()); // Expected: { id: 3, text: "Email the project report to Grace", category: "work" }
const savedNotes = notes;
notes = [];
console.log(longestNote()); // Expected: null
notes = savedNotes;

// countByCategory tests
console.log(countByCategory()); // Expected: { personal: 2, study: 2, work: 1 }
notes = [{ id: 1, text: "One note", category: "personal" }];
console.log(countByCategory()); // Expected: { personal: 1 }
notes = savedNotes;

// getSummary tests
console.log(getSummary()); // Expected: "5 notes: 2 personal, 1 work, 2 study."
notes = [{ id: 1, text: "One note", category: "personal" }];
console.log(getSummary()); // Expected: "1 note: 1 personal."
notes = savedNotes;

// isDuplicate tests
console.log(isDuplicate("  BUY MILK AND BREAD  ")); // Expected: true
console.log(isDuplicate("Write a poem")); // Expected: false

// addNote tests
console.log(addNote("Plan weekend trip", "personal")); // Expected: true
console.log(addNote("  plan weekend trip  ", "work")); // Expected: false (duplicate)
console.log(addNote("", "study")); // Expected: false (invalid length)
console.log(addNote("Prepare presentation", "other")); // Expected: false (invalid category)