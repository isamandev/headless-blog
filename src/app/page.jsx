import Card from "@/components/card/card";
import "dotenv/config";

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

export default async function Home() {
  const [featuredBlogs, blogs] = await Promise.all([
    await fetchBlogs("filters[isFeatured][$eq]=true"),
    await fetchBlogs("filters[isFeatured][$eq]=false"),
  ]);
  return (
    <div className="container pb-80">
      {featuredBlogs.data.map((featuredBlog) => (
        <Card
          key={featuredBlog.id}
          lable={featuredBlog.attributes.Category}
          imgSrc={`http://127.0.0.1:1337${featuredBlog.attributes.FeaturedImage.data.attributes.url}`}
          imgAlt="Featurd Image"
          title={featuredBlog.attributes.Title}
          summary={featuredBlog.attributes.Summary}
          href={`/${featuredBlog.attributes.slug}`}
          className="mb-30"
        />
      ))}
      <div className="row">
        {blogs.data.map((blog) => (
          <div key={blog.id} className="col col_4 m-mw-100">
            <Card
              key={blog.id}
              lable={blog.attributes.Category}
              imgSrc={`http://127.0.0.1:1337${blog.attributes.Thumbnail.data.attributes.url}`}
              imgAlt="Featurd Image"
              title={blog.attributes.Title}
              summary={blog.attributes.Summary}
              href={`/${blog.attributes.slug}`}
              className="mb-30"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
