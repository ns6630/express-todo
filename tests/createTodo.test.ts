import request from "supertest";
import app from "../src/app";

describe("POST /todo", () => {
  test("test todo was created", async () => {
    const todoData = {
      title: "Test todo",
      description: "Test Description",
    };
    const response = await request(app)
      .post("/todo")
      .send(todoData)
      .set("Accept", "application/json");
    expect(response.status).toBe(201);
    expect(response.body.title).toEqual(todoData.title);
    expect(response.body.description).toEqual(todoData.description);
  });
});
