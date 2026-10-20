import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import rehypeArticleCards from './src/lib/rehype-article-cards.mjs';

// GitHub Pages 项目站点的地址形如 https://<owner>.github.io/<repo>/，
// 仓库改名或换账号会同时改变站点域名与 base；这里从构建环境推导，避免再次写死。
// 优先级：SITE_URL / BASE_PATH 显式覆盖 > Actions 注入的 GITHUB_REPOSITORY(_OWNER) > 本地默认值。
const [ghOwner, ghRepo] = (process.env.GITHUB_REPOSITORY ?? '').split('/');
const owner = process.env.GITHUB_REPOSITORY_OWNER || ghOwner || 'xuvoxuvo';
const repo = ghRepo || 'action-game-design-by-ai';
const base = (process.env.BASE_PATH ?? `/${repo}`).replace(/\/+$/, '');
const site = (process.env.SITE_URL ?? `https://${owner}.github.io`).replace(/\/+$/, '');

/** 站内绝对路径统一带上 base，仓库改名时只需改上面一行。 */
const to = (path) => `${base}${path}`;

export default defineConfig({
  site,
  base,
  // 保留迁移前的旧地址，静态部署生成跳转页。
  redirects: {
    '/cedec/2009-demons-souls-design/': to('/fromsoftware/2009-demons-souls-design/'),
    '/cedec/2019-sekiro-background-graphics/': to('/fromsoftware/2019-sekiro-background-graphics/'),
    '/cedec/2022-elden-open-world/': to('/fromsoftware/2022-elden-open-world/'),
    '/cedec/2025-elden-background/': to('/fromsoftware/2025-elden-background/'),
    '/gdc/2019-spiderman-ai/': to('/insomniac-games/2019-spiderman-ai/'),
    '/gdc/2019-spiderman-technical-postmortem/': to('/insomniac-games/2019-spiderman-technical-postmortem/'),
    '/gdc/2021-got-lethality/': to('/sucker-punch/2021-got-lethality/'),
    '/gdc/2021-got-melee/': to('/sucker-punch/2021-got-melee/'),
    '/gdc/2021-got-weenies/': to('/sucker-punch/2021-got-weenies/'),
    '/gdc/2021-miles-morales-opening/': to('/insomniac-games/2021-miles-morales-opening/'),
    '/gdc/2021-spiderman-miles-creative-journey/': to('/insomniac-games/2021-spiderman-miles-creative-journey/'),
    '/gdc/2024-spiderman2-procedural-content/': to('/insomniac-games/2024-spiderman2-procedural-content/'),
    '/gdc/2026-got2-combat/': to('/sucker-punch/2026-got2-combat/'),
    '/other/2004-sakurai-risk-reward/': to('/gdc/2004-sakurai-risk-reward/'),
    '/other/2007-game-feel/': to('/gdc/2007-game-feel/'),
    '/other/2009-demons-souls-design/': to('/fromsoftware/2009-demons-souls-design/'),
    '/other/2009-disneyland-level-design/': to('/gdc/2009-disneyland-level-design/'),
    '/other/2009-l4d-ai/': to('/gdc/2009-l4d-ai/'),
    '/other/2010-uncharted-animation-player-control/': to('/gdc/2010-uncharted-animation-player-control/'),
    '/other/2013-fighting-animation-body-mechanics/': to('/cedec/2013-fighting-animation-body-mechanics/'),
    '/other/2014-last-of-us-ellie-buddy-ai/': to('/gdc/2014-last-of-us-ellie-buddy-ai/'),
    '/other/2015-bloodborne/': to('/gdc/2015-bloodborne/'),
    '/other/2017-nioh/': to('/gdc/2017-nioh/'),
    '/other/2017-overwatch-first-person-animation/': to('/gdc/2017-overwatch-first-person-animation/'),
    '/other/2018-celeste-level/': to('/gdc/2018-celeste-level/'),
    '/other/2018-horizon-ai-movement/': to('/gdc/2018-horizon-ai-movement/'),
    '/other/2018-horizon-machine-animation/': to('/gdc/2018-horizon-machine-animation/'),
    '/other/2019-ffxv-ai/': to('/cedec/2019-ffxv-ai/'),
    '/other/2019-sekiro-background-graphics/': to('/fromsoftware/2019-sekiro-background-graphics/'),
    '/other/2019-spiderman-ai/': to('/insomniac-games/2019-spiderman-ai/'),
    '/other/2019-spiderman-technical-postmortem/': to('/insomniac-games/2019-spiderman-technical-postmortem/'),
    '/other/2021-got-lethality/': to('/sucker-punch/2021-got-lethality/'),
    '/other/2021-got-melee/': to('/sucker-punch/2021-got-melee/'),
    '/other/2021-got-weenies/': to('/sucker-punch/2021-got-weenies/'),
    '/other/2021-miles-morales-opening/': to('/insomniac-games/2021-miles-morales-opening/'),
    '/other/2021-spiderman-miles-creative-journey/': to('/insomniac-games/2021-spiderman-miles-creative-journey/'),
    '/other/2022-elden-open-world/': to('/fromsoftware/2022-elden-open-world/'),
    '/other/2023-ff16-combat/': to('/cedec/2023-ff16-combat/'),
    '/other/2024-hifi-rush/': to('/gdc/2024-hifi-rush/'),
    '/other/2024-spiderman2-procedural-content/': to('/insomniac-games/2024-spiderman2-procedural-content/'),
    '/other/2025-astro-bot/': to('/cedec/2025-astro-bot/'),
    '/other/2025-elden-background/': to('/fromsoftware/2025-elden-background/'),
    '/other/2026-got2-combat/': to('/sucker-punch/2026-got2-combat/'),
    '/other/2026-silent-hill-f-melee/': to('/gdc/2026-silent-hill-f-melee/'),
    '/other/2026-tekken-martial/': to('/cedec/2026-tekken-martial/'),
    '/other/level-design-terms/': to('/cedec/level-design-terms/'),
    '/other/tokuda-mhw-design/': to('/cedec/tokuda-mhw-design/'),
  },
  integrations: [mdx()],
  markdown: {
    rehypePlugins: [rehypeArticleCards],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
