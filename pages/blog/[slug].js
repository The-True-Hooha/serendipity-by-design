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
    <div className="lg:py-[190px] lg:px-[300px] py-[120px]">
      <div className="px-5">
        <h1 className=" lg:text-[40px] flex justify-center text-[30px] font-agrandir text-[#084dcf]">
          {frontmatter.title}
        </h1>
        <p className="mt-[10px] flex justify-center text-[15px] font-semibold">
          {frontmatter.date}
        </p>
      </div>
      <div className="border border-black mt-4" />
      <div className="flex justify-center mt-4">
        <Image
          width={300}
          height={250}
          alt={frontmatter.title}
          src={`/${frontmatter.socialImage}`}
          loading="lazy"
          className="w-full lg:w-[1000px] lg-h-[1000px] xl:w-1/4"
          // priority={true}
        />
      </div>
      <div
        className="mt-4 px-10 text-justify whitespace-pre-line leading-relaxed text-[#4e5250] font-ia_writer_quattro tracking-wide line-clamp-3 prose-a:text-blue-600 lg:max-w-full lg:mt-10 lg:text-[20px] text-[15px]"
        dangerouslySetInnerHTML={{ __html: md().render(content) }}
      />
    </div>
  );
}