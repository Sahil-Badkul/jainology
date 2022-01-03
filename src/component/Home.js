import { collection, getDocs } from "firebase/firestore";
import { db } from "../database/FirebaseConfig";
import { useEffect, useState } from "react";
import BlogList from "./BlogLIst";

const Home = ({ isAuth }) => {
  const [blogs, setBlogs] = useState([]);
  const blogCollectionRef = collection(db, "posts");
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const getBlog = async () => {
      try {
        const data = await getDocs(blogCollectionRef);
        setBlogs(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        setIsPending(false);
      } catch (e) {
          setError("Sorry🙇😢 \nError occured... \n"+ e.message)
          setIsPending(false);
      }
    };
    getBlog();
  }, [isAuth, blogs]);

  return (
    <div className="home">
      {isPending && <div>Loading...</div>}
      {error && <div><pre>{error}</pre></div>}
      {blogs && <BlogList blogs={blogs} />}
    </div>
  );
};

export default Home;
