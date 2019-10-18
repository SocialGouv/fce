import Http from "../../../services/Http";

class PostalCodeProvider {
  constructor(props) {
    this.props = props;
  }

  async getPostalCodes() {
    const cleanData = await this.preparePayload({ ...this.props });

    Http.defaults.headers.post["Content-Type"] = "application/json";

    Http.post("/getAppsearchWithFilters", {
      payload: cleanData
    })
      .then(response => {
        if (response.data && response.data) {
          console.log("postal codes => ", response);
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
      filters: data.filters
    };
  }
}

export default PostalCodeProvider;
