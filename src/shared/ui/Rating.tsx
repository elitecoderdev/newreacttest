type Props = { value: number; onChange?: (n: number) => void };
export default function Rating({ value, onChange }: Props) {
  const stars = [1, 2, 3, 4, 5];
  return (
    <div className="rating">
      {stars.map((s) => (
        <span
          key={s}
          className={s <= value ? 'star active' : 'star'}
          onClick={() => onChange && onChange(s)}
        >
          ★
        </span>
      ))}
    </div>
  );
}
