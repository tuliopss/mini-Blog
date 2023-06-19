import { Link } from "react-router-dom";
import styles from "./About.module.css";

const About = () => {
  return (
    <div className={styles.about}>
      <h2>
        Sobre o Mini <span>Blog</span>
        <p>
          Este projeto consiste em um blog feito com ReactJS no Frontend e
          Firebase no backend
        </p>
      </h2>
      <Link to='/posts/create' className='btn'>
        Criar post
      </Link>
    </div>
  );
};

export default About;
