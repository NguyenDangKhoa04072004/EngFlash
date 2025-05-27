import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const getAccessToken = async ()  => {
  try {
    const value = await AsyncStorage.getItem('accessToken');
    if (value !== null) {
      return value
    }
  } catch (e) {
    console.log(e)
  }
};

const api = axios.create({
  baseURL: "https://engflash-system-ngk.onrender.com/",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFuLm5ndXllbmR1YzIwMDNxbmcrMUBoY211dC5lZHUudm4iLCJzdWIiOjUsImlhdCI6MTc0ODMxMzcyMSwiZXhwIjoxNzUwOTA1NzIxfQ.4oeZoM4b9Y2aDM9cu3RVBkoAhn6FlOsBVNmUNsujDE8"
  },
});

export default api;
