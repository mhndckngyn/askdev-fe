import dayjs from 'dayjs';

export default function mapParams(params: Record<string, any>) {
  const mappedParams: Record<string, any> = {};

  // filter undefined, sanitize field
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null) return; // skip empty

    if (value instanceof Date) {
      mappedParams[key] = dayjs(value).format('YYYY-MM-DD');
    } else if (Array.isArray(value)) {
      if (value.length > 0) {
        mappedParams[key] = value.join(','); // Array => CSV string
      }
    } else {
      mappedParams[key] = value; // primitives (string, number, boolean)
    }
  });

  return mappedParams;
}
