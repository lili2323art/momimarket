import * as anchor from '@coral-xyz/anchor';
import { Program, AnchorProvider, BN } from '@coral-xyz/anchor';
import { Connection, PublicKey, Keypair, SystemProgram, Transaction } from '@solana/web3.js';
import { connection, PROGRAM_ID, getOptionPoolPda, getUserParticipationPda, getVaultPda } from './solana';

// IDL 类型（简化版）
const IDL = {
  version: "0.1.0",
  name: "momimarket",
  instructions: [
    {
      name: "createEvent",
      accounts: [
        { name: "event", isMut: true, isSigner: true },
        { name: "creator", isMut: true, isSigner: true },
        { name: "systemProgram", isMut: false, isSigner: false }
      ],
      args: [
        {
          name: "params",
          type: {
            defined: "CreateEventParams"
          }
        }
      ]
    }
  ],
  types: [
    {
      name: "CreateEventParams",
      type: {
        kind: "struct",
        fields: [
          { name: "title", type: "string" },
          { name: "description", type: "string" },
          { name: "options", type: { vec: "string" } },
          { name: "fairLaunchDuration", type: "i64" },
          { name: "thresholdPerOption", type: "u64" }
        ]
      }
    }
  ]
};

export interface CreateEventParams {
  title: string;
  description: string;
  options: string[];
  fairLaunchDuration: BN;
  thresholdPerOption: BN;
}

export function getProgram(wallet: any): Program | null {
  if (!wallet) return null;
  
  try {
    const provider = new AnchorProvider(
      connection,
      wallet,
      { commitment: 'confirmed' }
    );
    return new Program(IDL as any, PROGRAM_ID, provider);
  } catch (error) {
    console.error('Failed to create program:', error);
    return null;
  }
}

export async function createEvent(
  wallet: any,
  params: CreateEventParams
): Promise<{ signature: string; eventPubkey: PublicKey }> {
  const program = getProgram(wallet);
  if (!program) throw new Error('Program not initialized');

  const eventKeypair = Keypair.generate();

  try {
    const tx = await program.methods
      .createEvent(params)
      .accounts({
        event: eventKeypair.publicKey,
        creator: wallet.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([eventKeypair])
      .rpc();

    return {
      signature: tx,
      eventPubkey: eventKeypair.publicKey,
    };
  } catch (error: any) {
    console.error('Create event error:', error);
    throw new Error(`Failed to create event: ${error.message}`);
  }
}

export async function participate(
  wallet: any,
  eventPubkey: PublicKey,
  optionIndex: number,
  amount: BN
): Promise<string> {
  const program = getProgram(wallet);
  if (!program) throw new Error('Program not initialized');

  const optionPoolPda = getOptionPoolPda(eventPubkey, optionIndex);
  const userParticipationPda = getUserParticipationPda(eventPubkey, wallet.publicKey, optionIndex);
  const vaultPda = getVaultPda(eventPubkey);

  try {
    const tx = await program.methods
      .participate(optionIndex, amount)
      .accounts({
        event: eventPubkey,
        optionPool: optionPoolPda,
        userParticipation: userParticipationPda,
        vault: vaultPda,
        user: wallet.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .rpc();

    return tx;
  } catch (error: any) {
    console.error('Participate error:', error);
    throw new Error(`Failed to participate: ${error.message}`);
  }
}

export async function getAllEvents(wallet: any): Promise<any[]> {
  const program = getProgram(wallet);
  if (!program) return [];

  try {
    const events = await program.account.event.all();
    return events;
  } catch (error) {
    console.error('Failed to fetch events:', error);
    return [];
  }
}

export async function getEvent(wallet: any, eventPubkey: PublicKey): Promise<any | null> {
  const program = getProgram(wallet);
  if (!program) return null;

  try {
    const event = await program.account.event.fetch(eventPubkey);
    return event;
  } catch (error) {
    console.error('Failed to fetch event:', error);
    return null;
  }
}
