import sequelize from "../db.js";
import { DataTypes } from "sequelize";

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: "USER" },
});

const Cart = sequelize.define("cart", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const CartDevice = sequelize.define("cart_device", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  quantity: { type: DataTypes.INTEGER, defaultValue: 1 },
});

const Device = sequelize.define("device", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  price: { type: DataTypes.DECIMAL, allowNull: false },
  rating: { type: DataTypes.INTEGER, defaultValue: 0 }, //default'ное значение рейтинга - 0
  img: { type: DataTypes.STRING, allowNull: false },
  brandId: { type: DataTypes.INTEGER },
  typeId: { type: DataTypes.INTEGER },
});

const Type = sequelize.define("type", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Brand = sequelize.define("brand", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING(50), unique: true, allowNull: false }, // VARCHAR(50)
});

const Rating = sequelize.define("rating", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      rate: { type: DataTypes.INTEGER, allowNull: false },
      userId: { type: DataTypes.INTEGER, allowNull: false },
      deviceId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      indexes: [
        {
          unique: true,
          name: "user_device_unique",
          fields: ["userId", "deviceId"],
        },
      ],
    }
);

const DeviceInfo = sequelize.define("device_info", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
});

//перемычка
const TypeBrand = sequelize.define("type_brand", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

User.hasOne(Cart);
Cart.belongsTo(User);

User.hasMany(Rating);
Rating.belongsTo(User);

Cart.hasMany(CartDevice);
CartDevice.belongsTo(Cart);

Type.hasMany(Device);
Device.belongsTo(Type);

Brand.hasMany(Device);
Device.belongsTo(Brand);

Device.hasMany(Rating);
Rating.belongsTo(Device);

Device.hasMany(CartDevice);
CartDevice.belongsTo(Device);

Device.hasMany(DeviceInfo, { as: "info" }); //название поля у массива характеристик
DeviceInfo.belongsTo(Device);

Type.belongsToMany(Brand, { through: TypeBrand });
Brand.belongsToMany(Type, { through: TypeBrand });

export { User, Cart, CartDevice, Device, Type, Brand, Rating, TypeBrand, DeviceInfo };