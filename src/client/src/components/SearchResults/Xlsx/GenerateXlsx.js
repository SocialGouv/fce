import Http from "./../../../services/Http";
import downloadjs from "downloadjs";

class GenerateXlsx {
  constructor(props) {
    this.props = props;
  }

  async download() {
    const cleanData = await this.preparePayload({ ...this.props });

    Http.post(
      "/downloadXlsx",
      {
        payload: cleanData
      },
      {
        responseType: "blob"
      }
    )
      .then(response => {
        if (response.data && response.data) {
          const date = new Date()
            .toISOString()
            .replace(/T/, "_")
            .replace(/\..+/, "")
            .replace(/:/g, "-");

          const fileName = `FceExport-${date}.xlsx`;

          downloadjs(
            new Blob([response.data], {
              type: response.headers["content-type"]
            }),
            fileName,
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          );
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  preparePayload(data) {
    return {
      totalItems: data.items,
      searchTerm: data.searchTerm,
      filters: data.options.filters
    };
  }
}

export default GenerateXlsx;
