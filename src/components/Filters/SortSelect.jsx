import { useContext } from "react";
import { SORT_OPTIONS, PodcastContext } from "../../context/PodcastContext";
import selectStyles from "./Select.module.css";

/**
 * Dropdown for choosing sort order.
 */
export default function SortSelect() {
  const { sortKey, setSortKey } = useContext(PodcastContext);

  return (
    <select
      className={selectStyles.select}
      value={sortKey}
      onChange={(e) => setSortKey(e.target.value)}
    >
      {SORT_OPTIONS.map((o) => (
        <option key={o.key} value={o.key}>
          {o.label}
        </option>
      ))}
    </select>
  );
}
