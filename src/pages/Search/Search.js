import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useQuery } from "../../hooks/useQuery";
import PostDetails from "../../components/PostDetails";
import { Link } from "react-router-dom";
import styles from "./Search.module.css";

const Search = () => {
  const query = useQuery();
  const search = query.get("q");
  const { documents: posts } = useFetchDocuments("posts", search);
  return (
    <div className={styles.search_container}>
      <h2>Search</h2>

      <div className={styles.noposts}>
        {posts && posts.length === 0 && (
          <>
            <p>Não foram encontrados posts :(</p>

            <Link to='/' className='btn btn-dark'>
              Voltar
            </Link>
          </>
        )}
        {posts &&
          posts.map((post) => <PostDetails key={post.id} post={post} />)}
      </div>
    </div>
  );
};

export default Search;
