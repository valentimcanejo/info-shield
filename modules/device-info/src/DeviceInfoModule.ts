import { NativeModule, requireNativeModule } from "expo";

import { DeviceInfoModuleEvents } from "./DeviceInfo.types";

declare class DeviceInfoModule extends NativeModule<DeviceInfoModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
  getDeviceManufacturer(): string;
  getSystemVersion(): string;
  getSDKVersion(): number;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<DeviceInfoModule>("DeviceInfo");
