use anchor_lang::prelude::*;
use anchor_lang::system_program;
use crate::state::*;
use crate::error::*;
use crate::constants::*;

#[derive(Accounts)]
#[instruction(option_index: u8)]
pub struct ParticipateMore<'info> {
    #[account(mut)]
    pub event: Account<'info, Event>,
    
    #[account(
        mut,
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

pub fn handler(ctx: Context<ParticipateMore>, _option_index: u8, amount: u64) -> Result<()> {
    let event = &ctx.accounts.event;
    let clock = Clock::get()?;
    
    require!(!event.is_cancelled, MomimarketError::EventCancelled);
    require!(!event.is_finalized, MomimarketError::EventAlreadyFinalized);
    require!(clock.unix_timestamp < event.fair_launch_end, MomimarketError::FairLaunchEnded);
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
    
    // Update option pool
    let option_pool = &mut ctx.accounts.option_pool;
    option_pool.total_amount = option_pool.total_amount
        .checked_add(amount)
        .ok_or(MomimarketError::ArithmeticOverflow)?;
    option_pool.threshold_met = option_pool.total_amount >= event.threshold_per_option;
    
    // Update user participation
    let user_participation = &mut ctx.accounts.user_participation;
    user_participation.amount = user_participation.amount
        .checked_add(amount)
        .ok_or(MomimarketError::ArithmeticOverflow)?;
    
    // Update event total pool
    let event = &mut ctx.accounts.event;
    event.total_pool = event.total_pool
        .checked_add(amount)
        .ok_or(MomimarketError::ArithmeticOverflow)?;
    
    msg!("User added {} lamports to option", amount);
    
    Ok(())
}
