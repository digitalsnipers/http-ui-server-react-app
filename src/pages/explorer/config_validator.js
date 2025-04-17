const validate_timestamp = (t) => {
  const time_reg =
    /^(0[1-9]|[1-2][0-9]|3[0-1])-(0[1-9]|1[0-2])-\d{4} (00|0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/;
  return time_reg.test(t);
};

export const validate = (operation, config) => {
  switch (operation) {
    case "index":
      return (
        config?.index &&
        (config.conditions || !config.filter) &&
        config?.from &&
        config?.to &&
        validate_timestamp(config.from) &&
        validate_timestamp(config.to)
      );

    case "extract":
      return (
        config?.type &&
        (!config.batching || config.batch_type && config.batch_count) &&
        (config.conditions || !config.filter) &&
        config?.from &&
        config?.to &&
        validate_timestamp(config.from) &&
        validate_timestamp(config.to)
      );

    case "delete":
      return (
        config?.from &&
        config?.to &&
        validate_timestamp(config.from) &&
        validate_timestamp(config.to)
      );

    case "get":
      return config.count && !isNaN(config.count)

    default:
      return false;
  }
};
