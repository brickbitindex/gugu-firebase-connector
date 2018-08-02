const handler = {
  element(data) {
    return {
      ...data,
      info: JSON.stringify(data.info),
    };
  },
};

export default function handleSetData(key, data) {
  const moduleName = key.split('/')[0];
  let processedData = data;
  if (handler[moduleName]) processedData = handler[moduleName](data);
  return processedData;
}
