import Card from "../../../../components/Card/Card";
import "./Specials.css";

export default function Specials() {
  const specials = [
    {
      image: require("../../../../assets/greek-salad.jpg"),
      title: "Greek Salad",
      price: "12.99",
      description:
        "The famous Greek salad of crispy lettuce, peppers, olives and our Chicago styled feta cheese, garnished with crunchy garlic, rosemary croutons.",
    },
    {
      image: require("../../../../assets/bruschetta.jpg"),
      title: "Bruschetta",
      price: "5.99",
      description:
        "Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil; made perfect for an evening dinner.",
    },
    {
      image: require("../../../../assets/lemon-dessert.jpg"),
      title: "Lemon Dessert",
      price: "5.00",
      description:
        "This comes straight from Grandma's recipe book. Every last ingredient has been sourced and is as authentic as can be imagined.",
    },
  ];
  return (
    <section className="specials">
      <div className="specials-container">
        <div className="specials-header">
          <h1>This week's specials!</h1>
        </div>
        <div className="specials-cards">
          {specials.map((special) => (
            <Card
              key={special.title}
              image={special.image}
              title={special.title}
              price={special.price}
              description={special.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
