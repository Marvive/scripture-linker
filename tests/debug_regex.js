const bookPattern = 'Genesis|Exodus|Leviticus|Numbers|Deuteronomy|Joshua|Judges|Ruth|1 Samuel|2 Samuel|1 Kings|2 Kings|1 Chronicles|2 Chronicles|Ezra|Nehemiah|Esther|Job|Psalm|Proverbs|Ecclesiastes|Song of Solomon|Isaiah|Jeremiah|Lamentations|Ezekiel|Daniel|Hosea|Joel|Amos|Obadiah|Jonah|Micah|Nahum|Habakkuk|Zephaniah|Haggai|Zechariah|Malachi|Matthew|Mark|Luke|John|Acts|Romans|1 Corinthians|2 Corinthians|Galatians|Ephesians|Philippians|Colossians|1 Thessalonians|2 Thessalonians|1 Timothy|2 Timothy|Titus|Philemon|Hebrews|James|1 Peter|2 Peter|1 John|2 John|3 John|Jude|Revelation|Gen|Ex|Le|Nu|Dt|Jos|Jdg|Ru|1Sa|2Sa|1Ki|2Ki|1Ch|2Ch|Ezr|Ne|Es|Job|Ps|Pr|Ec|So|Is|Je|La|Eze|Da|Ho|Joe|Am|Ob|Jon|Mic|Na|Hab|Zep|Hag|Zec|Mal|Mt|Mk|Lk|Jn|Ac|Ro|1Co|2Co|Ga|Eph|Php|Col|1Th|2Th|1Ti|2Ti|Tt|Phm|Heb|Jas|1Pe|2Pe|1Jn|2Jn|3Jn|Jud|Re|est'.toLowerCase();

// UPDATED REGEX
const fullRefPattern = `(?<![a-zA-Z0-9/.=])(?:\\()?(${bookPattern})\\.?\\s*(\\d{1,3})(?:[:.](\\d{1,3})(?:[-–—](\\d{1,3})(?:[:.](\\d{1,3}))?)?)?(?:\\))?`;
const shorthandRefPattern = `(?<![a-zA-Z0-9/.=])(?:\\()?(\\d{1,3}):(\\d{1,3})(?:[-–—](\\d{1,3})(?:[:.](\\d{1,3}))?)?(?:\\))?`;

const combinedRegex = new RegExp(`${fullRefPattern}|${shorthandRefPattern}`, 'gi');

console.log('--- Test 1: Parentheses ---');
const text1 = 'This is (est 3:1-8)';
let match1 = combinedRegex.exec(text1);
if (match1) {
    console.log('Match found:', `"${match1[0]}"`);
}

combinedRegex.lastIndex = 0;
console.log('--- Test 2: URL avoidance ---');
const text2 = '[link](https://ref.ly/logosres/esv?ref=BibleESV.Jn3.16)';
let match2 = combinedRegex.exec(text2);
if (match2) {
    console.log('Match found (BAD):', `"${match2[0]}"`);
} else {
    console.log('No match found (GOOD)');
}

combinedRegex.lastIndex = 0;
console.log('--- Test 3: Markdown link greedy avoidance ---');
const text3 = '[John 3:16](https://ref.ly/...)';
let match3 = combinedRegex.exec(text3);
if (match3) {
    console.log('Match found:', `"${match3[0]}"`);
    // NOTE: If it matches "John 3:16", and we are at position 1, 
    // it SHOULD NOT match the closing "]" of the link!
}
