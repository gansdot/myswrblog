import nextConnect from "next-connect";
import middleware from "../../middleware/database";
import fs from "fs";
import { BlogApiRequest, BlogApiResponse, Blog } from "./blogtype";
import Cors from "cors";

// Initializing the cors middleware
const cors = Cors({
  methods: ["GET", "HEAD", "POST"],
});

const handler = nextConnect();

handler.use(middleware);

handler.get(async (request: BlogApiRequest, response: BlogApiResponse) => {
  let result = [];
  try {
    result = await request.db
      .collection("blogpost")
      .find()
      .sort({ postedOn: -1 })
      //.limit(5)
      .toArray();

    //extract image file
    result.map((data: Blog) => {
      if (!data.isBinary) {
        request.bucket
          .openDownloadStreamByName(data.blogImage)
          .pipe(fs.createWriteStream("./public/" + data.blogImage))
          .on("error", function (error) {
            console.log("error");
            response.status(500).end();
          })
          .on("end", function () {
            console.log("done!");
            //response.send("time.jpg");
            //response.end();
            //next(response);
          });
      }
    });
  } catch (error) {
    console.log(error);
  }
  response.status(200);
  response.setHeader("Set-Cookie", "HttpOnly;Secure;SameSite=Strict");
  response.json(JSON.stringify(result));
});

handler.post(async (request: BlogApiRequest, response: BlogApiResponse) => {
  try {
    let doc = JSON.parse(request.body);
    console.log("This is document data :: " + doc);
    let file = doc.blogImage;
    let image = doc.image;
    console.log(" file " + file);
    // get the latest blog sequence number i.e id
    let totalCount = await request.db.collection("blogpost").find().count();
    let blogsequence = totalCount + 1;
    console.log("Blog Sequence Id    => " + blogsequence);
    //const encyfilename = blogsequence + "_" + filename;
    //save the blog data
    doc.postedOn = new Date();
    doc.id = blogsequence;
    //doc.blogImage = encyfilename;
    console.log("Posted on date      => " + doc.postedOn);
    //console.log("Logical Filename    => " + encyfilename);
    let result = request.db
      .collection("blogpost")
      .updateOne(
        { id: blogsequence, blogImage: "cow.jpg" },
        { $set: doc },
        { upsert: true }
      );
  } catch (error) {
    console.log(error);
    response.statusCode = 404;
    response.json({ message: "invalid file input" });
    response.end("NotOk");
  }
});

export default handler;
