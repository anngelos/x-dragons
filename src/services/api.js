const BASE_URL = "https://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon";

export async function handleResponse(res) {
  if (!res.ok) {
    throw new Error(`Erro na requisição: ${res.status}`);
  }

  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

export async function getDragons() {
  try {
    const res = await fetch(BASE_URL);
    return await handleResponse(res) || [];
  } catch (error) {
    console.error("Erro em getDragons:", error);
    return [];
  }
}

export async function deleteDragon(id) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });
    return await handleResponse(res);
  } catch (error) {
    console.error(`Erro em deleteDragon (${id}):`, error);
    return null;
  }
}

export async function createDragon(data) {
  const res = await fetch(BASE_URL, {
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

export async function getDragonById(id) {
  const res = await fetch(`${BASE_URL}/${id}`);

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
  const res = await fetch(`${BASE_URL}/${id}`, {
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