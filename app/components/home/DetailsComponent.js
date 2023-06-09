import React, { useRef } from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import colors from "../../config/colors";

export function DetailsComponent({ data, theme }) {
  let flatListRef = useRef();
  return (
    <View style={styles.container}>
      <Text
        style={[styles.header, theme === "light" && { color: colors.black }]}
      >
        DETAILS
      </Text>
      <View style={[styles.detailsContent, { alignItems: "center" }]}>
        {Object.keys(data).length !== 0 ? (
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <Text style={styles.detailsTxt}>{item.message}</Text>
            )}
            ref={ref => (flatListRef = ref)}
            onContentSizeChange={() =>
              flatListRef.scrollToEnd({ animated: true })
            }
            keyExtractor={item => item.id.toString()}
          />
        ) : (
          <Text style={styles.detailsTxt}>No Punches clocked yet</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 130
  },
  detailsContent: {
    justifyContent: "center",
    flex: 1,
    width: "100%"
  },
  header: {
    fontFamily: "ProximaNovaBold",
    color: "#C3C0C0F2",
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center"
  },
  detailsTxt: {
    fontFamily: "ProximaNovaRegular",
    textAlign: "center",
    width: "100%",
    paddingBottom: 10,
    color: "#808080F2"
  }
});

export const MemoizedDetailsComponent = React.memo(DetailsComponent);
