import { onSnapshot, doc, deleteDoc } from "firebase/firestore";
import { useHistory, useParams } from "react-router-dom";
import { auth, db } from "../database/FirebaseConfig";
import { useState,useEffect } from "react";

const BlogDetails = ({ isAuth }) => {
  const { id } = useParams();
  const [blog, setBlog] = useState();
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState('');
  const history = useHistory();

  // getting single doc
  useEffect(() => {
    const docRef = doc(db, "posts", id);
    onSnapshot(docRef, (doc) => {
      try {
        const temp = {};
        Object.assign(temp, doc.data());
        setBlog(temp);
        setIsPending(false);
      } catch (error) {
        setError(error.message);
      }
    });
  }, [id])

  const deleteBlog = async (id) => {
    const blogDoc = doc(db, "posts", id);
    try {
      await deleteDoc(blogDoc);
      history.push("/");
    } catch (error) {
      window.location.reload();
    }
  };

  return (
    <div className="blog-details">
      {error && <div>{error}</div> }
      {isPending && <div>Loading...</div>}
      {blog && (
        <article>
          <h2>{blog.title}</h2>
          <p>Written by {blog.authorName}</p>
          <div> <p>{blog.body}</p> </div>

          {isAuth && ((blog.authorId) === (auth.currentUser.uid) ) && (
            <>
              <button
                onClick={() => {
                  deleteBlog(id);
                }}
              >
                delete
              </button>
            </>
          )}
        </article>
      )}
    </div>
  );
};

export default BlogDetails;
