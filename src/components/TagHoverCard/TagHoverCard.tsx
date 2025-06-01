import { Link } from 'react-router-dom';
import styles from './TagHoverCard.module.css';

type TagNameProps = {
  id: string;
  name: string;
};

export default function TagHoverCard({ id, name }: TagNameProps) {
  const safeUriName = encodeURIComponent(id);

  return (
    <Link to={`/questions/tags/${safeUriName}`} className={styles.tag}>
      {name}
    </Link>
  );
}
