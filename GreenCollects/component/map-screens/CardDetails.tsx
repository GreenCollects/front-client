import React, { useEffect, useState } from "react";
import { Button, Card, Icon, Text} from "@ui-kitten/components"
import { StyleSheet, View } from "react-native";
import tw from "twrnc"

import { crossIcon,heartIcon, minusIcon } from "../icons/icons";


const CardDetails = (props : any) => {

  const nameOrAddress = (address:any) => {
    if (address.name !== address.subThoroughfare) {
      return address.name
    }
    else {
      return address.subThoroughfare + " " + address.thoroughfare
    }
  }

  const headerDetails = () => (
    <View style={tw`flex-row justify-between items-center ml-6 pt-2`}>
      <View>
        <Text category="h6">{nameOrAddress(props.address)}</Text>
        {console.log(props.address)}
      </View>
      <Button appearance="ghost" status="basic" accessoryLeft={crossIcon} onPress={props.deselect}/>
    </View>
  );

  const footerDetails = () => (
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
    header={headerDetails}
    footer={footerDetails}
    style={styles.cardDetail}
    >
    <Text >Déchets : </Text>
  </Card>
  );
};

const styles = StyleSheet.create({
    cardDetail: tw`absolute w-5 bottom-0  w-full`,
    cardOpacity:{display : "none"}
  });


  export default CardDetails