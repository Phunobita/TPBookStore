import { checkProduct, checkUser as checkLogin } from "./basic.js";

test("test api product", () => {
  async () => {
    return checkProduct().then((data) => {
      expect(JSON.parse(data)).toMatch("HAWTHORNE PLAIN OXFORD");
    });
  };
});

test("test api user", () => {
  async () => {
    return await checkLogin("tpbookstore2022@gmail.com", "admintpbookstore1").then((data) => {
      expect(JSON.parse(data).status).toBe(200);
    });
  };
});
