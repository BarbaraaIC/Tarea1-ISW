import { useState } from "react"

    const deleteUser = () => {
    const apiUrl = import.meta.env.VITE_API_URL;

    const handleDeleteUser = async () => {
        try{
            const response = await fetch (apiUrl + "profile/private/delete", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Cookies.get("jwt-auth")}`
                },
            });
        }catch (error) {
            console.log ("Pefil eliminado:", error.message);
        }
    
    };

    return (
        <button onClick={handleDeleteUser}>Eliminar Perfil</button>
    )
};

export default deleteUser;