use anchor_lang::prelude::*;

#[error_code]
pub enum MomimarketError {
    #[msg("Fair launch period has not ended yet")]
    FairLaunchNotEnded,
    
    #[msg("Fair launch period has already ended")]
    FairLaunchEnded,
    
    #[msg("Event has not been finalized yet")]
    EventNotFinalized,
    
    #[msg("Event has already been finalized")]
    EventAlreadyFinalized,
    
    #[msg("Event has not been resolved yet")]
    EventNotResolved,
    
    #[msg("Event has already been resolved")]
    EventAlreadyResolved,
    
    #[msg("Event has been cancelled")]
    EventCancelled,
    
    #[msg("Invalid option index")]
    InvalidOptionIndex,
    
    #[msg("Threshold not met for this option")]
    ThresholdNotMet,
    
    #[msg("User has not participated in this option")]
    UserNotParticipated,
    
    #[msg("Reward already claimed")]
    RewardAlreadyClaimed,
    
    #[msg("Refund already claimed")]
    RefundAlreadyClaimed,
    
    #[msg("Not the event creator")]
    NotEventCreator,
    
    #[msg("Invalid winning option")]
    InvalidWinningOption,
    
    #[msg("Arithmetic overflow")]
    ArithmeticOverflow,
    
    #[msg("Too many options (max 10)")]
    TooManyOptions,
    
    #[msg("Too few options (min 2)")]
    TooFewOptions,
    
    #[msg("Amount must be greater than zero")]
    InvalidAmount,
}
