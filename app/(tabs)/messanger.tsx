import React, { useEffect, useRef, useState, useMemo } from "react";
import {
  FlatList,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  SafeAreaView,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import useMessages from "@/hooks/useMessages";
import { MessageType } from "@/Types/alias";
import Logo from "../../assets/logos/logo_1-removebg-preview.webp";
import { messagesServices } from "@/services/messagesServices";
import { useAuth } from "@/context/AuthContext";
import Pusher from "pusher-js";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/context/LanguageContext";
import { createStyles } from "@/styles/messangerStyles";

const Messenger = () => {
  const { messages, loading, error, pagination, setPage, addNewMessage } =
    useMessages();
  const { user, token } = useAuth();
  const user_id = Number(user?.id);
  const patientId = user?.id;
  const [newMessage, setNewMessage] = useState("");
  const flatListRef = useRef<FlatList<MessageType>>(null);
  const isScrolling = useRef(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const { t } = useTranslation();
  const { isRTL } = useLanguage();

  const styles = useMemo(() => createStyles(isRTL), [isRTL]);

  useEffect(() => {
    if (!token || !patientId) return;

    const pusher = new Pusher("xs5n6ysk7wwrglkxyrle", {
      wsHost: "192.168.1.7",
      wsPort: 8080,
      forceTLS: false,
      enabledTransports: ["ws", "wss"],
      authEndpoint: "http://192.168.1.7:8000/api/broadcasting/auth",
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
      if (data.message.reciver_id !== "clinc") {
        const newMessage: MessageType = {
          id: data.message.id,
          message: data.message.message,
          type: "received",
          created_at: data.message.created_at,
        };
        addNewMessage(newMessage);
      }
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [token]);

  const handleSend = async () => {
    if (!newMessage.trim()) return;

    const { data, error } = await messagesServices.sendMessage(
      user_id,
      newMessage
    );

    if (error) {
      throw new Error(error);
    }

    const messageToSend: MessageType = {
      id: data.data.id,
      message: newMessage,
      type: "sent",
      created_at: new Date().toISOString(),
    };

    addNewMessage(messageToSend);
    setNewMessage("");
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset } = event.nativeEvent;
    isScrolling.current = true;

    if (contentOffset.y > 100 && pagination?.has_more_pages && !isLoadingMore) {
      loadMoreMessages();
    }
  };

  const loadMoreMessages = () => {
    if (isLoadingMore || !pagination?.has_more_pages) return;

    setIsLoadingMore(true);
    setPage((prev) => prev + 1);
  };

  const handleScrollEnd = () => {
    isScrolling.current = false;
  };

  useEffect(() => {
    setIsLoadingMore(false);
  }, [messages]);

  if (loading && !messages.length) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#34BCD4" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{t("messenger.loadError")}</Text>
      </View>
    );
  }

  const renderMessage = ({ item }: { item: MessageType }) => (
    <View
      style={[
        styles.messageContainer,
        item.type === "sent" ? styles.sentMessage : styles.receivedMessage,
      ]}
    >
      <View
        style={[
          styles.messageBubble,
          item.type === "sent" ? styles.sentBubble : styles.receivedBubble,
        ]}
      >
        <Text
          style={[
            item.type === "sent" ? styles.sentText : styles.receivedText,
            { textAlign: isRTL ? "right" : "left" },
          ]}
        >
          {item.message}
        </Text>
        <Text style={item.type === "sent" ? styles.timeText : styles.timeText2}>
          {new Date(item.created_at).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <View style={styles.avatar}>
            <Image
              source={Logo}
              style={styles.avatarImage}
              resizeMode="contain"
            />
          </View>
          <View>
            <Text style={styles.userName}>{t("messenger.dentist")}</Text>
            <Text style={styles.status}>{t("messenger.online")}</Text>
          </View>
        </View>
      </View>

      {isLoadingMore && (
        <View style={styles.loadingMoreContainer}>
          <ActivityIndicator size="small" color="#34BCD4" />
        </View>
      )}

      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        inverted
        onScroll={handleScroll}
        onScrollEndDrag={handleScrollEnd}
        onMomentumScrollEnd={handleScrollEnd}
        scrollEventThrottle={16}
        contentContainerStyle={styles.messagesContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>{t("messenger.noMessages")}</Text>
          </View>
        }
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.inputContainer}
      >
        <TextInput
          style={[styles.input, { textAlign: isRTL ? "right" : "left" }]}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder={t("messenger.inputPlaceholder")}
          placeholderTextColor="#999"
          multiline
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={handleSend}
          disabled={!newMessage.trim()}
        >
          <Text style={styles.sendButtonText}>{t("messenger.send")}</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Messenger;
