use anchor_lang::prelude::*;

#[account]
pub struct Event {
    pub creator: Pubkey,              // 32
    pub title: String,                // 4 + 100
    pub description: String,          // 4 + 500
    pub option_count: u8,             // 1
    pub fair_launch_end: i64,         // 8
    pub threshold_per_option: u64,    // 8
    pub is_finalized: bool,           // 1
    pub is_resolved: bool,            // 1
    pub is_cancelled: bool,           // 1
    pub winning_option: Option<u8>,   // 1 + 1
    pub total_pool: u64,              // 8
    pub created_at: i64,              // 8
    pub bump: u8,                     // 1
}

impl Event {
    pub const LEN: usize = 8 + // discriminator
        32 + // creator
        4 + 100 + // title
        4 + 500 + // description
        1 + // option_count
        8 + // fair_launch_end
        8 + // threshold_per_option
        1 + // is_finalized
        1 + // is_resolved
        1 + // is_cancelled
        2 + // winning_option
        8 + // total_pool
        8 + // created_at
        1; // bump
}
