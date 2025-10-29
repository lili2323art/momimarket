import type { Metadata } from 'next';
import { WalletProvider } from '@/components/WalletProvider';
import './globals.css';

export const metadata: Metadata = {
  title: 'Momimarket - 去中心化预测市场',
  description: '一个将预测市场与 Meme 经济模型结合的去中心化平台',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>
        <WalletProvider>
          {children}
        </WalletProvider>
      </body>
    </html>
  );
}
