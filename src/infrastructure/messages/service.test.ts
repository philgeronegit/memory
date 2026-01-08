import { beforeEach, describe, expect, it, vi } from "vitest";
import { MessagesService } from "./service";

const messagesApiMock = {
  createMessage: vi.fn().mockResolvedValue({
    id_message: 1,
    id_user: 1,
    text: "Test message content",
    created_at: new Date("2025-01-01T10:00:00Z"),
    read_at: undefined
  }),
  getMessage: vi.fn().mockResolvedValue({
    id_message: 1,
    id_user: 1,
    text: "Test message content",
    created_at: new Date("2025-01-01T10:00:00Z"),
    read_at: undefined
  }),
  getMessages: vi.fn().mockResolvedValue([
    {
      id_message: 1,
      id_user: 1,
      text: "Message 1 content",
      created_at: new Date("2025-01-01T10:00:00Z"),
      read_at: undefined
    },
    {
      id_message: 2,
      id_user: 2,
      text: "Message 2 content",
      created_at: new Date("2025-01-02T11:00:00Z"),
      read_at: new Date("2025-01-02T12:00:00Z")
    }
  ]),
  getUserMessages: vi.fn().mockResolvedValue([]),
  updateMessage: vi.fn().mockResolvedValue({
    id_message: 1,
    id_user: 1,
    text: "Updated message content",
    created_at: new Date("2025-01-01T10:00:00Z"),
    read_at: undefined
  }),
  updateMessageForUser: vi.fn().mockResolvedValue({
    id_message: 1,
    id_user: 1,
    text: "Test message content",
    created_at: new Date("2025-01-01T10:00:00Z"),
    read_at: new Date("2025-01-03T10:00:00Z")
  })
};

describe("MessagesService", () => {
  let messagesService: MessagesService;

  beforeEach(() => {
    vi.clearAllMocks();
    messagesService = new MessagesService(messagesApiMock);
  });

  it("should create a message", async () => {
    const input = {
      text: "Test message content",
      userId: 1
    };

    const result = await messagesService.createMessage(input);

    expect(messagesApiMock.createMessage).toHaveBeenCalledWith(input);
    expect(result.id).toBe(1);
    expect(result.text).toBe("Test message content");
  });

  it("should get a message by ID", async () => {
    const result = await messagesService.getMessage(1);

    expect(messagesApiMock.getMessage).toHaveBeenCalledWith(1);
    expect(result.id).toBe(1);
    expect(result.text).toBe("Test message content");
  });

  it("should get user messages", async () => {
    const result = await messagesService.getUserMessages(1);

    expect(messagesApiMock.getUserMessages).toHaveBeenCalledWith(1);
    expect(Array.isArray(result)).toBe(true);
  });

  it("should return empty array when userId is not provided", async () => {
    const result = await messagesService.getUserMessages(undefined);

    expect(result).toEqual([]);
    expect(messagesApiMock.getUserMessages).not.toHaveBeenCalled();
  });

  it("should get all messages", async () => {
    const result = await messagesService.getMessages();

    expect(messagesApiMock.getMessages).toHaveBeenCalled();
    expect(result).toHaveLength(2);
    expect(result[0].text).toBe("Message 1 content");
    expect(result[1].text).toBe("Message 2 content");
  });

  it("should update a message", async () => {
    const input = {
      id: 1,
      text: "Updated message content"
    };

    const result = await messagesService.updateMessage(input);

    expect(messagesApiMock.updateMessage).toHaveBeenCalledWith(input);
    expect(result.text).toBe("Updated message content");
  });

  it("should update message for user (mark as read)", async () => {
    const input = {
      id: 1,
      userId: 1,
      readAt: new Date("2025-01-03T10:00:00Z")
    };

    const result = await messagesService.updateMessageForUser(input);

    expect(messagesApiMock.updateMessageForUser).toHaveBeenCalledWith(input);
    expect(result.readAt).toBeDefined();
  });
});
