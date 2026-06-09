import type { Metadata } from 'next';
import Link from 'next/link';

import { boxContainerClassName } from '~/lib/layout';

// 页面元信息：Title 不超过 60 字符，Description 不超过 160 字符
const heroEyebrow = 'Legal';
const heroTitle = 'Privacy Policy.';
const heroDescription =
  'How MakeGraph collects, uses, and protects your information when you use our online chart maker.';

export const metadata: Metadata = {
  title: 'Privacy Policy | MakeGraph',
  description: heroDescription,
};

const lastUpdated = 'June 9, 2026';

// 隐私政策章节配置：锚点 / 标题 / 简介，方便同时渲染目录与正文
type PrivacySection = {
  id: string;
  title: string;
  intro?: string;
  paragraphs?: string[];
  listItems?: string[];
};

const privacySections: PrivacySection[] = [
  {
    id: 'overview',
    title: 'Overview',
    intro:
      'MakeGraph ("we", "us", or "our") provides free online tools for creating charts and graphs. This Privacy Policy explains what information we collect, how we use it, and what choices you have.',
    paragraphs: [
      'We design our product to be useful without being intrusive. Most of the chart-making experience works without creating an account, and we only collect information that is needed to operate, secure, and improve the service.',
    ],
  },
  {
    id: 'information-we-collect',
    title: 'Information We Collect',
    intro:
      'We collect a small amount of information from two sources: what you give us directly, and what is generated automatically when you use the service.',
    listItems: [
      'Account information: when you sign up, we store your email address, display name, and the credential data needed to keep your account secure.',
      'Saved content: if you save a chart, draft, or template while signed in, we store the underlying data and configuration so you can return to it later.',
      'Usage data: we collect anonymous or aggregated information such as the pages you visit, the features you use, and general device and browser details.',
      'Log data: our servers automatically record IP address, request type, and timestamps for security, debugging, and analytics purposes.',
    ],
  },
  {
    id: 'how-we-use-information',
    title: 'How We Use Your Information',
    listItems: [
      'To provide, maintain, and improve the core chart-making experience.',
      'To authenticate users and protect accounts from abuse or unauthorized access.',
      'To remember your preferences, such as recent chart settings and saved drafts.',
      'To respond to support requests, questions, and feedback you send us.',
      'To monitor performance, detect incidents, and prevent fraud or misuse.',
      'To communicate important service updates, security notices, and policy changes.',
    ],
  },
  {
    id: 'cookies-and-similar',
    title: 'Cookies and Similar Technologies',
    intro:
      'We use cookies and similar technologies to keep you signed in, remember your preferences, and understand how the service is used.',
    listItems: [
      'Essential cookies: required for authentication, security, and basic site functionality.',
      'Preference cookies: remember settings such as your last-used chart configuration or theme.',
      'Analytics cookies: collect aggregated usage statistics so we can improve the product.',
    ],
    paragraphs: [
      'You can disable non-essential cookies through your browser settings. Doing so may affect certain features but will not stop the service from working.',
    ],
  },
  {
    id: 'data-stored-locally',
    title: 'Data Stored on Your Device',
    intro:
      'MakeGraph may store chart drafts, recent configurations, and unsaved work in your browser using local storage or IndexedDB. This data stays on your device unless you choose to save it to your account.',
    paragraphs: [
      'You can clear this local data at any time from your browser settings. Clearing it will not affect charts that are already saved to your account.',
    ],
  },
  {
    id: 'third-party-services',
    title: 'Third-Party Services',
    intro:
      'We rely on a small set of trusted providers to run the service. These providers may process limited information on our behalf, under agreements that restrict how they can use it.',
    listItems: [
      'Hosting and infrastructure providers that serve the website and store data.',
      'Authentication services that verify sign-in and protect accounts.',
      'Analytics services that help us understand aggregate usage patterns.',
      'Email delivery providers that send transactional messages such as sign-up confirmations.',
    ],
  },
  {
    id: 'data-sharing',
    title: 'Data Sharing',
    paragraphs: [
      'We do not sell your personal information. We only share information in the limited circumstances described below.',
    ],
    listItems: [
      'With your consent: when you ask us to share specific information, such as publishing a chart publicly.',
      'With service providers: vendors that help us operate the service, bound by confidentiality and data-protection obligations.',
      'For legal reasons: when we believe in good faith that disclosure is necessary to comply with a law, court order, or valid legal request.',
      'To protect safety: when we need to investigate violations of our Terms of Service or protect the rights, property, or safety of MakeGraph, our users, or others.',
      'In a business transfer: if MakeGraph is acquired, merged, or sells substantially all of its assets, your information may be transferred as part of that transaction.',
    ],
  },
  {
    id: 'data-retention',
    title: 'Data Retention',
    paragraphs: [
      'We keep your account information for as long as your account is active. If you delete your account, we will delete or anonymize your personal information within a reasonable period, except where retention is required for legal, security, or backup purposes.',
    ],
  },
  {
    id: 'your-rights',
    title: 'Your Rights and Choices',
    intro:
      'Depending on where you live, you may have rights over the personal information we hold about you.',
    listItems: [
      'Access: request a copy of the personal information we have about you.',
      'Correction: ask us to correct information that is inaccurate or incomplete.',
      'Deletion: request that we delete your personal information, subject to legal limits.',
      'Export: receive a portable copy of the data you have provided to us.',
      'Opt out: unsubscribe from non-essential emails or disable non-essential cookies.',
    ],
    paragraphs: [
      'To exercise any of these rights, contact us using the information at the bottom of this page. We will respond within the timeframes required by applicable law.',
    ],
  },
  {
    id: 'children',
    title: "Children's Privacy",
    paragraphs: [
      'MakeGraph is not directed to children under 13, and we do not knowingly collect personal information from children under 13. If you believe a child has provided us with personal information, please contact us so we can delete it.',
    ],
  },
  {
    id: 'international-transfers',
    title: 'International Data Transfers',
    paragraphs: [
      'We may process and store your information in countries other than the one where you live. When we do, we use recognized legal mechanisms such as standard contractual clauses to ensure your information remains protected.',
    ],
  },
  {
    id: 'security',
    title: 'Security',
    paragraphs: [
      'We use administrative, technical, and physical safeguards designed to protect your information, including encryption in transit, access controls, and routine review of our systems. No method of transmission or storage, however, is 100% secure, and we cannot guarantee absolute security.',
    ],
  },
  {
    id: 'changes',
    title: 'Changes to This Policy',
    paragraphs: [
      'We may update this Privacy Policy from time to time. When we do, we will revise the "Last updated" date at the top of this page. If the changes are material, we will provide a more prominent notice, such as a banner on the site or an email to signed-in users.',
    ],
  },
  {
    id: 'contact',
    title: 'Contact Us',
    paragraphs: [
      'If you have questions about this Privacy Policy or how your information is handled, please reach out to us at support@makegraph.org. We aim to respond to all privacy-related requests as quickly as we can.',
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col bg-transparent">
      {/* 英雄区：使用与图表页相同的样式系统 */}
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

      {/* 正文区域：使用 boxContainerClassName 约束最大宽度 */}
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
                {privacySections.map((section) => (
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
            {privacySections.map((section) => (
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
