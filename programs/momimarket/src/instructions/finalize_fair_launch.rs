use anchor_lang::prelude::*;
use crate::state::*;
use crate::error::*;

#[derive(Accounts)]
pub struct FinalizeFairLaunch<'info> {
    #[account(mut)]
    pub event: Account<'info, Event>,
}

pub fn handler(ctx: Context<FinalizeFairLaunch>) -> Result<()> {
    let event = &mut ctx.accounts.event;
    let clock = Clock::get()?;
    
    require!(!event.is_cancelled, MomimarketError::EventCancelled);
    require!(!event.is_finalized, MomimarketError::EventAlreadyFinalized);
    require!(clock.unix_timestamp >= event.fair_launch_end, MomimarketError::FairLaunchNotEnded);
    
    event.is_finalized = true;
    
    msg!("Fair launch finalized for event: {}", event.title);
    
    Ok(())
}
