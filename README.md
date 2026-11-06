# 提醒时间轴 · Reminder timeline

把 DSH 里所有定时提醒（Schedule 任务）按时间轴展示，并显示实时倒计时。
A DSH Web UI plugin that renders every scheduled reminder on a timeline with live countdowns.

## 功能 / Features

- 侧边栏新增「提醒」图标（`sidebar.panellist`），点击打开独立的提醒页面；
- 按最近触发时间排序，实时倒计时（天 / 小时 / 分钟）；圆点与倒计时按紧急度着色：当天绿色、30 分钟内橙色（带脉冲）、已到点红色；
- 显示重复规则（RRULE / Cron / 每天 / 每周等）、投递目标、上次投递时间；
- 进行中按 **今天 / 明天 / 7 天内 / 更远** 分组，另列「已暂停」，「已结束」默认折叠；
- **到点横幅**：**只在提醒真正触发并投递后**在右下角弹出（不会提前弹），标题 + 任务首行，可直接打开会话或跳到提醒页；**常驻显示，直到手动关闭（×）**，多条排队（最多 4 条），关闭即视为已读；
- **悬浮胶囊**：右下角常驻一枚小胶囊，显示下一条提醒的实时倒计时，鼠标悬停展开任务标题，点击打开提醒页；
- **铃铛红点**：有未读投递时侧边栏图标显示红点，打开提醒页后清除；
- 目标会话或上次投递会话可直接打开；
- 监听 `schedule/changed` 与连接重置事件自动刷新，另每 30 秒兜底轮询；读取失败时保留已有列表并提供重试。

## 设置 / Preferences

提醒页标题下方的两个开关存在浏览器 localStorage（`dsh-reminder-timeline.prefs.v1`）：

- 到点横幅 —— 投递瞬间是否弹横幅；
- 悬浮胶囊 —— 是否显示右下角常驻倒计时胶囊。

## 安装 / Install

```powershell
pnpm dsh plugin install "<仓库目录>"
```

或在本会话内由 Agent 用 `plugin_manager` 的 `install_bundle` 安装本目录。
安装后刷新一次 Web 页面即可看到侧边栏的「提醒」图标。

## 结构 / Layout

| 文件 | 作用 |
| --- | --- |
| `cordis.patch.yml` | 插入 Host 行 `reminder-timeline` |
| `index.js` | Host 半边（空实现，渲染全部在 Client） |
| `client.js` | Client 模块：`main` 面板 + `sidebar.panellist` 图标 + `shell.overlay` 横幅 |
| `locale/*.json` | 插件管理页显示用的标题与描述 |
| `icon.svg` | 插件图标 |

## 数据来源 / Data

只读调用 Host 的 Schedule 服务：`ctx.remote.schedule.catalog()`；
变更通知：`ctx.remote.$on('schedule/changed')`。
不创建、不修改、不删除任何提醒。
