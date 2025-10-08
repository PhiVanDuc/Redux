import { createServer, Model } from "miragejs";

const setupServer = () => {
    createServer({
        models: {
            todos: Model
        },
        routes: function () {
            this.get(
                "/api/todos",
                (schema) => schema.todos.all()
            );

            this.post(
                "/api/todos",
                (schema, request) => {
                    const payload = JSON.parse(request.requestBody);
                    return schema.todos.create(payload);
                }
            );

            this.post(
                "/api/updateTodo",
                (schema, request) => {
                    const payload = JSON.parse(request.requestBody);
                    const currentTodo = schema.todos.find(payload.id);

                    currentTodo.update(payload);
                    return currentTodo;
                }
            );
        }
    });
}

export default setupServer;