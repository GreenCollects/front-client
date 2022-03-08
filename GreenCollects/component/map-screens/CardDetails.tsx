import React, { useEffect, useState } from "react";
import { Button, Card, Icon, Text} from "@ui-kitten/components"
import { StyleSheet, View } from "react-native";
import tw from "twrnc"

const crossIcon = (props : any) => <Icon {...props} name="close-outline" />;
const heartIcon = (props : any) => <Icon  {...props} name="heart-outline" />;
const heartFillIcon = (props : any) => <Icon  {...props} name="heart" />;
const minusIcon = (props : any) => <Icon  {...props} name="minus-circle-outline" />
const minusFillIcon = (props : any) => <Icon  {...props} name="minus-circle" />


const CardDetails = (props : any) => {

  const HeaderDetails = () => (
    <View style={tw`flex-row justify-around`}>
      <View>
        <Text category="h6">props.title</Text>
        <Text category="s1">props.address</Text>
      </View>
      <Button appearance="ghost" status="basic" accessoryLeft={crossIcon} onPress={() => props.parent.setState({visibleDetails : false})}/>
    </View>
  );

  const FooterDetails = () => (
    <View>
      <View style={tw`flex-row justify-around`}>
        <Button appearance="ghost" status="danger" accessoryLeft={minusIcon}/>
        <Button appearance="ghost" status="success" accessoryLeft={heartIcon} />
      </View>
    </View>
  );

  return (
    <Card
    status="success"
    header={HeaderDetails}
    footer={FooterDetails}
    style={ styles.cardDetail}
    // style={{ display : displayCard ? "flex" : "none" }}
  >
    <Text >Type de déchets : </Text>
  </Card>
  );
};

const styles = StyleSheet.create({
    cardDetail: tw`absolute w-5 bottom-0  w-full`,
    cardOpacity:{display : "none"}
  });


  export default CardDetails