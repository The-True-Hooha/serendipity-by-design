import Head from "next/head";
import { BsArrowRight } from 'react-icons/bs'
import fs from "fs";
import matter from "gray-matter";
import Link from "next/link";

//gets all the post from the folder
export async function getStaticProps() {
  const files = fs.readdirSync("blog");

  //maps over the posts in the blog folder
  //to extract the title and the image
  const posts = files.map((__filename) => {
    const slug = __filename.replace(".md", "");
    const readFile = fs.readFileSync(`blog/${__filename}`, "utf-8");
    const { data: frontmatter } = matter(readFile);
    return {
      slug,
      frontmatter,
    };
  });

  //sorts the post from the array to appear in order of recent dates firsts.
  posts.sort((a, b) => (new Date(b.frontmatter.date) - new Date(a.frontmatter.date)));
  return {
    props: {
      posts,
    },
  };
}

export default function Home({ posts }) {
  
  return (
    <div>
      <Head>
        <title>Blog | Serendipity By Design</title>
        <meta name="A blog about the unusual" content="Blog by David Ogar" />
        <link rel="icon" href="/icon.png" />
      </Head>
      <div>
        <div className="lg:pt-[170px] h-full lg:px-[300px] py-[150px] ">
          <div className="text-[15px] lg:text-[20px]  px-[20px] font-semibold uppercase text-black">
            recent Posts
          </div>
          <div className="">
            {posts.map(({ slug, frontmatter }) => (
              <div
                key={slug}
                className="py-4 px-4 md:px-5 md:py-5 hover:text-blue-700 m-2 mt-4 transition ease-in-out hover:scale-110 duration-300 flex shadow-lg border border-black bg-[#f6f5f0] rounded"
              >
                <Link href={`/blog/${slug}`}>
                  <a>
                    <h1 className="justify-start flex items-center md:text-[20px] font-bold md:font-normal font-agrandir">
                      {frontmatter.title}
                    </h1>
                    <h2 className="text-[15px] md:text-[17px]">
                      {frontmatter.metaDesc}
                    </h2>
                    <h2 className="font-mono">{frontmatter.date}</h2>
                    <BsArrowRight className="place-items-end" />
                  </a>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}