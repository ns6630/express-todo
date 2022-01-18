import request from "supertest";
import app from "../src/app";

describe("GET /", () => {
  test("response with Ok", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
  });
});
