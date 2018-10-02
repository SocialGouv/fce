import { nestcribe_path as test } from "../../../tests/utils";

import utils from "./utils";

test("DataSources/ApiGouv/utils", () => {
  it("logs when it fails", async () => {
    const error = {
      message: "Forbidden",
      response: { data: { error: true, reason: "Hello this is an error" } }
    };

    const Axios = {
      get: url =>
        Promise.reject({
          ...error,
          request: {
            _currentUrl: url
          }
        })
    };

    const consoleSpy = jest
      .spyOn(global.console, "error")
      .mockImplementationOnce(() => {});
    const result = await utils.requestAPI(
      Axios,
      "http://anURL/withAnError",
      {},
      () => {}
    );

    expect(result).toEqual({});
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining(error.message)
    );
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining(error.response.data.reason)
    );
  });
});
