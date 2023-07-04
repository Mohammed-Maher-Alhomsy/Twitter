import { useRouter } from "next/router";
import React from "react";

const PostDetailPage = () => {
  const router = useRouter();

  console.log(router.query.postId);

  return <div>PostDetailPage</div>;
};

export default PostDetailPage;
