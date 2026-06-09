import type { Metadata } from 'next';
import Link from 'next/link';

import { boxContainerClassName } from '~/lib/layout';

// 页面元信息：Title 不超过 60 字符，Description 不超过 160 字符
const heroEyebrow = 'Legal';
const heroTitle = 'Terms of Service.';
const heroDescription =
  'The rules and conditions for using MakeGraph, our free online chart maker for creating, editing, and exporting charts.';

export const metadata: Metadata = {
  title: 'Terms of Service | MakeGraph',
  description: heroDescription,
};

const lastUpdated = 'June 9, 2026';

// 服务条款章节配置：锚点 / 标题 / 简介 / 段落 / 列表
type TermsSection = {
  id: string;
  title: string;
  intro?: string;
  paragraphs?: string[];
  listItems?: string[];
};

const termsSections: TermsSection[] = [
  {
    id: 'agreement',
    title: 'Agreement to These Terms',
    intro:
      'These Terms of Service ("Terms") govern your use of MakeGraph (the "Service"). By accessing or using the Service, you agree to be bound by these Terms.',
    paragraphs: [
      'If you do not agree to these Terms, please do not use the Service. We may update these Terms from time to time, and the updated version will replace earlier versions once posted.',
    ],
  },
  {
    id: 'the-service',
    title: 'Description of the Service',
    paragraphs: [
      'MakeGraph provides a free online tool for creating charts and graphs from user-supplied data. The Service lets you enter or import data, customize a chart, preview the result, and export the chart as an image. Some features are available without an account, and others require you to sign in.',
    ],
    listItems: [
      'Free tier: the core chart-making experience is available to all visitors at no cost.',
      'Account features: signing up unlocks additional functionality such as saving charts and managing your history.',
      'Future changes: we may add, modify, or remove features at any time, with or without notice.',
    ],
  },
  {
    id: 'accounts',
    title: 'Accounts and Security',
    intro:
      'When you create an account, you agree to provide accurate information and keep it up to date.',
    listItems: [
      'You are responsible for keeping your sign-in credentials secure and for activity that happens under your account.',
      'You must notify us promptly if you suspect any unauthorized access to your account.',
      'We are not liable for losses caused by unauthorized account use that could have been prevented with reasonable care.',
      'You may close your account at any time from your account settings or by contacting us.',
    ],
  },
  {
    id: 'acceptable-use',
    title: 'Acceptable Use',
    intro:
      'To keep the Service safe and reliable for everyone, you agree not to misuse it. The following activities are not allowed.',
    listItems: [
      'Uploading data that you do not have the right to use or share.',
      'Attempting to disrupt the Service, probe its security, or bypass its limits.',
      'Using the Service to generate unlawful, harmful, misleading, or infringing content.',
      'Scraping, crawling, or using automated tools to access the Service in ways that are not explicitly supported.',
      'Impersonating MakeGraph, our team, or any other person or entity.',
      'Reverse engineering, decompiling, or otherwise attempting to extract source code from the Service, except as allowed by law.',
    ],
  },
  {
    id: 'your-content',
    title: 'Your Content',
    intro:
      'You keep ownership of the data and content you upload, paste, or generate through the Service ("Your Content").',
    paragraphs: [
      'You grant MakeGraph a limited, non-exclusive, worldwide license to host, process, transmit, and display Your Content only as needed to operate the Service for you. This license ends when you delete the content or close your account, except where retention is required for legal, security, or backup reasons.',
    ],
    listItems: [
      'You confirm that you have the right to upload and process any data you submit.',
      'You are solely responsible for the accuracy and legality of Your Content.',
      'We do not claim ownership of Your Content and will not sell it to third parties.',
    ],
  },
  {
    id: 'intellectual-property',
    title: 'Intellectual Property',
    paragraphs: [
      'The Service, including its design, code, branding, and documentation, is owned by MakeGraph and its licensors and is protected by intellectual property laws. These Terms do not transfer any ownership in the Service to you.',
      'You may not copy, distribute, modify, or create derivative works of the Service except as expressly allowed by these Terms or by applicable law.',
    ],
  },
  {
    id: 'third-party',
    title: 'Third-Party Services and Links',
    paragraphs: [
      'The Service may link to or rely on third-party websites, libraries, or services that we do not control. We are not responsible for the content, policies, or practices of those third parties, and your use of them is at your own risk.',
    ],
  },
  {
    id: 'termination',
    title: 'Suspension and Termination',
    paragraphs: [
      'We may suspend or terminate access to the Service, in whole or in part, if we reasonably believe you have violated these Terms, if required by law, or if continuing the Service is no longer commercially feasible. Where appropriate, we will give you advance notice and a chance to resolve the issue.',
    ],
  },
  {
    id: 'disclaimers',
    title: 'Disclaimers',
    paragraphs: [
      'The Service is provided on an "as is" and "as available" basis. To the maximum extent permitted by law, MakeGraph disclaims all warranties, express or implied, including warranties of merchantability, fitness for a particular purpose, and non-infringement.',
      'We do not warrant that the Service will be uninterrupted, error-free, or that the results obtained from using it will meet your specific requirements.',
    ],
  },
  {
    id: 'limitation',
    title: 'Limitation of Liability',
    paragraphs: [
      'To the maximum extent permitted by law, MakeGraph and its team will not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits, revenue, data, or goodwill, arising from or related to your use of the Service.',
      'In any case, the total liability of MakeGraph for all claims relating to the Service will not exceed the greater of the amount you paid us in the twelve months before the claim, or one hundred US dollars (US$100).',
    ],
  },
  {
    id: 'indemnification',
    title: 'Indemnification',
    paragraphs: [
      'You agree to indemnify and hold MakeGraph and its team harmless from any claims, damages, liabilities, costs, and expenses (including reasonable legal fees) arising out of your use of the Service, Your Content, or your violation of these Terms.',
    ],
  },
  {
    id: 'governing-law',
    title: 'Governing Law',
    paragraphs: [
      'These Terms are governed by the laws of the jurisdiction in which MakeGraph operates, without regard to conflict-of-laws principles. Any dispute arising from these Terms will be resolved in the competent courts of that jurisdiction, unless applicable consumer law gives you the right to bring a claim in your local courts.',
    ],
  },
  {
    id: 'changes',
    title: 'Changes to These Terms',
    paragraphs: [
      'We may revise these Terms from time to time. The most current version will always be posted on this page, with the "Last updated" date at the top. If a change is material, we will provide reasonable notice before it takes effect, for example by posting a notice on the site or emailing signed-in users.',
    ],
  },
  {
    id: 'contact',
    title: 'Contact Us',
    paragraphs: [
      'If you have any questions about these Terms, please contact us at support@makegraph.org. We are happy to help clarify anything that is unclear.',
    ],
  },
];

export default function TermsOfServicePage() {
  return (
    <div className="flex flex-col bg-transparent">
      {/* 英雄区：复用页面统一的样式系统 */}
      <div className="relative isolate px-6 py-16 sm:py-20 lg:px-8">
        <div className="relative z-10 mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.12em] text-[#888888]">
            {heroEyebrow}
          </p>
          <h1 className="mt-4 text-balance font-semibold text-4xl leading-tight tracking-[-1.28px] text-[#171717] sm:text-[48px] sm:leading-[48px] sm:tracking-[-2.4px]">
            {heroTitle}
          </h1>
          <p className="mt-6 text-pretty text-base leading-[24px] text-[#4d4d4d] sm:text-[18px] sm:leading-[28px]">
            {heroDescription}
          </p>
          <p className="mt-6 font-mono text-xs uppercase tracking-[0.12em] text-[#888888]">
            Last updated · {lastUpdated}
          </p>
        </div>
      </div>

      {/* 正文区域：保持与隐私政策页相同的目录 + 分节结构 */}
      <div className="relative border-t border-[#ebebeb] bg-white">
        <section
          className={`${boxContainerClassName} grid gap-12 py-16 sm:py-20 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16`}
        >
          {/* 左侧目录：sticky 滚动跟随，避免与正文产生重复分割线 */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-[#888888]">
              Contents
            </p>
            <nav className="mt-5">
              <ul className="flex flex-col gap-3">
                {termsSections.map((section) => (
                  <li key={section.id}>
                    <Link
                      href={`#${section.id}`}
                      className="text-sm text-[#4d4d4d] transition-colors hover:text-[#171717]"
                    >
                      {section.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* 右侧正文：使用分节排版，避免堆叠 cards */}
          <div className="flex flex-col divide-y divide-[#ebebeb]">
            {termsSections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-24 py-12 first:pt-0"
              >
                <h2 className="text-2xl font-semibold tracking-[-0.6px] text-[#171717] sm:text-3xl sm:tracking-[-0.96px]">
                  {section.title}
                </h2>
                {section.intro ? (
                  <p className="mt-5 text-base leading-7 text-[#4d4d4d] sm:text-[18px] sm:leading-[28px]">
                    {section.intro}
                  </p>
                ) : null}
                {section.paragraphs?.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="mt-5 text-base leading-7 text-[#4d4d4d] sm:text-[18px] sm:leading-[28px]"
                  >
                    {paragraph}
                  </p>
                ))}
                {section.listItems?.length ? (
                  <ul className="mt-6 flex flex-col gap-3 pl-5">
                    {section.listItems.map((item) => (
                      <li
                        key={item}
                        className="list-disc text-base leading-7 text-[#4d4d4d] sm:text-[18px] sm:leading-[28px]"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
