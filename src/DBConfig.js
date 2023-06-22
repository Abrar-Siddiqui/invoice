export const DBConfig = {
  name: "MyDB",
  version: 2,
  objectStoresMeta: [
    {
      store: "userData",
      storeConfig: { keyPath: "id", autoIncrement: true },
      storeSchema: [
        { name: "name", keypath: "name", options: { unique: false } },
        { name: "email", keypath: "email", options: { unique: false } },
        { name: "userType", keypath: "userType", options: { unique: false } },
        { name: "customer", keypath: "customer", options: { unique: false } },
        { name: "supplier", keypath: "supplier", options: { unique: false } },
        { name: "items", keypath: "items", options: { unique: false } },
        { name: "sale", keypath: "sale", options: { unique: false } },
        { name: "purchase", keypath: "purchase", options: { unique: false } },
      ],
    },
  ],
};
