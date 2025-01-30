declare const GetBlockchains: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly offset: {
                    readonly type: "integer";
                    readonly minimum: 0;
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Index of the page to return";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly maximum: 100;
                    readonly default: 30;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Number of items to return in the result set";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly additionalProperties: true;
                    };
                };
                readonly pagination: {
                    readonly type: "object";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetDefiPool: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly blockchain: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                        readonly description: "Filter or get aggregate blockchain data";
                        readonly enum: readonly ["ethereum", "polygon", "avalanche", "linea"];
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Filter or get aggregate blockchain data";
                };
                readonly protocol: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                        readonly description: "protocol of defi";
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "protocol of defi";
                };
                readonly offset: {
                    readonly type: "integer";
                    readonly minimum: 0;
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Index of the page to return";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly maximum: 100;
                    readonly default: 30;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Number of items to return in the result set";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly additionalProperties: true;
                    };
                };
                readonly pagination: {
                    readonly type: "object";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetDefiPoolMetadata: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly blockchain: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                        readonly description: "Filter or get aggregate blockchain data";
                        readonly enum: readonly ["ethereum", "polygon", "avalanche", "linea"];
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Filter or get aggregate blockchain data";
                };
                readonly pair_address: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                        readonly description: "Address of the Wallet";
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Address of the Wallet";
                };
                readonly offset: {
                    readonly type: "integer";
                    readonly minimum: 0;
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Index of the page to return";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly maximum: 100;
                    readonly default: 30;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Number of items to return in the result set";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly additionalProperties: true;
                    };
                };
                readonly pagination: {
                    readonly type: "object";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetDefiPoolMetrics: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly blockchain: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                        readonly description: "Filter or get aggregate blockchain data";
                        readonly enum: readonly ["ethereum", "polygon", "avalanche", "linea"];
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Filter or get aggregate blockchain data";
                };
                readonly pair_address: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                        readonly description: "Address of the Wallet";
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Address of the Wallet";
                };
                readonly offset: {
                    readonly type: "integer";
                    readonly minimum: 0;
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Index of the page to return";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly maximum: 100;
                    readonly default: 30;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Number of items to return in the result set";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly additionalProperties: true;
                    };
                };
                readonly pagination: {
                    readonly type: "object";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetDefiPoolSupportedProtocols: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly blockchain: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                        readonly description: "Filter or get aggregate blockchain data";
                        readonly enum: readonly ["ethereum", "polygon", "avalanche", "linea"];
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Filter or get aggregate blockchain data";
                };
                readonly offset: {
                    readonly type: "integer";
                    readonly minimum: 0;
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Index of the page to return";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly maximum: 100;
                    readonly default: 30;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Number of items to return in the result set";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly additionalProperties: true;
                    };
                };
                readonly pagination: {
                    readonly type: "object";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetNftAnalytics: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly contract_address: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                        readonly description: "Metric group for market / collection";
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Metric group values to return";
                };
                readonly token_id: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                        readonly description: "Token IDs of NFT Contract";
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Token is_washtrade of NFT Contract";
                };
                readonly blockchain: {
                    readonly type: "string";
                    readonly enum: readonly ["ethereum", "binance", "bitcoin", "polygon", "solana", "avalanche", "linea"];
                    readonly default: "ethereum";
                    readonly description: "Filter or get aggregate blockchain data";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly time_range: {
                    readonly type: "string";
                    readonly enum: readonly ["15m", "30m", "24h", "7d", "30d", "90d", "all"];
                    readonly default: "24h";
                    readonly description: "Time range to filter results";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly sort_by: {
                    readonly type: "string";
                    readonly enum: readonly ["sales", "sales_change", "assets", "assets_change", "transactions", "transactions_change", "transfers", "transfers_change", "volume", "volume_change", "floor_price", "floor_price_eth"];
                    readonly default: "sales";
                    readonly description: "Property to sort result set by";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly sort_order: {
                    readonly type: "string";
                    readonly enum: readonly ["asc", "desc"];
                    readonly default: "desc";
                    readonly description: "Order to sort the result set in";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly offset: {
                    readonly type: "integer";
                    readonly minimum: 0;
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Index of the page to return";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly maximum: 100;
                    readonly default: 30;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Number of items to return in the result set";
                };
            };
            readonly required: readonly ["blockchain", "sort_by"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly additionalProperties: true;
                    };
                };
                readonly pagination: {
                    readonly type: "object";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetNftBrandCategory: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly blockchain: {
                    readonly type: "string";
                    readonly enum: readonly ["ethereum", "binance", "polygon", "solana", "avalanche", "linea"];
                    readonly default: "ethereum";
                    readonly description: "Filter or get aggregate blockchain data";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly category: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                        readonly enum: readonly ["Fashion", "Metaverse", "Social Media", "Sports", "Food & Beverage", "Cars", "Sports Club", "Skincare & Cosmetics", "Restaurant & Hotel membership", "Books", "Media & Entertainment", "Collectibles"];
                    };
                    readonly description: "Brand categories";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly offset: {
                    readonly type: "integer";
                    readonly minimum: 0;
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Index of the page to return";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly maximum: 100;
                    readonly default: 30;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Number of items to return in the result set";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly additionalProperties: true;
                    };
                };
                readonly pagination: {
                    readonly type: "object";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetNftBrandContractMetadata: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly blockchain: {
                    readonly type: "string";
                    readonly enum: readonly ["ethereum", "binance", "polygon", "solana", "avalanche", "linea"];
                    readonly default: "ethereum";
                    readonly description: "Filter or get aggregate blockchain data";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly contract_address: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                        readonly description: "Metric group for market / collection";
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Metric group values to return";
                };
                readonly offset: {
                    readonly type: "integer";
                    readonly minimum: 0;
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Index of the page to return";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly maximum: 100;
                    readonly default: 30;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Number of items to return in the result set";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly additionalProperties: true;
                    };
                };
                readonly pagination: {
                    readonly type: "object";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetNftBrandContractMetrics: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly blockchain: {
                    readonly type: "string";
                    readonly enum: readonly ["ethereum", "binance", "polygon", "solana", "avalanche", "linea"];
                    readonly default: "ethereum";
                    readonly description: "Filter or get aggregate blockchain data";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly contract_address: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                        readonly description: "Metric group for market / collection";
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Metric group values to return";
                };
                readonly time_range: {
                    readonly type: "string";
                    readonly enum: readonly ["24h", "7d", "30d", "90d", "all"];
                    readonly default: "24h";
                    readonly description: "Time range to filter results";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly offset: {
                    readonly type: "integer";
                    readonly minimum: 0;
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Index of the page to return";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly maximum: 100;
                    readonly default: 30;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Number of items to return in the result set";
                };
                readonly sort_by: {
                    readonly type: "string";
                    readonly enum: readonly ["mint_tokens", "mint_revenue", "primary_sale_revenue", "secondary_sale_revenue", "interactions", "total_volume", "total_revenue", "holders", "royalty_revenue", "traders", "growth_rate", "retained_traders", "mcap", "marketplace_volume"];
                    readonly default: "mint_tokens";
                    readonly description: "Property to sort result set by";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly sort_order: {
                    readonly type: "string";
                    readonly enum: readonly ["asc", "desc"];
                    readonly default: "desc";
                    readonly description: "Order to sort the result set in";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["sort_by"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly additionalProperties: true;
                    };
                };
                readonly pagination: {
                    readonly type: "object";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetNftBrandContractProfile: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly blockchain: {
                    readonly type: "string";
                    readonly enum: readonly ["ethereum", "binance", "polygon", "solana", "avalanche", "linea"];
                    readonly default: "ethereum";
                    readonly description: "Filter or get aggregate blockchain data";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly contract_address: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                        readonly description: "Metric group for market / collection";
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Metric group values to return";
                };
                readonly time_range: {
                    readonly type: "string";
                    readonly enum: readonly ["24h", "7d", "30d", "90d", "all"];
                    readonly default: "24h";
                    readonly description: "Time range to filter results";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly offset: {
                    readonly type: "integer";
                    readonly minimum: 0;
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Index of the page to return";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly maximum: 100;
                    readonly default: 30;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Number of items to return in the result set";
                };
                readonly sort_by: {
                    readonly type: "string";
                    readonly enum: readonly ["diamond_hands", "profitable_volume", "loss_making_volume", "profitable_trades", "loss_making_trades", "collection_score"];
                    readonly default: "diamond_hands";
                    readonly description: "Property to sort result set by";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly sort_order: {
                    readonly type: "string";
                    readonly enum: readonly ["asc", "desc"];
                    readonly default: "desc";
                    readonly description: "Order to sort the result set in";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["sort_by"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly additionalProperties: true;
                    };
                };
                readonly pagination: {
                    readonly type: "object";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetNftBrandMetadata: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly blockchain: {
                    readonly type: "string";
                    readonly enum: readonly ["ethereum", "binance", "polygon", "solana", "avalanche", "linea"];
                    readonly default: "ethereum";
                    readonly description: "Filter or get aggregate blockchain data";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly brand: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                        readonly description: "Brand group for market";
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Brand group values to return";
                };
                readonly offset: {
                    readonly type: "integer";
                    readonly minimum: 0;
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Index of the page to return";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly maximum: 100;
                    readonly default: 30;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Number of items to return in the result set";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly additionalProperties: true;
                    };
                };
                readonly pagination: {
                    readonly type: "object";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetNftBrandMetrics: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly blockchain: {
                    readonly type: "string";
                    readonly enum: readonly ["ethereum", "binance", "polygon", "solana", "avalanche", "linea"];
                    readonly default: "ethereum";
                    readonly description: "Filter or get aggregate blockchain data";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly brand: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                        readonly description: "Brand group for market";
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Brand group values to return";
                };
                readonly time_range: {
                    readonly type: "string";
                    readonly enum: readonly ["24h", "7d", "30d", "90d", "all"];
                    readonly default: "24h";
                    readonly description: "Time range to filter results";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly offset: {
                    readonly type: "integer";
                    readonly minimum: 0;
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Index of the page to return";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly maximum: 100;
                    readonly default: 30;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Number of items to return in the result set";
                };
                readonly sort_by: {
                    readonly type: "string";
                    readonly enum: readonly ["mint_tokens", "mint_revenue", "primary_sale_revenue", "secondary_sale_revenue", "interactions", "total_volume", "total_revenue", "holders", "royalty_revenue", "traders", "growth_rate", "retained_traders", "mcap", "marketplace_volume"];
                    readonly default: "mint_tokens";
                    readonly description: "Property to sort result set by";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly sort_order: {
                    readonly type: "string";
                    readonly enum: readonly ["asc", "desc"];
                    readonly default: "desc";
                    readonly description: "Order to sort the result set in";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["sort_by"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly additionalProperties: true;
                    };
                };
                readonly pagination: {
                    readonly type: "object";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetNftBrandProfile: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly blockchain: {
                    readonly type: "string";
                    readonly enum: readonly ["ethereum", "binance", "polygon", "solana", "avalanche", "linea"];
                    readonly default: "ethereum";
                    readonly description: "Filter or get aggregate blockchain data";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly brand: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                        readonly description: "Brand group for market";
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Brand group values to return";
                };
                readonly time_range: {
                    readonly type: "string";
                    readonly enum: readonly ["24h", "7d", "30d", "90d", "all"];
                    readonly default: "24h";
                    readonly description: "Time range to filter results";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly offset: {
                    readonly type: "integer";
                    readonly minimum: 0;
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Index of the page to return";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly maximum: 100;
                    readonly default: 30;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Number of items to return in the result set";
                };
                readonly sort_by: {
                    readonly type: "string";
                    readonly enum: readonly ["diamond_hands", "profitable_volume", "loss_making_volume", "profitable_trades", "loss_making_trades", "collection_score"];
                    readonly default: "diamond_hands";
                    readonly description: "Property to sort result set by";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly sort_order: {
                    readonly type: "string";
                    readonly enum: readonly ["asc", "desc"];
                    readonly default: "desc";
                    readonly description: "Order to sort the result set in";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["sort_by"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly additionalProperties: true;
                    };
                };
                readonly pagination: {
                    readonly type: "object";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetNftCollectionAnalytics: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly blockchain: {
                    readonly type: "string";
                    readonly enum: readonly ["ethereum", "binance", "polygon", "solana", "avalanche", "linea", "bitcoin", "unichain_sepolia", "full"];
                    readonly default: "ethereum";
                    readonly description: "Filter or get aggregate blockchain data";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly contract_address: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                        readonly description: "Metric group for market / collection";
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Metric group values to return";
                };
                readonly offset: {
                    readonly type: "integer";
                    readonly minimum: 0;
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Index of the page to return";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly maximum: 100;
                    readonly default: 30;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Number of items to return in the result set";
                };
                readonly sort_by: {
                    readonly type: "string";
                    readonly enum: readonly ["assets", "assets_change", "floor_price", "floor_price_eth", "sales", "sales_change", "volume", "volume_change", "transactions", "transactions_change", "transfers", "transfers_change"];
                    readonly default: "sales";
                    readonly description: "Property to sort result set by";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly time_range: {
                    readonly type: "string";
                    readonly enum: readonly ["15m", "30m", "24h", "7d", "30d", "90d", "all"];
                    readonly default: "24h";
                    readonly description: "Time range to filter results";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly sort_order: {
                    readonly type: "string";
                    readonly enum: readonly ["asc", "desc"];
                    readonly default: "desc";
                    readonly description: "Order to sort the result set in";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["sort_by"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly additionalProperties: true;
                    };
                };
                readonly pagination: {
                    readonly type: "object";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetNftCollectionCategories: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly offset: {
                    readonly type: "integer";
                    readonly minimum: 0;
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Index of the page to return";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly maximum: 100;
                    readonly default: 30;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Number of items to return in the result set";
                };
                readonly sort_order: {
                    readonly type: "string";
                    readonly enum: readonly ["asc", "desc"];
                    readonly default: "desc";
                    readonly description: "Order to sort the result set in";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly additionalProperties: true;
                    };
                };
                readonly pagination: {
                    readonly type: "object";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetNftCollectionHolders: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly blockchain: {
                    readonly type: "string";
                    readonly enum: readonly ["ethereum", "binance", "polygon", "solana", "avalanche", "linea", "bitcoin", "unichain_sepolia", "full"];
                    readonly default: "ethereum";
                    readonly description: "Filter or get aggregate blockchain data";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly contract_address: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                        readonly description: "Metric group for market / collection";
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Metric group values to return";
                };
                readonly time_range: {
                    readonly type: "string";
                    readonly enum: readonly ["24h", "7d", "30d", "90d", "all"];
                    readonly default: "24h";
                    readonly description: "Time range to filter results";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly offset: {
                    readonly type: "integer";
                    readonly minimum: 0;
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Index of the page to return";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly maximum: 100;
                    readonly default: 30;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Number of items to return in the result set";
                };
                readonly sort_by: {
                    readonly type: "string";
                    readonly enum: readonly ["holders", "holders_change"];
                    readonly default: "holders";
                    readonly description: "Property to sort result set by";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly sort_order: {
                    readonly type: "string";
                    readonly enum: readonly ["asc", "desc"];
                    readonly default: "desc";
                    readonly description: "Order to sort the result set in";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["sort_by"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly additionalProperties: true;
                    };
                };
                readonly pagination: {
                    readonly type: "object";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetNftCollectionMetadata: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly sort_order: {
                    readonly type: "string";
                    readonly enum: readonly ["asc", "desc"];
                    readonly default: "desc";
                    readonly description: "Order to sort the result set in";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly offset: {
                    readonly type: "integer";
                    readonly minimum: 0;
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Index of the page to return";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly maximum: 100;
                    readonly default: 30;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Number of items to return in the result set";
                };
                readonly contract_address: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                        readonly description: "Metric group for market / collection";
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Metric group values to return";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly additionalProperties: true;
                    };
                };
                readonly pagination: {
                    readonly type: "object";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetNftCollectionProfile: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly blockchain: {
                    readonly type: "string";
                    readonly enum: readonly ["ethereum", "binance", "polygon", "solana", "avalanche", "linea", "bitcoin"];
                    readonly default: "ethereum";
                    readonly description: "Filter or get aggregate blockchain data";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly contract_address: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                        readonly description: "Metric group for market / collection";
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Metric group values to return";
                };
                readonly time_range: {
                    readonly type: "string";
                    readonly enum: readonly ["24h", "7d", "30d", "90d", "all"];
                    readonly default: "24h";
                    readonly description: "Time range to filter results";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly offset: {
                    readonly type: "integer";
                    readonly minimum: 0;
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Index of the page to return";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly maximum: 100;
                    readonly default: 30;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Number of items to return in the result set";
                };
                readonly sort_by: {
                    readonly type: "string";
                    readonly enum: readonly ["fear_and_greed_index", "washtrade_index", "metadata_score", "liquidity_score", "market_dominance_score", "token_distribution_score", "collection_score", "holder_metrics_score", "diamond_hands", "profitable_volume", "loss_making_volume", "profitable_trades", "loss_making_trades", "zero_profit_trades", "profitable_trades_percentage", "avg_profitable_trades", "loss_making_trades_percentage", "avg_loss_making_trades"];
                    readonly default: "washtrade_index";
                    readonly description: "Property to sort result set by";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly sort_order: {
                    readonly type: "string";
                    readonly enum: readonly ["asc", "desc"];
                    readonly default: "desc";
                    readonly description: "Order to sort the result set in";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["sort_by"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly additionalProperties: true;
                    };
                };
                readonly pagination: {
                    readonly type: "object";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetNftCollectionScores: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly blockchain: {
                    readonly type: "string";
                    readonly enum: readonly ["ethereum", "binance", "polygon", "solana", "avalanche", "linea", "bitcoin", "unichain_sepolia", "full"];
                    readonly default: "ethereum";
                    readonly description: "Filter or get aggregate blockchain data";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly contract_address: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                        readonly description: "Metric group for market / collection";
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Metric group values to return";
                };
                readonly time_range: {
                    readonly type: "string";
                    readonly enum: readonly ["24h", "7d", "30d", "90d", "all"];
                    readonly default: "24h";
                    readonly description: "Time range to filter results";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly offset: {
                    readonly type: "integer";
                    readonly minimum: 0;
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Index of the page to return";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly maximum: 100;
                    readonly default: 30;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Number of items to return in the result set";
                };
                readonly sort_by: {
                    readonly type: "string";
                    readonly enum: readonly ["market_cap", "marketcap_change", "price_avg", "price_avg_change", "price_ceiling", "minting_revenue", "royalty_price"];
                    readonly default: "market_cap";
                    readonly description: "Property to sort result set by";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly sort_order: {
                    readonly type: "string";
                    readonly enum: readonly ["asc", "desc"];
                    readonly default: "desc";
                    readonly description: "Order to sort the result set in";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["sort_by"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly additionalProperties: true;
                    };
                };
                readonly pagination: {
                    readonly type: "object";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetNftCollectionTraders: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly blockchain: {
                    readonly type: "string";
                    readonly enum: readonly ["ethereum", "binance", "polygon", "solana", "avalanche", "linea", "bitcoin", "unichain_sepolia", "full"];
                    readonly default: "ethereum";
                    readonly description: "Filter or get aggregate blockchain data";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly contract_address: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                        readonly description: "Metric group for market / collection";
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Metric group values to return";
                };
                readonly offset: {
                    readonly type: "integer";
                    readonly minimum: 0;
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Index of the page to return";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly maximum: 100;
                    readonly default: 30;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Number of items to return in the result set";
                };
                readonly sort_by: {
                    readonly type: "string";
                    readonly enum: readonly ["traders", "traders_change", "traders_ratio", "traders_ratio_change", "traders_buyers", "traders_buyers_change", "traders_sellers", "traders_sellers_change"];
                    readonly default: "traders";
                    readonly description: "Property to sort result set by";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly time_range: {
                    readonly type: "string";
                    readonly enum: readonly ["15m", "30m", "24h", "7d", "30d", "90d", "all"];
                    readonly default: "24h";
                    readonly description: "Time range to filter results";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly sort_order: {
                    readonly type: "string";
                    readonly enum: readonly ["asc", "desc"];
                    readonly default: "desc";
                    readonly description: "Order to sort the result set in";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["sort_by"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly additionalProperties: true;
                    };
                };
                readonly pagination: {
                    readonly type: "object";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetNftCollectionWashtrade: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly blockchain: {
                    readonly type: "string";
                    readonly enum: readonly ["ethereum", "binance", "polygon", "solana", "avalanche", "linea", "bitcoin", "unichain_sepolia", "full"];
                    readonly default: "ethereum";
                    readonly description: "Filter or get aggregate blockchain data";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly contract_address: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                        readonly description: "Metric group for market / collection";
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Metric group values to return";
                };
                readonly time_range: {
                    readonly type: "string";
                    readonly enum: readonly ["24h", "7d", "30d", "90d", "all"];
                    readonly default: "24h";
                    readonly description: "Time range to filter results";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly offset: {
                    readonly type: "integer";
                    readonly minimum: 0;
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Index of the page to return";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly maximum: 100;
                    readonly default: 30;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Number of items to return in the result set";
                };
                readonly sort_by: {
                    readonly type: "string";
                    readonly enum: readonly ["washtrade_assets", "washtrade_assets_change", "washtrade_suspect_sales", "washtrade_suspect_sales_change", "washtrade_volume", "washtrade_volume_change", "washtrade_wallets", "washtrade_wallets_change"];
                    readonly default: "washtrade_assets";
                    readonly description: "Property to sort result set by";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly sort_order: {
                    readonly type: "string";
                    readonly enum: readonly ["asc", "desc"];
                    readonly default: "desc";
                    readonly description: "Order to sort the result set in";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["sort_by"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly additionalProperties: true;
                    };
                };
                readonly pagination: {
                    readonly type: "object";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetNftCollectionWhales: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly blockchain: {
                    readonly type: "string";
                    readonly enum: readonly ["ethereum", "binance", "bitcoin", "polygon", "solana", "avalanche", "linea"];
                    readonly default: "ethereum";
                    readonly description: "Filter or get aggregate blockchain data";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly contract_address: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                        readonly description: "Metric group for market / collection";
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Metric group values to return";
                };
                readonly time_range: {
                    readonly type: "string";
                    readonly enum: readonly ["24h", "7d", "30d", "90d", "all"];
                    readonly default: "24h";
                    readonly description: "Time range to filter results";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly offset: {
                    readonly type: "integer";
                    readonly minimum: 0;
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Index of the page to return";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly maximum: 100;
                    readonly default: 30;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Number of items to return in the result set";
                };
                readonly sort_by: {
                    readonly type: "string";
                    readonly enum: readonly ["nft_count", "mint_count", "mint_volume", "mint_whales", "unique_wallets", "unique_mint_wallets", "unique_buy_wallets", "unique_sell_wallets", "total_mint_volume", "total_sale_volume", "buy_count", "buy_volume", "buy_whales", "sell_count", "sell_volume", "sell_whales", "whale_holders"];
                    readonly default: "nft_count";
                    readonly description: "Property to sort result set by";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly sort_order: {
                    readonly type: "string";
                    readonly enum: readonly ["asc", "desc"];
                    readonly default: "desc";
                    readonly description: "Order to sort the result set in";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["blockchain", "sort_by"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly additionalProperties: true;
                    };
                };
                readonly pagination: {
                    readonly type: "object";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetNftHolders: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly contract_address: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                        readonly description: "Metric group for market / collection";
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Metric group values to return";
                };
                readonly token_id: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                        readonly description: "Token IDs of NFT Contract";
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Token is_washtrade of NFT Contract";
                };
                readonly blockchain: {
                    readonly type: "string";
                    readonly enum: readonly ["ethereum", "binance", "bitcoin", "polygon", "solana", "avalanche", "linea"];
                    readonly default: "ethereum";
                    readonly description: "Filter or get aggregate blockchain data";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly time_range: {
                    readonly type: "string";
                    readonly enum: readonly ["24h", "7d", "30d", "90d", "all"];
                    readonly default: "24h";
                    readonly description: "Time range to filter results";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly sort_by: {
                    readonly type: "string";
                    readonly enum: readonly ["past_owners_count", "hold_duration", "holders", "holders_change", "wallet_holder_new"];
                    readonly default: "past_owners_count";
                    readonly description: "Property to sort result set by";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly sort_order: {
                    readonly type: "string";
                    readonly enum: readonly ["asc", "desc"];
                    readonly default: "desc";
                    readonly description: "Order to sort the result set in";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly offset: {
                    readonly type: "integer";
                    readonly minimum: 0;
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Index of the page to return";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly maximum: 100;
                    readonly default: 30;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Number of items to return in the result set";
                };
            };
            readonly required: readonly ["blockchain", "sort_by"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly additionalProperties: true;
                    };
                };
                readonly pagination: {
                    readonly type: "object";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetNftLiquifyCollectionPriceEstimate: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly blockchain: {
                    readonly type: "string";
                    readonly enum: readonly ["ethereum", "binance", "polygon", "solana", "avalanche", "linea"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Filter or get aggregate blockchain data";
                };
                readonly contract_address: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Address of the contract";
                };
                readonly offset: {
                    readonly type: "integer";
                    readonly minimum: 0;
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Index of the page to return";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly maximum: 100;
                    readonly default: 30;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Number of items to return in the result set";
                };
            };
            readonly required: readonly ["blockchain", "contract_address"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly additionalProperties: true;
                    };
                };
                readonly pagination: {
                    readonly type: "object";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetNftLiquifyCollectionSupportedCollections: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly blockchain: {
                    readonly type: "string";
                    readonly enum: readonly ["ethereum", "binance", "polygon", "solana", "avalanche", "linea"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Filter or get aggregate blockchain data";
                };
                readonly offset: {
                    readonly type: "integer";
                    readonly minimum: 0;
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Index of the page to return";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly maximum: 100;
                    readonly default: 30;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Number of items to return in the result set";
                };
            };
            readonly required: readonly ["blockchain"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly additionalProperties: true;
                    };
                };
                readonly pagination: {
                    readonly type: "object";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetNftLiquifyPriceEstimate: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly blockchain: {
                    readonly type: "string";
                    readonly enum: readonly ["ethereum", "binance", "polygon", "solana", "avalanche", "linea"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Filter or get aggregate blockchain data";
                };
                readonly contract_address: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Address of the contract";
                };
                readonly token_id: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "token id of the contract address";
                };
            };
            readonly required: readonly ["blockchain", "contract_address", "token_id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly additionalProperties: true;
                    };
                };
                readonly pagination: {
                    readonly type: "object";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetNftMarketInsightsAnalytics: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly blockchain: {
                    readonly type: "string";
                    readonly enum: readonly ["ethereum", "binance", "polygon", "solana", "avalanche", "linea", "bitcoin", "unichain_sepolia", "full"];
                    readonly default: "ethereum";
                    readonly description: "Filter or get aggregate blockchain data";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly time_range: {
                    readonly type: "string";
                    readonly enum: readonly ["15m", "30m", "24h", "7d", "30d", "90d", "all"];
                    readonly default: "24h";
                    readonly description: "Time range to filter results";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly additionalProperties: true;
                    };
                };
                readonly pagination: {
                    readonly type: "object";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetNftMarketInsightsHolders: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly blockchain: {
                    readonly type: "string";
                    readonly enum: readonly ["ethereum", "binance", "polygon", "solana", "avalanche", "linea", "bitcoin", "unichain_sepolia", "full"];
                    readonly default: "ethereum";
                    readonly description: "Filter or get aggregate blockchain data";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly time_range: {
                    readonly type: "string";
                    readonly enum: readonly ["24h", "7d", "30d", "90d", "all"];
                    readonly default: "24h";
                    readonly description: "Time range to filter results";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly additionalProperties: true;
                    };
                };
                readonly pagination: {
                    readonly type: "object";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetNftMarketInsightsScores: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly blockchain: {
                    readonly type: "string";
                    readonly enum: readonly ["ethereum", "binance", "polygon", "solana", "avalanche", "linea", "bitcoin", "unichain_sepolia", "full"];
                    readonly default: "ethereum";
                    readonly description: "Filter or get aggregate blockchain data";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly time_range: {
                    readonly type: "string";
                    readonly enum: readonly ["24h", "7d", "30d", "90d", "all"];
                    readonly default: "24h";
                    readonly description: "Time range to filter results";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly additionalProperties: true;
                    };
                };
                readonly pagination: {
                    readonly type: "object";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetNftMarketInsightsTraders: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly blockchain: {
                    readonly type: "string";
                    readonly enum: readonly ["ethereum", "binance", "polygon", "solana", "avalanche", "linea", "bitcoin", "unichain_sepolia", "full"];
                    readonly default: "ethereum";
                    readonly description: "Filter or get aggregate blockchain data";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly time_range: {
                    readonly type: "string";
                    readonly enum: readonly ["15m", "30m", "24h", "7d", "30d", "90d", "all"];
                    readonly default: "24h";
                    readonly description: "Time range to filter results";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly additionalProperties: true;
                    };
                };
                readonly pagination: {
                    readonly type: "object";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetNftMarketInsightsWashtrade: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly blockchain: {
                    readonly type: "string";
                    readonly enum: readonly ["ethereum", "binance", "polygon", "solana", "avalanche", "linea", "bitcoin", "unichain_sepolia", "full"];
                    readonly default: "ethereum";
                    readonly description: "Filter or get aggregate blockchain data";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly time_range: {
                    readonly type: "string";
                    readonly enum: readonly ["24h", "7d", "30d", "90d", "all"];
                    readonly default: "24h";
                    readonly description: "Time range to filter results";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly additionalProperties: true;
                    };
                };
                readonly pagination: {
                    readonly type: "object";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetNftMarketplaceAnalytics: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly blockchain: {
                    readonly type: "string";
                    readonly enum: readonly ["ethereum", "binance", "polygon", "solana", "avalanche", "linea", "bitcoin", "full"];
                    readonly default: "ethereum";
                    readonly description: "Filter or get aggregate blockchain data";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly time_range: {
                    readonly type: "string";
                    readonly enum: readonly ["15m", "30m", "24h", "7d", "30d", "90d", "all"];
                    readonly default: "24h";
                    readonly description: "Time range to filter results";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly sort_by: {
                    readonly type: "string";
                    readonly enum: readonly ["name"];
                    readonly default: "name";
                    readonly description: "Property to sort result set by";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly sort_order: {
                    readonly type: "string";
                    readonly enum: readonly ["asc", "desc"];
                    readonly default: "desc";
                    readonly description: "Order to sort the result set in";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly offset: {
                    readonly type: "integer";
                    readonly minimum: 0;
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Index of the page to return";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly maximum: 100;
                    readonly default: 30;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Number of items to return in the result set";
                };
                readonly name: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                        readonly description: "Metric group for market";
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Metric group values to return";
                };
            };
            readonly required: readonly ["sort_by"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly additionalProperties: true;
                    };
                };
                readonly pagination: {
                    readonly type: "object";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetNftMarketplaceHolders: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly blockchain: {
                    readonly type: "string";
                    readonly enum: readonly ["ethereum", "binance", "polygon", "solana", "avalanche", "linea", "bitcoin", "full"];
                    readonly default: "ethereum";
                    readonly description: "Filter or get aggregate blockchain data";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly time_range: {
                    readonly type: "string";
                    readonly enum: readonly ["24h", "7d", "30d", "90d", "all"];
                    readonly default: "24h";
                    readonly description: "Time range to filter results";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly sort_by: {
                    readonly type: "string";
                    readonly enum: readonly ["name"];
                    readonly default: "name";
                    readonly description: "Property to sort result set by";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly sort_order: {
                    readonly type: "string";
                    readonly enum: readonly ["asc", "desc"];
                    readonly default: "desc";
                    readonly description: "Order to sort the result set in";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly offset: {
                    readonly type: "integer";
                    readonly minimum: 0;
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Index of the page to return";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly maximum: 100;
                    readonly default: 30;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Number of items to return in the result set";
                };
                readonly name: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                        readonly description: "Metric group for market";
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Metric group values to return";
                };
            };
            readonly required: readonly ["sort_by"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly additionalProperties: true;
                    };
                };
                readonly pagination: {
                    readonly type: "object";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetNftMarketplaceMetadata: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly sort_order: {
                    readonly type: "string";
                    readonly enum: readonly ["asc", "desc"];
                    readonly default: "desc";
                    readonly description: "Order to sort the result set in";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly offset: {
                    readonly type: "integer";
                    readonly minimum: 0;
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Index of the page to return";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly maximum: 100;
                    readonly default: 30;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Number of items to return in the result set";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly additionalProperties: true;
                    };
                };
                readonly pagination: {
                    readonly type: "object";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetNftMarketplaceTraders: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly blockchain: {
                    readonly type: "string";
                    readonly enum: readonly ["ethereum", "binance", "polygon", "solana", "avalanche", "linea", "bitcoin", "full"];
                    readonly default: "ethereum";
                    readonly description: "Filter or get aggregate blockchain data";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly time_range: {
                    readonly type: "string";
                    readonly enum: readonly ["15m", "30m", "24h", "7d", "30d", "90d", "all"];
                    readonly default: "24h";
                    readonly description: "Time range to filter results";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly sort_by: {
                    readonly type: "string";
                    readonly enum: readonly ["name"];
                    readonly default: "name";
                    readonly description: "Property to sort result set by";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly sort_order: {
                    readonly type: "string";
                    readonly enum: readonly ["asc", "desc"];
                    readonly default: "desc";
                    readonly description: "Order to sort the result set in";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly offset: {
                    readonly type: "integer";
                    readonly minimum: 0;
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Index of the page to return";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly maximum: 100;
                    readonly default: 30;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Number of items to return in the result set";
                };
                readonly name: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                        readonly description: "Metric group for market";
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Metric group values to return";
                };
            };
            readonly required: readonly ["sort_by"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly additionalProperties: true;
                    };
                };
                readonly pagination: {
                    readonly type: "object";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetNftMarketplaceWashtrade: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly blockchain: {
                    readonly type: "string";
                    readonly enum: readonly ["ethereum", "binance", "polygon", "solana", "avalanche", "linea", "bitcoin", "full"];
                    readonly default: "ethereum";
                    readonly description: "Filter or get aggregate blockchain data";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly time_range: {
                    readonly type: "string";
                    readonly enum: readonly ["24h", "7d", "30d", "90d", "all"];
                    readonly default: "24h";
                    readonly description: "Time range to filter results";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly sort_by: {
                    readonly type: "string";
                    readonly enum: readonly ["name"];
                    readonly default: "name";
                    readonly description: "Property to sort result set by";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly sort_order: {
                    readonly type: "string";
                    readonly enum: readonly ["asc", "desc"];
                    readonly default: "desc";
                    readonly description: "Order to sort the result set in";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly offset: {
                    readonly type: "integer";
                    readonly minimum: 0;
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Index of the page to return";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly maximum: 100;
                    readonly default: 30;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Number of items to return in the result set";
                };
                readonly name: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                        readonly description: "Metric group for market";
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Metric group values to return";
                };
            };
            readonly required: readonly ["sort_by"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly additionalProperties: true;
                    };
                };
                readonly pagination: {
                    readonly type: "object";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetNftScores: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly contract_address: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                        readonly description: "Metric group for market / collection";
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Metric group values to return";
                };
                readonly token_id: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                        readonly description: "Token IDs of NFT Contract";
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Token is_washtrade of NFT Contract";
                };
                readonly blockchain: {
                    readonly type: "string";
                    readonly enum: readonly ["ethereum", "binance", "bitcoin", "polygon", "solana", "avalanche", "linea"];
                    readonly default: "ethereum";
                    readonly description: "Filter or get aggregate blockchain data";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly time_range: {
                    readonly type: "string";
                    readonly enum: readonly ["24h", "7d", "30d", "90d", "all"];
                    readonly default: "24h";
                    readonly description: "Time range to filter results";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly sort_by: {
                    readonly type: "string";
                    readonly enum: readonly ["price_ceiling", "all_time_low", "start_price", "price", "max_price", "washtrade_status", "rarity_rank", "rarity_score", "estimated_price"];
                    readonly default: "price_ceiling";
                    readonly description: "Property to sort result set by";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly sort_order: {
                    readonly type: "string";
                    readonly enum: readonly ["asc", "desc"];
                    readonly default: "desc";
                    readonly description: "Order to sort the result set in";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly offset: {
                    readonly type: "integer";
                    readonly minimum: 0;
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Index of the page to return";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly maximum: 100;
                    readonly default: 30;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Number of items to return in the result set";
                };
            };
            readonly required: readonly ["blockchain", "sort_by"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly additionalProperties: true;
                    };
                };
                readonly pagination: {
                    readonly type: "object";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetNftTopDeals: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly sort_by: {
                    readonly type: "string";
                    readonly enum: readonly ["deal_score", "listing_timestamp"];
                    readonly default: "deal_score";
                    readonly description: "Property to sort result set by";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly sort_order: {
                    readonly type: "string";
                    readonly enum: readonly ["asc", "desc"];
                    readonly default: "desc";
                    readonly description: "Order to sort the result set in";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly offset: {
                    readonly type: "integer";
                    readonly minimum: 0;
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Index of the page to return";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly maximum: 100;
                    readonly default: 30;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Number of items to return in the result set";
                };
            };
            readonly required: readonly ["sort_by"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly additionalProperties: true;
                    };
                };
                readonly pagination: {
                    readonly type: "object";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetNftTraders: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly contract_address: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                        readonly description: "Metric group for market / collection";
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Metric group values to return";
                };
                readonly token_id: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                        readonly description: "Token IDs of NFT Contract";
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Token is_washtrade of NFT Contract";
                };
                readonly blockchain: {
                    readonly type: "string";
                    readonly enum: readonly ["ethereum", "binance", "bitcoin", "polygon", "solana", "avalanche", "linea"];
                    readonly default: "ethereum";
                    readonly description: "Filter or get aggregate blockchain data";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly time_range: {
                    readonly type: "string";
                    readonly enum: readonly ["15m", "30m", "24h", "7d", "30d", "90d", "all"];
                    readonly default: "24h";
                    readonly description: "Time range to filter results";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly sort_by: {
                    readonly type: "string";
                    readonly enum: readonly ["traders", "traders_change", "traders_buyers", "traders_sellers", "traders_buyers_change", "traders_sellers_change", "traders_ratio", "traders_ratio_change"];
                    readonly default: "traders";
                    readonly description: "Property to sort result set by";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly sort_order: {
                    readonly type: "string";
                    readonly enum: readonly ["asc", "desc"];
                    readonly default: "desc";
                    readonly description: "Order to sort the result set in";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly offset: {
                    readonly type: "integer";
                    readonly minimum: 0;
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Index of the page to return";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly maximum: 100;
                    readonly default: 30;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Number of items to return in the result set";
                };
            };
            readonly required: readonly ["blockchain", "sort_by"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly additionalProperties: true;
                    };
                };
                readonly pagination: {
                    readonly type: "object";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetNftTransactions: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly blockchain: {
                    readonly type: "string";
                    readonly enum: readonly ["ethereum", "binance", "bitcoin", "polygon", "solana", "avalanche", "linea"];
                    readonly default: "ethereum";
                    readonly description: "Filter or get aggregate blockchain data";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly time_range: {
                    readonly type: "string";
                    readonly enum: readonly ["24h", "7d", "30d", "90d", "all"];
                    readonly default: "24h";
                    readonly description: "Time range to filter results";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly contract_address: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                        readonly description: "Metric group for market / collection";
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Metric group values to return";
                };
                readonly token_id: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                        readonly description: "Token IDs of NFT Contract";
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Token is_washtrade of NFT Contract";
                };
                readonly offset: {
                    readonly type: "integer";
                    readonly minimum: 0;
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Index of the page to return";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly maximum: 100;
                    readonly default: 30;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Number of items to return in the result set";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly additionalProperties: true;
                    };
                };
                readonly pagination: {
                    readonly type: "object";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetNftWalletAnalytics: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly wallet: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                        readonly description: "Metric group for market";
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Metric group values to return";
                };
                readonly blockchain: {
                    readonly type: "string";
                    readonly enum: readonly ["ethereum", "binance", "bitcoin", "polygon", "solana", "avalanche", "linea"];
                    readonly default: "ethereum";
                    readonly description: "Filter or get aggregate blockchain data";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly time_range: {
                    readonly type: "string";
                    readonly enum: readonly ["15m", "30m", "24h", "7d", "30d", "90d", "all"];
                    readonly default: "24h";
                    readonly description: "Time range to filter results";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly sort_by: {
                    readonly type: "string";
                    readonly enum: readonly ["volume", "sales", "transactions", "transfers", "nft_burn", "nft_transfer", "nft_mint", "nft_bought", "nft_sold", "minted_value", "volume_change", "sales_change", "transactions_change", "transfers_change", "nft_burn_change", "nft_transfer_change", "nft_mint_change", "nft_bought_change", "nft_sold_change", "minted_value_change", "buy_volume", "sell_volume"];
                    readonly default: "volume";
                    readonly description: "Property to sort result set by";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly sort_order: {
                    readonly type: "string";
                    readonly enum: readonly ["asc", "desc"];
                    readonly default: "desc";
                    readonly description: "Order to sort the result set in";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly offset: {
                    readonly type: "integer";
                    readonly minimum: 0;
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Index of the page to return";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly maximum: 100;
                    readonly default: 30;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Number of items to return in the result set";
                };
            };
            readonly required: readonly ["blockchain", "sort_by"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly additionalProperties: true;
                    };
                };
                readonly pagination: {
                    readonly type: "object";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetNftWalletGamingCollectionMetrics: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly blockchain: {
                    readonly type: "string";
                    readonly enum: readonly ["ethereum", "binance", "polygon", "solana", "avalanche", "linea"];
                    readonly default: "ethereum";
                    readonly description: "Filter or get aggregate blockchain data";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly contract_address: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                        readonly description: "Metric group for market / collection";
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Metric group values to return";
                };
                readonly time_range: {
                    readonly type: "string";
                    readonly enum: readonly ["24h", "7d", "30d", "90d", "all"];
                    readonly default: "24h";
                    readonly description: "Time range to filter results";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly offset: {
                    readonly type: "integer";
                    readonly minimum: 0;
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Index of the page to return";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly maximum: 100;
                    readonly default: 30;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Number of items to return in the result set";
                };
                readonly sort_by: {
                    readonly type: "string";
                    readonly enum: readonly ["total_users", "total_users_change", "total_interactions_volume", "total_interactions_volume_change", "total_marketcap", "total_marketcap_change", "active_users", "active_users_change", "retention_rate", "retention_rate_change", "game_interactions", "game_interactions_change", "total_interaction", "total_interaction_change", "interaction_rate", "interaction_rate_change", "bot_count", "bot_native_price", "bot_volume", "unique_wallets", "unique_wallets_change", "avg_earnings", "game_revenue", "game_activity", "avg_game_action", "nft_count"];
                    readonly default: "total_users";
                    readonly description: "Property to sort result set by";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly sort_order: {
                    readonly type: "string";
                    readonly enum: readonly ["asc", "desc"];
                    readonly default: "desc";
                    readonly description: "Order to sort the result set in";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["sort_by"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly additionalProperties: true;
                    };
                };
                readonly pagination: {
                    readonly type: "object";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetNftWalletGamingCollectionTrend: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly blockchain: {
                    readonly type: "string";
                    readonly enum: readonly ["ethereum", "binance", "polygon", "solana", "avalanche", "linea"];
                    readonly default: "ethereum";
                    readonly description: "Filter or get aggregate blockchain data";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly contract_address: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                        readonly description: "Metric group for market / collection";
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Metric group values to return";
                };
                readonly time_range: {
                    readonly type: "string";
                    readonly enum: readonly ["24h", "7d", "30d", "90d", "all"];
                    readonly default: "24h";
                    readonly description: "Time range to filter results";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly offset: {
                    readonly type: "integer";
                    readonly minimum: 0;
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Index of the page to return";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly maximum: 100;
                    readonly default: 30;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Number of items to return in the result set";
                };
                readonly sort_by: {
                    readonly type: "string";
                    readonly enum: readonly ["active_users", "active_users_change", "game_interactions", "game_interactions_change", "avg_earnings", "game_revenue", "game_activity", "avg_game_action", "maxdate"];
                    readonly default: "active_users";
                    readonly description: "Property to sort result set by";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly sort_order: {
                    readonly type: "string";
                    readonly enum: readonly ["asc", "desc"];
                    readonly default: "desc";
                    readonly description: "Order to sort the result set in";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["sort_by"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly additionalProperties: true;
                    };
                };
                readonly pagination: {
                    readonly type: "object";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetNftWalletGamingMetrics: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly blockchain: {
                    readonly type: "string";
                    readonly enum: readonly ["ethereum", "binance", "polygon", "solana", "avalanche", "linea"];
                    readonly default: "ethereum";
                    readonly description: "Filter or get aggregate blockchain data";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly contract_address: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                        readonly description: "Metric group for market / collection";
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Metric group values to return";
                };
                readonly time_range: {
                    readonly type: "string";
                    readonly enum: readonly ["24h", "7d", "30d", "90d", "all"];
                    readonly default: "24h";
                    readonly description: "Time range to filter results";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly offset: {
                    readonly type: "integer";
                    readonly minimum: 0;
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Index of the page to return";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly maximum: 100;
                    readonly default: 30;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Number of items to return in the result set";
                };
                readonly sort_by: {
                    readonly type: "string";
                    readonly enum: readonly ["total_users", "total_users_change", "total_interactions_volume", "total_interactions_volume_change", "nft_count", "total_marketcap", "total_marketcap_change", "unique_wallets", "unique_wallets_change", "avg_earnings", "game_revenue", "game_activity", "avg_game_action", "active_users", "active_users_change", "retention_rate", "retention_rate_change", "game_interactions", "game_interactions_change", "total_interaction", "total_interaction_change", "interaction_rate", "interaction_rate_change", "bot_count", "bot_native_price", "bot_volume", "churn_rate", "retained_players", "retained_players_percentage", "overall_transactions", "transactions_excluding_bots", "transactions_including_bots", "trending_players", "engagement_rate"];
                    readonly default: "total_users";
                    readonly description: "Property to sort result set by";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly sort_order: {
                    readonly type: "string";
                    readonly enum: readonly ["asc", "desc"];
                    readonly default: "desc";
                    readonly description: "Order to sort the result set in";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["sort_by"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly additionalProperties: true;
                    };
                };
                readonly pagination: {
                    readonly type: "object";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetNftWalletProfile: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly wallet: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                        readonly description: "Metric group for market";
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Metric group values to return";
                };
                readonly offset: {
                    readonly type: "integer";
                    readonly minimum: 0;
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Index of the page to return";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly maximum: 100;
                    readonly default: 30;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Number of items to return in the result set";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly additionalProperties: true;
                    };
                };
                readonly pagination: {
                    readonly type: "object";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetNftWalletScores: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly wallet: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                        readonly description: "Metric group for market";
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Metric group values to return";
                };
                readonly blockchain: {
                    readonly type: "string";
                    readonly enum: readonly ["ethereum", "binance", "bitcoin", "polygon", "solana", "avalanche", "linea"];
                    readonly default: "ethereum";
                    readonly description: "Filter or get aggregate blockchain data";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly sort_by: {
                    readonly type: "string";
                    readonly enum: readonly ["portfolio_value", "unrealized_profit", "estimated_portfolio_value", "collection_count", "nft_count", "washtrade_nft_count", "realized_profit"];
                    readonly default: "portfolio_value";
                    readonly description: "Property to sort result set by";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly sort_order: {
                    readonly type: "string";
                    readonly enum: readonly ["asc", "desc"];
                    readonly default: "desc";
                    readonly description: "Order to sort the result set in";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly time_range: {
                    readonly type: "string";
                    readonly enum: readonly ["24h", "7d", "30d", "90d", "all"];
                    readonly default: "24h";
                    readonly description: "Time range to filter results";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly offset: {
                    readonly type: "integer";
                    readonly minimum: 0;
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Index of the page to return";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly maximum: 100;
                    readonly default: 30;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Number of items to return in the result set";
                };
            };
            readonly required: readonly ["blockchain", "sort_by"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly additionalProperties: true;
                    };
                };
                readonly pagination: {
                    readonly type: "object";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetNftWalletTraders: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly wallet: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                        readonly description: "Metric group for market";
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Metric group values to return";
                };
                readonly blockchain: {
                    readonly type: "string";
                    readonly enum: readonly ["ethereum", "binance", "bitcoin", "polygon", "solana", "avalanche", "linea"];
                    readonly default: "ethereum";
                    readonly description: "Filter or get aggregate blockchain data";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly time_range: {
                    readonly type: "string";
                    readonly enum: readonly ["15m", "30m", "24h", "7d", "30d", "90d", "all"];
                    readonly default: "24h";
                    readonly description: "Time range to filter results";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly sort_by: {
                    readonly type: "string";
                    readonly enum: readonly ["traders", "traders_change", "traders_buyers", "traders_buyers_change", "traders_sellers", "traders_sellers_change"];
                    readonly default: "traders";
                    readonly description: "Property to sort result set by";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly sort_order: {
                    readonly type: "string";
                    readonly enum: readonly ["asc", "desc"];
                    readonly default: "desc";
                    readonly description: "Order to sort the result set in";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly offset: {
                    readonly type: "integer";
                    readonly minimum: 0;
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Index of the page to return";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly maximum: 100;
                    readonly default: 30;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Number of items to return in the result set";
                };
            };
            readonly required: readonly ["blockchain", "sort_by"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly additionalProperties: true;
                    };
                };
                readonly pagination: {
                    readonly type: "object";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetNftWalletWashtrade: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly wallet: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                        readonly description: "Metric group for market";
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Metric group values to return";
                };
                readonly blockchain: {
                    readonly type: "string";
                    readonly enum: readonly ["ethereum", "binance", "bitcoin", "polygon", "solana", "avalanche", "linea"];
                    readonly default: "ethereum";
                    readonly description: "Filter or get aggregate blockchain data";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly sort_by: {
                    readonly type: "string";
                    readonly enum: readonly ["washtrade_volume", "washtrade_suspect_sales", "washtrade_suspect_sales_change", "washtrade_volume_change"];
                    readonly default: "washtrade_volume";
                    readonly description: "Property to sort result set by";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly sort_order: {
                    readonly type: "string";
                    readonly enum: readonly ["asc", "desc"];
                    readonly default: "desc";
                    readonly description: "Order to sort the result set in";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly time_range: {
                    readonly type: "string";
                    readonly enum: readonly ["24h", "7d", "30d", "90d", "all"];
                    readonly default: "24h";
                    readonly description: "Time range to filter results";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly offset: {
                    readonly type: "integer";
                    readonly minimum: 0;
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Index of the page to return";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly maximum: 100;
                    readonly default: 30;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Number of items to return in the result set";
                };
            };
            readonly required: readonly ["blockchain", "sort_by"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly additionalProperties: true;
                    };
                };
                readonly pagination: {
                    readonly type: "object";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetNftWashtrade: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly contract_address: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                        readonly description: "Metric group for market / collection";
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Metric group values to return";
                };
                readonly token_id: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                        readonly description: "Token IDs of NFT Contract";
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Token is_washtrade of NFT Contract";
                };
                readonly blockchain: {
                    readonly type: "string";
                    readonly enum: readonly ["ethereum", "binance", "bitcoin", "polygon", "solana", "avalanche", "linea"];
                    readonly default: "ethereum";
                    readonly description: "Filter or get aggregate blockchain data";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly time_range: {
                    readonly type: "string";
                    readonly enum: readonly ["24h", "7d", "30d", "90d", "all"];
                    readonly default: "24h";
                    readonly description: "Time range to filter results";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly sort_by: {
                    readonly type: "string";
                    readonly enum: readonly ["washtrade_volume", "washtrade_suspect_sales", "washtrade_assets", "washtrade_wallets", "washtrade_volume_change", "washtrade_suspect_sales_change", "washtrade_assets_change", "washtrade_wallets_change", "washtrade_suspect_transactions", "washtrade_suspect_transactions_change"];
                    readonly default: "washtrade_volume";
                    readonly description: "Property to sort result set by";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly sort_order: {
                    readonly type: "string";
                    readonly enum: readonly ["asc", "desc"];
                    readonly default: "desc";
                    readonly description: "Order to sort the result set in";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly offset: {
                    readonly type: "integer";
                    readonly minimum: 0;
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Index of the page to return";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly maximum: 100;
                    readonly default: 30;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Number of items to return in the result set";
                };
            };
            readonly required: readonly ["blockchain", "sort_by"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly additionalProperties: true;
                    };
                };
                readonly pagination: {
                    readonly type: "object";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetTokenBalance: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly blockchain: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                        readonly description: "Filter or get aggregate blockchain data";
                        readonly enum: readonly ["ethereum", "polygon", "avalanche", "linea"];
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Filter or get aggregate blockchain data";
                };
                readonly token_address: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                        readonly description: "Token Address of ERC20 Tokens";
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Address of the Token";
                };
                readonly address: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                        readonly description: "Address of the Wallet";
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Address of the Wallet";
                };
                readonly offset: {
                    readonly type: "integer";
                    readonly minimum: 0;
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Index of the page to return";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly maximum: 100;
                    readonly default: 30;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Number of items to return in the result set";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly additionalProperties: true;
                    };
                };
                readonly pagination: {
                    readonly type: "object";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetTokenHolders: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly blockchain: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                        readonly description: "Filter or get aggregate blockchain data";
                        readonly enum: readonly ["ethereum", "polygon", "avalanche", "linea"];
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Filter or get aggregate blockchain data";
                };
                readonly token_address: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                        readonly description: "Token Address of ERC20 Tokens";
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Address of the Token";
                };
                readonly offset: {
                    readonly type: "integer";
                    readonly minimum: 0;
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Index of the page to return";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly maximum: 100;
                    readonly default: 30;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Number of items to return in the result set";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly additionalProperties: true;
                    };
                };
                readonly pagination: {
                    readonly type: "object";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetTokenMetrics: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly blockchain: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                        readonly description: "Filter or get aggregate blockchain data";
                        readonly enum: readonly ["ethereum", "polygon", "avalanche", "linea"];
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Filter or get aggregate blockchain data";
                };
                readonly token_address: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                        readonly description: "Token Address of ERC20 Tokens";
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Address of the Token";
                };
                readonly offset: {
                    readonly type: "integer";
                    readonly minimum: 0;
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Index of the page to return";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly maximum: 100;
                    readonly default: 30;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Number of items to return in the result set";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly additionalProperties: true;
                    };
                };
                readonly pagination: {
                    readonly type: "object";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetTokenPricePrediction: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly token_address: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                        readonly description: "Token Address of ERC20 Tokens";
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Address of the Token";
                };
                readonly offset: {
                    readonly type: "integer";
                    readonly minimum: 0;
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Index of the page to return";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly maximum: 100;
                    readonly default: 30;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Number of items to return in the result set";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly additionalProperties: true;
                    };
                };
                readonly pagination: {
                    readonly type: "object";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetTokenTransfers: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly token_address: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                        readonly description: "Token Address of ERC20 Tokens";
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Address of the Token";
                };
                readonly blockchain: {
                    readonly type: "string";
                    readonly enum: readonly ["ethereum", "polygon", "avalanche", "linea"];
                    readonly default: "ethereum";
                    readonly description: "Filter or get aggregate blockchain data";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly time_range: {
                    readonly type: "string";
                    readonly enum: readonly ["all"];
                    readonly default: "all";
                    readonly description: "Time range to filter results";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly offset: {
                    readonly type: "integer";
                    readonly minimum: 0;
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Index of the page to return";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly maximum: 100;
                    readonly default: 30;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Number of items to return in the result set";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly additionalProperties: true;
                    };
                };
                readonly pagination: {
                    readonly type: "object";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetWalletBalanceDefi: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly address: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                        readonly description: "Wallet Address";
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Address of the Wallets";
                };
                readonly blockchain: {
                    readonly type: "string";
                    readonly enum: readonly ["ethereum", "polygon", "avalanche", "linea", "full"];
                    readonly default: "ethereum";
                    readonly description: "Filter or get aggregate blockchain data";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly time_range: {
                    readonly type: "string";
                    readonly enum: readonly ["all"];
                    readonly default: "all";
                    readonly description: "Time range to filter results";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly offset: {
                    readonly type: "integer";
                    readonly minimum: 0;
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Index of the page to return";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly maximum: 100;
                    readonly default: 30;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Number of items to return in the result set";
                };
            };
            readonly required: readonly ["address"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly additionalProperties: true;
                    };
                };
                readonly pagination: {
                    readonly type: "object";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetWalletBalanceNft: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly wallet: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                        readonly description: "Wallet Address";
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Address of the Wallets";
                };
                readonly blockchain: {
                    readonly type: "string";
                    readonly enum: readonly ["ethereum", "polygon", "avalanche", "linea", "binance", "bitcoin", "solana", "unichain_sepolia"];
                    readonly default: "ethereum";
                    readonly description: "Filter or get aggregate blockchain data";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly time_range: {
                    readonly type: "string";
                    readonly enum: readonly ["all"];
                    readonly default: "all";
                    readonly description: "Time range to filter results";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly offset: {
                    readonly type: "integer";
                    readonly minimum: 0;
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Index of the page to return";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly maximum: 100;
                    readonly default: 30;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Number of items to return in the result set";
                };
            };
            readonly required: readonly ["wallet"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly additionalProperties: true;
                    };
                };
                readonly pagination: {
                    readonly type: "object";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetWalletBalanceToken: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly address: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                        readonly description: "Wallet Address";
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Address of the Wallets";
                };
                readonly blockchain: {
                    readonly type: "string";
                    readonly enum: readonly ["ethereum", "polygon", "avalanche", "linea", "unichain_sepolia", "full"];
                    readonly default: "ethereum";
                    readonly description: "Filter or get aggregate blockchain data";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly time_range: {
                    readonly type: "string";
                    readonly enum: readonly ["all"];
                    readonly default: "all";
                    readonly description: "Time range to filter results";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly offset: {
                    readonly type: "integer";
                    readonly minimum: 0;
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Index of the page to return";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly maximum: 100;
                    readonly default: 30;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Number of items to return in the result set";
                };
            };
            readonly required: readonly ["address"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly additionalProperties: true;
                    };
                };
                readonly pagination: {
                    readonly type: "object";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetWalletLabel: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly address: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                        readonly description: "Wallet Address";
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Address of the Wallets";
                };
                readonly blockchain: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                        readonly enum: readonly ["ethereum", "polygon", "avalanche", "solana", "bitcoin", "linea", "binance"];
                        readonly default: "ethereum";
                        readonly description: "Wallet Address\n\nDefault: `ethereum`";
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Blockchain of the Wallets";
                };
                readonly offset: {
                    readonly type: "integer";
                    readonly minimum: 0;
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Index of the page to return";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly maximum: 100;
                    readonly default: 30;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Number of items to return in the result set";
                };
            };
            readonly required: readonly ["address"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly additionalProperties: true;
                    };
                };
                readonly pagination: {
                    readonly type: "object";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
export { GetBlockchains, GetDefiPool, GetDefiPoolMetadata, GetDefiPoolMetrics, GetDefiPoolSupportedProtocols, GetNftAnalytics, GetNftBrandCategory, GetNftBrandContractMetadata, GetNftBrandContractMetrics, GetNftBrandContractProfile, GetNftBrandMetadata, GetNftBrandMetrics, GetNftBrandProfile, GetNftCollectionAnalytics, GetNftCollectionCategories, GetNftCollectionHolders, GetNftCollectionMetadata, GetNftCollectionProfile, GetNftCollectionScores, GetNftCollectionTraders, GetNftCollectionWashtrade, GetNftCollectionWhales, GetNftHolders, GetNftLiquifyCollectionPriceEstimate, GetNftLiquifyCollectionSupportedCollections, GetNftLiquifyPriceEstimate, GetNftMarketInsightsAnalytics, GetNftMarketInsightsHolders, GetNftMarketInsightsScores, GetNftMarketInsightsTraders, GetNftMarketInsightsWashtrade, GetNftMarketplaceAnalytics, GetNftMarketplaceHolders, GetNftMarketplaceMetadata, GetNftMarketplaceTraders, GetNftMarketplaceWashtrade, GetNftScores, GetNftTopDeals, GetNftTraders, GetNftTransactions, GetNftWalletAnalytics, GetNftWalletGamingCollectionMetrics, GetNftWalletGamingCollectionTrend, GetNftWalletGamingMetrics, GetNftWalletProfile, GetNftWalletScores, GetNftWalletTraders, GetNftWalletWashtrade, GetNftWashtrade, GetTokenBalance, GetTokenHolders, GetTokenMetrics, GetTokenPricePrediction, GetTokenTransfers, GetWalletBalanceDefi, GetWalletBalanceNft, GetWalletBalanceToken, GetWalletLabel };
