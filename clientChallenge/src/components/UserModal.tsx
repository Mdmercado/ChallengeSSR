import React, { useState, useEffect } from "react";
import { Modal, TextInput, Button, Select, Label } from "flowbite-react";
import { IUser } from "../types/user";
import { updateUser } from "../services/userService";
import { useLoading } from "../contexts/LoadingContext";
import MySwal from "../utils/swal";

interface UserModalProps {
  user: IUser;
  isOpen: boolean;
  onClose: () => void;
  onUserUpdated: (updatedUser: IUser, token: string) => void;
  isAdmin: boolean;
}

const UserModal: React.FC<UserModalProps> = ({
  user,
  isOpen,
  onClose,
  onUserUpdated,
  isAdmin,
}) => {
  const { setLoading } = useLoading();

  const [formData, setFormData] = useState<Partial<IUser>>({
    username: user.username,
    email: user.email,
    active: user.active,
    role_id: user.role_id,
  });

  useEffect(() => {
    setFormData({
      username: user.username,
      email: user.email,
      active: user.active,
      role_id: user.role_id,
    });
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]:
        name === "role_id"
          ? parseInt(value)
          : name === "active"
          ? value === "true"
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { user: updatedUser, token } = await updateUser(user.id, formData);
      onUserUpdated(updatedUser, token);
      onClose();
      MySwal.fire({
        icon: "success",
        title: "Actualización exitosa",
        text: "El usuario ha sido actualizado correctamente",
        confirmButtonText: "Entendido",
      });
    } catch (error) {
      console.error("Failed to update user:", error);
      MySwal.fire({
        icon: "error",
        title: "Error al actualizar",
        text: "No se pudo actualizar el usuario. Inténtalo de nuevo.",
        confirmButtonText: "Entendido",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={isOpen} onClose={onClose}>
      <Modal.Header>Editar Usuario</Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label htmlFor="username" value="Nombre de usuario" />
            <TextInput
              id="username"
              name="username"
              value={formData.username ?? ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="email" value="Email" />
            <TextInput
              id="email"
              name="email"
              type="email"
              value={formData.email ?? ""}
              onChange={handleChange}
              required
            />
          </div>
          {isAdmin && (
            <>
              <div className="mb-4">
                <Label htmlFor="role" value="Rol" />
                <Select
                  id="role"
                  name="role_id"
                  value={formData.role_id?.toString() ?? ""}
                  onChange={handleChange}>
                  <option value="1">Usuario</option>
                  <option value="2">Admin</option>
                </Select>
              </div>
              <div className="mb-4">
                <Label htmlFor="active" value="Estado" />
                <Select
                  id="active"
                  name="active"
                  value={formData.active ? "true" : "false"}
                  onChange={handleChange}>
                  <option value="true">Activo</option>
                  <option value="false">Inactivo</option>
                </Select>
              </div>
            </>
          )}
          <div className="flex justify-end space-x-2">
            <Button color="failure" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" color="success">
              Guardar
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default UserModal;
