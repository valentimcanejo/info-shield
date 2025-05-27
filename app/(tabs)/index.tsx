import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { FlatList, StatusBar, StyleSheet, View } from "react-native";
import ChangeThemeButton from "../../components/change-theme-button";
import { Button, ButtonText } from "../../components/ui/button";
import { CustomText } from "../../components/ui/text";
import { VStack } from "../../components/ui/vstack";
import api from "../../services/auth/api";
import { Section } from "../../types/section";

export default function HomeScreen() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["sections"],
    queryFn: () => api.get("/sections"),
  });

  const sections = (data?.data?.sections as Section[]) || [];

  const [selectedSectionId, setSelectedSectionId] = useState("");

  useEffect(() => {
    if (sections?.length > 0 && !selectedSectionId) {
      setSelectedSectionId(sections[0].id);
    }
  }, [sections]);

  if (isLoading) {
    return (
      <VStack style={styles.titleContainer}>
        <CustomText>Carregando...</CustomText>
      </VStack>
    );
  }

  if (error) {
    return (
      <VStack style={styles.titleContainer}>
        <CustomText>Erro ao carregar as seções.</CustomText>
      </VStack>
    );
  }

  const selectedSection = sections?.find(
    (section: any) => section.id === selectedSectionId
  );

  return (
    <VStack style={styles.titleContainer} space="xl">
      <View className="absolute z-10 top-4 right-4">
        <ChangeThemeButton />
      </View>
      <CustomText size="2xl" bold>
        Olá, seja bem-vindo
      </CustomText>
      <CustomText size="2xl">
        Irei mostrar algumas dicas de segurança para o seu celular
      </CustomText>

      <FlatList
        data={sections}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginVertical: 10 }}
        contentContainerStyle={{ gap: 8 }}
        renderItem={({ item }) => (
          <Button
            variant={item.id === selectedSectionId ? "solid" : "outline"}
            onPress={() => setSelectedSectionId(item.id)}
          >
            <ButtonText>{item.title}</ButtonText>
          </Button>
        )}
      />

      <FlatList
        data={selectedSection?.data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <CustomText size="lg" bold>
              {item.title}
            </CustomText>
            <CustomText>{item.desc}</CustomText>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      />
    </VStack>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    marginTop: StatusBar.currentHeight,
    padding: 20,
  },
});
