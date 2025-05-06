import { messagesServices } from "@/services/messagesServices";
import { MessageType, PaginationType } from "@/Types/alias";
import { useState, useEffect } from "react";

const useMessages = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [pagination, setPagination] = useState<PaginationType>();
  const [page, setPage] = useState<number>(1);

  // Fallback ID generator based on timestamp + message text
  const generateFallbackId = (item: MessageType) =>
    `${item.created_at}_${item.message}`;

  const fetchMessages = async (pageToFetch: number) => {
    if (!pageToFetch) return;

    setLoading(true);
    setError(null);

    try {
      const response = await messagesServices.getConversation(pageToFetch);

      if (response.error) {
        setError(response.message);
        return;
      }

      const newData: MessageType[] = response?.data?.data || [];
      const newPagination: PaginationType = response?.data?.pagination;

      console.log("Fetched page:", pageToFetch);
      console.log("Raw newData:", newData);

      setPagination(newPagination);

      setMessages((prevMessages) => {
        if (pageToFetch === 1) return newData;

        const existingKeys = new Set(
          prevMessages.map((item) => generateFallbackId(item))
        );

        const filteredNewData = newData.filter((item) => {
          const key = generateFallbackId(item);
          const isNew = !existingKeys.has(key);
          if (!isNew) {
            console.warn("Duplicate (by fallback key) skipped:", item);
          }
          return isNew;
        });

        console.log(
          "Filtered new messages:",
          filteredNewData.map(generateFallbackId)
        );

        return [...prevMessages, ...filteredNewData];
      });
    } catch (err: any) {
      console.error("Fetch error:", err);
      setError(err.message || "Error fetching messages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Triggered fetch for page:", page);
    fetchMessages(page);
  }, [page]);

  const addNewMessage = (message: MessageType) => {
    setMessages((prev) => [message, ...prev]);
  };

  return {
    loading,
    error,
    messages,
    pagination,
    page,
    setPage,
    fetchMessages,
    addNewMessage,
  };
};

export default useMessages;
