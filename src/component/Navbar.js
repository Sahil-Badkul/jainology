import { Link } from "react-router-dom"; 
import { useHistory } from "react-router-dom";
import { signOut } from 'firebase/auth'
import { auth } from "../database/FirebaseConfig";
const Navbar = ({ isAuth , setIsAuth}) => {
  
  let history = useHistory();
  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.reload();
      history.push("/login");
    });
  };

  return (
    <nav className="navbar">
      <h1>Jainology</h1>
      <div className="links">
        <Link to="/">Home</Link>
        {!isAuth ? (
          <Link to="/login">Login </Link>
        ) : (
          <>
          <Link to="/create">Add Blog</Link>
          <Link to="#" onClick={signUserOut}>Log Out</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
