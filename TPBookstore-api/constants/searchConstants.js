const productQueryParams = {
    sort: {
        asc: { priceSale: "asc" },
        desc: { priceSale: "desc" },
        newest: { createdAt: "desc" },
        latest: { createdAt: "asc" },
        total_sales: { totalSales: "desc" },
        default: { totalSales: "desc" }
    },
    status: {
        disabled: { isDisabled: true },
        not_disabled: { isDisabled: false },
        all: {},
        default: { isDisabled: false }
    }
};

const commentQueryParams = {
    date: {
        newest: { createdAt: "desc" },
        latest: { createdAt: "asc" },
        default: { createdAt: "desc" }
    },
    status: {
        disabled: { isDisabled: true },
        not_disabled: { isDisabled: false },
        all: {},
        default: { isDisabled: false }
    }
};

const orderQueryParams = {
    status: {
        waiting: { confirmed: false, cancelled: false },
        delivering: { confirmed: true, delivered: false, cancelled: false },
        delivered: { delivered: true },
        paid: { isPaid: true },
        unpaid: { isPaid: false },
        cancelled: { cancelled: true },
        disabled: { isDisabled: true },
        not_disabled: { isDisabled: false },
        default: {}
    }
};

const userQueryParams = {
    role: {
        all_staff: { role: { $in: ["admin", "staff", "shipper"] } },
        staff: { role: "staff" },
        shipper: { role: "shipper" },
        admin: { role: "admin" },
        customer: { role: "customer" },
        default: { role: "customer" }
    },
    status: {
        locked: { isDisabled: true },
        is_active: { isDisabled: false },
        all: {},
        default: { isDisabled: false }
    }
};

const categoryQueryParams = {
    status: {
        disabled: { isDisabled: true },
        not_disabled: { isDisabled: false },
        all: {},
        default: { isDisabled: false }
    }
};

const validateConstants = function (reference, constant, constantField) {
    constantField = constantField ? constantField.toString().trim().toLowerCase() : "";
    return reference[constant].hasOwnProperty(constantField)
        ? reference[constant][constantField]
        : reference[constant]["default"];
};

export {
    productQueryParams,
    commentQueryParams,
    orderQueryParams,
    userQueryParams,
    categoryQueryParams,
    validateConstants
};
