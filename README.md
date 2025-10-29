# 🎯 Momimarket

> 基于 Solana 的去中心化预测市场平台

[![Solana](https://img.shields.io/badge/Solana-Devnet-14F195?style=flat&logo=solana)](https://solana.com)
[![Anchor](https://img.shields.io/badge/Anchor-0.32.1-9945FF?style=flat)](https://www.anchor-lang.com/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat&logo=next.js)](https://nextjs.org/)

## ✨ 特色功能

- 🚀 **高性能** - 基于 Solana 区块链，快速且低成本
- 💎 **Fair Launch** - 公平的募集机制
- 🎯 **精确奖励** - 按投入比例自动计算奖励
- 🔒 **安全可靠** - 完整的用户参与记录
- 🎨 **Solana 风格** - 专业的科技感 UI
- 💰 **退款保障** - 事件取消时自动退款

## 🚀 快速开始

### 启动前端

```bash
cd momimarket
./START_FRONTEND.sh
```

访问: http://localhost:3000

### 连接钱包

1. 安装 [Phantom 钱包](https://phantom.app/)
2. 切换到 Devnet 网络
3. 点击 "Select Wallet" 连接

## 📦 项目结构

```
momimarket/
├── programs/              # Solana 智能合约
│   └── momimarket/
│       ├── src/          # 合约源代码
│       └── Cargo.toml
├── frontend/             # Next.js 前端应用
│   ├── src/
│   │   ├── app/         # 页面组件
│   │   ├── components/  # React 组件
│   │   └── lib/         # 工具函数
│   └── package.json
├── target/
│   ├── idl/             # IDL 文件
│   └── deploy/          # 编译产物
└── docs/                # 文档
```

## 🎯 核心功能

### 智能合约（8 个指令）

| 指令 | 功能 | 状态 |
|------|------|------|
| createEvent | 创建预测事件 | ✅ |
| participate | 首次参与募集 | ✅ |
| participateMore | 追加投注 | ✅ |
| finalizeFairLaunch | 结束募集 | ✅ |
| cancelEvent | 取消事件 | ✅ |
| resolveEvent | 结算事件 | ✅ |
| claimReward | 领取奖励 | ✅ |
| refund | 退款 | ✅ |

### 前端应用

- ✅ Solana 官方风格设计
- ✅ 钱包连接（Phantom、Solflare）
- ✅ 响应式布局
- ✅ 实时状态监控
- ✅ 玻璃态效果
- ✅ 渐变动画

## 🛠️ 技术栈

### 后端
- **Solana** - 区块链平台
- **Anchor** - Solana 开发框架
- **Rust** - 智能合约语言

### 前端
- **Next.js 14** - React 框架
- **TypeScript** - 类型安全
- **Solana Wallet Adapter** - 钱包集成

## 📚 文档

- [前端对接文档](./FRONTEND_INTEGRATION_V2.md)
- [快速参考](./QUICK_REFERENCE.md)
- [部署指南](./DEPLOYMENT_STATUS.md)
- [项目报告](./PROJECT_FINAL_REPORT.md)

## 🎨 设计

### Solana 官方配色
- 主色：`#14F195` (Solana 绿)
- 辅色：`#9945FF` (Solana 紫)
- 背景：黑色 + 渐变光晕

### 视觉效果
- 玻璃态卡片
- 渐变文字
- 发光边框
- 悬停动画

## 📊 项目状态

```
后端合约    ████████████████████ 100%
前端 UI     ████████████████████ 100%
钱包集成    ████████████████████ 100%
合约编译    ████████████████████ 100%

## 🔧 开发

### 编译合约

```bash
anchor build
```

### 部署合约

```bash
# Devnet
anchor deploy --provider.cluster devnet

# Localnet
solana-test-validator
anchor deploy --provider.cluster localnet
```

### 运行测试

```bash
anchor test
```

## 📝 配置

### 环境变量

创建 `frontend/.env.local`:

```env
NEXT_PUBLIC_SOLANA_NETWORK=devnet
NEXT_PUBLIC_RPC_URL=https://api.devnet.solana.com
NEXT_PUBLIC_PROGRAM_ID=9P57wDqbVJVYWHpYQq5eYhZvcJHmCWU33np2WZi865KU
```

## 🎯 使用场景

### 演示
- ✅ 展示 UI 设计
- ✅ 演示钱包连接
- ✅ 讲解功能规划

### 开发
- ✅ 完整的项目结构
- ✅ 清晰的代码组织
- ✅ 详细的文档

### 生产（待部署）
- ⏳ 创建真实事件
- ⏳ 参与预测
- ⏳ 查询链上数据

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT

## 🔗 链接

- [Solana](https://solana.com)
- [Anchor](https://www.anchor-lang.com/)
- [Phantom Wallet](https://phantom.app/)

---

**版本**: v2.0  
**状态**: 开发完成，待部署  
**更新**: 2025-10-28
