export const Validation = () => {
  return (
    target: Object,
    propertyKey: string | symbol,
    parameterIndex: number
  ) => {
    console.log(target, propertyKey, parameterIndex);
  };
};
