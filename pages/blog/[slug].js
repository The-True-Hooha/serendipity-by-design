import Image from "next/image";
import fs from "fs";
import matter from "gray-matter";
import md from "markdown-it";

//gets the markdown file from the directory
//maps and replaces by filename
export async function getStaticPaths() {
  const files = fs.readdirSync("blog");

  const paths = files.map((__filename) => ({
    params: {
      slug: __filename.replace(".md", ""),
    },
  }));
  return {
    paths,
    fallback: false,
  };
}

//exports the content from the extracted file
export async function getStaticProps({ params: { slug } }) {
  const fileName = fs.readFileSync(`blog/${slug}.md`, "utf-8");
  const { data: frontmatter, content } = matter(fileName);
  return {
    props: {
      frontmatter,
      content,
    },
  };
}

//displays the extracted content on the new page
export default function blogPostPage({ frontmatter, content }) {
  return (
    <div className="lg:py-[190px] lg:px-[300px] py-[120px] font-sora">
      <div className="px-5">
        <h1 className="font-semibold lg:text-[30px] lg:flex lg:justify-center text-[20px]">
          {frontmatter.title}
        </h1>
        <p className="mt-[15px] text-[15px] font-semibold">
          {frontmatter.date}
        </p>
      </div>
      <div className="border border-black mt-4" />
      <div className="flex justify-center mt-4">
        <Image
          width={850}
          height={340}
          alt={frontmatter.title}
          src={`/${frontmatter.socialImage}`}
        />
      </div>
      <div
        className="mt-4 px-10 justify-start max-w-[600px] prose prose-a:text-blue-600 lg:max-w-full text-left lg:mt-10 lg:text-[20px] text-[15px]"
        dangerouslySetInnerHTML={{ __html: md().render(content) }}
      />
    </div>
  );
}