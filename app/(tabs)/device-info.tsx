import React from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import ChangeThemeButton from "../../components/change-theme-button";
import { CustomText } from "../../components/ui/text";
import { VStack } from "../../components/ui/vstack";
import deviceInfo from "../../modules/device-info";

export default function DeviceInfo() {
  return (
    <View style={{ flex: 1 }}>
      <VStack style={styles.titleContainer} space="xl">
        <View className="absolute z-10 top-4 right-4">
          <ChangeThemeButton />
        </View>
        <CustomText size="2xl" bold>
          Informações do Dispositivo
        </CustomText>
        <VStack space="lg">
          <VStack>
            <CustomText size="lg" bold>
              Fabricante:
            </CustomText>
            <CustomText size="lg">
              {deviceInfo.getDeviceManufacturer()}
            </CustomText>
          </VStack>
          <VStack>
            <CustomText size="lg" bold>
              Versão do sistema:
            </CustomText>
            <CustomText size="lg">{deviceInfo.getSystemVersion()}</CustomText>
          </VStack>
          <VStack>
            <CustomText size="lg" bold>
              Versão do SDK:
            </CustomText>
            <CustomText size="lg">{deviceInfo.getSDKVersion()}</CustomText>
          </VStack>
        </VStack>
      </VStack>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    marginTop: StatusBar.currentHeight,
    padding: 20,
  },
});
