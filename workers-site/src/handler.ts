import { notFoundResponse, elementNotFoundResponse, serverErrorResponse } from './utils'
import { Router } from 'itty-router'
import { xml2js } from 'xml-js'

export const router = Router({ base: '/api' });
const v1Router = Router({ base: '/api/v1' });
const platformRouter = Router({ base: '/api/v1/:platform' });

const RELEASES_API_ENDPOINT = 'https://repo.fvdh.dev/releases/net/frankheijden/serverutils';
const PLATFORM_API_ENDPOINT = '/ServerUtils-{platform}';
const MAVEN_METADATA_API_ENDPOINT = '/maven-metadata.xml';
const DOWNLOAD_API_ENDPOINT = '/{version}/ServerUtils-{platform}-{version}.jar';

const PLATFORMS = [
  'Bukkit',
  'Bungee',
  'Velocity',
];

router
  .get('/v1/*', v1Router.handle)
  .get('/:api?', (req) => elementNotFoundResponse(
    req.params!.api ?? '',
    ['v1'],
    'API Version',
  ))
  .get('*', () => notFoundResponse('Endpoint does not exist.'))

v1Router
  .get('/:platform?/*', async (req) => {
    const platform = req.params?.platform ?? '';
    if (!PLATFORMS.includes(platform)) {
      return elementNotFoundResponse(platform, PLATFORMS, 'platform');
    }

    return platformRouter.handle(req);
  })

platformRouter
  .get('/:version?/:hash?', async (req) => {
    let endpoint = RELEASES_API_ENDPOINT;

    // Append project part
    const platform = req.params!.platform as string;
    endpoint += PLATFORM_API_ENDPOINT.replace('{platform}', platform);

    // Fetch maven-metadata
    const versioning = await fetch(endpoint + MAVEN_METADATA_API_ENDPOINT)
      .then(res => res.text())
      .then(body => (xml2js(body, {
        compact: true
      }) as any)['metadata']['versioning']);

    type Text = { _text: string };
    const versions: string[] = versioning['versions']['version'].map((e: Text) => e._text);
    versions.push('latest');

    let version = req.params!.version ?? '';
    if (version === 'latest') {
      version = (versioning['latest'] as Text)._text;
    }

    if (!versions.includes(version)) {
      return elementNotFoundResponse(version, versions, 'version');
    }

    // Append download part
    endpoint += DOWNLOAD_API_ENDPOINT
      .replace('{platform}', platform)
      .replaceAll('{version}', version);

    const hash = req.params!.hash ?? '';
    const hashes = ['md5', 'sha1', 'sha256', 'sha512'];
    if (hash !== '') {
      if (hashes.includes(hash)) {
        const hashString = await fetch(`${endpoint}.${hash}`).then(res => res.text());
        return new Response(
          JSON.stringify({
            fileName: endpoint.substring(endpoint.lastIndexOf('/') + 1, endpoint.length),
            [hash]: hashString,
          }),
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
      } else {
        return elementNotFoundResponse(hash, hashes, 'hash');
      }
    }

    return Response.redirect(endpoint, 307);
  })

export async function handleRequest(event: FetchEvent): Promise<Response> {
  return router
    .handle(event.request)
    .catch(serverErrorResponse)
}
