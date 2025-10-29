import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';

export const NETWORK = 'devnet' as const;
export const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL || clusterApiUrl(NETWORK);
export const PROGRAM_ID = new PublicKey(
  process.env.NEXT_PUBLIC_PROGRAM_ID || '9P57wDqbVJVYWHpYQq5eYhZvcJHmCWU33np2WZi865KU'
);

export const connection = new Connection(RPC_URL, 'confirmed');

export function getOptionPoolPda(eventPubkey: PublicKey, optionIndex: number): PublicKey {
  const [pda] = PublicKey.findProgramAddressSync(
    [
      Buffer.from('option_pool'),
      eventPubkey.toBuffer(),
      Buffer.from([optionIndex])
    ],
    PROGRAM_ID
  );
  return pda;
}

export function getUserParticipationPda(
  eventPubkey: PublicKey,
  userPubkey: PublicKey,
  optionIndex: number
): PublicKey {
  const [pda] = PublicKey.findProgramAddressSync(
    [
      Buffer.from('user_participation'),
      eventPubkey.toBuffer(),
      userPubkey.toBuffer(),
      Buffer.from([optionIndex])
    ],
    PROGRAM_ID
  );
  return pda;
}

export function getVaultPda(eventPubkey: PublicKey): PublicKey {
  const [pda] = PublicKey.findProgramAddressSync(
    [Buffer.from('vault'), eventPubkey.toBuffer()],
    PROGRAM_ID
  );
  return pda;
}
