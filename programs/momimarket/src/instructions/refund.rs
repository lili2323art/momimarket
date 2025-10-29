use anchor_lang::prelude::*;
use crate::state::*;
use crate::error::*;
use crate::constants::*;

#[derive(Accounts)]
#[instruction(option_index: u8)]
pub struct Refund<'info> {
    #[account(mut)]
    pub event: Account<'info, Event>,
    
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

pub fn handler(ctx: Context<Refund>, _option_index: u8) -> Result<()> {
    let event = &ctx.accounts.event;
    let user_participation = &mut ctx.accounts.user_participation;
    
    require!(event.is_cancelled, MomimarketError::EventNotResolved);
    require!(!user_participation.refund_claimed, MomimarketError::RefundAlreadyClaimed);
    
    let refund_amount = user_participation.amount;
    
    // Transfer refund from vault to user
    let event_key = event.key();
    let vault_seeds = &[
        VAULT_SEED,
        event_key.as_ref(),
        &[ctx.bumps.vault],
    ];
    let _signer_seeds = &[&vault_seeds[..]];
    
    **ctx.accounts.vault.try_borrow_mut_lamports()? -= refund_amount;
    **ctx.accounts.user.try_borrow_mut_lamports()? += refund_amount;
    
    user_participation.refund_claimed = true;
    
    msg!("Refund claimed: {} lamports", refund_amount);
    
    Ok(())
}
