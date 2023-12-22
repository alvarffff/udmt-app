import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimension,
  ActivityIndicator,
} from "react-native";
import Spacer from "./Spacer";
import {
  VictoryLine,
  VictoryChart,
  VictoryTheme,
  VictoryScatter,
} from "victory-native";
//const { width, heigth } = Dimension.get("window");

const Graph = (props) => {
  const { description, data, title, x, y } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <Spacer>
        {data === undefined || !data.length ? (
          <ActivityIndicator
            style={{ size: 200, marginTop: 100 }}
            size="large"
          />
        ) : (
          <VictoryChart width={350} height={300} theme={VictoryTheme.material}>
            <VictoryLine
              style={{
                data: { stroke: "#50858b" },
              }}
              data={data}
              x={x}
              y={y}
              interpolation="catmullRom"
            />
            <VictoryScatter
              style={{ data: { fill: "#50858b" } }}
              size={4}
              data={data}
              x={x}
              y={y}
            />
          </VictoryChart>
        )}
      </Spacer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginTop: 10,
    marginBottom: -30,
    fontWeight: "bold",
    fontSize: 30,
    color: "black",
    alignSelf: "flex-start",
    marginLeft: 60,
  },
  description: {
    marginTop: 30,
    alignSelf: "flex-start",
    marginLeft: 60,
    fontSize: 15,
    marginBottom: -40,
  },
});

export default Graph;
