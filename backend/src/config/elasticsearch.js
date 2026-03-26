import { Client } from '@elastic/elasticsearch';
import config from './index.js';

let esClient = null;

try {
  if (config.elasticsearch.url && config.elasticsearch.url !== 'http://localhost:9200') {
    const clientConfig = { node: config.elasticsearch.url };

    if (config.elasticsearch.username !== 'elastic') {
      clientConfig.auth = {
        username: config.elasticsearch.username,
        password: config.elasticsearch.password
      };
    }

    esClient = new Client(clientConfig);
    console.log(`✅ ElasticSearch Client initialized for ${config.elasticsearch.url}`);
  } else {
    console.warn('⚠️ ElasticSearch URL is missing or set to placeholder. MongoDB text search fallback will be used.');
  }
} catch (error) {
  console.error('❌ Failed to initialize ElasticSearch:', error.message);
}

export { esClient };
