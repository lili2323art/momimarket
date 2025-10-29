use anchor_lang::prelude::*;

#[account]
pub struct UserParticipation {
    pub event: Pubkey,           // 32
    pub user: Pubkey,            // 32
    pub option_index: u8,        // 1
    pub amount: u64,             // 8
    pub reward_claimed: bool,    // 1
    pub refund_claimed: bool,    // 1
    pub bump: u8,                // 1
}

impl UserParticipation {
    pub const LEN: usize = 8 + // discriminator
        32 + // event
        32 + // user
        1 + // option_index
        8 + // amount
        1 + // reward_claimed
        1 + // refund_claimed
        1; // bump
}
