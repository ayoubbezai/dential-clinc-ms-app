import React, { useEffect, useState } from "react";
import Pusher from "pusher-js";
import { useAuth } from "@/context/AuthContext";
import { Text, View } from "react-native";

const Messenger = () => {
  const { token } = useAuth();

  const patientId = "01962eb2-54c7-71b9-9de4-64316cdae92b"; // Hardcoded for now

  useEffect(() => {
    if (!token || !patientId) return;

    const pusher = new Pusher("xs5n6ysk7wwrglkxyrle", {
      wsHost: "192.168.1.2",
      wsPort: 6001,
      forceTLS: false,
      enabledTransports: ["ws", "wss"],
      authEndpoint: "http://192.168.1.2:8000/api/broadcasting/auth",
      cluster: "",
      auth: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });

    const channel = pusher.subscribe(`private-chat.patient.${patientId}`);

    channel.bind("pusher:subscription_succeeded", () => {
      console.log(`✅ Subscribed to private-chat.patient.${patientId}`);
    });

    channel.bind("pusher:subscription_error", (err: any) => {
      console.error("❌ Subscription error:", err);
    });

    channel.bind("message.sent", (data: any) => {
      console.log("📩 New message received:", data);

      const newMessage = {
        message: data.message,
        type: "received",
        created_at: data.created_at,
      };
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [token]);

  return (
    <View>
      <Text>Messenger</Text>
    </View>
  );
};

export default Messenger;
