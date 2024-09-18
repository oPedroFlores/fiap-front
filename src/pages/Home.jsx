import React from 'react';
import styles from '../css/pages/Home.module.css';
import { getPostsByPage } from '../api';
import PostsWrapper from '../components/Home/PostsWrapper';

const Home = () => {
  const [posts, setPosts] = React.useState([]);
  const [fetchError, setFetchError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);

  React.useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const { url, options } = getPostsByPage(currentPage);

        const response = await fetch(url, options);

        const json = await response.json();

        setPosts(json.posts);
        setFetchError(null);
        // Ajuste de acordo com a resposta da sua API
        const postsPerPage = 10; // Ou o número de posts por página definido na sua API
        setTotalPages(
          json.totalPages || Math.ceil(json.totalPosts / postsPerPage),
        );
      } catch (error) {
        console.error('Erro ao buscar os posts: ', error);
        setFetchError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [currentPage]);

  if (isLoading) return <p className={styles.loading}>Carregando...</p>;

  return (
    <section className={styles.home}>
      <h2 className={`animeLeftInFast`}>Seja bem-vindo ao Tech Blog!</h2>
      <p className={`animeLeftInFast`}>Postagens mais recentes:</p>
      {fetchError && <p className={styles.error}>{fetchError}</p>}
      {posts.length > 0 ? (
        <>
          <PostsWrapper posts={posts} />
          <div className={styles.pagination}>
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Anterior
            </button>
            <span>
              Página {currentPage} de {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Próxima
            </button>
          </div>
        </>
      ) : (
        <p>Nenhum post encontrado nesta página.</p>
      )}
    </section>
  );
};

export default Home;
