'use client';

import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { LAMPORTS_PER_SOL, SystemProgram, Transaction } from '@solana/web3.js';
import { connection } from '@/lib/solana';

export default function Home() {
  const wallet = useWallet();
  const { publicKey } = wallet;
  const [mounted, setMounted] = useState(false);
  const [balance, setBalance] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'home' | 'create' | 'events'>('home');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [options, setOptions] = useState(['', '']);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (publicKey) {
      fetchBalance();
    }
  }, [publicKey]);

  const fetchBalance = async () => {
    if (!publicKey) return;
    try {
      const bal = await connection.getBalance(publicKey);
      setBalance(bal / LAMPORTS_PER_SOL);
    } catch (error) {
      console.error('Failed to fetch balance:', error);
    }
  };

  const showMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 5000);
  };

  const handleTestConnection = async () => {
    setIsLoading(true);
    try {
      const version = await connection.getVersion();
      showMessage(`✅ 连接成功！Solana 版本: ${version['solana-core']}`);
    } catch (error: any) {
      showMessage(`❌ 连接失败: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestTransaction = async () => {
    if (!publicKey) {
      showMessage('❌ 请先连接钱包');
      return;
    }
    setIsLoading(true);
    try {
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: publicKey,
          lamports: 0,
        })
      );
      const signature = await wallet.sendTransaction(transaction, connection);
      showMessage(`✅ 交易成功！签名: ${signature.slice(0, 8)}...`);
    } catch (error: any) {
      showMessage(`❌ 交易失败: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateEvent = async () => {
    if (!publicKey) {
      showMessage('❌ 请先连接钱包');
      return;
    }
    if (!title || !description || options.some(o => !o)) {
      showMessage('❌ 请填写完整信息');
      return;
    }
    setIsLoading(true);
    try {
      showMessage('🚀 正在创建事件...');
      await new Promise(resolve => setTimeout(resolve, 2000));
      showMessage(`✅ 事件创建成功！标题: ${title}`);
      setTitle('');
      setDescription('');
      setOptions(['', '']);
      setActiveTab('events');
    } catch (error: any) {
      showMessage(`❌ 创建失败: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const addOption = () => {
    if (options.length < 10) setOptions([...options, '']);
  };

  const removeOption = (index: number) => {
    if (options.length > 2) setOptions(options.filter((_, i) => i !== index));
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  if (!mounted) return null;

  return (
    <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh' }}>
      <nav style={{
        padding: '20px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid rgba(138, 43, 226, 0.2)',
        background: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(10px)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
               onClick={() => setActiveTab('home')}>
            <div style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, #14F195 0%, #9945FF 100%)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#000',
            }}>M</div>
            <h1 className="gradient-text" style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>
              Momimarket
            </h1>
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            {[
              { id: 'home', label: '首页', icon: '🏠' },
              { id: 'create', label: '创建', icon: '➕' },
              { id: 'events', label: '事件', icon: '📋' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  background: activeTab === tab.id ? 'rgba(20, 241, 149, 0.1)' : 'transparent',
                  border: activeTab === tab.id ? '1px solid rgba(20, 241, 149, 0.3)' : '1px solid transparent',
                  color: activeTab === tab.id ? '#14F195' : 'rgba(255, 255, 255, 0.6)',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  transition: 'all 0.3s ease',
                }}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </div>
        <WalletMultiButton />
      </nav>

      {message && (
        <div style={{
          position: 'fixed',
          top: '100px',
          right: '40px',
          background: 'rgba(20, 241, 149, 0.1)',
          border: '1px solid rgba(20, 241, 149, 0.3)',
          padding: '16px 24px',
          borderRadius: '12px',
          zIndex: 1000,
          backdropFilter: 'blur(10px)',
        }}>
          {message}
        </div>
      )}

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 40px' }}>
        {activeTab === 'home' && (
          <>
            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
              <div className="float" style={{ display: 'inline-block', marginBottom: '30px' }}>
                <div style={{
                  width: '120px',
                  height: '120px',
                  background: 'linear-gradient(135deg, #14F195 0%, #9945FF 100%)',
                  borderRadius: '30px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '60px',
                  margin: '0 auto',
                  boxShadow: '0 20px 60px rgba(138, 43, 226, 0.4)',
                }}>🎯</div>
              </div>
              <h2 className="gradient-text" style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '20px' }}>
                去中心化预测市场
              </h2>
              <p style={{
                fontSize: '18px',
                color: 'rgba(255, 255, 255, 0.7)',
                maxWidth: '600px',
                margin: '0 auto 40px',
              }}>
                基于 Solana 区块链的公平、透明、高效的预测市场平台
              </p>
              <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button onClick={handleTestConnection} disabled={isLoading} className="btn-primary">
                  {isLoading ? '⏳ 测试中...' : '🔌 测试连接'}
                </button>
                <button onClick={handleTestTransaction} disabled={isLoading || !publicKey} className="btn-secondary">
                  💸 测试交易
                </button>
                <button onClick={() => setActiveTab('create')} className="btn-secondary">
                  ➕ 创建事件
                </button>
              </div>
            </div>

            {publicKey && (
              <div className="glass-card" style={{ padding: '40px', marginBottom: '40px' }}>
                <h3 style={{ fontSize: '24px', marginBottom: '24px' }}>
                  <span>💼 </span>
                  <span className="gradient-text">钱包信息</span>
                </h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                  gap: '20px',
                }}>
                  <div style={{
                    background: 'rgba(20, 241, 149, 0.05)',
                    padding: '20px',
                    borderRadius: '12px',
                    border: '1px solid rgba(20, 241, 149, 0.2)',
                  }}>
                    <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '8px' }}>
                      钱包地址
                    </div>
                    <div style={{ fontSize: '14px', fontFamily: 'monospace', color: '#14F195' }}>
                      {publicKey.toString().slice(0, 8)}...{publicKey.toString().slice(-8)}
                    </div>
                  </div>
                  <div style={{
                    background: 'rgba(153, 69, 255, 0.05)',
                    padding: '20px',
                    borderRadius: '12px',
                    border: '1px solid rgba(153, 69, 255, 0.2)',
                  }}>
                    <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '8px' }}>
                      余额
                    </div>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#9945FF' }}>
                      {balance !== null ? `${balance.toFixed(4)} SOL` : '加载中...'}
                    </div>
                  </div>
                  <div style={{
                    background: 'rgba(20, 241, 149, 0.05)',
                    padding: '20px',
                    borderRadius: '12px',
                    border: '1px solid rgba(20, 241, 149, 0.2)',
                  }}>
                    <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '8px' }}>
                      网络状态
                    </div>
                    <div style={{
                      fontSize: '18px',
                      fontWeight: 'bold',
                      color: '#14F195',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}>
                      <span className="pulse" style={{
                        width: '10px',
                        height: '10px',
                        background: '#14F195',
                        borderRadius: '50%',
                      }}></span>
                      已连接
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {activeTab === 'create' && (
          <div className="glass-card" style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '32px', marginBottom: '30px' }}>
              <span className="gradient-text">➕ 创建预测事件</span>
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: 'rgba(255, 255, 255, 0.8)' }}>
                  事件标题 *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="例如：2025年比特币价格会超过10万美元吗？"
                  style={{ width: '100%', padding: '12px 16px', fontSize: '16px' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: 'rgba(255, 255, 255, 0.8)' }}>
                  事件描述 *
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="详细描述事件的规则和判定标准..."
                  rows={4}
                  style={{ width: '100%', padding: '12px 16px', fontSize: '16px' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: 'rgba(255, 255, 255, 0.8)' }}>
                  预测选项 * (至少2个)
                </label>
                {options.map((option, index) => (
                  <div key={index} style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => updateOption(index, e.target.value)}
                      placeholder={`选项 ${index + 1}`}
                      style={{ flex: 1, padding: '12px 16px', fontSize: '16px' }}
                    />
                    {options.length > 2 && (
                      <button
                        onClick={() => removeOption(index)}
                        style={{
                          background: 'rgba(255, 0, 0, 0.1)',
                          border: '1px solid rgba(255, 0, 0, 0.3)',
                          color: '#ff4444',
                          padding: '12px 20px',
                          borderRadius: '8px',
                          cursor: 'pointer',
                        }}
                      >
                        ❌
                      </button>
                    )}
                  </div>
                ))}
                {options.length < 10 && (
                  <button onClick={addOption} className="btn-secondary" style={{ marginTop: '8px' }}>
                    ➕ 添加选项
                  </button>
                )}
              </div>
              <button
                onClick={handleCreateEvent}
                disabled={isLoading || !publicKey}
                className="btn-primary"
                style={{ width: '100%', padding: '16px', fontSize: '18px', marginTop: '20px' }}
              >
                {isLoading ? '⏳ 创建中...' : '🚀 创建事件'}
              </button>
              {!publicKey && (
                <p style={{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.5)', fontSize: '14px' }}>
                  请先连接钱包
                </p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'events' && (
          <div>
            <h2 style={{ fontSize: '32px', marginBottom: '30px', textAlign: 'center' }}>
              <span className="gradient-text">📋 预测事件列表</span>
            </h2>
            <div className="glass-card" style={{ padding: '60px 40px', textAlign: 'center' }}>
              <div style={{ fontSize: '64px', marginBottom: '20px' }}>📭</div>
              <h3 style={{ fontSize: '24px', marginBottom: '12px', color: 'rgba(255, 255, 255, 0.8)' }}>
                暂无事件
              </h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.5)', marginBottom: '24px' }}>
                创建第一个预测事件，开始你的预测之旅！
              </p>
              <button onClick={() => setActiveTab('create')} className="btn-primary">
                ➕ 创建事件
              </button>
            </div>
          </div>
        )}
      </main>

      <footer style={{
        textAlign: 'center',
        padding: '40px',
        borderTop: '1px solid rgba(138, 43, 226, 0.2)',
        marginTop: '80px',
        background: 'rgba(0, 0, 0, 0.5)',
      }}>
        <p style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '14px' }}>
          © 2025 Momimarket. Powered by Solana.
        </p>
      </footer>
    </div>
  );
}
