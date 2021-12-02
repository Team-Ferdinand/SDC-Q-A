const frisby = require("frisby");
const server = require("../server/index.js");

it("Query speed test", async () => {
  let start = Date.now();
  let response = await frisby
    .get(`http://127.0.0.1:3000/qa/questions?product_id=1`)

    .expect("status", 200);

  let duration = Date.now() - start;
  console.log("🚀 ~ file: example.test.js ~ line 12 ~ it ~ duration", duration);

  expect(duration).toBeLessThan(500);
});

it("get request for questions endpoint should send back a status of 200", async () => {
  let response = await frisby
    .get(`http://127.0.0.1:3000/qa/questions?product_id=1`)

    .expect("status", 200);

  return response;
});

it("get request for answers endpoint should send back a status of 200", async () => {
  let response = await frisby
    .get(`http://127.0.0.1:3000/qa/questions/1/answers`)

    .expect("status", 200);

  return response;
});
