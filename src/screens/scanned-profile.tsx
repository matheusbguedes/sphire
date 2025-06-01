import { Docs } from "@/@types/docs";
import { Button } from "@/components/button";
import { Field } from "@/components/field";
import { AppNavigatorRoutesProps } from "@/routes/app.routes";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeft } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";

import { faker } from "@faker-js/faker/locale/pt_BR";

export function ScannedProfile() {
  const [document, setDocument] = useState<Docs>();

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleGoBack() {
    navigation.goBack();
  }

  function handleNext() {
    navigation.navigate("alchoholMeasurement");
  }

  async function handleGetDocument() {
    const document = {
      picture: faker.image.personPortrait({ sex: "male" }),
      name: faker.person.fullName({ sex: "male" }),
      birthDate: faker.date
        .birthdate({ min: 18, max: 50, mode: "age" })
        .toLocaleDateString("pt-BR"),
      rg: faker.string.numeric(9).replace(/(\d{2})(\d{3})(\d{3})/, "$1.$2.$3"),
      cpf: faker.string
        .numeric(11)
        .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4"),
      nationality: "Brasileiro",
    };

    setDocument(document);
  }

  useEffect(() => {
    handleGetDocument();
  }, []);

  if (!document) return null;

  return (
    <View className="flex-1 bg-white">
      <View className="px-8">
        <TouchableOpacity onPress={handleGoBack}>
          <ArrowLeft size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View className="flex-1 items-center gap-8 py-4">
        <Image
          source={{ uri: document?.picture }}
          className="size-40 z-10 rounded-2xl"
        />

        <View className="w-full flex-1 gap-6 px-6">
          <Field label="NOME E SOBRENOME" value={document?.name} />
          <Field label="DATA DE NASCIMENTO" value={document?.birthDate} />
          <View className="flex-row gap-6">
            <Field label="RG" value={document?.rg} />
            <Field label="CPF" value={document?.cpf} />
          </View>
          <Field label="NACIONALIDADE" value={document?.nationality} />
        </View>
      </View>
      <View className="px-8">
        <Button title="Prosseguir" onPress={handleNext} />
      </View>
    </View>
  );
}
