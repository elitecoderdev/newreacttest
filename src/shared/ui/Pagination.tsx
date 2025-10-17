type Props = {
  page: number;
  totalPages: number;
  onPage: (p: number) => void;
};
export default function Pagination({
  page,
  totalPages,
  onPage,
}: Props) {
  return (
    <div className="pagination">
      <button disabled={page <= 1} onClick={() => onPage(page - 1)}>
        Prev
      </button>
      <span>
        {page} / {totalPages}
      </span>
      <button
        disabled={page >= totalPages}
        onClick={() => onPage(page + 1)}
      >
        Next
      </button>
    </div>
  );
}
