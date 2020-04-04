import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient, GridFSBucket } from "mongodb";

export interface Blog {
  id?: number;
  blogTitle: string;
  blogCategory: string;
  slug?: string;
  postedOn: Date;
  author: string;
  blogImage: string;
  blogText: string;
  isBinary: boolean;
}

export interface BlogProps {
  title: string;
  value: string;
  required: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface BlogApiRequest extends NextApiRequest {
  db: any;
  bucket: GridFSBucket;
  dbClient: MongoClient;
}
export interface BlogApiResponse extends NextApiResponse {}
