import { useCallback, useEffect, useMemo, useState } from "react";
import { useQuery } from "./useQuery";
import { RiSave2Fill } from "react-icons/ri";
import rp from "@/lib/functions/rp";

export default function usePage(id) {
  const { data, isLoading, patch } = useQuery(`/api/pages/${id}`);
  const [localData, setLocalData] = useState(null);

  const dataChanged = JSON.stringify(data) !== JSON.stringify(localData);

  const save = async () => {
    patch(rp(localData));
  };

  useEffect(() => {
    setLocalData(rp(data || {}));
  }, [data]);

  const SaveButton = () => {
    return (
      <>
        <button
          onClick={save}
          disabled={!dataChanged}
          className="btn btn-sm gap-2"
        >
          {isLoading ? (
            <span className="loading"></span>
          ) : (
            <>
              <span>
                <RiSave2Fill />
              </span>
              <span>Save</span>
            </>
          )}
        </button>
      </>
    );
  };

  return {
    part: localData,
    setPart: setLocalData,
    isLoading: isLoading,
    changed: dataChanged,
    SaveButton,
  };
}
