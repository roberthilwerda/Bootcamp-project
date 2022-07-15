const DOMAIN = 'http://localhost:8000';

export async function getAllData() {
  const response = await fetch(`${DOMAIN}/get_all_enhanced`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not fetch data.');
  }
  
  return data;
}

export async function getGenreDetail(genre) {
  const response = await fetch(`${DOMAIN}/get_genre_detail?genre=${genre}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not fetch data.');
  }
  
  return data;
}

export async function fbLogin(fbResponse) {
  const response = await fetch(`${DOMAIN}/fbLogin`, {
    method: 'POST',
    body: JSON.stringify(fbResponse),
    // headers: {
    //   'Content-Type': 'application/json',
    // },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not create quote.');
  }

  return data;
}
