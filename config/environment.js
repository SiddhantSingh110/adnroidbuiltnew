const ENV = {
  dev: {
    apiUrl: 'http://192.168.0.112:8001/api', // Local ngrok
    environment: 'development'
  },
  staging: {
    apiUrl: 'https://live.websharkmyhealth.com/api', // VPS for testing
    environment: 'staging'
  },
  prod: {
    apiUrl: 'https://live.websharkmyhealth.com/api', // VPS for production  
    environment: 'production'
  }
};

// 🔧 MANUAL SWITCH - Change this when needed
const CURRENT_ENV = 'staging'; // Change to 'dev', 'staging', or 'prod'

const getEnvVars = () => {
  switch (CURRENT_ENV) {
    case 'dev':
      console.log('🔧 Using DEVELOPMENT environment');
      return ENV.dev;
    case 'staging':
      console.log('🧪 Using STAGING environment');
      return ENV.staging;
    case 'prod':
      console.log('🚀 Using PRODUCTION environment');
      return ENV.prod;
    default:
      console.log('🔧 Fallback to DEVELOPMENT environment');
      return ENV.dev;
  }
};

const envVars = getEnvVars();
console.log('📡 API URL:', envVars.apiUrl);

export default envVars;