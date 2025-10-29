use anchor_lang::prelude::*;

#[account]
pub struct OptionPool {
    pub event: Pubkey,           // 32
    pub option_index: u8,        // 1
    pub total_amount: u64,       // 8
    pub participant_count: u64,  // 8
    pub threshold_met: bool,     // 1
    pub bump: u8,                // 1
}

impl OptionPool {
    pub const LEN: usize = 8 + // discriminator
        32 + // event
        1 + // option_index
        8 + // total_amount
        8 + // participant_count
        1 + // threshold_met
        1; // bump
}
