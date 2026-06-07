# NekoChart Agent Rules

## 1. 回复规范

- 每次执行前先回复我 " ===== Hi NekoChart ===== "。

## 2. 设计与组件规范

- 设计样式必须遵守 DESIGN.md 规则。
- components/ui 中已存在的组件应直接复用。
- app 中页面私有组件放在对应页面的 \_components 下（例如 demo/\_components）。

## 3. 内容与资料规范

- 文案默认使用英语。
- 注释默认使用中文。
- 文案、需求、SEO 相关参考资料统一在 docs 目录下。

## 4. 执行与检查规范

- 每次执行完成后，不需要 run dev 或 run build。
- 必须执行 pnpm run check:write。

## 5. Chart 编辑区硬性规则

- chart 编辑区域始终使用全屏方式。
- chart 编辑区域最大宽度保持全宽（w-full），禁止使用 max-w-\* 限制。
- 后续任何修改都不得破坏上述两条规则。
