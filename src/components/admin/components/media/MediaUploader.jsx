import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import filesToB64 from "@/lib/functions/fileToB64";
import { useQuery } from "@/hooks/useQuery";

export default function MediaUploader({
  refetch,
  children,
  put,
  setPage,
  setMedia,
  setStopLoading,
}) {
  const {
    data: mediaData,
    put: mediaPut,
    refetch: mediaRefetch,
  } = useQuery(`/api/files/`);

  const onDrop = useCallback(
    async (acceptedFiles) => {
      const files = await Promise.all(
        acceptedFiles.map(async (file) => await filesToB64(file))
      );

      const file_id = await Promise.all(
        files.map(async (file) => {
          const res = await mediaPut({ file });
          return res;
        })
      );
      const imageIds = file_id.map((res) => res.id);

      const uniqueImageIds = [...new Set(imageIds)];

      if (uniqueImageIds.length > 0 && put) {
        const updateResponse = await put({
          images: uniqueImageIds,
        });

        mediaRefetch();
      }
      if (setPage) {
        setPage(0);
      }
      if (setMedia) {
        setMedia([]);
      }
      if (setStopLoading) {
        setStopLoading(false);
      }
      refetch();
    },
    [mediaPut, put, refetch, mediaRefetch]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div>
      <div className="p-2">
        <div
          {...getRootProps()}
          className="border-2 border-dashed p-3 rounded-md"
        >
          <input {...getInputProps()} />
          <div>
            <div className="text-center">
              {isDragActive ? (
                <p>Drop now ...</p>
              ) : (
                <p>Drag and drop some files here, or click to select files</p>
              )}
            </div>
          </div>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
