import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  FlatList,
  RefreshControl,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import useAppointments from "@/hooks/useAppointments";
import { createStyles } from "@/styles/AppointmentsStyles";
import { useLanguage } from "@/context/LanguageContext";

const Appointments = () => {
  const { t, i18n } = useTranslation();
  const { isRTL } = useLanguage();
  const styles = createStyles(isRTL);

  const {
    status,
    setPage,
    setStatus,
    pagination,
    loading,
    error,
    data,
    refetch,
    page,
  } = useAppointments();

  const [selectedStatus, setSelectedStatus] = useState("pending");
  const [refreshing, setRefreshing] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const navItems = [
    { key: "pending", label: t("appointment.status.pending") },
    { key: "completed", label: t("appointment.status.completed") },
    { key: "cancelled", label: t("appointment.status.cancelled") },
    { key: "rescheduled", label: t("appointment.status.rescheduled") },
    { key: "scheduled", label: t("appointment.status.scheduled") },
  ];

  const onSelectNav = (key: string) => {
    setSelectedStatus(key);
    setStatus(key);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    setPage(1);
    await refetch();
    setRefreshing(false);
  };

  const handleLoadMore = async () => {
    if (
      !isFetchingMore &&
      !loading &&
      pagination.current_page < pagination.total_pages
    ) {
      setIsFetchingMore(true);
      setPage((prev) => prev + 1);
      await refetch();
      setIsFetchingMore(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "#4CAF50cc";
      case "pending":
        return "#FFC107cc";
      case "cancelled":
        return "#F44336cc";
      case "rescheduled":
        return "#9C27B0cc";
      case "scheduled":
        return "#2196F3cc";
      default:
        return "#607D8Bcc";
    }
  };

  const renderAppointmentItem = ({ item }: { item: any }) => {
    const formattedDate = item.date
      ? new Date(item.date).toLocaleDateString(i18n.language, {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          numberingSystem: "latn",
        })
      : "N/A";

    return (
      <View style={styles.appointmentCard}>
        <View style={styles.appointmentHeader}>
          <Text style={styles.appointmentTitle}>{item.title || "N/A"}</Text>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: getStatusColor(item.status || "") },
            ]}
          >
            <Text style={styles.statusText}>
              {t(`appointment.status.${item.status || "unknown"}`)}
            </Text>
          </View>
        </View>
        <Text style={styles.toothText}>
          <Text style={styles.toothTitle}>{t("appointment.tooth")}:</Text>{" "}
          {item.tooth || "N/A"}
        </Text>
        <Text style={styles.contentText}>
          <Text style={styles.contentTitle}>{t("appointment.content")}:</Text>{" "}
          {item.content || "N/A"}
        </Text>
        <View style={styles.dateContainer}>
          <FontAwesome name="calendar" size={14} color="#34BCD4" />
          <Text style={styles.dateText}>{formattedDate}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.head}>
        <Text style={styles.header}>{t("appointment.title")}</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.navBarContent}
          style={styles.navBar}
        >
          {navItems.map((item) => (
            <TouchableOpacity
              key={item.key}
              style={[
                styles.navItem,
                selectedStatus === item.key && styles.navItemActive,
              ]}
              onPress={() => onSelectNav(item.key)}
            >
              <Text
                style={[
                  styles.navItemText,
                  selectedStatus === item.key && styles.navItemTextActive,
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.contentContainer}>
        {loading && !refreshing && page === 1 ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#34BCD4" />
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>
              {t("appointment.error") || "Something went wrong"}
            </Text>
            <TouchableOpacity style={styles.retryButton} onPress={refetch}>
              <Text style={styles.retryButtonText}>{t("common.retry")}</Text>
            </TouchableOpacity>
          </View>
        ) : data?.length ? (
          <FlatList
            data={data}
            renderItem={renderAppointmentItem}
            keyExtractor={(item) =>
              item.id?.toString() ?? Math.random().toString()
            }
            contentContainerStyle={styles.listContent}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={["#34BCD4"]}
                tintColor="#34BCD4"
              />
            }
            ListHeaderComponent={
              <Text style={styles.sectionHeader}>
                {t(`appointment.status.${selectedStatus}`)}{" "}
                {t("appointment.title")}
              </Text>
            }
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
              isFetchingMore ? (
                <ActivityIndicator
                  color="#34BCD4"
                  style={{ marginVertical: 10 }}
                />
              ) : null
            }
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {t("appointment.empty", {
                status: t(`appointment.status.${selectedStatus}`),
              })}
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Appointments;
