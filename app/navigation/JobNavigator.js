import React, { useEffect, useState, useContext } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useColorScheme } from "react-native-appearance";

import HomeScreen from "../screens/home/HomeScreen";
import Screens from "../components/Screens";
import HeaderComponent from "../components/home/HeaderComponent";
import NoJobsScreen from "../screens/home/NoJobsScreen";
import db from "../helpers/db";
import colors from "../config/colors";
import JobContext from "../context/JobContext";
import AppThemeContext from "../context/AppThemeContext";
import { AppLoading } from "expo";
import FontLoad from "../components/activity/FontLoad";

const Tab = createMaterialTopTabNavigator();
export default function JobNavigator({ route, navigation }) {
  // Theme based colors
  const appTheme = useContext(AppThemeContext);
  const systemTheme = useColorScheme();
  const themeColor =
    appTheme.theme === "systemTheme" ? systemTheme : appTheme.theme;

  const [jobsArr, setJobsArr] = useState([]);
  const [isJobActive, setIsJobActive] = useState(false);

  const [fontLoaded, setFontLoaded] = useState(false);

  const handleActiveJobs = active => {
    setIsJobActive(active);
  };

  const handleDataFromDB = data => {
    //Append the data from db to jobs array state to re-render the component with data
    if (data && data.rows._array) {
      const jobsDataArr = [];
      data.rows._array.forEach(e =>
        jobsDataArr.push({ name: e.job_name, hourlyPay: e.hourly_pay })
      );
      setJobsArr(jobsDataArr);
    }
  };

  //re-render the component only if a new job is added
  useEffect(() => {
    //Fetch jobs from database
    (async function() {
      const data = await db.fetchJobs();
      try {
        handleDataFromDB(data);
        if (route.params && route.params.jobName) {
          data.rows._array.length > 1 &&
            navigation.navigate(
              data.rows._array[data.rows._array.length - 1].job_name
            );
        }
      } catch (error) {
        console.log(error);
      }
    })();

    return () => {};
  }, [route.params]);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={FontLoad}
        onFinish={() => {
          setFontLoaded(true);
        }}
      />
    );
  }

  return (
    <Screens>
      <HeaderComponent navigation={navigation} theme={themeColor} />
      {jobsArr.length === 0 ? (
        <NoJobsScreen />
      ) : (
        <JobContext.Provider
          value={{ isJobActive, onJobStart: handleActiveJobs }}
        >
          <Tab.Navigator
            tabBarOptions={{
              style: {
                backgroundColor:
                  themeColor === "dark" ? colors.black : colors.lightBackground
              },
              indicatorStyle: { backgroundColor: colors.yellow },
              scrollEnabled: true,
              activeTintColor: colors.yellow,
              inactiveTintColor: themeColor === "dark" ? "#B1B1B1" : "grey",
              labelStyle: {
                fontFamily: "ProximaNovaBold",
                fontSize: 15
              }
            }}
          >
            {jobsArr.map((job, index) => (
              <Tab.Screen
                name={job.name}
                component={HomeScreen}
                key={index}
                initialParams={{ title: job.name, hourlyPay: job.hourlyPay }}
              />
            ))}
          </Tab.Navigator>
        </JobContext.Provider>
      )}
    </Screens>
  );
}
