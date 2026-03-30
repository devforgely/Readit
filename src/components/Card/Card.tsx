import './Card.css';

const Card = (props: { className?: string; children: React.ReactNode }) => {
  return <div className={`card ${props.className}`}>{props.children}</div>;
};

export default Card;
