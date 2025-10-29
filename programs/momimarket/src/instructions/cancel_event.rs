use anchor_lang::prelude::*;
use crate::state::*;
use crate::error::*;

#[derive(Accounts)]
pub struct CancelEvent<'info> {
    #[account(
        mut,
        has_one = creator @ MomimarketError::NotEventCreator
    )]
    pub event: Account<'info, Event>,
    
    pub creator: Signer<'info>,
}

pub fn handler(ctx: Context<CancelEvent>) -> Result<()> {
    let event = &mut ctx.accounts.event;
    let clock = Clock::get()?;
    
    require!(!event.is_finalized, MomimarketError::EventAlreadyFinalized);
    require!(clock.unix_timestamp < event.fair_launch_end, MomimarketError::FairLaunchEnded);
    
    event.is_cancelled = true;
    
    msg!("Event cancelled: {}", event.title);
    
    Ok(())
}
