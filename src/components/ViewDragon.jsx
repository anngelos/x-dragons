import Swal from "sweetalert2";

export function openViewDragonModal(dragon) {
  Swal.fire({
    title: dragon.name,
    html: `
      <div style="text-align: left;">
        <p><strong>ID:</strong> ${dragon.id}</p>
        <p><strong>Tipo:</strong> ${dragon.type || "N/A"}</p>
        <p><strong>Criado em:</strong> ${new Date(dragon.createdAt).toLocaleString()}</p>
      </div>
    `,
    icon: "info",
    confirmButtonText: "Fechar",
  });
}
