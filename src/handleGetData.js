const handler = {
  element(originData) {
    const data = {
      ...originData,
    };
    data.info = JSON.parse(originData.info);
    return data;
  },
};

export default function handleGetData(key, data) {
  const moduleName = key.split('/')[0];
  let processedData = data;
  if (handler[moduleName]) processedData = handler[moduleName](data);
  return processedData;
}
