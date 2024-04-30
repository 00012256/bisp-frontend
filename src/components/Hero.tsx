import image from "../images/heroimg.jpg";
import "../styles/hero.css";

const Hero = () => {
  return (
    <section className='hero'>
      <div className='hero-content'>
        <h1>Book Smarter, Live Healthier!</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis
          porro saepe voluptate commodi reprehenderit vitae ut voluptatum ea
          dignissimos. Corrupti, veniam aliquid nihil, fugit repellendus
          pariatur vel deserunt nostrum quas cumque molestias temporibus
          nesciunt aperiam reprehenderit totam eum obcaecati? Ipsam voluptatum
          natus eveniet cumque? Voluptatibus nemo ipsa distinctio eum qui? Nihil
          iure, fuga deleniti asperiores odio laudantium corrupti vitae
          nesciunt, ipsam itaque alias distinctio, doloribus non dolores.
          Ducimus quaerat autem harum accusamus aperiam hic sit praesentium
          laborum inventore, repellendus deleniti velit, vitae qui consequatur
          animi est sunt eum vel esse distinctio quo architecto beatae rem ab.
          Minima beatae aut fugiat?
        </p>
      </div>
      <div className='hero-img'>
        <img src={image} alt='hero' />
      </div>
    </section>
  );
};

export default Hero;
