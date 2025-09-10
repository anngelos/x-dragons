export async function getDragons() {
  const res = await fetch("http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon");
  return res.json();
}

export async function deleteDragon(id) {
  const res = await fetch(`http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon/${id}`, {
    method: "DELETE",
  });
  return res.json();
}

export async function getDragonById(id) {
  const res = await fetch(`http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon/${id}`);

  if (!res.ok) {
    console.error(`Erro ao buscar dragão ${id}:`, res.status);
    return null;
  }

  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch (err) {
    console.error("Resposta não é JSON:", text);
    return null;
  }
}

export async function editDragon(id, data) {
  const res = await fetch(`http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    console.error(`Erro ao editar dragão ${id}:`, res.status);
    return null;
  }

  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch (err) {
    console.error("Resposta não é JSON:", text);
    return null;
  }
}

export async function createDragon(data) {
  const res = await fetch(`http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon/${id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    console.error("Erro ao criar dragão:", res.status);
    return null;
  }

  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch (err) {
    console.error("Resposta não é JSON:", text);
    return null;
  }
}