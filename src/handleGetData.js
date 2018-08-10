const handler = {
  element(data) {
    if (!data || !data.info) return data;
    return {
      ...data,
      info: JSON.parse(data.info),
    };
  },
};

export default function handleGetData(key, data) {
  const moduleName = key.split('/')[0];
  let processedData = data;
  if (handler[moduleName]) processedData = handler[moduleName](data);
  return processedData;
}
