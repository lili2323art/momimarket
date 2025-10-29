// PDA Seeds
pub const EVENT_SEED: &[u8] = b"event";
pub const OPTION_POOL_SEED: &[u8] = b"option_pool";
pub const USER_PARTICIPATION_SEED: &[u8] = b"user_participation";
pub const VAULT_SEED: &[u8] = b"vault";

// Limits
pub const MAX_OPTIONS: usize = 10;
pub const MIN_OPTIONS: usize = 2;
pub const MAX_TITLE_LENGTH: usize = 100;
pub const MAX_DESCRIPTION_LENGTH: usize = 500;

// Fee (1% = 100 basis points)
pub const PLATFORM_FEE_BPS: u64 = 100; // 1%
pub const BPS_DENOMINATOR: u64 = 10000;
