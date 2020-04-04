import { MongoClient, GridFSBucket } from "mongodb";
import nextConnect from "next-connect";
import { BlogApiRequest, BlogApiResponse } from "../pages/api/blogtype";

const client = new MongoClient(
  "mongodb+srv://codeblog:Passw0rd1@cluster0-3w84e.mongodb.net/test?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

async function database(
  request: BlogApiRequest,
  response: BlogApiResponse,
  next: any
) {
  try {
    if (!client.isConnected()) await client.connect();
    request.dbClient = client;
    let db = client.db("codeblogdb");
    let bucket = new GridFSBucket(db);
    request.db = db;
    request.bucket = bucket;
  } catch (error) {
    console.log("inside data ====> " + error);
    //next(error);
  }

  return next();
}

const middleware = nextConnect();

middleware.use(database);

export default middleware;
