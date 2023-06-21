import styles from "./EditPost.module.css";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useInsertDocument } from "../../hooks/useInsertDocument";
import { useFetchOneDocument } from "../../hooks/useFetchOneDocument";

const EditPost = () => {
  const { id } = useParams();
  const { document: post } = useFetchOneDocument("posts", id);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
      setImage(post.image);

      const textTags = post.tagsArray.join(", ");
      setTags(textTags);
    }
  }, [post]);

  const { insertDocument, response } = useInsertDocument("posts");
  const { user } = useAuthValue();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    //validate image URL
    try {
      new URL(image);
    } catch (error) {
      setFormError("A imagem precisa ser uma URL");
    }

    //Criar array de tags
    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

    //Checar todos os valores
    if (!title || !tags || !image || body) {
      setFormError("Preencha todos os valores!");
    }

    if (formError) return;
    insertDocument({
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    });

    //redirect do home
    navigate("/");
  };

  return (
    <div className={styles.create_post}>
      {post && (
        <>
          <h2>Editando a postagem '{post.title}'</h2>
          <p>Altere os dados do post.</p>

          <form onSubmit={handleSubmit}>
            <label>
              <span>Título</span>
              <input
                type='text'
                name='title'
                placeholder='Título'
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </label>
            <label>
              <span>URL da imagem</span>
              <input
                type='text'
                name='image'
                placeholder='Insira uma imagem para o seu post'
                onChange={(e) => setImage(e.target.value)}
                value={image}
              />
            </label>
            <p className={styles.preview_title}>Imagem atual:</p>
            <img
              className={styles.preview_img}
              src={post.image}
              alt={post.title}
            />
            <label>
              <span>Conteúdo</span>
              <textarea
                name='body'
                required
                onChange={(e) => setBody(e.target.value)}
                value={body}
                placeholder='Insira o conteúdo do post'></textarea>
            </label>
            <label>
              <span>Tags</span>
              <input
                type='text'
                name='tags'
                placeholder='Insira as tags separadas com vírgula'
                onChange={(e) => setTags(e.target.value)}
                value={tags}
              />
            </label>

            {!response.loading && <button className='btn'>Editar</button>}
            {response.loading && (
              <button className='btn' disabled>
                Aguarde
              </button>
            )}
            {response.error && <p className='error'>{response.error}</p>}
            {formError && <p className='error'>{formError}</p>}
          </form>
        </>
      )}
    </div>
  );
};

export default EditPost;
