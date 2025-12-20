import axios from "axios";

const BlogData = async () => {
  return axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/blog`
  );
};

export default BlogData;
