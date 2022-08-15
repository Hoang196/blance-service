const encode = (str: string) => {
    const buff = Buffer.from(str);
    const base64data = buff.toString('base64');
    return base64data;
  };
  
  const decode = (hash: string) => {
    const buff = Buffer.from(hash, 'base64');
    const text = buff.toString('ascii');
    return text;
  };
  
  export { encode, decode };
  