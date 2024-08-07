import { useEffect, useState } from "react";
import { Table, Button, Badge } from "flowbite-react";
import { IUser, transformUserToPayload } from "../types/user";
import { getUsers, deleteUser } from "../services/userService";
import EditUserModal from "../components/UserModal";
import { useLoading } from "../contexts/LoadingContext";
import { useAuth } from "../contexts/AuthContext";
import MySwal from "../utils/swal";

const AdminPanel = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const { setLoading } = useLoading();
  const { setAuth, user } = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const users = await getUsers();
        setUsers(users);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [setLoading]);

  const handleEdit = (user: IUser) => {
    setSelectedUser(user);
    setEditModalOpen(true);
  };

  const handleDelete = async (userId: number) => {
    MySwal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esto",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminarlo",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);
        try {
          await deleteUser(userId);
          setUsers(users.filter((user) => user.id !== userId));
          MySwal.fire("Eliminado", "El usuario ha sido eliminado.", "success");
        } catch (error) {
          console.error("Failed to delete user:", error);
          MySwal.fire("Error", "No se pudo eliminar el usuario.", "error");
        } finally {
          setLoading(false);
        }
      }
    });
  };

  const handleUserUpdated = (updatedUser: IUser, token: string) => {
    setUsers(
      users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    setSelectedUser(null);

    if (updatedUser.id === user?.id) {
      const updatedUserPayload = transformUserToPayload(
        updatedUser,
        user.iat,
        user.exp
      );
      setAuth(token, updatedUserPayload);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Admin Dashboard</h2>
      <div className="overflow-x-auto">
        <Table className="min-w-full divide-y divide-gray-200">
          <Table.Head>
            <Table.HeadCell>Nombre de usuario</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Rol</Table.HeadCell>
            <Table.HeadCell>Estado</Table.HeadCell>
            <Table.HeadCell>Acciones</Table.HeadCell>
          </Table.Head>
          <Table.Body className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <Table.Row key={user.id}>
                <Table.Cell>{user.username}</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>
                  <Badge
                    color={user.role_id.name === "admin" ? "info" : "warning"}>
                    {user.role_id.name}
                  </Badge>
                </Table.Cell>
                <Table.Cell>
                  <Badge color={user.active ? "success" : "failure"}>
                    {user.active ? "Activo" : "Inactivo"}
                  </Badge>
                </Table.Cell>
                <Table.Cell>
                  <div className="flex space-x-2">
                    <Button
                      color="warning"
                      size="xs"
                      onClick={() => handleEdit(user)}>
                      Editar
                    </Button>
                    <Button
                      color="failure"
                      size="xs"
                      onClick={() => handleDelete(user.id)}>
                      Eliminar
                    </Button>
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
      {selectedUser && (
        <EditUserModal
          user={selectedUser}
          isOpen={isEditModalOpen}
          onClose={() => setEditModalOpen(false)}
          onUserUpdated={handleUserUpdated}
          isAdmin={true}
        />
      )}
    </div>
  );
};

export default AdminPanel;
