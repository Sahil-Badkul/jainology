import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from '../database/FirebaseConfig'

const Create = ({ isAuth }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState()
  const history = useHistory();

  const blogCollectionRef = collection(db, 'posts');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);
    try {
      await addDoc(blogCollectionRef, {
        title,
        body,
        // author: { name: auth.currentUser.displayName, id: auth.currentUser.uid},
        authorId: auth.currentUser.uid,
        authorName: auth.currentUser.displayName,
      })
      setIsPending(false);
      history.push("/");
    } catch (e) {
      setIsPending(false)
      setError("Sorry can't add blog\nError occured = "+e.message)
    }
  };

  useEffect(() => {
    if(!isAuth){
      history.push('/login')
    }
  },[]);

  return (
    <div className="create">
      <h2>Add a New Blog</h2>
      <form onSubmit={handleSubmit}>
        <label>Blog title:</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Blog body:</label>
        <textarea
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        {!isPending && <button>Add Blog</button>}
        {isPending && <button disabled> Adding Blog... </button>}
        {error && <div><pre>{error}</pre></div> }
      </form>
    </div>
  );
};

export default Create;
