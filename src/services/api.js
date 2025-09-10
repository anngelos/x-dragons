export async function getDragons() {
  const res = await fetch("http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon");
  console.log(res)
  return res.json();
}

export async function deleteDragon(id) {
  const res = await fetch(`http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon/${id}`, {
    method: "DELETE",
  });
  return res.json();
}