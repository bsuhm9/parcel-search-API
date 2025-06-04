const mongoose = require("mongoose");

const OwnerRecordSchema = new mongoose.Schema({
  Name: String,
});

const SitusAddressSchema = new mongoose.Schema({
  AddressString: String,
  City: String,
  StateAbbr: String,
  ZipCode: String,
});

const ResidenceSchema = new mongoose.Schema({
  Recid1: Number,
  BldgStyle: String,
  Quality: String,
  Condition: String,
  YearBuilt: String,
  EffYearBuilt: String,
  NumStories: String,
  Bedrooms: String,
  MainFloor: String,
  UpperFloor: String,
  AddlArea: String,
  FullBaths: String,
  ThreeQuarterBaths: String,
  HalfBaths: String,
  Fixtures: String,
  Basement: String,
  FinishedBasement: String,
  AttachedGarage: String,
  BuiltInGarage: String,
  WoodDeck: String,
  Patio: String,
  Cover: String,
  MasonryTrim: String,
  RoofType: String,
  RoofMaterial: String,
  Flooring: String,
  ExteriorWall: String,
  Foundation: String,
  FuelType: String,
  HeatType: String,
  CentralAir: String,
  WoodStove: String,
  Fireplace: String,
  PrefabFireplace: String,
  Sketch: String,
});

const LandRecordSchema = new mongoose.Schema({
  Recid1: Number,
  LandFlag: String,
  SoilClass: String,
  CalcCU: String,
  WaterSource: String,
  SewerSource: String,
  FloodPlain: String,
  LotShape: String,
  Topography: String,
  LandView: String,
  Landscaping: String,
  ValueMethod: String,
  Lots: String,
  Squarefeet: String,
  Acres: String,
});

const ValueRecordSchema = new mongoose.Schema({
  ValueLabel: String,
  FirstYear: String,
  Year0: Number,
  Year1: Number,
  Year2: Number,
  Year3: Number,
  Year4: Number,
  Year5: Number,
  Year6: Number,
});

const TaxLevyRecordSchema = new mongoose.Schema({
  TaxYear: String,
  TaxCodeArea: String,
  District: String,
  LevyTypeCode: String,
  LevyRate: Number,
  RegularRate: Number,
  ExcessRate: Number,
  RegularValue: Number,
  ExcessValue: Number,
  RegularTax: Number,
  ExcessTax: Number,
});

const SaleRecordSchema = new mongoose.Schema({
  ExciseDate: Date,
  ExciseID: String,
  ExciseNumber: String,
  DocumentType: String,
  GrantorName: String,
  SalePrice: Number,
  SaleVerify: String,
});

const ParcelSchema = new mongoose.Schema(
  {
    parcelNumber: { type: String, required: true, unique: true },
    Id: Number,
    LinkId: Number,
    ParcelNumber: String,
    OwnerRecords: [OwnerRecordSchema],
    SitusAddresses: [SitusAddressSchema],
    Residences: [ResidenceSchema],
    MobileHomes: [mongoose.Schema.Types.Mixed],
    LandRecords: [LandRecordSchema],
    CropRecords: [mongoose.Schema.Types.Mixed],
    DetachedStructures: [mongoose.Schema.Types.Mixed],
    ValueRecords: [ValueRecordSchema],
    TaxLevyRecords: [TaxLevyRecordSchema],
    SaleRecords: [SaleRecordSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("YakimaParcel", ParcelSchema);
