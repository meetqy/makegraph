import fs from 'fs';
import path from 'path';
const chartsDir = path.join(process.cwd(), 'src/app/[locale]/charts');
const charts = fs
  .readdirSync(chartsDir)
  .filter((f) => fs.statSync(path.join(chartsDir, f)).isDirectory());
const camelCase = (str) =>
  str
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join('');
for (const chart of charts) {
  if (chart === 'line-chart') continue;
  const pagePath = path.join(chartsDir, chart, 'page.tsx');
  if (!fs.existsSync(pagePath)) continue;
  let content = fs.readFileSync(pagePath, 'utf8');
  const namespace = camelCase(chart);
  if (!content.includes('next-intl/server')) {
    content = content.replace(
      'import { generateChartTitle',
      "import { getTranslations } from 'next-intl/server';\nimport { generateChartTitle"
    );
  }
  const functionMatch = content.match(/export default function (.*?)\(\) {/);
  if (functionMatch) {
    const componentName = functionMatch[1];
    content = content.replace(
      `export default function ${componentName}() {`,
      `export default async function ${componentName}({\n  params,\n}: {\n  params: Promise<{ locale: string }>;\n}) {\n  const { locale } = await params;\n  const t = await getTranslations({ locale, namespace: '${namespace}' });`
    );

    // Replace hardcoded JSX with t() calls
    content = content.replace(
      /eyebrow=\{heroEyebrow\}/,
      "eyebrow={t('heroEyebrow')}"
    );
    content = content.replace(/title=\{heroTitle\}/, "title={t('heroTitle')}");
    content = content.replace(
      /description=\{heroDescription\}/,
      "description={t('heroDescription')}"
    );

    content = content.replace(/Why .*? Work/, "{t('whyItWorksEyebrow')}");
    // We need to carefully replace the H2s and P tags.
    // Given the complexity of the file, it's safer to just replace the variables inside the component
    // Let's replace the mapped arrays with ones generated from t()
  }
  fs.writeFileSync(pagePath, content);
  console.log(`Updated ${chart}/page.tsx`);
}
