import { Notify } from "quasar";

export default (config = {}) => {
  const positiveConfig = {
    progress: true,
    type: "positive",
    icon: "fa fa-check-circle",
    actions: [{ icon: "fa fa-xmark", color: "white" }],
  };

  if (config.hasOwnProperty("positive")) {
    Object.assign(positiveConfig, config.positive);
  }

  const warningConfig = {
    progress: true,
    type: "warning",
    icon: "fa fa-circle-info",
    actions: [{ icon: "fa fa-xmark", color: "black" }],
  };

  if (config.hasOwnProperty("warning")) {
    Object.assign(warningConfig, config.warning);
  }

  const negativeConfig = {
    progress: true,
    type: "negative",
    icon: "fa fa-circle-exclamation",
    actions: [{ icon: "fa fa-xmark", color: "white" }],
  };

  if (config.hasOwnProperty("negative")) {
    Object.assign(negativeConfig, config.negative);
  }

  const errorConfig = {
    progress: true,
    type: "negative",
    icon: "fa fa-circle-exclamation",
    actions: [{ icon: "fa fa-xmark", color: "white" }],
    messageInProduction: "Server error!",
  };

  if (config.hasOwnProperty("error")) {
    Object.assign(errorConfig, config.error);
  }

  return {
    positive(message) {
      Notify.create({ ...positiveConfig, ...{ message } });
    },
    warning(message) {
      Notify.create({ ...warningConfig, ...{ message } });
    },
    negative(message) {
      Notify.create({ ...negativeConfig, ...{ message } });
    },
    error(err) {
      let message = errorConfig.messageInProduction;

      if (process.env.DEV) {
        if (err.hasOwnProperty("response")) {
          message = err.response.data.message ?? err.response.statusText;
        } else {
          message = err.message;
        }
      }
      Notify.create({ ...errorConfig, ...{ message } });
    },
  };
};
