#!/bin/bash

# Momimarket 部署脚本
# 用于部署合约到 Solana Devnet

set -e

echo "🚀 Momimarket 部署脚本"
echo "======================="
echo ""

# 颜色定义
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 1. 检查环境
echo "📋 步骤 1/7: 检查环境..."
if ! command -v solana &> /dev/null; then
    echo -e "${RED}❌ Solana CLI 未安装${NC}"
    exit 1
fi

if ! command -v anchor &> /dev/null; then
    echo -e "${RED}❌ Anchor CLI 未安装${NC}"
    exit 1
fi

echo -e "${GREEN}✅ 环境检查通过${NC}"
echo ""

# 2. 配置网络
echo "📋 步骤 2/7: 配置网络..."
solana config set --url devnet
echo -e "${GREEN}✅ 已切换到 Devnet${NC}"
echo ""

# 3. 检查余额
echo "📋 步骤 3/7: 检查钱包余额..."
BALANCE=$(solana balance 2>&1 | grep -oE '[0-9]+\.[0-9]+' || echo "0")
echo "当前余额: $BALANCE SOL"

if (( $(echo "$BALANCE < 2" | bc -l) )); then
    echo -e "${YELLOW}⚠️  余额不足，尝试获取测试 SOL...${NC}"
    solana airdrop 2 || echo -e "${RED}❌ Airdrop 失败，请手动获取测试 SOL${NC}"
fi
echo ""

# 4. 编译合约
echo "📋 步骤 4/7: 编译合约..."
anchor build
echo -e "${GREEN}✅ 合约编译成功${NC}"
echo ""

# 5. 获取 Program ID
echo "📋 步骤 5/7: 获取 Program ID..."
PROGRAM_ID=$(solana address -k target/deploy/momimarket-keypair.json)
echo "Program ID: $PROGRAM_ID"
echo ""

# 6. 部署合约
echo "📋 步骤 6/7: 部署合约到 Devnet..."
echo -e "${YELLOW}这可能需要几分钟...${NC}"
anchor deploy --provider.cluster devnet

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ 合约部署成功！${NC}"
else
    echo -e "${RED}❌ 部署失败${NC}"
    exit 1
fi
echo ""

# 7. 验证部署
echo "📋 步骤 7/7: 验证部署..."
solana program show $PROGRAM_ID

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ 部署验证成功！${NC}"
else
    echo -e "${RED}❌ 验证失败${NC}"
    exit 1
fi
echo ""

# 完成
echo "🎉 部署完成！"
echo "======================="
echo ""
echo "📝 下一步："
echo "1. 更新前端配置："
echo "   编辑 frontend/.env.local"
echo "   NEXT_PUBLIC_PROGRAM_ID=$PROGRAM_ID"
echo ""
echo "2. 切换到完整版页面："
echo "   cd frontend/src/app"
echo "   mv page.tsx page-demo.tsx"
echo "   mv page-full.tsx page.tsx"
echo ""
echo "3. 重启前端服务器"
echo ""
echo "🔗 查看合约："
echo "https://explorer.solana.com/address/$PROGRAM_ID?cluster=devnet"
echo ""
