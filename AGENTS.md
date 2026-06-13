# MakeGraph Agent Rules

## 1. 回复规范

- 每次执行前先回复我 " ===== Hi MakeGraph ===== "。

## 2. 设计与组件规范

- 设计样式必须遵守 DESIGN.md 规则。
- 统计图相关页面、图表预览和图表组件统一使用扁平化风格，避免拟物化、厚重阴影、强渐变和过度装饰。
- 统计图的 Legend 默认放在统计图下方，除非用户明确提出其他位置要求。
- 统计图（ECharts）的 X 轴标签（axisLabel）统一使用 `rotate: 45` 倾斜显示，并且需要增加 grid bottom 边距（例如 82）以防文字被截断。
- components/ui 中已存在的组件应直接复用。
- app 中页面私有组件放在对应页面的 \_components 下（例如 demo/\_components）。
- landing page 或说明内容区默认优先使用 section / band / 分栏排版，不要默认堆大量 cards。
- 如需使用 cards，只能少量用于承载局部重点信息，并且尽量减少厚重阴影。
- landing page 中避免出现分割线紧挨分割线、重复叠线的情况；section 分隔与模块内部的分隔要错开处理。
- landing page 及其说明内容区的最大宽度必须使用 `src/lib/layout.ts` 中的 `boxContainerClassName`，保持全站宽度一致，不要硬编码如 `max-w-[1200px]` 这样的类。

## 3. 内容与资料规范

- 页面展示文案默认使用英语。
- 多语言翻译文件按照页面组织，放在对应的页面目录下（例如 `src/app/[locale]/charts/line-chart/i18n/{locale}.json`）。
- 所有统计图的数据内容默认不做 i18n，包括 Tree Map Chart 在内；仅页面文案、说明文案、按钮文案、SEO 文案等面向界面的文本需要做 i18n，图表示例数据、分类名称、系列名称、数据项内容等数据本身禁止接入 i18n。
- 新增统计图时，必须同步补齐对应的多语言翻译文件，并接入所有会消费该图表文案的位置（如首页/模板页图表列表、相关推荐、metadata 等），禁止只新增页面或配置而遗漏翻译接线，导致列表回退为未翻译文案。
- 新增统计图时，OG image 只需要先在页面或配置中写好图片地址即可，不要主动生成 `.svg`、`.png` 等图片资源文件；后续由用户自行补充实际素材。
- 新增统计图时，如需配置 Open Graph / Twitter 预览图，默认只保留图片路径占位，不额外创建或推断图片内容。
- 注释默认使用中文。
- 统计图目录下的说明性 markdown 文案默认使用中文。
- 统计图相关的 markdown 文件放在对应的 chart 目录下（例如 src/app/charts/bar-chart/），不放在 docs 目录中。
- 当前仓库中已存在的统计图包括：`bar-chart`、`bar-chart-race`、`double-bar-chart`、`line-chart`、`radar-chart`、`scatter-chart`、`stacked-bar-chart`、`tree-map-chart`。
- 后续新增统计图时，必须先对照上述清单判断是否为新增 chart；如为新增，除页面、配置、翻译、OG 路径外，还必须检查并按需同步更新相关 markdown 文档，包括该 chart 目录下的说明性 `.md` 文件、根目录 `README.md`、根目录 `README_ZH.md`，以及任何明确列举统计图清单或预览图的 markdown 文档，禁止只改页面和配置而遗漏文档更新。
- 非统计图页面的文案、需求、SEO 相关参考资料统一放在 docs 目录下。
- blog 与对应 chart 必须建立双向关联：blog 底部展示对应 chart，chart 底部也展示对应 blog，并支持相互跳转。
- blog 底部展示的 chart 列表只能包含正文中明确提到、且站内实际存在的 chart；没有提到的 chart 不得展示。
- blog 的 OG image 统一放在 `public/blogs` 目录下，并在对应 blog 页面中使用该目录下的图片作为 Open Graph / Twitter 预览图。
- SEO 文案规范：Title 长度控制在 60 个字符以内，Description 长度控制在 160 个字符以内。文案必须自然流畅，禁止生硬堆砌关键词。

## 4. 执行与检查规范

- 每次执行完成后，不需要 run dev 或 run build。
- 必须执行 pnpm run check:write。

## 5. Chart 编辑区硬性规则

- chart 编辑区域始终使用全屏方式。
- chart 编辑区域最大宽度保持全宽（w-full），禁止使用 max-w-\* 限制。
- 后续任何修改都不得破坏上述两条规则。

## 6. 域名规范

- 站点官方域名为 `makegraph.org`，所有页面、SEO、版权、联系邮箱、对外文案统一使用该域名。
- 站点所有联系邮箱统一使用 `@makegraph.org`，例如 `support@makegraph.org`，禁止再使用 `@makegraph.app`、 `@makegraph.com` 等其他后缀。
- 后续若新增对外文案、SEO 字段、页脚信息、邮件签名等位置，必须沿用以上域名规范，不得自行替换为其他域名。
