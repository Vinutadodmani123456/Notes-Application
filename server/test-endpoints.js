// Comprehensive API test suite for NoteNest
const BASE_URL = 'http://localhost:5000/api/notes';

async function runTests() {
  console.log('🧪 Starting NoteNest API Automated Tests...\n');
  let createdId = null;

  // 1. Validation Test: Blank title
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: '   ', content: 'Some valid content' }),
    });
    const json = await res.json();
    console.log(res.status === 400 ? '✅ PASS' : '❌ FAIL', '1. Reject blank title -> Status:', res.status, json.message);
  } catch (err) {
    console.error('❌ FAIL 1', err.message);
  }

  // 2. Validation Test: Blank content
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'Valid Title', content: '   ' }),
    });
    const json = await res.json();
    console.log(res.status === 400 ? '✅ PASS' : '❌ FAIL', '2. Reject blank content -> Status:', res.status, json.message);
  } catch (err) {
    console.error('❌ FAIL 2', err.message);
  }

  // 3. Create Valid Note
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Meeting Notes with Engineering',
        content: 'Discuss quarterly deliverables, deployment pipelines, and database optimization strategies.',
        category: 'Work',
      }),
    });
    const json = await res.json();
    createdId = json.data?._id;
    console.log(res.status === 201 && createdId ? '✅ PASS' : '❌ FAIL', '3. Create valid note -> Status:', res.status, 'ID:', createdId);
  } catch (err) {
    console.error('❌ FAIL 3', err.message);
  }

  // 4. Get Note By ID
  try {
    const res = await fetch(`${BASE_URL}/${createdId}`);
    const json = await res.json();
    console.log(res.status === 200 && json.data.title.includes('Meeting') ? '✅ PASS' : '❌ FAIL', '4. Get single note by ID -> Status:', res.status);
  } catch (err) {
    console.error('❌ FAIL 4', err.message);
  }

  // 5. Invalid ObjectId format test
  try {
    const res = await fetch(`${BASE_URL}/invalid-mongo-id-123`);
    const json = await res.json();
    console.log(res.status === 400 ? '✅ PASS' : '❌ FAIL', '5. Reject invalid ObjectId -> Status:', res.status, json.message);
  } catch (err) {
    console.error('❌ FAIL 5', err.message);
  }

  // 6. Non-existent valid ObjectId test
  try {
    const nonExistentId = '507f1f77bcf86cd799439011';
    const res = await fetch(`${BASE_URL}/${nonExistentId}`);
    const json = await res.json();
    console.log(res.status === 404 ? '✅ PASS' : '❌ FAIL', '6. 404 on non-existent ID -> Status:', res.status, json.message);
  } catch (err) {
    console.error('❌ FAIL 6', err.message);
  }

  // 7. Update Note
  try {
    const res = await fetch(`${BASE_URL}/${createdId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Updated Meeting Notes with Engineering Team',
        content: 'Action items finalized: ship v1.0 and review metrics.',
      }),
    });
    const json = await res.json();
    console.log(res.status === 200 && json.data.title.includes('Updated') ? '✅ PASS' : '❌ FAIL', '7. Update note -> Status:', res.status);
  } catch (err) {
    console.error('❌ FAIL 7', err.message);
  }

  // 8. Search by Title
  try {
    const res = await fetch(`${BASE_URL}?search=engineering`);
    const json = await res.json();
    console.log(res.status === 200 && json.count >= 1 ? '✅ PASS' : '❌ FAIL', '8. Search by title keyword ("engineering") -> Found:', json.count);
  } catch (err) {
    console.error('❌ FAIL 8', err.message);
  }

  // 9. Search by Content
  try {
    const res = await fetch(`${BASE_URL}?search=finalized`);
    const json = await res.json();
    console.log(res.status === 200 && json.count >= 1 ? '✅ PASS' : '❌ FAIL', '9. Search by content keyword ("finalized") -> Found:', json.count);
  } catch (err) {
    console.error('❌ FAIL 9', err.message);
  }

  // 10. Search nonexistent keyword
  try {
    const res = await fetch(`${BASE_URL}?search=supercalifragilistic12345`);
    const json = await res.json();
    console.log(res.status === 200 && json.count === 0 ? '✅ PASS' : '❌ FAIL', '10. Search nonexistent query -> Found:', json.count);
  } catch (err) {
    console.error('❌ FAIL 10', err.message);
  }

  // 11. Delete Note
  try {
    const res = await fetch(`${BASE_URL}/${createdId}`, {
      method: 'DELETE',
    });
    const json = await res.json();
    console.log(res.status === 200 ? '✅ PASS' : '❌ FAIL', '11. Delete note -> Status:', res.status, json.message);
  } catch (err) {
    console.error('❌ FAIL 11', err.message);
  }

  // 12. Verify deleted note is now 404
  try {
    const res = await fetch(`${BASE_URL}/${createdId}`);
    console.log(res.status === 404 ? '✅ PASS' : '❌ FAIL', '12. Verify deleted note returns 404 -> Status:', res.status);
  } catch (err) {
    console.error('❌ FAIL 12', err.message);
  }

  console.log('\n🎉 API Tests Completed Successfully!');
}

runTests();
