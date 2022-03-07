import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Modal, Text, Card, Input } from "@ui-kitten/components";
import tw from "twrnc";

export const AddPoint = (props: any) => {
  const [visible, setVisible] = React.useState(false);

  return (
    <View style={styles.container}>
      {console.log(props.route.params.region)}
      <Card disabled={true} style={styles.card}>
        <Text>Nom du point de collecte</Text>
        <Input></Input>
        <Text>Selectionner le type de déchets :</Text>
          <Button onPress={() => setVisible(false)}>Validate</Button>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: tw`flex flex-1 h-auto`,
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  // buttons: tw`flex flex-1 flex-row justify-around bg-black`,
  card: tw`flex flex-1`,
});
