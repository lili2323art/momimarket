/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/momimarket.json`.
 */
export type Momimarket = {
  "address": "9P57wDqbVJVYWHpYQq5eYhZvcJHmCWU33np2WZi865KU",
  "metadata": {
    "name": "momimarket",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Momimarket - Decentralized Prediction Market"
  },
  "instructions": [
    {
      "name": "claimReward",
      "discriminator": [
        149,
        95,
        181,
        242,
        94,
        90,
        158,
        162
      ],
      "accounts": [
        {
          "name": "event"
        },
        {
          "name": "userParticipation",
          "writable": true
        },
        {
          "name": "vault",
          "writable": true
        },
        {
          "name": "user",
          "writable": true,
          "signer": true
        }
      ],
      "args": []
    },
    {
      "name": "createEvent",
      "discriminator": [
        49,
        219,
        29,
        203,
        22,
        98,
        100,
        87
      ],
      "accounts": [
        {
          "name": "event",
          "writable": true,
          "signer": true
        },
        {
          "name": "creator",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "title",
          "type": "string"
        },
        {
          "name": "description",
          "type": "string"
        },
        {
          "name": "optionCount",
          "type": "u8"
        },
        {
          "name": "fairLaunchDuration",
          "type": "i64"
        },
        {
          "name": "thresholdPerOption",
          "type": "u64"
        }
      ]
    },
    {
      "name": "finalizeFairLaunch",
      "discriminator": [
        208,
        179,
        67,
        51,
        9,
        254,
        170,
        87
      ],
      "accounts": [
        {
          "name": "event",
          "writable": true
        }
      ],
      "args": []
    },
    {
      "name": "participate",
      "discriminator": [
        71,
        30,
        209,
        149,
        172,
        95,
        73,
        193
      ],
      "accounts": [
        {
          "name": "event",
          "writable": true
        },
        {
          "name": "optionPool",
          "writable": true,
          "signer": true
        },
        {
          "name": "userParticipation",
          "writable": true,
          "signer": true
        },
        {
          "name": "vault",
          "writable": true
        },
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "optionIndex",
          "type": "u8"
        },
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "resolveEvent",
      "discriminator": [
        184,
        55,
        78,
        47,
        114,
        38,
        50,
        90
      ],
      "accounts": [
        {
          "name": "event",
          "writable": true
        },
        {
          "name": "creator",
          "signer": true
        }
      ],
      "args": [
        {
          "name": "winningOption",
          "type": "u8"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "event",
      "discriminator": [
        125,
        192,
        125,
        158,
        9,
        115,
        152,
        233
      ]
    },
    {
      "name": "optionPool",
      "discriminator": [
        100,
        175,
        136,
        125,
        88,
        244,
        169,
        209
      ]
    },
    {
      "name": "userParticipation",
      "discriminator": [
        228,
        224,
        93,
        45,
        100,
        99,
        161,
        190
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "invalidOptionCount",
      "msg": "Invalid option count"
    },
    {
      "code": 6001,
      "name": "titleTooLong",
      "msg": "Title too long"
    },
    {
      "code": 6002,
      "name": "descriptionTooLong",
      "msg": "Description too long"
    },
    {
      "code": 6003,
      "name": "eventCancelled",
      "msg": "Event cancelled"
    },
    {
      "code": 6004,
      "name": "eventFinalized",
      "msg": "Event finalized"
    },
    {
      "code": 6005,
      "name": "fairLaunchEnded",
      "msg": "Fair launch ended"
    },
    {
      "code": 6006,
      "name": "invalidOptionIndex",
      "msg": "Invalid option index"
    },
    {
      "code": 6007,
      "name": "invalidAmount",
      "msg": "Invalid amount"
    },
    {
      "code": 6008,
      "name": "fairLaunchNotEnded",
      "msg": "Fair launch not ended"
    },
    {
      "code": 6009,
      "name": "eventNotFinalized",
      "msg": "Event not finalized"
    },
    {
      "code": 6010,
      "name": "eventResolved",
      "msg": "Event resolved"
    },
    {
      "code": 6011,
      "name": "notCreator",
      "msg": "Not creator"
    },
    {
      "code": 6012,
      "name": "eventNotResolved",
      "msg": "Event not resolved"
    },
    {
      "code": 6013,
      "name": "rewardClaimed",
      "msg": "Reward claimed"
    },
    {
      "code": 6014,
      "name": "notWinner",
      "msg": "Not winner"
    }
  ],
  "types": [
    {
      "name": "event",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "creator",
            "type": "pubkey"
          },
          {
            "name": "title",
            "type": "string"
          },
          {
            "name": "description",
            "type": "string"
          },
          {
            "name": "optionCount",
            "type": "u8"
          },
          {
            "name": "fairLaunchEnd",
            "type": "i64"
          },
          {
            "name": "thresholdPerOption",
            "type": "u64"
          },
          {
            "name": "isFinalized",
            "type": "bool"
          },
          {
            "name": "isResolved",
            "type": "bool"
          },
          {
            "name": "isCancelled",
            "type": "bool"
          },
          {
            "name": "winningOption",
            "type": {
              "option": "u8"
            }
          },
          {
            "name": "totalPool",
            "type": "u64"
          },
          {
            "name": "createdAt",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "optionPool",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "event",
            "type": "pubkey"
          },
          {
            "name": "optionIndex",
            "type": "u8"
          },
          {
            "name": "totalAmount",
            "type": "u64"
          },
          {
            "name": "participantCount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "userParticipation",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "event",
            "type": "pubkey"
          },
          {
            "name": "user",
            "type": "pubkey"
          },
          {
            "name": "optionIndex",
            "type": "u8"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "rewardClaimed",
            "type": "bool"
          }
        ]
      }
    }
  ]
};
