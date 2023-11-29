import { SecretClient } from '@azure/keyvault-secrets';
import { DefaultAzureCredential } from '@azure/identity';

const keyVaultKeys = [
  'PAYLOAD_SECRET',
  'MONGODB_URI'
] as const;

export const addKeyVaultSecretsToEnv = async () => {
  console.log('Retrieving key vault secrets...');

  const credential = new DefaultAzureCredential();

  const keyVaultName = process.env.KEY_VAULT_NAME;
  if (!keyVaultName) {
    throw new Error('KEY_VAULT_NAME must be set in order to get key vault secrets.');
  }

  const keyvaultUrl = "https://" + keyVaultName + ".vault.azure.net";
  const client = new SecretClient(keyvaultUrl, credential);

  const secrets = await Promise.all(keyVaultKeys.map(key => client.getSecret(key)));
  
  secrets.forEach(secret => {
    process.env[secret.name, secret.value];
  })

  console.log('Finished retrieving key vault secrets.');
}

