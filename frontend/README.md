# Momimarket Frontend

Momimarket 预测市场平台前端

## 技术栈

- **框架**: Next.js 14
- **区块链**: Solana (Devnet)
- **钱包**: Solana Wallet Adapter
- **合约交互**: Anchor

## 快速开始

### 1. 安装依赖

```bash
cd frontend
npm install
```

### 2. 配置环境变量

创建 `.env.local` 文件：

```env
NEXT_PUBLIC_SOLANA_NETWORK=devnet
NEXT_PUBLIC_PROGRAM_ID=你的Program_ID
```

### 3. 运行开发服务器

```bash
npm run dev
```

访问 http://localhost:3000

## 项目结构

```
frontend/
├── src/
│   ├── app/              # Next.js App Router
│   ├── components/       # React 组件
│   ├── lib/             # 工具函数
│   │   ├── anchor.ts    # Anchor 配置
│   │   └── solana.ts    # Solana 工具
│   └── idl/             # IDL 文件
├── public/              # 静态资源
└── package.json
```

## 功能模块

### 已实现
- [ ] 钱包连接
- [ ] 创建事件
- [ ] 参与预测
- [ ] 查看事件列表
- [ ] 领取奖励

### 待实现
- [ ] 追加投注
- [ ] 事件详情页
- [ ] 用户历史记录
- [ ] 实时数据更新

## 开发指南

### 调用合约示例

```typescript
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { createEvent } from '@/lib/anchor';

// 创建事件
const handleCreate = async () => {
  const tx = await createEvent({
    title: "事件标题",
    description: "事件描述",
    options: ["YES", "NO"],
    fairLaunchDuration: 3 * 24 * 60 * 60,
    thresholdPerOption: 1_000_000_000,
  });
};
```

## 部署

### Vercel 部署

```bash
npm run build
```

然后推送到 GitHub，在 Vercel 中导入项目。

## 环境变量

- `NEXT_PUBLIC_SOLANA_NETWORK` - Solana 网络 (devnet/mainnet-beta)
- `NEXT_PUBLIC_PROGRAM_ID` - 合约 Program ID

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT
