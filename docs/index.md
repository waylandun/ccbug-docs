---
layout: page
---

<main class="ccbug-home">
  <section class="hero">
    <div class="hero-copy">
      <p class="brand">ccBug - code check Bug</p>
      <h1>让 AI 编程更简单</h1>
      <p class="tagline">
        专注于给编码人员生产提效的中转站 · 支持 Claude Code、Codex、Gemini CLI 三大 AI 编程工具 · 开箱即用、价格实惠、专业运营
      </p>
      <div class="actions">
        <a class="btn btn-primary" href="/guide/install-cc-switch">开始使用</a>
        <a class="btn btn-success" href="https://ccbug.cc" target="_blank" rel="noreferrer">前往官网</a>
      </div>
    </div>
  </section>

  <section class="features" aria-label="核心优势">
    <article class="feature-card">
      <span class="feature-icon">🚀</span>
      <h2>开箱即用</h2>
      <p>无需繁琐配置，直接使用高质量 AI 编程工具</p>
    </article>
    <article class="feature-card">
      <span class="feature-icon">💰</span>
      <h2>价格实惠</h2>
      <p>比官方价格更低，支持多种充值方式，灵活满足各类预算</p>
    </article>
    <article class="feature-card">
      <span class="feature-icon">🛠️</span>
      <h2>专业运营</h2>
      <p>7×24小时监控，专人维护，一对一人工服务，快速响应问题</p>
    </article>
    <article class="feature-card">
      <span class="feature-icon">⚙️</span>
      <h2>一站式服务</h2>
      <p>一个账号，多种工具：Claude Code、Codex、Gemini CLI</p>
    </article>
  </section>

  <section class="help" id="help">
    <div class="help-inner">
      <h2>获取帮助</h2>
      <p>如需获取帮助，请发送邮件至 unwayland@gmail.com，我们会尽快与您联系。</p>
      <a class="mail-card" href="mailto:unwayland@gmail.com" aria-label="发送邮件至 unwayland@gmail.com">
        <span class="mail-icon">✉</span>
        <span>
          <strong>unwayland@gmail.com</strong>
          <small>发送邮件</small>
        </span>
        <span class="mail-arrow">→</span>
      </a>
    </div>
  </section>
</main>

<style>
.ccbug-home {
  --home-bg: #f6f8fc;
  --home-bg-accent: rgba(88, 108, 214, 0.14);
  --home-brand: #5368d9;
  --home-title: #111827;
  --home-copy: rgba(31, 41, 55, 0.74);
  --home-card-bg: rgba(255, 255, 255, 0.9);
  --home-card-border: rgba(100, 116, 139, 0.16);
  --home-icon-bg: rgba(83, 104, 217, 0.12);
  --home-help-border: rgba(100, 116, 139, 0.2);
  --home-mail-bg: rgba(255, 255, 255, 0.92);
  --home-mail-border: rgba(100, 116, 139, 0.22);
  --home-mail-icon-bg: rgba(83, 104, 217, 0.12);
  --home-mail-icon-border: rgba(83, 104, 217, 0.24);
  --home-mail-icon: #5368d9;
  --home-shadow: 0 18px 40px rgba(15, 23, 42, 0.08);
  min-height: calc(100vh - var(--vp-nav-height));
  padding: 88px 24px 120px;
  box-sizing: border-box;
  background:
    radial-gradient(circle at 76% 18%, var(--home-bg-accent), transparent 32%),
    var(--home-bg);
  color: var(--home-title);
  font-family: Inter, "PingFang SC", "Microsoft YaHei", sans-serif;
}

html.dark .ccbug-home {
  --home-bg: #070b14;
  --home-bg-accent: rgba(88, 108, 214, 0.12);
  --home-brand: #6f89ff;
  --home-title: #f8fafc;
  --home-copy: rgba(248, 250, 252, 0.72);
  --home-card-bg: rgba(17, 24, 39, 0.72);
  --home-card-border: rgba(148, 163, 184, 0.08);
  --home-icon-bg: rgba(148, 163, 184, 0.14);
  --home-help-border: rgba(148, 163, 184, 0.22);
  --home-mail-bg: rgba(17, 24, 39, 0.7);
  --home-mail-border: rgba(148, 163, 184, 0.26);
  --home-mail-icon-bg: rgba(111, 137, 255, 0.15);
  --home-mail-icon-border: rgba(111, 137, 255, 0.38);
  --home-mail-icon: #7f99ff;
  --home-shadow: none;
}

.ccbug-home .hero,
.ccbug-home .features,
.ccbug-home .help {
  width: min(1152px, 100%);
  margin: 0 auto;
}

.ccbug-home .hero {
  min-height: 318px;
  display: flex;
  align-items: flex-start;
}

.ccbug-home .hero-copy {
  max-width: 560px;
}

.ccbug-home .brand {
  margin: 0 0 6px;
  color: var(--home-brand);
  font-size: clamp(44px, 5vw, 60px);
  line-height: 1.05;
  font-weight: 800;
}

.ccbug-home .hero h1 {
  margin: 0;
  color: var(--home-title);
  font-size: clamp(42px, 5vw, 58px);
  line-height: 1.12;
  font-weight: 800;
}

.ccbug-home .tagline {
  margin: 22px 0 0;
  max-width: 600px;
  color: var(--home-copy);
  font-size: 24px;
  line-height: 1.45;
  font-weight: 650;
}

.ccbug-home .actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 34px;
}

.ccbug-home .btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 98px;
  min-height: 40px;
  padding: 0 24px;
  border-radius: 999px;
  color: #fff;
  font-size: 14px;
  font-weight: 800;
  text-decoration: none;
  box-sizing: border-box;
}

.ccbug-home .btn-primary {
  background: linear-gradient(135deg, #6779e9, #9a82ff);
}

.ccbug-home .btn-success {
  background: #20c263;
}

.ccbug-home .features {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
  margin-top: 58px;
}

.ccbug-home .feature-card {
  min-height: 198px;
  padding: 25px;
  border: 1px solid var(--home-card-border);
  border-radius: 8px;
  background: var(--home-card-bg);
  box-shadow: var(--home-shadow);
  box-sizing: border-box;
}

.ccbug-home .feature-icon {
  display: inline-flex;
  width: 48px;
  height: 48px;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  background: var(--home-icon-bg);
  font-size: 24px;
}

.ccbug-home .feature-card h2 {
  margin: 24px 0 12px;
  color: var(--home-title);
  font-size: 20px;
  line-height: 1.2;
  font-weight: 800;
}

.ccbug-home .feature-card p {
  margin: 0;
  color: var(--home-copy);
  font-size: 16px;
  line-height: 1.65;
}

.ccbug-home .help {
  margin-top: 56px;
}

.ccbug-home .help-inner {
  width: min(672px, 100%);
  margin: 0 auto;
  padding-top: 24px;
  border-top: 1px solid var(--home-help-border);
  text-align: center;
}

.ccbug-home .help h2 {
  margin: 0;
  color: var(--home-title);
  font-size: 32px;
  line-height: 1.2;
  font-weight: 800;
}

.ccbug-home .help p {
  margin: 8px 0 34px;
  color: var(--home-copy);
  font-size: 16px;
  line-height: 1.5;
}

.ccbug-home .mail-card {
  display: grid;
  grid-template-columns: 48px minmax(0, 1fr) 24px;
  align-items: center;
  gap: 16px;
  min-height: 92px;
  padding: 20px 24px;
  border: 1px solid var(--home-mail-border);
  border-radius: 8px;
  background: var(--home-mail-bg);
  color: var(--home-title);
  box-shadow: var(--home-shadow);
  text-align: left;
  text-decoration: none;
  box-sizing: border-box;
}

.ccbug-home .mail-icon {
  display: inline-flex;
  width: 48px;
  height: 48px;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--home-mail-icon-border);
  border-radius: 8px;
  background: var(--home-mail-icon-bg);
  color: var(--home-mail-icon);
  font-size: 24px;
}

.ccbug-home .mail-card strong,
.ccbug-home .mail-card small {
  display: block;
}

.ccbug-home .mail-card strong {
  overflow-wrap: anywhere;
  font-size: 18px;
  line-height: 1.3;
}

.ccbug-home .mail-card small {
  margin-top: 4px;
  color: var(--home-copy);
  font-size: 14px;
}

.ccbug-home .mail-arrow {
  color: var(--home-copy);
  font-size: 22px;
  text-align: right;
}

@media (max-width: 980px) {
  .ccbug-home {
    padding-top: 64px;
  }

  .ccbug-home .features {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .ccbug-home {
    padding: 48px 18px 72px;
  }

  .ccbug-home .hero {
    min-height: 0;
  }

  .ccbug-home .brand {
    font-size: 42px;
  }

  .ccbug-home .hero h1 {
    font-size: 40px;
  }

  .ccbug-home .tagline {
    font-size: 19px;
  }

  .ccbug-home .features {
    grid-template-columns: 1fr;
    margin-top: 44px;
  }

  .ccbug-home .mail-card {
    grid-template-columns: 44px minmax(0, 1fr) 18px;
    gap: 14px;
    padding: 18px;
  }

  .ccbug-home .mail-icon {
    width: 44px;
    height: 44px;
  }
}
</style>
