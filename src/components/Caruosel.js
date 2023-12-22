import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Animated,
  ScrollView,
} from "react-native";

import Graph from "./Graph";
import Slide from "./Slide";
import Stat from "./Stat";
import New from "./New";

let data2 = [
  { time: 1, RPM: 13000 },
  { time: 2, RPM: 16500 },
  { time: 3, RPM: 14250 },
  { time: 4, RPM: 19000 },
];

const Carousel = (props) => {
  const { items, style } = props;
  const itemsPerInterval =
    props.itemsPerInterval === undefined ? 1 : props.itemsPerInterval;

  const [intervals, setIntervals] = React.useState(1);
  const [interval, setInterval] = React.useState(1);
  const [width, setWidth] = React.useState(0);

  const init = (width) => {
    // initialise width
    setWidth(width);
    // initialise total intervals
    const totalItems = items.length;
    setIntervals(Math.ceil(totalItems / itemsPerInterval));
  };

  const getInterval = (offset) => {
    try {
      for (let i = 1; i <= intervals; i++) {
        if (offset + 1 < (width / intervals) * i) {
          return i;
        }
        if (i == intervals) {
          return i;
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  let bullets = [];
  for (let i = 1; i <= intervals; i++) {
    bullets.push(
      <Text
        key={i}
        style={{
          ...styles.bullet,
          opacity: interval === i ? 0.8 : 0.2,
          top: style === "news" ? 350 : 0,
          right: style === "news" ? 100 : 20,
        }}
      >
        &bull;
      </Text>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal={true}
        contentContainerStyle={{
          ...styles.scrollView,
          width: `${100 * intervals}%`,
        }}
        showsHorizontalScrollIndicator={false}
        onContentSizeChange={(w, h) => init(w)}
        onScroll={(event) => {
          setWidth(event.nativeEvent.contentSize.width);
          setInterval(getInterval(event.nativeEvent.contentOffset.x));
        }}
        scrollEventThrottle={200}
        pagingEnabled
        decelerationRate="fast"
      >
        {items.map((item, index) => {
          switch (style) {
            case "graphs":
              return (
                <Graph
                  key={index}
                  data={item.data}
                  title={item.title}
                  x={item.x}
                  y={item.y}
                  description={item.description}
                />
              );

            case "news":
              return (
                <New
                  key={index}
                  title={item.title}
                  url={item.url}
                  pubDate={item.pubDate}
                  source={item.source}
                  image_url={item.image_url}
                />
              );
            default:
              return null;
          }
        })}
      </ScrollView>
      <View style={styles.bullets}>{bullets}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  statsHead: {
    paddingTop: 10,
    paddingHorizontal: 12,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderColor: "#C7D6D7",
    borderWidth: 2,
    borderRadius: 40,
    // width: width - 20,
    // height: height / 3,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0.2, height: 0.2 },
    shadowOpacity: 0.1,
    elevation: 5,
    marginTop: 50,
    marginHorizontal: 10,
    marginBottom: -20,
    width: Dimensions.get("window").width - 20,
    zIndex: 1,
  },
  scrollView: {
    display: "flex",
    flexDirection: "row",
    overflow: "hidden",
  },
  bullets: {
    position: "absolute",
    top: 0,
    right: 20,
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingTop: 5,
    marginBottom: 40,
  },
  bullet: {
    paddingHorizontal: 5,
    fontSize: 40,
    color: "#50858B",
  },
});
export default Carousel;
