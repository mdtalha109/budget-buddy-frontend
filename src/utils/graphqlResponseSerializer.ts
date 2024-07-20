interface ApiResponse<T> {
    success: boolean;
    data: T | null;
    message: string;
  }
  
  const graphqlResponseSerializer = <T>(response: any, key: string): ApiResponse<T> => {
    console.log("response: ", response)
    if (!response || !response.data) {
      throw new Error('Invalid response format');
    }
  
    const { success, data, message } = response.data[key];
  
    return {
      success,
      data,
      message,
    };
  };
  
  export default graphqlResponseSerializer;
  