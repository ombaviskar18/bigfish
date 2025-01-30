"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var oas_1 = __importDefault(require("oas"));
var core_1 = __importDefault(require("api/dist/core"));
var openapi_json_1 = __importDefault(require("./openapi.json"));
var SDK = /** @class */ (function () {
    function SDK() {
        this.spec = oas_1.default.init(openapi_json_1.default);
        this.core = new core_1.default(this.spec, 'unleashnfts/1.0.0 (api/6.1.2)');
    }
    /**
     * Optionally configure various options that the SDK allows.
     *
     * @param config Object of supported SDK options and toggles.
     * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
     * should be represented in milliseconds.
     */
    SDK.prototype.config = function (config) {
        this.core.setConfig(config);
    };
    /**
     * If the API you're using requires authentication you can supply the required credentials
     * through this method and the library will magically determine how they should be used
     * within your API request.
     *
     * With the exception of OpenID and MutualTLS, it supports all forms of authentication
     * supported by the OpenAPI specification.
     *
     * @example <caption>HTTP Basic auth</caption>
     * sdk.auth('username', 'password');
     *
     * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
     * sdk.auth('myBearerToken');
     *
     * @example <caption>API Keys</caption>
     * sdk.auth('myApiKey');
     *
     * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
     * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
     * @param values Your auth credentials for the API; can specify up to two strings or numbers.
     */
    SDK.prototype.auth = function () {
        var _a;
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        (_a = this.core).setAuth.apply(_a, values);
        return this;
    };
    /**
     * If the API you're using offers alternate server URLs, and server variables, you can tell
     * the SDK which one to use with this method. To use it you can supply either one of the
     * server URLs that are contained within the OpenAPI definition (along with any server
     * variables), or you can pass it a fully qualified URL to use (that may or may not exist
     * within the OpenAPI definition).
     *
     * @example <caption>Server URL with server variables</caption>
     * sdk.server('https://{region}.api.example.com/{basePath}', {
     *   name: 'eu',
     *   basePath: 'v14',
     * });
     *
     * @example <caption>Fully qualified server URL</caption>
     * sdk.server('https://eu.api.example.com/v14');
     *
     * @param url Server URL
     * @param variables An object of variables to replace into the server URL.
     */
    SDK.prototype.server = function (url, variables) {
        if (variables === void 0) { variables = {}; }
        this.core.setServer(url, variables);
    };
    /**
     * Gets information about the supported blockchains and their corresponding chain IDs.
     *
     *  The response includes:
     *
     *  - **data array**: A list of supported blockchains.
     *
     *  - **blockchain metadata**: Each item in the array contains details such as the
     * blockchain name and its associated chain ID.
     *
     *  This information provides an overview of the blockchains supported by the system, along
     * with their identifiers.
     *
     *
     * @summary Retrieve Supported Blockchains
     */
    SDK.prototype.getBlockchains = function (metadata) {
        return this.core.fetch('/blockchains', 'get', metadata);
    };
    /**
     * Get aggregated values and trend data for various NFT market metrics, offering insights
     * into the market's performance over time.
     *
     * The response includes:
     *
     * - **metrics**: An array of metrics tracked, such as volume, number of sales, and
     * holders.
     *
     * - **blockdates**: An array of dates or time periods corresponding to each metric's data
     * points.
     *
     * - **metric values**: The aggregated values of each metric over the specified time
     * blocks.
     *
     * This information enables users to examine key trends and performance indicators in the
     * NFT market, helping them analyze market activity, growth, and fluctuations across
     * different metrics.
     *
     *
     * @summary NFT Market Analytics Report
     */
    SDK.prototype.getNftMarketInsightsAnalytics = function (metadata) {
        return this.core.fetch('/nft/market-insights/analytics', 'get', metadata);
    };
    /**
     * Gets the aggregated values and trends for holders' metrics in the NFT market.
     *
     * The response includes:
     *
     * - **metrics**: An array of the different metrics being tracked for NFT holders.
     *
     * - **blockdates**: An array of dates or time blocks associated with each metric value.
     *
     * - **metric values**: The values of each metric, aggregated across the specified time
     * blocks or dates.
     *
     * This data enables tracking the performance and trends of NFT holders over time,
     * providing insights into market activity and trends.
     *
     *
     * @summary NFT Holders Insights
     */
    SDK.prototype.getNftMarketInsightsHolders = function (metadata) {
        return this.core.fetch('/nft/market-insights/holders', 'get', metadata);
    };
    /**
     * Gets aggregated values and trends for scores in the NFT market.
     *
     * The response includes:
     *
     * - **metrics**: An array of scores or related metrics being tracked.
     *
     * - **blockdates**: An array of time periods or dates associated with each score.
     *
     * - **metric values**: The aggregated values of each score over the specified time blocks
     * or dates.
     *
     * This data allows users to track and analyze score trends in the NFT market over time.
     *
     *
     * @summary NFT Scores Insights
     */
    SDK.prototype.getNftMarketInsightsScores = function (metadata) {
        return this.core.fetch('/nft/market-insights/scores', 'get', metadata);
    };
    /**
     * Gets aggregated values and trends for trader metrics in the NFT market.
     *
     * The response includes:
     *
     * - **metrics**: An array of trader-related metrics being tracked (e.g., number of trades,
     * volume, etc.).
     *
     * - **blockdates**: An array of time periods or dates linked to each metric.
     *
     * - **metric values**: The aggregated values for each trader metric over the corresponding
     * time blocks or dates.
     *
     * This data helps analyze the activity and trends of traders within the NFT market over
     * time.
     *
     *
     * @summary NFT Traders Insights
     */
    SDK.prototype.getNftMarketInsightsTraders = function (metadata) {
        return this.core.fetch('/nft/market-insights/traders', 'get', metadata);
    };
    /**
     * Gets aggregated values and trends for washtrade metrics in the NFT market.
     *
     * The response includes:
     *
     * - **metrics**: An array of washtrade-related metrics being tracked.
     *
     * - **blockdates**: An array of time periods or dates linked to each metric.
     *
     * - **metric values**: The aggregated values for each washtrade metric over the
     * corresponding time blocks or dates.
     *
     * This data helps to analyze the trends and patterns of washtrading activities within the
     * NFT market.
     *
     *
     * @summary NFT Wash Trade Insights
     */
    SDK.prototype.getNftMarketInsightsWashtrade = function (metadata) {
        return this.core.fetch('/nft/market-insights/washtrade', 'get', metadata);
    };
    /**
     * Retrieve metadata for all available marketplaces, providing comprehensive details about
     * each marketplace.
     *
     * The response includes:
     *
     * - **marketplace names**: The names of the available marketplaces.
     *
     * - **supported blockchains**: Blockchains supported by each marketplace.
     *
     * - **images**: Visual representations or logos of the marketplaces.
     *
     * - **external URLs**: Links to the marketplaces for additional information or direct
     * access.
     *
     * This data enables users to compare marketplaces, understand their offerings, and
     * identify the most suitable platforms for trading or exploring NFTs and digital assets.
     *
     *
     * @summary NFT Marketplace Metadata
     */
    SDK.prototype.getNftMarketplaceMetadata = function (metadata) {
        return this.core.fetch('/nft/marketplace/metadata', 'get', metadata);
    };
    /**
     * Retrieve detailed analytics and trend data for a specific marketplace, identified by its
     * chain ID and marketplace name.
     *
     * The response includes:
     *
     * - **trading volume**: Metrics on the total volume traded within the marketplace.
     *
     * - **transactions and transfers**: Data on the number of transactions and transfers over
     * time.
     *
     * - **sales trends**: Insights into sales patterns and trends within the marketplace.
     *
     * This information provides a comprehensive view of the marketplace's performance, user
     * engagement, and market dynamics. It helps users analyze growth patterns and overall
     * trends within the specified marketplace.
     *
     *
     * @summary NFT Marketplace Analytics
     */
    SDK.prototype.getNftMarketplaceAnalytics = function (metadata) {
        return this.core.fetch('/nft/marketplace/analytics', 'get', metadata);
    };
    /**
     * Retrieve detailed metrics and trend data for all holders within a specific marketplace,
     * identified by its chain ID and marketplace name.
     *
     * The response includes:
     *
     * - **holder activity**: Insights into the activity of holders within the marketplace.
     *
     * - **unique holders**: Data on the number of unique holders.
     *
     * - **holder trends**: Changes in the number of holders over time.
     *
     * This information helps track ownership trends, understand asset concentration, and
     * analyze how the holder base within the marketplace evolves.
     *
     *
     * @summary NFT Marketplace Holders
     */
    SDK.prototype.getNftMarketplaceHolders = function (metadata) {
        return this.core.fetch('/nft/marketplace/holders', 'get', metadata);
    };
    /**
     * Retrieve detailed metrics and trend data for all traders within a specific marketplace,
     * identified by its chain ID and marketplace name.
     *
     * The response includes:
     *
     * - **unique traders**: The number of distinct traders active within the marketplace.
     *
     * - **trader ratio**: The ratio of buyers to sellers within the marketplace.
     *
     * - **traders (buyers and sellers)**: Insights into the number of buyers and sellers.
     *
     * - **trader trends**: Changes in trader activity and metrics over time.
     *
     * This data helps analyze the marketplace's trading dynamics, track the performance of
     * active traders, and identify changes in trading patterns and engagement within the
     * marketplace.
     *
     *
     * @summary NFT Marketplace Traders
     */
    SDK.prototype.getNftMarketplaceTraders = function (metadata) {
        return this.core.fetch('/nft/marketplace/traders', 'get', metadata);
    };
    /**
     * Retrieve detailed washtrade metrics and trend data for a specific marketplace,
     * identified by its chain ID and marketplace name.
     *
     * The response includes:
     *
     * - **washtrade volume**: The total volume suspected to involve wash trading.
     *
     * - **washtrade suspect sales**: The number of sales flagged as potential wash trades.
     *
     * - **washtrade suspect transactions**: The number of transactions identified as
     * suspicious.
     *
     * - **washtrade assets**: Assets involved in suspected wash trading activities.
     *
     * - **washtrade wallets**: Wallets flagged for potential involvement in wash trading.
     *
     * This information helps assess the integrity of the marketplace's trading environment,
     * providing transparency into wash trading trends and identifying any red flags in trading
     * behavior within the marketplace.
     *
     *
     * @summary NFT Marketplace Wash Trades
     */
    SDK.prototype.getNftMarketplaceWashtrade = function (metadata) {
        return this.core.fetch('/nft/marketplace/washtrade', 'get', metadata);
    };
    /**
     * Retrieve metadata for a specific NFT collection using the provided contract address and
     * chain ID, offering detailed insights into the collection's attributes.
     *
     * The response includes:
     *
     * - **collection name**: The name of the NFT collection.
     *
     * - **description**: A detailed description of the NFT collection.
     *
     * - **key properties**: Metadata information about the collection's key attributes.
     *
     * This information helps users understand the characteristics and details of specific NFT
     * collections based on contract and blockchain identifiers.
     *
     *
     * @summary NFT Collection Metadata
     */
    SDK.prototype.getNftCollectionMetadata = function (metadata) {
        return this.core.fetch('/nft/collection/metadata', 'get', metadata);
    };
    /**
     * Retrieve detailed metrics and trend data for a specific NFT collection using its
     * contract address and chain ID, providing insights into performance over time.
     *
     * The response includes:
     *
     * - **time-based trends**: Insights into various metrics over time, such as:
     *   - **sales volume**: Total sales volume within the collection.
     *   - **transaction count**: The number of transactions over time.
     *   - **floor price**: Changes in the minimum price of NFTs in the collection.
     *
     * This information helps users observe patterns like increases or decreases in sales,
     * trading volumes, and price changes, enabling analysis of market dynamics and performance
     * trends for the specified NFT collection.
     *
     *
     * @summary Collection Analytics
     */
    SDK.prototype.getNftCollectionAnalytics = function (metadata) {
        return this.core.fetch('/nft/collection/analytics', 'get', metadata);
    };
    /**
     * Get detailed information about the holders of a specific collection, identified by its
     * contract address and chain ID.
     *
     * The response includes:
     *
     * - **holder distribution metrics**: Data on the distribution of tokens across holders.
     *
     * - **holder count changes**: Metrics that track changes in the number of holders.
     *
     * - **ownership trends**: Trends in ownership over time.
     *
     * This information allows users to analyze holder-related metrics, providing insights into
     * token distribution and ownership dynamics for the collection.
     *
     *
     * @summary Collection Holders
     */
    SDK.prototype.getNftCollectionHolders = function (metadata) {
        return this.core.fetch('/nft/collection/holders', 'get', metadata);
    };
    /**
     * Get detailed metrics and trends for the scores associated with a specific collection.
     *
     * The "score" typically refers to various performance indicators or rankings used to
     * assess the collection's performance in terms of:
     *
     * - **trading**: Metrics related to trading activity and volume.
     *
     * - **popularity**: Indicators of the collection's popularity and engagement.
     *
     * - **other factors**: Such as rarity, liquidity, and additional performance aspects.
     *
     * The response allows users to monitor the collection's market activity, user engagement,
     * and overall success within the ecosystem.
     *
     *
     * @summary Collection Scores
     */
    SDK.prototype.getNftCollectionScores = function (metadata) {
        return this.core.fetch('/nft/collection/scores', 'get', metadata);
    };
    /**
     * Get detailed insights into the traders associated with a collection, identified by its
     * contract address and chain ID.
     *
     * The response includes:
     *
     * - **unique trader metrics**: Data on the number of unique traders involved with the
     * collection.
     *
     * - **sellers and buyers**: Metrics tracking the number of sellers and buyers over time.
     *
     * - **trading trends**: Trends that show how actively the collection is being traded and
     * how trader behavior evolves.
     *
     * This information provides valuable insights into trading activity and trader behavior
     * associated with the collection.
     *
     *
     * @summary Collection Traders
     */
    SDK.prototype.getNftCollectionTraders = function (metadata) {
        return this.core.fetch('/nft/collection/traders', 'get', metadata);
    };
    /**
     * Get detailed information on washtrading metrics for a specific NFT collection,
     * identified by its contract address and chain ID.
     *
     * The response includes:
     *
     * - **washtrading trends**: Tracking of washtrading metrics over time.
     *
     * - **metric values**: View values of various washtrading metrics.
     *
     * - **data integrity insights**: Detect any potential manipulation in the trading data.
     *
     * This information helps in identifying and analyzing washtrading activities associated
     * with the collection.
     *
     *
     * @summary Collection Washtrade
     */
    SDK.prototype.getNftCollectionWashtrade = function (metadata) {
        return this.core.fetch('/nft/collection/washtrade', 'get', metadata);
    };
    /**
     * Get detailed insights into the whale metrics for a specific NFT collection, identified
     * by its contract address and chain ID.
     *
     * The response includes:
     *
     * - **whale count**: The number of whales holding or trading the collection.
     *
     * - **whale activities**: Metrics tracking the activities of whales within the collection.
     *
     * - **activity trends**: Trends showing changes in whale involvement over time.
     *
     * This information provides valuable insights into the influence of large holders on the
     * collection.
     *
     *
     * @summary Collection Whales
     */
    SDK.prototype.getNftCollectionWhales = function (metadata) {
        return this.core.fetch('/nft/collection/whales', 'get', metadata);
    };
    /**
     * Get detailed insights into the profile metrics for a specific NFT collection, identified
     * by its contract address and chain ID.
     *
     * The response includes:
     *
     * - **active profiles**: Metrics related to the number of active user profiles within the
     * collection.
     *
     * - **profile engagement**: Data on user engagement and interaction levels within the
     * collection.
     *
     * - **profile growth trends**: Trends in profile growth that impact trading and ownership
     * dynamics.
     *
     * This information provides a comprehensive view of user behavior and engagement within
     * the collection.
     *
     *
     * @summary Collection Profile
     */
    SDK.prototype.getNftCollectionProfile = function (metadata) {
        return this.core.fetch('/nft/collection/profile', 'get', metadata);
    };
    /**
     * Get metadata information for the collection based on the selected category.
     *
     * The response includes:
     *
     * - **collection metadata**: Details of all metadata within the specified category.
     *
     * This information provides a comprehensive view of the collection's metadata categorized
     * by the selected criteria.
     *
     *
     * @summary Collection categories
     */
    SDK.prototype.getNftCollectionCategories = function (metadata) {
        return this.core.fetch('/nft/collection/categories', 'get', metadata);
    };
    /**
     * Retrieve detailed analytics on value and trends for a specific wallet, identified by its
     * address and chain ID.
     *
     * The response includes:
     *
     * - **sales**: Metrics related to sales activity associated with the wallet.
     *
     * - **transactions**: Data on the number of transactions over time.
     *
     * - **transfers**: Insights into asset transfers involving the wallet.
     *
     * - **trend analysis**: Analysis of activity trends and performance over time.
     *
     * This information provides a comprehensive view of the wallet’s activity, asset growth,
     * and performance trends, helping users understand its financial dynamics within the
     * blockchain network.
     *
     *
     * @summary Wallet Analytics
     */
    SDK.prototype.getNftWalletAnalytics = function (metadata) {
        return this.core.fetch('/nft/wallet/analytics', 'get', metadata);
    };
    /**
     * Retrieve detailed analytics on score values and trends for a specific wallet, identified
     * by its address and chain ID.
     *
     * The response includes:
     *
     * - **score metrics**: Various performance scores associated with the wallet over time.
     *
     * - **trend analysis**: Insights into trends in the wallet’s score, showing changes and
     * patterns.
     *
     * - **relative standing**: An overview of the wallet’s position and interaction within the
     * blockchain ecosystem.
     *
     * This information provides a comprehensive view of the wallet’s performance, highlighting
     * score trends and its role in the blockchain network.
     *
     *
     * @summary Wallet Scores
     */
    SDK.prototype.getNftWalletScores = function (metadata) {
        return this.core.fetch('/nft/wallet/scores', 'get', metadata);
    };
    /**
     * Retrieve detailed metrics on trader activity and trends for a specific wallet,
     * identified by its address and chain ID.
     *
     * The response includes:
     *
     * - **trading behavior**: Data on the wallet’s trading activities.
     *
     * - **number of traders**: The count of unique traders interacting with the wallet.
     *
     * - **trader ratio**: The ratio of buyers to sellers associated with the wallet.
     *
     * - **traders (buyers and sellers)**: Insights into the number of buyers and sellers
     * linked to the wallet.
     *
     * - **trader trends**: Changes in trading metrics over time.
     *
     * This information helps users analyze the wallet’s role and activity within the trading
     * ecosystem, offering insights into its performance as a trader and trends in its market
     * engagement.
     *
     *
     * @summary Wallet Traders
     */
    SDK.prototype.getNftWalletTraders = function (metadata) {
        return this.core.fetch('/nft/wallet/traders', 'get', metadata);
    };
    /**
     * Retrieve detailed metrics on washtrading activity and trends for a specific wallet,
     * identified by its address and chain ID.
     *
     * The response includes:
     *
     * - **washtrade volume**: The total volume suspected to involve wash trading.
     *
     * - **washtrade suspect sales**: The number of sales flagged as potential wash trades.
     *
     * - **washtrade suspect transactions**: The number of transactions identified as
     * suspicious.
     *
     * - **washtrade assets**: Assets involved in suspected wash trading activities.
     *
     * - **washtrade wallets**: Wallets flagged for potential involvement in wash trading.
     *
     * This information helps users assess the integrity of the wallet's trading behavior,
     * providing transparency into wash trading trends and identifying any potential red flags
     * in the wallet’s activity.
     *
     *
     * @summary Wallet Washtrade
     */
    SDK.prototype.getNftWalletWashtrade = function (metadata) {
        return this.core.fetch('/nft/wallet/washtrade', 'get', metadata);
    };
    /**
     * Retrieve comprehensive profiling information for a specific wallet, including contract
     * details, NFT holdings, and insights related to notable holders, such as sharks, whales,
     * and any sanctioned entities.
     *
     * The response includes:
     *
     * - **contract addresses and metadata**: Details of NFTs held by the wallet, including
     * contract addresses and associated metadata.
     *
     * - **notable holder classifications**: Identification of significant holders based on
     * asset size, such as sharks and whales.
     *
     * - **sanctioned wallet flags**: Indications of any associations with wallets flagged for
     * sanctions.
     *
     * This data provides a detailed view of the wallet’s contents and associations, offering
     * insights into ownership concentration, asset types, and potential compliance
     * considerations.
     *
     *
     * @summary Wallet Profile
     */
    SDK.prototype.getNftWalletProfile = function (metadata) {
        return this.core.fetch('/nft/wallet/profile', 'get', metadata);
    };
    /**
     * Get detailed insights into trader metrics specifically for an NFT, identified by its
     * contract address, token ID, and chain ID.
     *
     * The response includes:
     *
     * - **trader interactions**: Insights into trader metrics surrounding the specified NFT.
     *
     * - **trader engagement**: Data tracking how traders are interacting with the NFT over
     * time.
     *
     * This information helps analyze trading activity and trader engagement for the individual
     * NFT.
     *
     *
     * @summary NFT Traders
     */
    SDK.prototype.getNftTraders = function (metadata) {
        return this.core.fetch('/nft/traders', 'get', metadata);
    };
    /**
     * Get detailed analytics for a specific NFT, identified by its contract address, token ID,
     * and chain ID.
     *
     * The response includes:
     *
     * - **performance tracking**: Analytics to monitor the performance of the NFT.
     *
     * - **market dynamics**: Insights into the market activity and trends surrounding the NFT.
     *
     * This information provides a comprehensive view of the NFT's performance and market
     * behavior.
     *
     *
     * @summary NFT Analytics
     */
    SDK.prototype.getNftAnalytics = function (metadata) {
        return this.core.fetch('/nft/analytics', 'get', metadata);
    };
    /**
     * Get detailed metrics about wash trading for a specific NFT, identified by its contract
     * address, token ID, and chain ID.
     *
     * The response includes:
     *
     * - **wash trading insights**: Metrics to assess wash trading activity for the specified
     * NFT.
     *
     * - **market manipulation detection**: Identification of potential market manipulation
     * indicators.
     *
     * - **transparency and integrity**: Data to ensure transparency and integrity in the
     * trading of the NFT.
     *
     * This information helps monitor wash trading practices, promoting a fair and transparent
     * NFT market.
     *
     *
     * @summary NFT Washtrade
     */
    SDK.prototype.getNftWashtrade = function (metadata) {
        return this.core.fetch('/nft/washtrade', 'get', metadata);
    };
    /**
     * Get detailed metrics about holders for a specific NFT, identified by its contract
     * address, token ID, and chain ID.
     *
     * The response includes:
     *
     * - **holder insights**: Detailed metrics about the holders of the specified NFT.
     *
     * This information provides a comprehensive view of holder activity and distribution for
     * the NFT.
     *
     *
     * @summary NFT Holders
     */
    SDK.prototype.getNftHolders = function (metadata) {
        return this.core.fetch('/nft/holders', 'get', metadata);
    };
    /**
     * Get detailed metrics about scores for a specific NFT, identified by its contract
     * address, token ID, and chain ID.
     *
     * The response includes:
     *
     * - **score insights**: Detailed metrics about various performance scores for the
     * specified NFT.
     *
     * - **trending status**: Identification of trending NFTs within the collection.
     *
     * This information helps assess the NFT's performance and popularity within the market.
     *
     *
     * @summary NFT Scores
     */
    SDK.prototype.getNftScores = function (metadata) {
        return this.core.fetch('/nft/scores', 'get', metadata);
    };
    /**
     * get nft top deals
     *
     *
     * @summary NFT Top Deals
     */
    SDK.prototype.getNftTop_deals = function (metadata) {
        return this.core.fetch('/nft/top_deals', 'get', metadata);
    };
    /**
     * Gets detailed information and trend data for all gaming contracts associated with a
     * specified contract address.
     *
     *  The response includes:
     *
     *  - **gaming metrics**: A list of metrics related to gaming activity.
     *
     *  - **historical trends**: Data showing historical performance trends for the specified
     * contract.
     *
     *  - **performance insights**: Insights into the contract's performance over time.
     *
     *  This information helps analyze gaming activity and assess performance trends associated
     * with the specified contract.
     *
     *
     * @summary NFT wallet gaming metrics
     */
    SDK.prototype.getNftWalletGamingMetrics = function (metadata) {
        return this.core.fetch('/nft/wallet/gaming/metrics', 'get', metadata);
    };
    /**
     * Gets detailed information about the value and trends of gaming contract collections,
     * given a specific contract address.
     *
     * The response includes:
     *
     * - **gaming metrics**: A collection of metrics related to the gaming contract at the
     * specified contract address.
     *
     * - **performance metrics**: Data such as sales volume, pricing trends, and user
     * engagement.
     *
     * - **additional statistics**: Other relevant statistics associated with the gaming
     * collections under the contract.
     *
     * This information provides a comprehensive view of the contract’s value and performance
     * trends within the gaming sector.
     *
     *
     * @summary NFT wallet gaming collection metrics
     */
    SDK.prototype.getNftWalletGamingCollectionMetrics = function (metadata) {
        return this.core.fetch('/nft/wallet/gaming/collection/metrics', 'get', metadata);
    };
    /**
     * Gets detailed trend metrics for all gaming contracts associated with a specified
     * contract address.
     *
     * The response includes:
     *
     * - **performance trends**: Insights into the performance of gaming collections under the
     * specified contract.
     *
     * - **trend metrics**: Data such as price changes, sales trends, and other relevant
     * metrics over time.
     *
     * This information allows for tracking and analyzing trends within gaming collections
     * associated with the contract.
     *
     *
     * @summary NFT wallet gaming collection trend
     */
    SDK.prototype.getNftWalletGamingCollectionTrend = function (metadata) {
        return this.core.fetch('/nft/wallet/gaming/collection/trend', 'get', metadata);
    };
    /**
     * Retrieve a paginated and sorted list of NFT transactions, providing detailed information
     * about each transaction.
     *
     * The response includes:
     *
     * - **blockchain details**: Information about the blockchain and chain ID.
     *
     * - **collection information**: Collection name, contract address, and contract creation
     * date.
     *
     * - **transaction details**:
     *   - **contract type**: Type of contract (e.g., ERC721).
     *   - **transaction hash**: Unique identifier for the transaction.
     *   - **wash trade status**: Indicator of potential wash trading.
     *   - **marketplace**: Marketplace involved, if applicable.
     *   - **receiving and sending addresses**: Wallet addresses of the sender and receiver.
     *   - **sale price (USD)**: Sale price converted to USD.
     *   - **transaction timestamp**: Date and time of the transaction.
     *   - **token ID**: Identifier for the NFT involved in the transaction.
     *   - **transaction type**: Type of transaction (e.g., "mint","transfer","burn").
     *
     * This data provides a comprehensive view of transaction activity for specified NFT
     * collections,
     * supporting analysis of trading patterns, value transfers, and ownership changes within
     * the blockchain ecosystem.
     *
     *
     * @summary NFT Transactions
     */
    SDK.prototype.getNftTransactions = function (metadata) {
        return this.core.fetch('/nft/transactions', 'get', metadata);
    };
    /**
     * Retrieve the predicted price details for a specific NFT within the requested collection.
     *
     * The response includes:
     *
     * - **rarity sales**: Metrics related to the NFT's rarity and its impact on predicted
     * sales.
     *
     * - **collection drivers**: Key factors influencing the collection’s value.
     *
     * - **additional metrics**: Other relevant data points supporting the price prediction.
     *
     * This information provides insights into the predicted market value of the NFT based on
     * rarity, collection trends, and key metrics.
     *
     *
     * @summary NFT Token Price Estimate
     */
    SDK.prototype.getNftLiquifyPrice_estimate = function (metadata) {
        return this.core.fetch('/nft/liquify/price_estimate', 'get', metadata);
    };
    /**
     * Retrieve the predicted price details for the requested NFT collection and specific NFT.
     *
     * The response includes:
     *
     * - **collection price prediction**: Estimated market value for the overall collection.
     *
     * - **NFT-specific price prediction**: Predicted price for the individual NFT within the
     * collection.
     *
     * This information provides insights into the expected market performance of both the
     * collection as a whole and the specified NFT.
     *
     *
     * @summary NFT Liquify collection Price Estimate
     */
    SDK.prototype.getNftLiquifyCollectionPrice_estimate = function (metadata) {
        return this.core.fetch('/nft/liquify/collection/price_estimate', 'get', metadata);
    };
    /**
     * Retrieve comprehensive metadata for supported collections with price predictions
     * generated by our AI model.
     *
     * The response includes:
     *
     * - **collection metadata**: Detailed information about each collection for which price
     * predictions are available.
     *
     * This information provides users with an overview of the collections supported by the AI
     * model for price prediction.
     *
     *
     * @summary NFT Liquify Supported Collections
     */
    SDK.prototype.getNftLiquifyCollectionSupported_collections = function (metadata) {
        return this.core.fetch('/nft/liquify/collection/supported_collections', 'get', metadata);
    };
    /**
     * Retrieve comprehensive metadata for an NFT brand, including essential information such
     * as brand name, category, description, thumbnail URL, supported blockchains, and social
     * media URLs.
     *
     * The response includes:
     *
     * - **brand identity**: Details like brand name, category, and description.
     *
     * - **visuals and media**: Thumbnail URL representing the brand.
     *
     * - **supported blockchains**: List of blockchains the brand operates on.
     *
     * - **social media channels**: URLs for various social media platforms associated with the
     * brand.
     *
     * This information provides insights into the brand’s identity and reach within the NFT
     * ecosystem, detailing its offerings, associated collections, and key attributes. It
     * enables users to explore the brand’s presence, influence, and engagement across the NFT
     * market.
     *
     *
     * @summary NFT Brand Metadata
     */
    SDK.prototype.getNftBrandMetadata = function (metadata) {
        return this.core.fetch('/nft/brand/metadata', 'get', metadata);
    };
    /**
     * Retrieve detailed metrics for an NFT brand, providing insights into key performance
     * indicators across various dimensions.
     *
     * The response includes:
     *
     * - **brand details**: Information such as the number of contracts, total assets,
     * blockchain type, brand name, chain ID, associated collections, and contract details.
     *
     * - **performance metrics**:
     *   - **growth rate**: Brand growth over time.
     *   - **number of holders**: Total count of NFT holders.
     *   - **user interactions**: Metrics on user engagement with the brand.
     *   - **marketplace trading volume**: Total volume traded on marketplaces.
     *   - **market capitalization**: Valuation of the brand’s NFT assets.
     *   - **minting revenue**: Revenue generated from minting.
     *   - **primary and secondary sale revenues**: Income from initial and resale
     * transactions.
     *   - **retained traders**: Count of repeat traders.
     *   - **royalty revenue**: Revenue from royalties.
     *   - **total revenue**: Overall revenue generated by the brand.
     *
     * This comprehensive data enables users to analyze the brand’s economic activity, trader
     * engagement, and overall impact within the NFT market.
     *
     *
     * @summary NFT Brand Metrics
     */
    SDK.prototype.getNftBrandMetrics = function (metadata) {
        return this.core.fetch('/nft/brand/metrics', 'get', metadata);
    };
    /**
     * Retrieve profile information for an NFT brand, including key metrics such as blockchain,
     * brand name, category, chain ID, and various trading insights.
     *
     * The response includes:
     *
     * - **brand details**: Information on the blockchain, brand name, category, and chain ID.
     *
     * - **trading insights**:
     *   - **diamond hand holders**: Count of long-term holders of the brand’s NFTs.
     *   - **profitable and loss-making trades**: Analysis of trades yielding profit or loss.
     *   - **trading volumes**: Total volume traded for the brand.
     *   - **token scores**: Scores indicating the relative performance and popularity of
     * tokens.
     *
     * This information provides a comprehensive overview of the brand’s performance and user
     * engagement, enabling users to assess trading patterns, profitability, and overall
     * stability within the NFT ecosystem.
     *
     *
     * @summary NFT Brand profile
     */
    SDK.prototype.getNftBrandProfile = function (metadata) {
        return this.core.fetch('/nft/brand/profile', 'get', metadata);
    };
    /**
     * Retrieve comprehensive metadata for an NFT brand, including key information such as
     * brand name, category, description, thumbnail URL, supported blockchains, and social
     * media URLs.
     *
     * The response includes:
     *
     * - **brand name**: The name of the NFT brand.
     * - **category**: The category or type of the brand.
     * - **description**: A brief description of the brand.
     * - **thumbnail URL**: A URL to a representative image or logo for the brand.
     * - **supported blockchains**: Blockchains on which the brand is active.
     * - **social media URLs**: Links to the brand’s social media channels.
     *
     * This data provides insights into the brand’s identity and reach within the NFT
     * ecosystem, detailing its offerings, associated collections, and key attributes. It
     * enables users to explore the brand’s presence, influence, and engagement across the NFT
     * market.
     *
     *
     * @summary NFT Brand contract metadata
     */
    SDK.prototype.getNftBrandContract_metadata = function (metadata) {
        return this.core.fetch('/nft/brand/contract_metadata', 'get', metadata);
    };
    /**
     * Retrieve detailed contract metrics for an NFT brand, offering specific insights into
     * contract-level performance and activity.
     *
     * The response includes:
     *
     * - **contract details**: Number of contracts, total assets, blockchain, brand name, chain
     * ID, and associated collection and contract addresses.
     *
     * - **performance metrics**:
     *   - **growth rate**: Contract growth over time.
     *   - **number of holders**: Total count of NFT holders.
     *   - **user interactions**: Engagement metrics related to user interactions.
     *   - **marketplace volumes**: Volume traded across marketplaces.
     *   - **market capitalization**: Valuation of assets under the brand's contracts.
     *   - **minting revenue**: Revenue from minting activities.
     *   - **primary and secondary sale revenues**: Earnings from initial and secondary sales.
     *   - **retained traders**: Number of repeat traders.
     *   - **royalty revenue**: Revenue generated from royalties.
     *   - **total revenue**: Overall revenue associated with the brand's contracts.
     *   - **total volume**: Aggregate trading volume.
     *   - **number of traders**: Count of unique traders.
     *
     * This information provides a granular view of the brand's contract-level activity,
     * financial performance, and trading dynamics within the NFT market.
     *
     *
     * @summary NFT Brand contract metrics
     */
    SDK.prototype.getNftBrandContract_metrics = function (metadata) {
        return this.core.fetch('/nft/brand/contract_metrics', 'get', metadata);
    };
    /**
     * Retrieve profile information for an NFT brand contract, providing specific insights into
     * the contract's engagement and trading characteristics.
     *
     * The response includes:
     *
     * - **contract details**: Information such as blockchain, brand name, category, chain ID,
     * and contract address.
     *
     * - **engagement and trading metrics**:
     *   - **diamond hand holders**: Count of long-term holders.
     *   - **loss-making and profitable trades**: Analysis of trades yielding losses or
     * profits.
     *   - **trading volumes**: Total volume associated with the contract.
     *   - **token score**: A score indicating the token's performance and popularity.
     *
     * This data offers a focused view of the contract's profile, highlighting holder behavior,
     * profitability trends, and the overall health of the brand’s contract within the NFT
     * space.
     *
     *
     * @summary NFT Brand contract profile
     */
    SDK.prototype.getNftBrandContract_profile = function (metadata) {
        return this.core.fetch('/nft/brand/contract_profile', 'get', metadata);
    };
    /**
     * Retrieve category information for an NFT brand, providing insights into its
     * classification, blockchain, and relevant metadata.
     *
     * The response includes:
     *
     * - **basic details**: Blockchain type, brand name, category, chain ID, and primary
     * contract address.
     *
     * - **contract information**: Contract type (e.g., ERC721) and any associated contract
     * addresses.
     *
     * - **brand description**: Overview of the brand and its purpose.
     *
     * - **social media URLs**: Links to social media platforms such as Discord, Instagram,
     * Medium, Telegram, Twitter, and a thumbnail image if available.
     *
     * This information helps users understand the brand’s category, purpose, and presence
     * within the NFT ecosystem.
     *
     *
     * @summary NFT Brand category
     */
    SDK.prototype.getNftBrandCategory = function (metadata) {
        return this.core.fetch('/nft/brand/category', 'get', metadata);
    };
    /**
     * Retrieve a token balance details.
     *
     *
     * @summary token balance
     */
    SDK.prototype.getTokenBalance = function (metadata) {
        return this.core.fetch('/token/balance', 'get', metadata);
    };
    /**
     * Retrieve a token metrics details.
     *
     *
     * @summary token metrics
     */
    SDK.prototype.getTokenMetrics = function (metadata) {
        return this.core.fetch('/token/metrics', 'get', metadata);
    };
    /**
     * Retrieve a token holders details.
     *
     *
     * @summary token holders
     */
    SDK.prototype.getTokenHolders = function (metadata) {
        return this.core.fetch('/token/holders', 'get', metadata);
    };
    /**
     * Get list of top token holders, including their percentage ownership,ranking and relavant
     * titles
     *
     *
     * @summary token transfers
     */
    SDK.prototype.getTokenTransfers = function (metadata) {
        return this.core.fetch('/token/transfers', 'get', metadata);
    };
    /**
     * Get token price prediction
     *
     *
     * @summary token price prediction
     */
    SDK.prototype.getTokenPrice_prediction = function (metadata) {
        return this.core.fetch('/token/price_prediction', 'get', metadata);
    };
    /**
     * get defi pool metadata.
     *
     *
     * @summary defi pool metadata
     */
    SDK.prototype.getDefiPoolMetadata = function (metadata) {
        return this.core.fetch('/defi/pool/metadata', 'get', metadata);
    };
    /**
     * get dex pool metrics.
     *
     *
     * @summary defi pool metrics
     */
    SDK.prototype.getDefiPoolMetrics = function (metadata) {
        return this.core.fetch('/defi/pool/metrics', 'get', metadata);
    };
    /**
     * get protocol metadata.
     *
     *
     * @summary defi protocol metadata
     */
    SDK.prototype.getDefiPool = function (metadata) {
        return this.core.fetch('/defi/pool', 'get', metadata);
    };
    /**
     * get Defi protocols.
     *
     *
     * @summary defi supported protocols
     */
    SDK.prototype.getDefiPoolSupported_protocols = function (metadata) {
        return this.core.fetch('/defi/pool/supported_protocols', 'get', metadata);
    };
    /**
     * Get DeFi position balance by wallet
     *
     *
     * @summary Defi portfolio
     */
    SDK.prototype.getWalletBalanceDefi = function (metadata) {
        return this.core.fetch('/wallet/balance/defi', 'get', metadata);
    };
    /**
     * Get NFT balance by wallet
     *
     *
     * @summary NFT portfolio
     */
    SDK.prototype.getWalletBalanceNft = function (metadata) {
        return this.core.fetch('/wallet/balance/nft', 'get', metadata);
    };
    /**
     * Get ERC20 token balance by wallet
     *
     *
     * @summary ERC20 portfolio
     */
    SDK.prototype.getWalletBalanceToken = function (metadata) {
        return this.core.fetch('/wallet/balance/token', 'get', metadata);
    };
    /**
     * Get list of all labels mapped  for the address
     *
     *
     * @summary Wallet label
     */
    SDK.prototype.getWalletLabel = function (metadata) {
        return this.core.fetch('/wallet/label', 'get', metadata);
    };
    return SDK;
}());
var createSDK = (function () { return new SDK(); })();
module.exports = createSDK;
