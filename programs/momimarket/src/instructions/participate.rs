use anchor_lang::prelude::*;
use anchor_lang::system_program;
use crate::state::*;
use crate::error::*;
use crate::constants::*;

#[derive(Accounts)]
#[instruction(option_index: u8)]
pub struct Participate<'info> {
    #[account(mut)]
    pub event: Account<'info, Event>,
    
    #[account(
        init,
        payer = user,
        space = OptionPool::LEN,
        seeds = [OPTION_POOL_SEED, event.key().as_ref(), &[option_index]],
        bump
    )]
    pub option_pool: Account<'info, OptionPool>,
    
    #[account(
        init,
        payer = user,
        space = UserParticipation::LEN,
        seeds = [USER_PARTICIPATION_SEED, event.key().as_ref(), user.key().as_ref(), &[option_index]],
        bump
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

pub fn handler(ctx: Context<Participate>, option_index: u8, amount: u64) -> Result<()> {
    let event = &ctx.accounts.event;
    let clock = Clock::get()?;
    
    require!(!event.is_cancelled, MomimarketError::EventCancelled);
    require!(!event.is_finalized, MomimarketError::EventAlreadyFinalized);
    require!(clock.unix_timestamp < event.fair_launch_end, MomimarketError::FairLaunchEnded);
    require!(option_index < event.option_count, MomimarketError::InvalidOptionIndex);
    require!(amount > 0, MomimarketError::InvalidAmount);
    
    // Transfer SOL to vault
    system_program::transfer(
        CpiContext::new(
            ctx.accounts.system_program.to_account_info(),
            system_program::Transfer {
                from: ctx.accounts.user.to_account_info(),
                to: ctx.accounts.vault.to_account_info(),
            },
        ),
        amount,
    )?;
    
    // Initialize option pool
    let option_pool = &mut ctx.accounts.option_pool;
    option_pool.event = event.key();
    option_pool.option_index = option_index;
    option_pool.total_amount = amount;
    option_pool.participant_count = 1;
    option_pool.threshold_met = amount >= event.threshold_per_option;
    option_pool.bump = ctx.bumps.option_pool;
    
    // Initialize user participation
    let user_participation = &mut ctx.accounts.user_participation;
    user_participation.event = event.key();
    user_participation.user = ctx.accounts.user.key();
    user_participation.option_index = option_index;
    user_participation.amount = amount;
    user_participation.reward_claimed = false;
    user_participation.refund_claimed = false;
    user_participation.bump = ctx.bumps.user_participation;
    
    // Update event total pool
    let event = &mut ctx.accounts.event;
    event.total_pool = event.total_pool.checked_add(amount).ok_or(MomimarketError::ArithmeticOverflow)?;
    
    msg!("User participated with {} lamports in option {}", amount, option_index);
    
    Ok(())
}
