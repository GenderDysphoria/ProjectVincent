import {
  CloudFrontClient,
  CreateInvalidationCommand,
  GetInvalidationCommand,
} from '@aws-sdk/client-cloudfront';
import { pDelay } from '@twipped/utils';
import log from 'fancy-log';

export default async function invalidateCloudfront ({ wait = true } = {}) {
  var credentials;
  try {
    credentials = (await import('#aws')).default;
  } catch (e) {
    console.error(e);
    throw new Error('Could not find the "aws.js" config file in the project root.');
  }

  const cloudfrontClient = new CloudFrontClient(credentials);

  var poll = async function poll (id) {
    const res = await cloudfrontClient.send(
      new GetInvalidationCommand({
        DistributionId: credentials.distribution,
        Id: id,
      })
    );

    if (!res.Invalidation) {
      console.error(res);
    }

    if (res.Invalidation.Status === 'Completed') {
      return;
    }

    return pDelay(5000).then(() => poll(id));
  };

  const invalidation = await cloudfrontClient.send(
    new CreateInvalidationCommand({
      DistributionId: credentials.distribution,
      InvalidationBatch: {
        CallerReference: Date.now().toString(),
        Paths: {
          Quantity: 1,
          Items: [ '/*' ],
        },
      },
    })
  );

  if (!invalidation.Invalidation) {
    console.error(invalidation);
    throw new Error("Created invalidation, but didn't define Invalidation");
  }

  const id = invalidation.Invalidation.Id;

  log('Invalidation created, waiting for it to complete.', id);

  if (wait) await poll(id);
}
