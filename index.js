import { app,port } from "./app.js";

app.listen(port, () => {
  console.log(`Surf Running On port${port}`);
});
