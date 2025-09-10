import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import DragonForm from "./DragonForm";

const MySwal = withReactContent(Swal);

export function openCreateDragonModal(onSubmit) {
  MySwal.fire({
    title: <p>Cadastrar Dragão</p>,
    html: (
      <DragonForm
        onSubmit={(data) => {
          onSubmit(data);
          MySwal.close();
        }}
        onCancel={() => MySwal.close()}
      />
    ),
    showConfirmButton: false,
    showCancelButton: false,
  });
}

export function openEditDragonModal(dragon, onSubmit) {
  MySwal.fire({
    title: <p>Editar Dragão</p>,
    html: (
      <DragonForm
        defaultValues={dragon}
        onSubmit={(data) => {
          onSubmit(data);
          MySwal.close();
        }}
        onCancel={() => MySwal.close()}
      />
    ),
    showConfirmButton: false,
    showCancelButton: false,
  });
}
