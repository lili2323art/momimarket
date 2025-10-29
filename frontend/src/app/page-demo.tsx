'use client';

import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export default function Home() {
  const { publicKey } = useWallet();
  const [message, setMessage] = useState('');

  const handleTest = () => {
    setMessage('✨ 交互测试成功！');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* 顶部导航 */}
      <nav style={{
        padding: '20px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        background: 'rgba(0, 0, 0, 0.5)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #14F195 0%, #9945FF 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px'
          }}>
            🎯
          </div>
          <h1 style={{
            fontSize: '24px',
            fontWeight: '700',
            background: 'linear-gradient(90deg, #14F195 0%, #9945FF 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Momimarket
          </h1>
        </div>
        <WalletMultiButton />
      </nav>

      {/* 主要内容 */}
      <main style={{ padding: '60px 40px', maxWidth: '1400px', margin: '0 auto' }}>
        {/* Hero 区域 */}
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <h2 style={{
            fontSize: '64px',
            fontWeight: '800',
            marginBottom: '20px',
            background: 'linear-gradient(90deg, #14F195 0%, #9945FF 50%, #14F195 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '-2px'
          }}>
            去中心化预测市场
          </h2>
          <p style={{
            fontSize: '20px',
            color: 'rgba(255, 255, 255, 0.7)',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            基于 Solana 区块链的高性能预测市场平台
            <br />
            快速、低成本、完全去中心化
          </p>
        </div>

        {/* 钱包信息卡片 */}
        {publicKey && (
          <div style={{
            padding: '24px',
            borderRadius: '16px',
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(20, 241, 149, 0.2)',
            marginBottom: '40px',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 0 40px rgba(20, 241, 149, 0.1)'
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
              <div>
                <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.5)', marginBottom: '8px' }}>
                  钱包地址
                </div>
                <div style={{ 
                  fontSize: '14px', 
                  fontFamily: 'monospace',
                  color: '#14F195',
                  wordBreak: 'break-all'
                }}>
                  {publicKey.toBase58()}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.5)', marginBottom: '8px' }}>
                  网络
                </div>
                <div style={{ fontSize: '14px', color: '#9945FF', fontWeight: '600' }}>
                  Devnet
                </div>
              </div>
              <div>
                <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.5)', marginBottom: '8px' }}>
                  状态
                </div>
                <div style={{ fontSize: '14px', color: '#14F195', fontWeight: '600' }}>
                  ● 已连接
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 功能卡片网格 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px', marginBottom: '40px' }}>
          {/* 测试卡片 */}
          <div style={{
            padding: '32px',
            borderRadius: '16px',
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgba(20, 241, 149, 0.5)';
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(20, 241, 149, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, rgba(20, 241, 149, 0.2) 0%, rgba(153, 69, 255, 0.2) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              marginBottom: '20px'
            }}>
              🚀
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px' }}>
              交互测试
            </h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.6)', marginBottom: '24px', lineHeight: '1.6' }}>
              测试页面交互功能，确保所有组件正常工作
            </p>
            <button
              onClick={handleTest}
              style={{
                width: '100%',
                padding: '14px',
                borderRadius: '8px',
                background: 'linear-gradient(90deg, #14F195 0%, #9945FF 100%)',
                border: 'none',
                color: '#000000',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(20, 241, 149, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              点击测试
            </button>
            {message && (
              <div style={{
                marginTop: '16px',
                padding: '12px',
                borderRadius: '8px',
                background: 'rgba(20, 241, 149, 0.1)',
                border: '1px solid rgba(20, 241, 149, 0.3)',
                color: '#14F195',
                fontSize: '14px',
                textAlign: 'center'
              }}>
                {message}
              </div>
            )}
          </div>

          {/* 功能状态卡片 */}
          <div style={{
            padding: '32px',
            borderRadius: '16px',
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, rgba(153, 69, 255, 0.2) 0%, rgba(20, 241, 149, 0.2) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              marginBottom: '20px'
            }}>
              ⚡
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '20px' }}>
              系统状态
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { label: '页面加载', status: true },
                { label: 'React 运行', status: true },
                { label: '钱包适配器', status: true },
                { label: '钱包连接', status: !!publicKey }
              ].map((item, index) => (
                <div key={index} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px',
                  borderRadius: '8px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.05)'
                }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: item.status ? '#14F195' : 'rgba(255, 255, 255, 0.3)',
                    boxShadow: item.status ? '0 0 8px #14F195' : 'none'
                  }} />
                  <span style={{ color: 'rgba(255, 255, 255, 0.8)' }}>{item.label}</span>
                  <span style={{ 
                    marginLeft: 'auto',
                    color: item.status ? '#14F195' : 'rgba(255, 255, 255, 0.4)',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}>
                    {item.status ? '正常' : '待连接'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 快速链接卡片 */}
          <div style={{
            padding: '32px',
            borderRadius: '16px',
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, rgba(20, 241, 149, 0.2) 0%, rgba(153, 69, 255, 0.2) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              marginBottom: '20px'
            }}>
              🔗
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '20px' }}>
              快速链接
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { label: 'Solana Explorer', url: 'https://explorer.solana.com/?cluster=devnet' },
                { label: 'Solana Faucet', url: 'https://faucet.solana.com/' },
                { label: 'Phantom Wallet', url: 'https://phantom.app/' }
              ].map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: '12px 16px',
                    borderRadius: '8px',
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    color: 'rgba(255, 255, 255, 0.8)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(20, 241, 149, 0.3)';
                    e.currentTarget.style.background = 'rgba(20, 241, 149, 0.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
                  }}
                >
                  <span>{link.label}</span>
                  <span style={{ fontSize: '12px' }}>→</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* 底部信息 */}
        <div style={{
          padding: '32px',
          borderRadius: '16px',
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '14px',
            color: 'rgba(255, 255, 255, 0.5)',
            marginBottom: '12px'
          }}>
            Powered by Solana
          </div>
          <div style={{
            fontSize: '16px',
            fontWeight: '600',
            background: 'linear-gradient(90deg, #14F195 0%, #9945FF 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Momimarket v2.0
          </div>
        </div>
      </main>
    </div>
  );
}
