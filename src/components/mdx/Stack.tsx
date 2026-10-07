/** <Stack items={["Next.js", "PostgreSQL"]} /> — a row of tech pills inside a case study. */
export function Stack({ items }: { items: string[] }) {
  return (
    <ul className="my-6 flex flex-wrap gap-2 p-0">
      {items.map((item) => (
        <li
          key={item}
          className="m-0 list-none rounded-full border border-line bg-surface px-3 py-1 font-mono text-xs"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
