import Image from "next/image";
import styles from "./style.module.scss";
import GetCategoryColor from "@/helpers/GetCategoryColor";
export default async function BlogDetails(props) {
  const fetchBlogs = async (params) => {
    const reqOptions = {
      headers: {
        Authorization: `Bearer ${process.env.API_TOKEN}`,
      },
    };
    const request = await fetch(
      `http://127.0.0.1:1337/api/blogs/?populate=*&${params}`,
      reqOptions
    );
    const response = await request.json();
    return response;
  };
  const blogs = await fetchBlogs(`filters[slug][$eq]=${props.params.slug}`);
  if (blogs.data.length === 0) return null;
  const blog = blogs.data[0];
  return (
    <div className="container pb-80">
      <div className="row mb-50">
        <div className="col col_9">
          <div
            className={`${styles.card_lable} h6 mb-20 c-${GetCategoryColor(
              blog.attributes.Category
            )}`}
          >
            {blog.attributes.Category}
          </div>
          <h2>{blog.attributes.Title}</h2>
        </div>
      </div>
      <Image
        className={`${styles.featuredImage} mb-50`}
        src={`http://127.0.0.1:1337${blog.attributes.FeaturedImage.data.attributes.url}`}
        alt="image"
        width={1280}
        height={387}
      />
      <div className="row">
        <div
          className="col col_9"
          style={{ whiteSpace: "pre-wrap" }}
          dangerouslySetInnerHTML={{ __html: blog.attributes.Content }}
        ></div>
      </div>
    </div>
  );
}
