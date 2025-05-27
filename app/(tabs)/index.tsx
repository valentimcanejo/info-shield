import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { FlatList, StatusBar, StyleSheet, View } from "react-native";
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

  const sections = (data?.data as Section[]) || [];

  const [selectedSectionId, setSelectedSectionId] = useState("");

  useEffect(() => {
    if (sections.length > 0 && !selectedSectionId) {
      setSelectedSectionId(sections[0].id);
    }
  }, [sections]);

  const selectedSection = sections.find(
    (section: any) => section.id === selectedSectionId
  );

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

  return (
    <VStack style={styles.titleContainer} space="xl">
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
          <View style={styles.stepContainer}>
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
  stepContainer: {
    padding: 12,
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
  },
});
