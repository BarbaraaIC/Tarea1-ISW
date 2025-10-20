
const DeleteUserRequest = async () => {
    const apiUrl = import.meta.env.VITE_BASE_URL;
    console.log("Accediendon a deleteuser.jsx")
        try{
            const response = await fetch(apiUrl + "/profile/private/delete", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
            });
            const result = await response.json();
            console.log("Perfil eliminado exitosamente:", result);
            return result;
        }catch (error) {
            console.log ("Error al eliminar perfil:", error.message);
            throw error;
        }
    
};

export default DeleteUserRequest;