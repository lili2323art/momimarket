use anchor_lang::prelude::*;
use crate::state::*;
use crate::error::*;
use crate::constants::*;

#[derive(Accounts)]
#[instruction(option_index: u8)]
pub struct ClaimReward<'info> {
    #[account(mut)]
    pub event: Account<'info, Event>,
    
    #[account(
        seeds = [OPTION_POOL_SEED, event.key().as_ref(), &[option_index]],
        bump = option_pool.bump
    )]
    pub option_pool: Account<'info, OptionPool>,
    
    #[account(
        mut,
        seeds = [USER_PARTICIPATION_SEED, event.key().as_ref(), user.key().as_ref(), &[option_index]],
        bump = user_participation.bump
    )]
    pub user_participation: Account<'info, UserParticipation>,
    
    /// CHECK: Vault PDA
    #[account(
        mut,
        seeds = [VAULT_SEED, event.key().as_ref()],
        bump
    )]
    pub vault: AccountInfo<'info>,
    
    #[account(mut)]
    pub user: Signer<'info>,
    
    pub system_program: Program<'info, System>,
}

pub fn handler(ctx: Context<ClaimReward>, option_index: u8) -> Result<()> {
    let event = &ctx.accounts.event;
    let option_pool = &ctx.accounts.option_pool;
    let user_participation = &mut ctx.accounts.user_participation;
    
    require!(!event.is_cancelled, MomimarketError::EventCancelled);
    require!(event.is_resolved, MomimarketError::EventNotResolved);
    require!(!user_participation.reward_claimed, MomimarketError::RewardAlreadyClaimed);
    require!(
        event.winning_option == Some(option_index),
        MomimarketError::InvalidWinningOption
    );
    
    // Calculate reward
    let user_share = user_participation.amount;
    let winning_pool = option_pool.total_amount;
    let total_pool = event.total_pool;
    
    // Reward = (user_share / winning_pool) * total_pool * (1 - fee)
    let reward = (user_share as u128)
        .checked_mul(total_pool as u128)
        .ok_or(MomimarketError::ArithmeticOverflow)?
        .checked_div(winning_pool as u128)
        .ok_or(MomimarketError::ArithmeticOverflow)?;
    
    let fee = (reward as u128)
        .checked_mul(PLATFORM_FEE_BPS as u128)
        .ok_or(MomimarketError::ArithmeticOverflow)?
        .checked_div(BPS_DENOMINATOR as u128)
        .ok_or(MomimarketError::ArithmeticOverflow)?;
    
    let reward_after_fee = (reward - fee) as u64;
    
    // Transfer reward from vault to user
    let event_key = event.key();
    let vault_seeds = &[
        VAULT_SEED,
        event_key.as_ref(),
        &[ctx.bumps.vault],
    ];
    let signer_seeds = &[&vault_seeds[..]];
    
    **ctx.accounts.vault.try_borrow_mut_lamports()? -= reward_after_fee;
    **ctx.accounts.user.try_borrow_mut_lamports()? += reward_after_fee;
    
    user_participation.reward_claimed = true;
    
    msg!("Reward claimed: {} lamports", reward_after_fee);
    
    Ok(())
}
