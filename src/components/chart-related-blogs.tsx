import { ChartList } from '~/components/chart-list';
import { getBlogItemsByChartPath } from '~/config/blogs';

type ChartRelatedBlogsProps = {
  chartPath: string;
  locale: string;
};

export function ChartRelatedBlogs({
  chartPath,
  locale,
}: ChartRelatedBlogsProps) {
  if (locale !== 'en') {
    return null;
  }

  const relatedBlogs = getBlogItemsByChartPath(chartPath);

  if (relatedBlogs.length === 0) {
    return null;
  }

  return (
    <section className="py-16">
      <ChartList
        items={relatedBlogs.map((blog) => ({
          title: blog.title,
          description: blog.description,
          href: blog.href,
          image: blog.image,
          icon: blog.icon,
          meta: blog.date,
        }))}
        eyebrow="Related blog"
        title="See a business use case for this chart."
        description="Open the related guide to understand the scenario, the example data, and the reporting questions behind this chart choice."
      />
    </section>
  );
}
