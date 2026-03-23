async function test() {
  try {
    const authRes = await fetch('http://localhost:5001/api/auth/login', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@mediamatrix.com', password: 'password123' })
    });
    const auth = await authRes.json();
    const token = auth.token;
    const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };

    const vacRes = await fetch('http://localhost:5001/api/folders', {
      method: 'POST', headers, body: JSON.stringify({ name: `Vacation_${Date.now()}` })
    });
    const vac = await vacRes.json();
    console.log('Vacation Folder Created:', vac.data._id);

    const hawaiiRes = await fetch('http://localhost:5001/api/folders', {
      method: 'POST', headers, body: JSON.stringify({ name: 'Hawaii', parentFolder: vac.data._id })
    });
    const hawaii = await hawaiiRes.json();
    console.log('Hawaii Subfolder Created:', hawaii.data._id);

    const listRes = await fetch(`http://localhost:5001/api/folders?parentId=${vac.data._id}`, { headers });
    const list = await listRes.json();
    console.log('Folders under Vacation:', list.data.map(f => f.name));
  } catch(err) {
    console.error('Test Failed:', err.message);
  }
}

test();
