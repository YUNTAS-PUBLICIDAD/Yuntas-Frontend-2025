import { useState, useCallback } from "react";
import { api, API_ENDPOINTS } from "@/config";

export const useUsers = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // 🔹 GET USERS
  const getUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get(API_ENDPOINTS.ADMIN.USERS.GET_ALL);
      // Ajuste según la estructura de tu API (data.data o data)
      setUsers(res.data.data ?? res.data);
    } catch (error) {
      console.error("❌ Error al obtener usuarios:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // 🔹 CREATE USER
  const createUser = async (user: any) => {
    try {
      const res = await api.post(API_ENDPOINTS.ADMIN.USERS.CREATE, user);
      return res.data.data; // 👈 DEVUELVE EL USUARIO
    } catch (error) {
      console.error("❌ Error al crear usuario:", error);
      return null;
    }
  };

  // 🔹 UPDATE USER
  const updateUser = async (id: number, user: any) => {
    try {
      const res = await api.put(API_ENDPOINTS.ADMIN.USERS.UPDATE(id), user);
      const updatedUser = res.data.data ?? res.data;

      setUsers((prev) =>
        prev.map((u) => (u.id === id ? updatedUser : u))
      );
      return true;
    } catch (error) {
      console.error("❌ Error al actualizar usuario:", error);
      return false;
    }
  };

  // 🔹 DELETE USER
  const deleteUser = async (id: number) => {
    try {
      await api.delete(API_ENDPOINTS.ADMIN.USERS.DELETE(id));

      setUsers((prev) => prev.filter((u) => u.id !== id));
      return true;
    } catch (error) {
      console.error("❌ Error al eliminar usuario:", error);
      return false;
    }
  };

  return {
    users,
    setUsers,
    loading,
    getUsers,
    createUser,
    updateUser,
    deleteUser,
  };
};
