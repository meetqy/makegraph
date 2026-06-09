# MakeGraph Agent Rules

## 1. 回复规范

- 每次执行前先回复我 " ===== Hi MakeGraph ===== "。

## 2. 设计与组件规范

- 设计样式必须遵守 DESIGN.md 规则。
- components/ui 中已存在的组件应直接复用。
- app 中页面私有组件放在对应页面的 \_components 下（例如 demo/\_components）。
- landing page 或说明内容区默认优先使用 section / band / 分栏排版，不要默认堆大量 cards。
- 如需使用 cards，只能少量用于承载局部重点信息，并且尽量减少厚重阴影。
- landing page 中避免出现分割线紧挨分割线、重复叠线的情况；section 分隔与模块内部的分隔要错开处理。
- landing page 及其说明内容区的最大宽度必须使用 `src/lib/layout.ts` 中的 `boxContainerClassName`，保持全站宽度一致，不要硬编码如 `max-w-[1200px]` 这样的类。

## 3. 内容与资料规范

- 页面展示文案默认使用英语。
- 注释默认使用中文。
- 统计图目录下的说明性 markdown 文案默认使用中文。
- 统计图相关的 markdown 文件放在对应的 chart 目录下（例如 src/app/charts/bar-chart/），不放在 docs 目录中。
- 非统计图页面的文案、需求、SEO 相关参考资料统一放在 docs 目录下。
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
