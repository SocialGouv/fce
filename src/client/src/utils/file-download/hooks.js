import { useState } from "react";
import downloadjs from "downloadjs";

export const useFileDownload = (downloadQuery, { fileName, documentType }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const download = async () => {
    setLoading(true);
    setSuccess(false);
    setError(null);

    try {
      const { data, contentType } = await downloadQuery();

      setLoading(false);
      setError(null);
      setSuccess(true);
      return downloadjs(
        new Blob([data], {
          type: contentType
        }),
        fileName,
        documentType
      );
    } catch (err) {
      setLoading(false);
      setError("Error downloading the file");
      setSuccess(false);
    }
  };

  return {
    download,
    loading,
    success,
    error
  };
};
