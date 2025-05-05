import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
  RefreshControl,
} from "react-native";
import useAppointments from "@/hooks/useAppointments";
import { FontAwesome } from "@expo/vector-icons";

const Appointments = () => {
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
    { key: "pending", label: "Pending" },
    { key: "completed", label: "Completed" },
    { key: "cancelled", label: "Cancelled" },
    { key: "rescheduled", label: "Rescheduled" },
    { key: "scheduled", label: "Scheduled" },
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
      setPage((prev: number) => prev + 1);
      await refetch();
      setIsFetchingMore(false);
    }
  };

  const renderAppointmentItem = ({ item }: { item: any }) => {
    const formattedDate = item.date
      ? new Date(item.date).toLocaleDateString("en-GB", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "N/A";

    return (
      <View style={styles.appointmentCard}>
        <View style={styles.appointmentHeader}>
          <Text style={styles.appointmentTitle}>{item.title || "N/A"}</Text>
          <View
            style={[
              styles.statusBadge,
              {
                backgroundColor: getStatusColor(item.status || ""),
              },
            ]}
          >
            <Text style={styles.statusText}>{item.status || "N/A"}</Text>
          </View>
        </View>
        <Text style={styles.toothText}>
          <Text style={styles.toothTitle}>Tooth :</Text> {item.tooth || "N/A"}
        </Text>
        <Text style={styles.contentText}>
          <Text style={styles.contentTitle}>Content:</Text>{" "}
          {item.content || "N/A"}
        </Text>

        {/* Styled date */}
        <View style={styles.dateContainer}>
          <FontAwesome name="calendar" size={14} color="#34BCD4" />
          <Text style={styles.dateText}>{formattedDate}</Text>
        </View>
      </View>
    );
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.head}>
        <Text style={styles.header}>Appointments</Text>

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
              {error || "Something went wrong"}
            </Text>
            <TouchableOpacity style={styles.retryButton} onPress={refetch}>
              <Text style={styles.retryButtonText}>Retry</Text>
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
                {selectedStatus.charAt(0).toUpperCase() +
                  selectedStatus.slice(1)}{" "}
                Appointments
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
              No {selectedStatus} appointments found.
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F8FA",
  },
  head: {
    backgroundColor: "#ffffff",
    paddingTop: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#34BCD420",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    marginTop: 10,
    alignSelf: "flex-start",
    gap: 6,
  },
  dateText: {
    fontSize: 14,
    color: "#34BCD4",
    fontWeight: "500",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 15,
    color: "#333",
  },
  navBar: {
    maxHeight: 50,
  },
  navBarContent: {
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 15,
  },
  navItem: {
    paddingBottom: 15,
    paddingHorizontal: 5,
  },
  navItemActive: {
    borderBottomWidth: 3,
    borderBottomColor: "#34BCD4",
  },
  navItemText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
  },
  navItemTextActive: {
    color: "#34BCD4",
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: "#F44336",
    marginBottom: 20,
    textAlign: "center",
  },
  retryButton: {
    backgroundColor: "#34BCD4",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  retryButtonText: {
    color: "white",
    fontWeight: "500",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
  },
  listContent: {
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 10,
    color: "#333",
  },
  appointmentCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  appointmentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  appointmentTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  statusText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  toothText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  contentText: {
    fontSize: 14,
    color: "#777",
  },
  contentTitle: {
    fontSize: 14,
    color: "#344",
    fontWeight: "bold",
  },
  toothTitle: {
    fontSize: 14,
    color: "#344",
    fontWeight: "bold",
  },
});

export default Appointments;
