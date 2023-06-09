import { Alert } from "react-native";
import routes from "../navigation/routes";
import { StackActions } from "@react-navigation/native";
import utils from "../helpers/utils";

export default Object.freeze({
  FIRST_TIME_APP_LOAD: "FIRST_TIME_APP_LOAD",
  CLOCK_INITIAL_ZERO: "00",
  API_URL: "http://ec2-3-16-255-54.us-east-2.compute.amazonaws.com:3000",
  SETTINGS_LINK: [
    {
      id: 1,
      title: "Theme",
      imgUri: require("../assets/moon.png"),
      targetScreenName: routes.THEME,
      iconColor: "#373737",
      onPress: (targetScreenName, navigation) =>
        navigation.navigate(targetScreenName),
    },
    {
      id: 2,
      title: "My Account",
      imgUri: require("../assets/settings-account.png"),
      targetScreenName: routes.MY_ACCOUNT,
      iconColor: "#4B4BF9",
      onPress: (targetScreenName, navigation) =>
        navigation.navigate(targetScreenName),
    },
    {
      id: 3,
      title: "Report a Problem",
      imgUri: require("../assets/settings-report.png"),
      targetScreenName: routes.REPORT,
      iconColor: "#E74C3C",
      onPress: (targetScreenName, navigation) =>
        navigation.navigate(targetScreenName),
    },
    {
      id: 4,
      title: "Contact Us",
      imgUri: require("../assets/settings-contact.png"),
      targetScreenName: routes.CONTACT_US,
      iconColor: "#2ECC71",
      onPress: (targetScreenName, navigation) =>
        navigation.navigate(targetScreenName),
    },
    {
      id: 5,
      title: "Log Out",
      imgUri: require("../assets/settings-logout.png"),
      targetScreenName: "LoginStackNavigator",
      iconColor: "#9B59B6",
      onPress: (targetScreenName, navigation) => {
        Alert.alert("Logging Out!!", "Are you sure you want to logout??", [
          {
            text: "Yes",
            onPress: () => {
              utils.removeAsyncStorageData("token");
              navigation.dispatch(StackActions.replace(routes.LOGIN));
            },
          },
          { text: "No", style: "cancel" },
        ]);
      },
    },
  ],
  ONBOARDING_DATA: [
    {
      id: 1,
      header: "Easy To Use!",
      imageUri: require("../assets/on_boarding_one.png"),
    },
    {
      id: 2,
      header: "Calculate your Payment!",
      imageUri: require("../assets/on_boarding_two.png"),
    },
    {
      id: 3,
      header: "Calculate your Payment!",
      imageUri: require("../assets/on_boarding_three.png"),
    },
  ],
  DEFAULT_TIMER: {
    hour: "00",
    minute: "00",
    seconds: "00",
  },
  IS_TABLE_CREATED: "is_tables_created",
  YES: "Y",
  TOKEN_KEY: "token",
  NOTIFICATION_TOKEN: "notification_token",
  IS_NOTIFICATION_ENABLED: "isNotificationEnabled",
});
