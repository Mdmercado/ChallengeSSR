import { useState, useEffect } from "react";
import { Card, Badge, Button } from "flowbite-react";
import { useAuth } from "../contexts/AuthContext";
import UserModal from "../components/UserModal";
import MySwal from "../utils/swal";
import {
  IUser,
  UserPayload,
  transformUserToPayload,
  transformPayloadToUser,
} from "../types/user";

const UserPanel = () => {
  const { user, setAuth, hasSeenInactiveAlert, setHasSeenInactiveAlert } =
    useAuth();
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    if (!user?.active && !hasSeenInactiveAlert) {
      MySwal.fire({
        icon: "warning",
        title: "Usuario inactivo",
        text: "Tu usuario se encuentra inactivo, por favor contacta al administrador",
        confirmButtonText: "Entendido",
      }).then(() => {
        setHasSeenInactiveAlert(true);
      });
    }
  }, [user, hasSeenInactiveAlert, setHasSeenInactiveAlert]);

  const handleUserUpdated = (updatedUser: IUser, token: string) => {
    const updatedUserPayload: UserPayload = transformUserToPayload(
      updatedUser,
      user!.iat,
      user!.exp
    );

    setAuth(token, updatedUserPayload);
  };

  return (
    <section className="flex flex-col items-center">
      <h2 className="text-2xl mb-4">Bienvenido al Challenge de ELDAR</h2>
      <Card className="max-w-sm w-full border-2 border-gray-200 shadow-lg">
        <div className="p-4">
          <h3 className="text-xl mb-4">Datos de usuario</h3>
          <p>
            <strong>Nombre de usuario: </strong> {user?.username}
          </p>
          <p>
            <strong>Email: </strong> {user?.email}
          </p>
          <p>
            <strong>Rol: </strong> {user?.role.name.toUpperCase()}
          </p>
          <p>
            <strong>Fecha de creación: </strong>
            {new Date(user?.createdAt ?? "").toLocaleString()}
          </p>
          <p>
            <strong>La sesión expira el: </strong>{" "}
            {new Date(user?.exp ?? "").toLocaleString()}
          </p>
          <div className="mt-4 text-center">
            <Badge
              color={user?.active ? "success" : "failure"}
              className="w-fit">
              {user?.active ? "Activo" : "Inactivo"}
            </Badge>
          </div>
          <div className="flex justify-end mt-4">
            <Button color="warning" onClick={() => setEditModalOpen(true)}>
              Editar
            </Button>
          </div>
        </div>
      </Card>
      {user && (
        <UserModal
          user={transformPayloadToUser(user)}
          isOpen={isEditModalOpen}
          onClose={() => setEditModalOpen(false)}
          onUserUpdated={handleUserUpdated}
          isAdmin={user.role.name === "admin"}
        />
      )}
    </section>
  );
};

export default UserPanel;
