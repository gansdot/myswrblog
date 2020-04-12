import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient, GridFSBucket, ObjectId } from "mongodb";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

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

export interface BlogEditorProps {
  onEditorChange: (value: string) => void;
}

export interface BlogEditorState {
  editorHtml: string;
  //quill: any;
}

export type PostProps = {
  id: number;
  blog?: Blog[];
};

export interface BlogApiRequest extends NextApiRequest {
  db: any;
  bucket: GridFSBucket;
  dbClient: MongoClient;
}
export interface BlogApiResponse extends NextApiResponse {}
