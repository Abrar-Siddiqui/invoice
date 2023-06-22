import useAuth from "../hooks/useAuth.js"

export default function LogoutButton() {
    const { logout } = useAuth();
    
    const logoutHandler=()=>{
        logout()
        localStorage.removeItem("authUser")
    }

    return (
        <button 
            onClick={logoutHandler} 
            className="button block-button is-small jc-start"
        >
            Log out
        </button>
    )
}