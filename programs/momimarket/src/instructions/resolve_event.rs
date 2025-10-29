use anchor_lang::prelude::*;
use crate::state::*;
use crate::error::*;

#[derive(Accounts)]
pub struct ResolveEvent<'info> {
    #[account(
        mut,
        has_one = creator @ MomimarketError::NotEventCreator
    )]
    pub event: Account<'info, Event>,
    
    pub creator: Signer<'info>,
}

pub fn handler(ctx: Context<ResolveEvent>, winning_option: u8) -> Result<()> {
    let event = &mut ctx.accounts.event;
    
    require!(!event.is_cancelled, MomimarketError::EventCancelled);
    require!(event.is_finalized, MomimarketError::EventNotFinalized);
    require!(!event.is_resolved, MomimarketError::EventAlreadyResolved);
    require!(winning_option < event.option_count, MomimarketError::InvalidWinningOption);
    
    event.is_resolved = true;
    event.winning_option = Some(winning_option);
    
    msg!("Event resolved with winning option: {}", winning_option);
    
    Ok(())
}
