export function elementNotFoundResponse(
  element: string,
  elements: string[],
  name: string,
) {
  const details = element === ''
    ? `Please specify a(n) ${name}.`
    : `${capitalizeFirst(name)} '${element}' does not exist.`;
  return notFoundResponse(
    details,
    {
      possibleValues: elements,
    },
  );
}

export function notFoundResponse(details: string, extra = {}) {
  return errorResponse(
    'NotFound',
    'Not found.',
    details,
    404,
    'Not Found',
    extra,
  );
}

export function serverErrorResponse(error: Error, extra = {}) {
  return errorResponse(
    'InternalServerError',
    'Internal Server Error.',
    error.message ?? `An internal server occurred.`,
    500,
    'Internal Server Error',
    extra,
  );
}

export function errorResponse(
  code: string,
  message: string,
  details: string,
  status: number,
  statusText: string,
  extra = {},
) {
  if (!isEmpty(extra)) {
    extra = {
      extra: {
        ...extra,
      },
    };
  }

  return new Response(
    JSON.stringify({
      error: {
        code: code,
        message: message,
        details: details,
        ...extra,
      },
    }),
    {
      status: status,
      statusText: statusText,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
}

function isEmpty(obj: {}) {
  return obj
    && Object.keys(obj).length === 0
    && Object.getPrototypeOf(obj) === Object.prototype
}

function capitalizeFirst(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
