type value = {
  moodKey: string, 
  response: {
    score: number,
    tags: string[],
    word: string
  }[]
}

interface IResponse {
  status: string,
  value: value,
  reason: string
}

const filterAsyncCallResponse = (response: IResponse[]) => {

  const filterResponses = (providedStatus : string) => response.reduce((result, promise) => {
    const { status, value, reason } = promise;
    if (!reason && status === "fulfilled" && status === providedStatus) {
      if (!!value.response && !value.response.length) return result;
      result.push(value);
    }
    if (reason && status === "rejected" && status === providedStatus) result.push(reason);
    return result;
  }, [] as any[]);

  return {
    resolvedPromises: filterResponses("fulfilled"),
    errorMessages: filterResponses("rejected"),
  };
};

export { filterAsyncCallResponse };