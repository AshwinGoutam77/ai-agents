import Code from "./Code.jsx";
import { getToken, startTokenRefresh } from "../../../lib/getToken.js";
const page = async () => {
  startTokenRefresh();
  const token = await getToken();
  console.log(token, "token");
  return <Code token={token} />;
};

export default page;
